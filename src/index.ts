import { UserEdit } from "./views/UserEdit";
import { User, UserProps } from "./models/User";
import { UserForm } from "./views/UserForm";
import { UserList } from "./views/UserList";
import { Collection } from "./models/collection";
// const user = User.buildUser({ name: "Hahaha", age: 244000 });

// // // user.fetch();

// // const collection = User.buildUserCollection();
// // collection.on("change", () => {
// //   console.log(collection);
// // });
// // collection.fetch();
// // console.log(collection.models);

// const root = document.getElementById("root");
// if (root) {
//   const userEdit = new UserEdit(root, user);
//   userEdit.render();
//   console.log(userEdit);
// } else {
//   throw new Error("Root Element Not found");
// }

const users = new Collection(
  "http://localhost:3000/users",
  (json: UserProps) => {
    return User.buildUser(json);
  }
);
users.on("change", () => {
  const root = document.getElementById("root");
  if (root) {
    new UserList(root, users).render();
  }
});
users.fetch();
