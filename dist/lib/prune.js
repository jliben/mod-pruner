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
exports.prune = void 0;
const fs_1 = require("fs");
const { lstat, readdir, rmdir, unlink } = fs_1.promises;
const ignore_1 = __importDefault(require("ignore"));
const path_1 = require("path");
const find_module_directories_1 = require("./find-module-directories");
const get_directory_size_1 = require("./get-directory-size");
function prune(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const nodeModules = yield (0, find_module_directories_1.findModuleDirectories)(options.cwd);
        const ig = (0, ignore_1.default)({
            ignorecase: true,
        });
        const res = {
            prunedDiskSize: 0,
            prunedFiles: [],
            prunedFolders: [],
        };
        ig.add(options.patterns);
        const pruneJobs = nodeModules.map((folder) => pruneModules(folder, folder, ig, options.force));
        const pruneResults = yield Promise.all(pruneJobs);
        for (const pruneRes of pruneResults) {
            res.prunedDiskSize += pruneRes.prunedDiskSize;
            res.prunedFiles.push(...pruneRes.prunedFiles);
            res.prunedFolders.push(...pruneRes.prunedFolders);
        }
        return res;
    });
}
exports.prune = prune;
function pruneModules(folder, cwd, ignore, force) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = {
            prunedDiskSize: 0,
            prunedFiles: [],
            prunedFolders: [],
        };
        const dirItems = yield readdir(cwd);
        // count the removed items to check for empty directories after the loop
        let removeItems = 0;
        for (const item of dirItems) {
            const absPath = (0, path_1.join)(cwd, item);
            let relativPath = (0, path_1.relative)(folder, absPath);
            relativPath = relativPath.split(path_1.sep).join(path_1.posix.sep);
            const stats = yield lstat(absPath);
            const isDir = stats.isDirectory();
            // do not follow symbolic links
            if (isDir && stats.isSymbolicLink()) {
                continue;
            }
            // add trailing slash to detect if the folder is ignored https://www.npmjs.com/package/ignore#2-filenames-and-dirnames
            if (isDir) {
                relativPath += '/';
            }
            if (ignore.ignores(relativPath) === true) {
                res.prunedDiskSize += stats.size;
                if (isDir) {
                    // for directories
                    const { size, files } = yield (0, get_directory_size_1.getDirectorySize)(absPath);
                    res.prunedFiles.push(...files);
                    res.prunedDiskSize += size;
                    res.prunedFolders.push(absPath);
                    if (force === true) {
                        yield rmdir(absPath, { recursive: true });
                    }
                }
                else {
                    // for files
                    if (force === true) {
                        yield unlink(absPath);
                    }
                    res.prunedFiles.push(absPath);
                }
                removeItems++;
            }
            else {
                if (isDir) {
                    const subFolderPrune = yield pruneModules(folder, absPath, ignore, force);
                    res.prunedDiskSize += subFolderPrune.prunedDiskSize;
                    res.prunedFiles.push(...subFolderPrune.prunedFiles);
                    res.prunedFolders.push(...subFolderPrune.prunedFolders);
                }
            }
        }
        // remove empty folders or folders that are now empty
        if (dirItems.length === 0 || dirItems.length === removeItems) {
            res.prunedFolders.push(folder);
            if (force === true) {
                yield rmdir(cwd);
            }
        }
        return res;
    });
}
