import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { Attributes } from "./attributes";
import { Model } from "./Model";
import { AxiosPromise, AxiosResponse } from "axios";
import { Collection } from "./collection";
export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}
const rootUrl = "http://localhost:3000/users";
export class User extends Model<UserProps> {
  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      rootUrl,
      (json: UserProps): User => User.buildUser(json)
    );
  }
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }
  setrandomAge = (): void => {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  };
}
