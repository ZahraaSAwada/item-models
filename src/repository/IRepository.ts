// src/repository/IRepository.ts

// A simple alias: every id in our system is a string.
export type id = string;

// Any repository that manages a type T must promise these five operations.
export interface IRepository<T> {
  create(item: T): Promise<id>;        // add a new item, return its id
  get(id: id): Promise<T>;             // fetch one item by its id
  getAll(): Promise<T[]>;              // fetch every item
  update(id: id, item: T): Promise<T>; // replace an existing item
  delete(id: id): Promise<void>;       // remove an item by its id
}