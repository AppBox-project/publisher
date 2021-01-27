"use strict";
// Todo: these functions will be extracted to a seperate NPM component for easier re-use.
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractArguments = void 0;
// Extracts arguments and creates a database connection
var extractArguments = function (input) {
    var output = {};
    input.map(function (i, index) {
        output[i.key] = process.argv[2 + index];
        if (i.required && !output[i.key]) {
            console.log(i.error || "Error: Argument " + i.key + " is missing, but is required. ");
            process.exit(1);
        }
    });
    return output;
};
exports.extractArguments = extractArguments;
//# sourceMappingURL=index.js.map