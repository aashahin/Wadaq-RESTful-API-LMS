const { Schema, model } = require("mongoose");

const teacherSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name."],
    },
    teacherId: {
      type: String,
      default: () => {
        return (
          "TE" +
          this.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 1000)
        );
      },
    },
    avatar: {
      type: String,
      default:
        "https://pub-ebc3292441104a07b54e254192a1b246.r2.dev/bubble-gum-avatar-icon.png",
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email."],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password."],
    },
    role: {
      type: String,
      default: "teacher",
    },
    dateEmployed: {
      type: Date,
      default: Date.now(),
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Please Enter Your Subject."],
    },
    classLevel: {
      type: Schema.Types.ObjectId,
      ref: "ClassLevel",
      required: [true, "Please Enter Your Class Level."],
    },
    program: {
      type: Schema.Types.ObjectId,
      ref: "Program",
      required: [true, "Please Enter Your Program."],
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
    exams: [
      {
        type: Schema.Types.ObjectId,
        ref: "Exam",
      },
    ],
    isWithdrawn: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    applicationStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "rejected"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "Please Enter Your Admin."],
    },
  },
  { timestamps: true }
);

module.exports = model("Teacher", teacherSchema);
