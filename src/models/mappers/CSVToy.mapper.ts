import { IMapper } from "./IMapper";
import { Toy } from "../Toy.model";
import { ToyBuilder } from "../builders/Toy.builder";

export class CSVToyMapper implements IMapper<string[], Toy> {
  map(data: string[]): Toy {
    return new ToyBuilder()
      .setType(data[0])
      .setMadeIn(data[1])
      .setPrice(parseInt(data[2]))
      .setSize(parseInt(data[3]))
      .setAge(parseInt(data[4]))
      .build();
  }

  reverseMap(data: Toy): string[] {
    return [
      data.getType(),
      data.getMadeIn(),
      data.getPrice().toString(),
      data.getSize().toString(),
      data.getAge().toString(),
    ];
  }
}