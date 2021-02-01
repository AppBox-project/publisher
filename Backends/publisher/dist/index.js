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
var Utils_1 = require("./appbox-backend-tools/Utils");
var shell = require("shelljs");
var TurndownService = require("turndown");
var turndownService = new TurndownService({ headingStyle: "atx" });
var fs = require("fs");
// Get arguments
var _a = appbox_backend_tools_1.extractArguments([
    { key: "connectionString", required: true },
    { key: "siteId", required: true },
]), siteId = _a.siteId, connectionString = _a.connectionString;
// Create a database connection
var database = new Database_1.default(connectionString);
database.isReady.then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var site, design, dst, tmp, data, pages, newPages, siteData, setting;
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
                return [4 /*yield*/, shell.exec("git clone " + design.data.repository + " " + tmp)];
            case 3:
                // -->Step 1: Get the source
                // Clone
                _a.sent();
                // Install
                return [4 /*yield*/, shell.exec("yarn install --cwd " + tmp)];
            case 4:
                // Install
                _a.sent();
                data = {};
                //@ts-ignore
                return [4 /*yield*/, Object.keys(site.data.data).reduce(function (prev, curr) { return __awaiter(void 0, void 0, void 0, function () {
                        var newData, objects;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prev];
                                case 1:
                                    _a.sent();
                                    newData = [];
                                    return [4 /*yield*/, database.getObjects({
                                            objectId: site.data.data[curr].model,
                                            "data.site": "" + site._id,
                                        })];
                                case 2:
                                    objects = _a.sent();
                                    //@ts-ignore
                                    return [4 /*yield*/, objects.reduce(function (prevObject, currObject) {
                                            newData.push({
                                                slug: Utils_1.slugify(currObject.data.name),
                                                image: currObject.data.image,
                                                content: "---\ntitle: " + currObject.data.name + "\nmodel: " + curr + "\nhero: hero.jpg\n" + (currObject.data.data
                                                    ? "data:\n" + (currObject.data.data || "").split(",").map(function (data) { return "- " + data; })
                                                    : "") + "\n---\n" + turndownService.turndown(currObject.data.content),
                                            });
                                        }, objects[0])];
                                case 3:
                                    //@ts-ignore
                                    _a.sent();
                                    data[curr] = newData;
                                    return [2 /*return*/, curr];
                            }
                        });
                    }); }, Object.keys(site.data.data)[0])];
            case 5:
                //@ts-ignore
                _a.sent();
                return [4 /*yield*/, database.getObjects({
                        objectId: "publisher-pages",
                        "data.site": "" + site._id,
                    })];
            case 6:
                pages = _a.sent();
                newPages = [];
                //@ts-ignore
                return [4 /*yield*/, pages.reduce(function (prevPage, currPage) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prevPage];
                                case 1:
                                    _a.sent();
                                    newPages.push({
                                        slug: currPage.data.slug,
                                        image: currPage.data.image,
                                        content: "---\ntitle: " + currPage.data.name + "\nmodel: pages\nhero: hero.jpg\n" + (currPage.data.data
                                            ? "data:\n" + (currPage.data.data || "").split(",").map(function (data) { return "- " + data; })
                                            : "") + "\n---\n" + turndownService.turndown(currPage.data.content),
                                    });
                                    return [2 /*return*/, currPage];
                            }
                        });
                    }); }, pages[0])];
            case 7:
                //@ts-ignore
                _a.sent();
                data["pages"] = newPages;
                siteData = {
                    title: site.data.name,
                    menus: site.data.menus,
                    footer: { active: true, text: site.data.configuration["footer-text"] },
                };
                fs.writeFileSync(tmp + "/siteData.json", JSON.stringify(siteData));
                // Write out data
                return [4 /*yield*/, shell.exec("mkdir " + tmp + "/src/data")];
            case 8:
                // Write out data
                _a.sent();
                //@ts-ignore
                return [4 /*yield*/, Object.keys(data).reduce(function (prevObjKey, currObjKey) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prevObjKey];
                                case 1:
                                    _a.sent();
                                    // Make folder
                                    return [4 /*yield*/, shell.exec("mkdir " + tmp + "/src/data/" + currObjKey)];
                                case 2:
                                    // Make folder
                                    _a.sent();
                                    return [4 /*yield*/, data[currObjKey].reduce(function (prevObject, currObject) { return __awaiter(void 0, void 0, void 0, function () {
                                            var imageLoc;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, prevObject];
                                                    case 1:
                                                        _a.sent();
                                                        return [4 /*yield*/, shell.exec("mkdir " + tmp + "/src/data/" + currObjKey + "/" + currObject.slug)];
                                                    case 2:
                                                        _a.sent();
                                                        imageLoc = currObject.image.split("/");
                                                        return [4 /*yield*/, shell.exec("cp /AppBox/Files/Objects/" + imageLoc[2] + "/" + imageLoc[3] + "/" + imageLoc[4] + " " + tmp + "/src/data/" + currObjKey + "/" + currObject.slug + "/hero.jpg")];
                                                    case 3:
                                                        _a.sent();
                                                        fs.writeFileSync(tmp + "/src/data/" + currObjKey + "/" + currObject.slug + "/index.md", currObject.content);
                                                        return [2 /*return*/, currObject];
                                                }
                                            });
                                        }); }, data[currObjKey][0])];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/, currObjKey];
                            }
                        });
                    }); }, Object.keys(data)[0])];
            case 9:
                //@ts-ignore
                _a.sent();
                // --> Step 3: compile website.
                return [4 /*yield*/, shell.exec("yarn --cwd " + tmp + " gatsby clean")];
            case 10:
                // --> Step 3: compile website.
                _a.sent();
                return [4 /*yield*/, shell.exec("yarn --cwd " + tmp + " gatsby build")];
            case 11:
                _a.sent();
                console.log("Site compiled!");
                return [4 /*yield*/, shell.exec("mkdir -p " + dst)];
            case 12:
                _a.sent();
                return [4 /*yield*/, shell.exec("cp -r " + tmp + "/public/* " + dst)];
            case 13:
                _a.sent();
                return [4 /*yield*/, database.getSystemSettingByKey("hosted_apps")];
            case 14:
                setting = _a.sent();
                if (!setting) return [3 /*break*/, 15];
                return [3 /*break*/, 17];
            case 15: 
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
            case 16:
                // Create setting
                _a.sent();
                _a.label = 17;
            case 17:
                // Done!
                console.log("Site registered with App-Server.");
                process.exit(0);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=index.js.map