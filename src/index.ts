import { Cake } from "./models/Cake.model";
import { Book } from "./models/Book.model";
import { Toy } from "./models/Toy.model";

const cake = new Cake("Birthday", "Chocolate", "Cream", 3, 2);
const book = new Book("Paperback", "1984", "George Orwell", "Dystopian", 328, 15);
const toy = new Toy("Action Figure", "China", 25, 10, 6);

console.log(cake.getFlavor(), "-", cake.getCategory());
console.log(book.getTitle(), "-", book.getCategory());
console.log(toy.getType(), "-", toy.getCategory());