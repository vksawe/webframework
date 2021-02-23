import { Collection } from "../models/collection";
export abstract class CollectionView<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}
  abstract renderItem(model: T, itemParent: Element): void;
  render(): void {
    this.parent.innerHTML = "";
    const tempelateElement = document.createElement("template");
    for (let model of this.collection.models) {
      const itemParent = document.createElement("div");
      this.renderItem(model, itemParent);
      tempelateElement.content.append(itemParent);
    }
    this.parent.append(tempelateElement.content);
  }
}
