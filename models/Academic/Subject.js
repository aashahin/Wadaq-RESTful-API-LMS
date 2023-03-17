const { Schema, model } = require("mongoose");

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Subject Name."],
    },
    description: {
      type: String,
      required: [true, "Please Enter Subject Description."],
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
    academicTerm: {
      type: Schema.Types.ObjectId,
      ref: "AcademicTerm",
      required: [true, "Please Enter Subject Academic Term."],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "Please Enter Subject Creator."],
    },
    duration: {
      type: String,
      default: "3 Months",
      required: [true, "Please Enter Subject Duration."],
    },
  },
  { timestamps: true }
);

module.exports = model("Subject", subjectSchema);
