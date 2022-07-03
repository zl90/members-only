const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  type: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  avatar: { type: String, default: "/images/default.png", required: true },
  stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
});

UserSchema.virtual("url").get(function () {
  return "/users/" + this._id;
});

module.exports = mongoose.model("User", UserSchema);
