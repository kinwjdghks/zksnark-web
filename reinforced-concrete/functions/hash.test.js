import { fileURLToPath } from "url";
import { hashFile } from "./hash.js";
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const __filename = fileURLToPath(import.meta.url);
import path from 'path';

console.log(hashFile(path.resolve(__dirname, "./text.txt")));
