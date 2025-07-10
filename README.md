# gendiff

[![Node CI](https://github.com/vetavv/gendiff/actions/workflows/ci.yml/badge.svg)](https://github.com/vetavv/gendiff/actions/workflows/ci.yml)

Command-line utility that compares two configuration files and shows the difference in a readable format.
**Supported input formats**: JSON, YAML.

## Install
```bash
make install
```

## Uninstall
```bash
make uninstall
```

## Signature
```
gendiff [options] <filepath1> <filepath2>
```

|Option | Description |
|--------|:--------|
|`-f`, `--format` `<type>` | Output format: *stylish* (default), *plain*, or *json* |
|`-V`, `--version` | Show version |
|`-h`, `--help` | Show help |

## Usage Examples
### JSON (default)
```bash
gendiff __fixtures__/file1.json __fixtures__/file2.json
```
![Example with json format option](./assets/default.gif)
### Stylish
```bash
gendiff __fixtures__/file1.json __fixtures__/file2.json -f stylish
```
![Example with stylish format option](./assets/stylish.gif)
### Plain
```bash
gendiff __fixtures__/file1.json __fixtures__/file2.json -f plain
```
![Example with plain format option](./assets/plain.gif)

## Tests
```bash
make test
```

