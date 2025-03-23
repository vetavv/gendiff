import parseFile from '../src/parseFile.js';

describe('parseFile', () => {
  test('parses JSON', () => {
    const jsonString = '{"key": "value"}';
    const expected = { key: 'value' };

    expect(parseFile(jsonString, '.json')).toEqual(expected);
  });

  test('parses YAML', () => {
    const yamlString = 'key: value';
    const expected = { key: 'value' };

    expect(parseFile(yamlString, '.yml')).toEqual(expected);
  });

  test('parses YAML with .yaml extension', () => {
    const yamlString = 'key: value';
    const expected = { key: 'value' };

    expect(parseFile(yamlString, '.yaml')).toEqual(expected);
  });

  test('throws an error for unsupported formats', () => {
    expect(() => parseFile('some data', '.txt')).toThrow('Unsupported format: .txt');
  });

  test('throws an error for invalid JSON', () => {
    const invalidJson = '{ key: value }';
    expect(() => parseFile(invalidJson, '.json')).toThrow();
  });

  test('throws an error for invalid YAML', () => {
    const invalidYaml = ': invalid : : :';
    expect(() => parseFile(invalidYaml, '.yml')).toThrow();
  });
});
