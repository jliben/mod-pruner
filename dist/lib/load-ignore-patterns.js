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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadIgnorePatterns = void 0;
const chalk_1 = require("chalk");
const fs_1 = require("fs");
const { readFile } = fs_1.promises;
const path_1 = require("path");
const constants_1 = require("./constants");
function loadIgnorePatterns(file) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileContent = yield readFile(file, 'utf-8').catch(() => null);
        // load the default globs if no config was found
        if (!fileContent) {
            // Show a warning
            console.warn(`Found no "${(0, path_1.basename)(file)}" file in the current working directory. Using the default patterns now.`);
            console.warn((0, chalk_1.yellow)('The default patterns may change over time and it is recommended to provide your own patterns file. You can create a patterns file with "npx mod-pruner init"'));
            fileContent = constants_1.DEFAULT_GLOBS.trim();
        }
        return fileContent
            .split('\n')
            .map(pattern => pattern.replace(/#.*/, '')) // remove comments
            .filter(pattern => !!pattern); // remove empty lines
    });
}
exports.loadIgnorePatterns = loadIgnorePatterns;
