//@ts-ignore
var mongoose = require("mongoose");
//@ts-ignore
var Schema = mongoose.Schema;
mongoose.model("Attachments", new Schema({
    objectId: String,
    name: String,
    path: String,
}));
//# sourceMappingURL=Attachments.js.map