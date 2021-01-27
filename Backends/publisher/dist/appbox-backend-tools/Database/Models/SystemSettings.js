//@ts-ignore
var mongoose = require("mongoose");
//@ts-ignore
var Schema = mongoose.Schema;
mongoose.model("SystemSettings", new Schema({
    key: String,
    value: mongoose.Mixed,
}));
//# sourceMappingURL=SystemSettings.js.map