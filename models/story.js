const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  created: { type: String, required: true },
});

module.exports = mongoose.model("Story", StorySchema);
