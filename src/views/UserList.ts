import { CollectionView } from "./CollectionView";
import { User, UserProps } from "../models/user";
import { UserShow } from "./UserShow";
export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, itemParent): void {
    new UserShow(itemParent, model).render();
  }
}
