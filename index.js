import buildDiff from './src/buildDiff.js';
import { readFile, parseFile } from './src/parseFile.js';
import formatDiffData from './src/formatters/index.js';

const genDiff = (filename1, filename2, format) => {
  const file1 = readFile(filename1);
  const file2 = readFile(filename2);

  const data1 = parseFile(file1);
  const data2 = parseFile(file2);

  const diffData = buildDiff(data1, data2);
  const formattedData = formatDiffData(diffData, format);
  return formattedData;
};

export default genDiff;
