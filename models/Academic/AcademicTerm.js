const { Schema, model } = require("mongoose");

const academicTermSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Academic Term Name."],
    },
    description: {
      type: String,
      required: [true, "Please Enter Academic Term Description."],
    },
    startDate: {
      type: Date,
      required: [true, "Please Enter Academic Term Start Date."],
    },
    endDate: {
      type: Date,
      required: [true, "Please Enter Academic Term End Date."],
    },
    duration: {
      type: String,
      default: "3 Months",
      required: [true, "Please Enter Academic Term Duration."],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "Please Enter Academic Term Creator."],
    },
  },
  { timestamps: true }
);

module.exports = model("AcademicTerm", academicTermSchema);
