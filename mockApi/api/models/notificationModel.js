var { Schema, model } = require("mongoose");

var NotificationsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  notification: {
    type: String,
    required: true,
  },
  message: String,
  notification_status: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = model("Notifications", NotificationsSchema);
