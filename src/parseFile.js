import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readFile = (filename) => {
  const filePath = path.join(__dirname, '..', filename);
  return fs.readFileSync(filePath, 'utf8');
};

const getFileExtention = filename => path.extname(filename);

const parseFile = (file, extension) => {
  if (extension === '.json') {
    return JSON.parse(file);
  }
  if (extension === '.yml' || extension === '.yaml') {
    return YAML.parse(file);
  }

  throw new Error(`Unsupported format: ${extension}`);
};

export { readFile, getFileExtention, parseFile };
