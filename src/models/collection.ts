import axios, { AxiosPromise, AxiosResponse } from "axios";
import { Eventing } from "./Eventing";
export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(private rootuRL: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }
  fetch() {
    axios.get(this.rootuRL).then((response: AxiosResponse): void => {
      response.data.forEach((value: K) => {
        const user = this.deserialize(value);
        this.models.push(user);
      });
      this.events.trigger("change");
    });
  }
}
