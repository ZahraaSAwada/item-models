# Item Models

Class models for orderable items, built with TypeScript using OOP principles.

## Models

- **Cake** — type, flavor, filling, size, layers
- **Book** — title, author, genre, pages, price
- **Toy** — type, made-in, price, size, recommended age

## Design

All models implement a shared `IItem` interface, which requires a `getCategory()` method returning a value from the `ItemCategory` enum. Each model applies **encapsulation**: properties are private, set once in the constructor, and exposed only through getters (no setters), making each object a read-only data model.

## Running

```
npm install
npx tsx src/index.ts
```