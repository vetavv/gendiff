import YAML from 'yaml';

const parseFile = (file, extension) => {
  if (extension === '.json') {
    return JSON.parse(file);
  }
  if (extension === '.yml' || extension === '.yaml') {
    return YAML.parse(file);
  }

  throw new Error(`Unsupported format: ${extension}`);
};

export default parseFile;
