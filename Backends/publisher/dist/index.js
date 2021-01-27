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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var appbox_backend_tools_1 = require("./appbox-backend-tools");
var Database_1 = require("./appbox-backend-tools/Database");
var shell = require("shelljs");
// Get arguments
var _a = appbox_backend_tools_1.extractArguments([
    { key: "connectionString", required: true },
    { key: "siteId", required: true },
]), siteId = _a.siteId, connectionString = _a.connectionString;
// Create a database connection
var database = new Database_1.default(connectionString);
database.isReady.then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var site, design, dst, tmp, setting;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database.getObjectById(siteId)];
            case 1:
                site = (_a.sent());
                return [4 /*yield*/, database.getObjectById(site.data.design)];
            case 2:
                design = (_a.sent());
                dst = "/AppBox/Files/Apps/Sites/" + site.data.key;
                tmp = "/AppBox/System/Temp/Sites/" + site.data.key;
                // -->Step 1: Get the source
                // Clone
                shell.exec("git clone " + design.data.repository + " " + tmp);
                // Install
                shell.exec("yarn install --cwd " + tmp);
                // --> Step 2: Insert data
                // --> Step 3: compile website.
                shell.exec("yarn --cwd " + tmp + " gatsby build");
                console.log("Site succesfully built!");
                shell.exec("mkdir -p " + dst);
                shell.exec("cp -r " + tmp + "/public/* " + dst);
                return [4 /*yield*/, database.getSystemSettingByKey("hosted_apps")];
            case 3:
                setting = _a.sent();
                if (!setting) return [3 /*break*/, 4];
                return [3 /*break*/, 6];
            case 4: 
            // Create setting
            return [4 /*yield*/, database.createSystemSetting({
                    key: "hosted_apps",
                    value: [
                        {
                            url: site.data.url,
                            app: "/AppBox/Files/Apps/Sites/" + site.data.key,
                        },
                    ],
                })];
            case 5:
                // Create setting
                _a.sent();
                _a.label = 6;
            case 6:
                // Done!
                process.exit(0);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=index.js.map