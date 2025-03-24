import { parseFile } from '../src/parseFile.js';
import buildDiff from '../src/buildDiff.js';

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

describe('buildDiff', () => {
  test('returns diff for flat objects', () => {
    const obj1 = { key1: 'value1', key2: 'value2' };
    const obj2 = { key2: 'value2', key3: 'value3' };

    const expected = [
      { key: 'key1', status: 'removed', oldValue: 'value1' },
      { key: 'key2', status: 'unchanged', newValue: 'value2' },
      { key: 'key3', status: 'added', newValue: 'value3' },
    ];

    expect(buildDiff(obj1, obj2)).toEqual(expected);
  });

  test('handles identical objects', () => {
    const obj1 = { key1: 'value1', key2: 'value2' };
    const obj2 = { key1: 'value1', key2: 'value2' };

    const expected = [
      { key: 'key1', status: 'unchanged', newValue: 'value1' },
      { key: 'key2', status: 'unchanged', newValue: 'value2' },
    ];
    expect(buildDiff(obj1, obj2)).toEqual(expected);
  });

  test('handles empty objects', () => {
    const obj1 = {};
    const obj2 = {};

    const expected = [];

    expect(buildDiff(obj1, obj2)).toEqual(expected);
  });

  test('handles added keys', () => {
    const obj1 = {};
    const obj2 = { key1: 'value1' };

    const expected = [
      { key: 'key1', status: 'added', newValue: 'value1' },
    ];

    expect(buildDiff(obj1, obj2)).toEqual(expected);
  });

  test('handles removed keys', () => {
    const obj1 = { key1: 'value1' };
    const obj2 = {};

    const expected = [
      { key: 'key1', status: 'removed', oldValue: 'value1' },
    ];

    expect(buildDiff(obj1, obj2)).toEqual(expected);
  });

  test('handles changed values', () => {
    const obj1 = { key1: 'value1' };
    const obj2 = { key1: 'value2' };

    const expected = [
      { key: 'key1', status: 'changed', oldValue: 'value1', newValue: 'value2' },
    ];

    expect(buildDiff(obj1, obj2)).toEqual(expected);
  });

  test('handle nested objects', () => {
    const obj1 = {
      name: 'Veta', pets: [
        { type: 'cat', name: 'Lilo' },
        { type: 'dog', name: 'Rex' },
      ],
    };
    const obj2 = {
      name: 'Veta', pets: [
        { type: 'rat', name: 'Lilo' },
        { type: 'cat' },
      ],
    };

    const expected = [
      { key: 'name', newValue: 'Veta', status: 'unchanged' },
      { pets: [
        [{ key: 'type', oldValue: 'cat', newValue: 'rat', status: 'changed' },
          { key: 'name', newValue: 'Lilo', status: 'unchanged' }],
        [{ key: 'type', oldValue: 'dog', newValue: 'cat', status: 'changed' },
          { key: 'name', oldValue: 'Rex', status: 'removed' }],

      ],
      },
    ];
    expect(buildDiff(obj1, obj2)).toEqual(expected);
  });
});
