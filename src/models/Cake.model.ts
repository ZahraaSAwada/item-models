import { IItem, ItemCategory } from "./Item.model";

export class Cake implements IItem {
  private type: string;
  private flavor: string;
  private filling: string;
  private size: number;
  private layers: number;

  constructor(
    type: string,
    flavor: string,
    filling: string,
    size: number,
    layers: number
  ) {
    this.type = type;
    this.flavor = flavor;
    this.filling = filling;
    this.size = size;
    this.layers = layers;
  }

  getCategory(): ItemCategory {
    return ItemCategory.CAKE;
  }

  getType(): string {
    return this.type;
  }

  getFlavor(): string {
    return this.flavor;
  }

  getFilling(): string {
    return this.filling;
  }

  getSize(): number {
    return this.size;
  }

  getLayers(): number {
    return this.layers;
  }
}