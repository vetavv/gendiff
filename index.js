import buildDiff from './src/buildDiff.js';
import { readFile, getFileExtention, parseFile } from './src/parseFile.js';
import formatDiffData from './src/formatters/index.js';

const getDiff = (filename1, filename2, format) => {
  const file1 = readFile(filename1);
  const file2 = readFile(filename2);

  const extention1 = getFileExtention(filename1);
  const extention2 = getFileExtention(filename2);

  const data1 = parseFile(file1, extention1);
  const data2 = parseFile(file2, extention2);

  const diffData = buildDiff(data1, data2);
  const formattedData = formatDiffData(diffData, format);
  return formattedData;
};

export default getDiff;
