export enum ItemCategory {
  CAKE = "cake",
  BOOK = "book",
  TOY = "toy",
}

export interface IItem {
  getCategory(): ItemCategory;
}