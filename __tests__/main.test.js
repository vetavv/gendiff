import genDiff from '../index.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixtures = filename => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = filename => fs.readFileSync(getFixtures(filename), 'utf-8');

test('JSON format', () => {
  const file1 = getFixtures('f1.json');
  const file2 = getFixtures('f2.json');

  const expected = readFile('resultJSON.txt');

  expect(genDiff(file1, file2)).toBe(expected);
});

test('Plain format', () => {
  const file1 = getFixtures('f1.json');
  const file2 = getFixtures('f2.json');

  const expected = readFile('resultPlain.txt');

  expect(genDiff(file1, file2, 'plain')).toBe(expected);
});

test('Stylish format', () => {
  const file1 = getFixtures('f1.json');
  const file2 = getFixtures('f2.json');

  const expected = readFile('resultStylish.txt');

  expect(genDiff(file1, file2, 'stylish')).toBe(expected);
});
