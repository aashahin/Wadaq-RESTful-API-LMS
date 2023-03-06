const { Schema, model } = require("mongoose");

const examSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Exam Name."],
    },
    description: {
      type: String,
      required: [true, "Please Enter Your Exam Description."],
    },
    examId: {
      type: String,
      default: () => {
        return (
          "EX" +
          this.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 1000)
        );
      },
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Please Enter Your Subject."],
    },
    program: {
      type: Schema.Types.ObjectId,
      ref: "Program",
      required: [true, "Please Enter Your Program."],
    },
    classLevel: {
      type: Schema.Types.ObjectId,
      ref: "ClassLevel",
      required: [true, "Please Enter Your Class Level."],
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: [true, "Please Enter Your Questions."],
      },
    ],
    passMark: {
      type: Number,
      default: 50,
      required: [true, "Please Enter Your Pass Mark."],
    },
    totalMark: {
      type: Number,
      default: 100,
      required: [true, "Please Enter Your Total Mark."],
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
    duration: {
      type: Number,
      default: 60,
    },
    examDate: {
      type: Date,
      required: [true, "Please Enter Your Exam Date."],
    },
    examTime: {
      type: Number,
      required: [true, "Please Enter Your Exam Time."],
    },
    examType: {
      type: String,
      enum: ["Quiz", "midterm", "final"],
      default: "Quiz",
    },
    examStatus: {
      type: String,
      enum: ["pending", "ongoing", "completed"],
      default: "pending",
    },
    examResult: {
      type: String,
      enum: ["pass", "fail"],
      default: "pass",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Please Enter Your Teacher."],
    },
  },
  { timestamps: true }
);

module.exports = model("Exam", examSchema);