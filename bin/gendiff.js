#!/usr/bin/env node

import getDiff from '../index.js';
import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-v, --version', 'output the current version')
  .helpOption('-h, --help', 'output usage information')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    const diff = getDiff(filepath1, filepath2, options.format);
    console.log(diff);
  });

program.parse();
