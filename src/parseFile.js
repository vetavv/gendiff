import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readFile = (filename) => {
  const filePath = path.resolve(__dirname, '..', filename);
  return fs.readFileSync(filePath, 'utf8');
};

const parseFile = (file) => {
  return YAML.parse(file);
};

export { readFile, parseFile };
