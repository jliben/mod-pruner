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
exports.findModuleDirectories = void 0;
const fs_1 = require("fs");
const { readdir, stat } = fs_1.promises;
const path_1 = require("path");
function findModuleDirectories(folder, folderName = 'node_modules') {
    return __awaiter(this, void 0, void 0, function* () {
        const nodeModules = [];
        for (const item of yield readdir(folder)) {
            const fullPath = (0, path_1.join)(folder, item);
            if (item === folderName) {
                nodeModules.push(fullPath);
                continue;
            }
            const stats = yield stat(fullPath);
            if (stats.isDirectory()) {
                const nodeModuleFromChild = yield findModuleDirectories(fullPath);
                nodeModules.push(...nodeModuleFromChild);
            }
        }
        return nodeModules;
    });
}
exports.findModuleDirectories = findModuleDirectories;
