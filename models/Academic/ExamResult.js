const { Schema, model } = require("mongoose");

const examResultSchema = new Schema(
  {
    exam: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
      required: [true, "Please Enter Your Exam."],
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Please Enter Your Student."],
    },
    score: {
      type: Number,
      required: [true, "Please Enter Your Score."],
    },
    status: {
      type: String,
      enum: ["Pass", "Fail"],
      default: "Fail",
    },
    remarks: {
      type: String,
      required: [true, "Please Enter Your Remarks."],
    },
    classLevel: {
      type: Schema.Types.ObjectId,
      ref: "ClassLevel",
    },
    academicYear: {
      type: Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: [true, "Please Enter Your Academic Year."],
    },
    academicTerm: {
      type: Schema.Types.ObjectId,
      ref: "AcademicTerm",
      required: [true, "Please Enter Your Academic Term."],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("ExamResult", examResultSchema);
