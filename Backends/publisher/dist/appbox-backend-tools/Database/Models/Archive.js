//@ts-ignore
var mongoose = require("mongoose");
//@ts-ignore
var Schema = mongoose.Schema;
mongoose.model("Archive", new Schema({
    key: String,
    objectId: String,
    data: Schema.Types.Mixed,
}));
//# sourceMappingURL=Archive.js.map