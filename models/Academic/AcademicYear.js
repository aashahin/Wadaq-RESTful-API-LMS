const { Schema, model } = require("mongoose");

const academicYearSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Academic Year Name."],
    },
    description: {
      type: String,
      required: [true, "Please Enter Academic Year Description."],
    },
    startDate: {
      type: Date,
      required: [true, "Please Enter Academic Year Start Date."],
    },
    endDate: {
      type: Date,
      required: [true, "Please Enter Academic Year End Date."],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "Please Enter Academic Year Creator."],
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("AcademicYear", academicYearSchema);
