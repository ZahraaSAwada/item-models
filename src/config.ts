// src/config.ts
import dotenv from "dotenv";

// Load the variables from the .env file into the environment.
dotenv.config();

// Read DATABASE_URL from the environment; if it's missing, fail loudly.
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set. Check your .env file.");
}

// Expose a clean config object for the rest of the app to import.
export const config = {
  databaseUrl,
};