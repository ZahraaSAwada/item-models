import { Toy } from "../Toy.model";

export class ToyBuilder {
  private type!: string;
  private madeIn!: string;
  private price!: number;
  private size!: number;
  private age!: number;

  setType(type: string): ToyBuilder {
    this.type = type;
    return this;
  }

  setMadeIn(madeIn: string): ToyBuilder {
    this.madeIn = madeIn;
    return this;
  }

  setPrice(price: number): ToyBuilder {
    this.price = price;
    return this;
  }

  setSize(size: number): ToyBuilder {
    this.size = size;
    return this;
  }

  setAge(age: number): ToyBuilder {
    this.age = age;
    return this;
  }

  build(): Toy {
    return new Toy(this.type, this.madeIn, this.price, this.size, this.age);
  }
}