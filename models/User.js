const { Schema, model } = require("mongoose");
const User = model("User", UserSchema);

module.exports = User;