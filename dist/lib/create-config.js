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
exports.createConfig = void 0;
const fs_1 = require("fs");
const { stat, writeFile } = fs_1.promises;
const path_1 = require("path");
const process_1 = require("process");
const constants_1 = require("./constants");
function createConfig(path = (0, process_1.cwd)(), overwrite = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const file = (0, path_1.join)(path, constants_1.CONFIG_FILENAME);
        const existingFileStats = yield stat(file).catch(() => null);
        // do not write the file if there is already one
        if (existingFileStats && overwrite === false) {
            throw Error('Found a existing config. Do you want to replace it? Try the "--foce" flag');
        }
        yield writeFile(file, constants_1.DEFAULT_GLOBS.trim());
        return { file };
    });
}
exports.createConfig = createConfig;
