import { IItem, ItemCategory } from "./Item.model";

export class Toy implements IItem {
  private type: string;
  private madeIn: string;
  private price: number;
  private size: number;
  private age: number;

  constructor(
    type: string,
    madeIn: string,
    price: number,
    size: number,
    age: number
  ) {
    this.type = type;
    this.madeIn = madeIn;
    this.price = price;
    this.size = size;
    this.age = age;
  }

  getCategory(): ItemCategory {
    return ItemCategory.TOY;
  }

  getType(): string {
    return this.type;
  }

  getMadeIn(): string {
    return this.madeIn;
  }

  getPrice(): number {
    return this.price;
  }

  getSize(): number {
    return this.size;
  }

  getAge(): number {
    return this.age;
  }
}