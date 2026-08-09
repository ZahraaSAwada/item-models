import { Cake } from "../Cake.model";

export class CakeBuilder {
  private type!: string;
  private flavor!: string;
  private filling!: string;
  private size!: number;
  private layers!: number;

  setType(type: string): CakeBuilder {
    this.type = type;
    return this;
  }

  setFlavor(flavor: string): CakeBuilder {
    this.flavor = flavor;
    return this;
  }

  setFilling(filling: string): CakeBuilder {
    this.filling = filling;
    return this;
  }

  setSize(size: number): CakeBuilder {
    this.size = size;
    return this;
  }

  setLayers(layers: number): CakeBuilder {
    this.layers = layers;
    return this;
  }

  build(): Cake {
    return new Cake(this.type, this.flavor, this.filling, this.size, this.layers);
  }
}