"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./AppPermissions");
require("./Archive");
require("./Attachments");
require("./Models");
require("./Objects");
require("./UserSettings");
require("./SystemSettings");
var mongoose = require("mongoose");
var DatabaseModel = /** @class */ (function () {
    function DatabaseModel(db) {
        this.models = {
            model: mongoose.model("Models"),
            stream: db.collection("models").watch(),
            listeners: {},
        };
        this.objects = {
            model: mongoose.model("Objects"),
            stream: db.collection("objects").watch(),
            listeners: {},
        };
        this.attachments = {
            model: mongoose.model("Attachments"),
            stream: db.collection("attachments").watch(),
            listeners: {},
        };
        this.systemsettings = {
            model: mongoose.model("SystemSettings"),
        };
    }
    return DatabaseModel;
}());
exports.default = DatabaseModel;
//# sourceMappingURL=index.js.map