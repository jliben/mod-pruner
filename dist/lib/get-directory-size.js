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
exports.getDirectorySize = void 0;
const fs_1 = require("fs");
const { readdir, stat } = fs_1.promises;
const path_1 = require("path");
function getDirectorySize(directory) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = {
            files: [],
            size: 0,
        };
        const dirItems = yield readdir(directory);
        for (const item of dirItems) {
            const path = (0, path_1.join)(directory, item);
            const stats = yield stat(path);
            res.size += stats.size;
            if (stats.isDirectory()) {
                const subdirectoryRes = yield getDirectorySize(path);
                res.size += subdirectoryRes.size;
                res.files.push(...subdirectoryRes.files);
            }
            else {
                res.files.push(path);
            }
        }
        return res;
    });
}
exports.getDirectorySize = getDirectorySize;
