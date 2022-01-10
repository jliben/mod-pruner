"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pruneCmd = void 0;
const ora_1 = __importDefault(require("ora"));
const path_1 = require("path");
const pretty_bytes_1 = __importDefault(require("pretty-bytes"));
const table_1 = require("table");
const load_ignore_patterns_1 = require("../../lib/load-ignore-patterns");
const prune_1 = require("../../lib/prune");
function pruneCmd(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const configFile = (0, path_1.resolve)(options.config);
        const patterns = yield (0, load_ignore_patterns_1.loadIgnorePatterns)(configFile);
        const spinner = (0, ora_1.default)('Cleaning node_modules ...').start();
        const { prunedFiles, prunedDiskSize, prunedFolders } = yield (0, prune_1.prune)({
            cwd: options.currentWorkingDirectory,
            patterns,
            force: options.force,
        });
        spinner.stop();
        //  print file list of deleted items
        if (options.verbose) {
            for (const file of prunedFiles) {
                console.info(file);
            }
        }
        //  print statistic
        if (options.stats) {
            const nrFormat = new Intl.NumberFormat();
            console.log((0, table_1.table)([
                ['Files', nrFormat.format(prunedFiles.length)],
                ['Folders', nrFormat.format(prunedFolders.length)],
                ['Total size', (0, pretty_bytes_1.default)(prunedDiskSize)]
            ], {
                border: (0, table_1.getBorderCharacters)('norc'),
            }));
        }
        if (!options.force) {
            console.log('To permanently delete the files rerun the command with the "--force" flag');
        }
        else {
            console.log('Modules cleaned');
        }
    });
}
exports.pruneCmd = pruneCmd;
