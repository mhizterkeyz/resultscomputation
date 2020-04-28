var { Schema, model } = require("mongoose");

var LecturersSchema = new Schema({
  personal_info: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    unique: true,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "institutional_groups",
    required: true,
  },
  courses_assigned: [
    {
      type: Schema.Types.ObjectId,
      ref: "courses",
    },
  ],
});

module.exports = model("lecturers", LecturersSchema);
