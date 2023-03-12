const { Schema, model } = require("mongoose");

const yearGroupSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Year Group Name."],
    },
    description: {
      type: String,
      required: [true, "Please Enter Year Group Description."],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "Please Enter Year Group Creator."],
    },
    academicYear: {
      type: Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: [true, "Please Enter Year Group Academic Year."],
    },
  },
  { timestamps: true }
);

module.exports = model("YearGroup", yearGroupSchema);
