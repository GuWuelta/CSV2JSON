"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var directory = "./input";
var directoryFiles = (0, fs_1.readdirSync)(directory, "utf-8");
var filePath;
var file;
function checkDirectory(directory) {
    var directoryExists = (0, fs_1.existsSync)(directory);
    try {
        if (!directoryExists) {
            throw new Error("Directory does not exist");
        }
        return directoryExists;
    }
    catch (error) {
        throw error;
    }
}
function checkFile(file) {
    var fileExists = (0, fs_1.existsSync)(file);
    try {
        if (!fileExists) {
            throw new Error("File does not exist");
        }
        return fileExists;
    }
    catch (error) {
        throw error;
    }
}
function checkFileExtension(file) {
    var fileIsCsv = (0, path_1.extname)(file) === ".csv";
    try {
        if (!fileIsCsv) {
            throw new Error("File is not a CSV");
        }
        return fileIsCsv;
    }
    catch (error) {
        throw error;
    }
}
function readFile(filePath) {
    var csvBuffer = (0, fs_1.readFileSync)(filePath);
    var csv = csvBuffer.toString();
    return csv;
}
function formatFileToJSON(csv) {
    var lines = csv.split("\n");
    var headers = lines[0].split(",");
    var data = lines
        .slice(1)
        .filter(Boolean)
        .map(function (line) { return line.split(","); });
    var json = data.reduce(function (acc, row) {
        var jsonObj = row.reduce(function (acc, cur, idx) {
            acc[headers[idx]] = cur;
            return acc;
        }, {});
        return __spreadArray(__spreadArray([], acc, true), [jsonObj], false);
    }, []);
    return json;
}
function writeJsonFile(json) {
    (0, fs_1.writeFileSync)("./output/".concat(file.replace(".csv", ""), ".json"), JSON.stringify(json, null, 2));
}
function run() {
    var directoryExists = checkDirectory(directory);
    var fileExists = checkFile("".concat(directory, "/").concat(file));
    var isCsvFile = checkFileExtension(file);
    if (directoryExists && fileExists && isCsvFile) {
        var csv = readFile(filePath);
        var json = formatFileToJSON(csv);
        writeJsonFile(json);
    }
}
function convertAllFiles() {
    directoryFiles.forEach(function (item) {
        file = item;
        filePath = directory + "/" + file;
        run();
    });
}
convertAllFiles();
