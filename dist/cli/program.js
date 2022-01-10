"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const path_1 = require("path");
const process_1 = require("process");
const constants_1 = require("../lib/constants");
const init_1 = require("./cmd/init");
const prune_1 = require("./cmd/prune");
const program = new commander_1.Command();
program
    .name('modules-cleaner');
program
    .command('prune')
    .description('Prunes all unwanted files from all node_modules folder')
    .option('-c,--config [string]', 'Location of the config file', `./${constants_1.CONFIG_FILENAME}`)
    .option('-f,--force', 'Update the filesystem', false)
    .option('-cwd,--current-working-directory [string]', 'Set the current working directory of the command', (value) => (0, path_1.resolve)(value), (0, process_1.cwd)())
    .option('-v,--verbose', 'Show a list of affected files', false)
    .option('--stats', 'Show some stats in the console', false)
    .action(prune_1.pruneCmd);
program
    .command('init')
    .description('Creates a new config file in the current working directory with a list of default rules')
    .option('-f,--force', 'Overwrite existing config', false)
    .action(init_1.initCmd);
exports.default = program;
