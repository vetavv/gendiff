#!/usr/bin/env node

import { Command } from "commander";
const program = new Command();

program
	.name("gendiff")
	.description("Compares two configuration files and shows a difference.")
	.version("1.0.0", "-v, --version", "output the current version")
	.helpOption("-h, --help", "output usage information")
	.argument("<filepath1> <filepath2>")
	.option("-f, --format <type>", "output format");

program.parse();
