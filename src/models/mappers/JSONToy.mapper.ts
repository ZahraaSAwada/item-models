import { IMapper } from "./IMapper";
import { Toy } from "../Toy.model";
import { ToyBuilder } from "../builders/Toy.builder";

export class JSONToyMapper implements IMapper<any, Toy> {
  map(data: any): Toy {
    return new ToyBuilder()
      .setType(data.type)
      .setMadeIn(data.madeIn)
      .setPrice(Number(data.price))
      .setSize(Number(data.size))
      .setAge(Number(data.age))
      .build();
  }

  reverseMap(data: Toy): any {
    return {
      type: data.getType(),
      madeIn: data.getMadeIn(),
      price: data.getPrice(),
      size: data.getSize(),
      age: data.getAge(),
    };
  }
}