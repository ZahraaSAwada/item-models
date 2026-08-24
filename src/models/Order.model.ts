// src/models/Order.model.ts
import { IItem } from "./Item.model";

export class Order {
  private item: IItem;
  private price: number;
  private quantity: number;

  constructor(item: IItem, price: number, quantity: number) {
    this.item = item;
    this.price = price;
    this.quantity = quantity;
  }

  getItem(): IItem {
    return this.item;
  }

  getPrice(): number {
    return this.price;
  }

  getQuantity(): number {
    return this.quantity;
  }
}