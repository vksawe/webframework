import { AxiosPromise, AxiosResponse } from "axios";

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}
interface HasId {
  id?: number;
}
interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(value: T): void;
  getAll(): T;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}
  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;
  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }
  fetch(): void {
    const id = this.get("id");
    if (typeof id !== "number") {
      throw new Error("Cannot Fetch without an id");
    }
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }
  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse) => {
        this.trigger("save");
      })
      .catch(() => {
        this.trigger("error");
      });
  }
}
