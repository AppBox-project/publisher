//@ts-ignore
var mongoose = require("mongoose");
//@ts-ignore
var Schema = mongoose.Schema;
mongoose.model("Objects", new Schema({
    objectId: String,
    data: Schema.Types.Mixed,
}));
//# sourceMappingURL=Objects.js.map