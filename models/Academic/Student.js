const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name."],
    },
    studentId: {
      type: String,
      default: function () {
        return (
          "ST" +
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
      default: "student",
    },
    dateEnrolled: {
      type: Date,
      default: Date.now(),
    },
    dataGraduated: {
      type: String,
    },
    isGraduated: {
      type: Boolean,
      default: false,
    },
    isWithdrawn: {
      type: Boolean,
      default: false,
    },
    classLevels: [
      {
        type: Schema.Types.ObjectId,
        ref: "ClassLevel",
      },
    ],
    currentClassLevel: {
      type: Schema.Types.ObjectId,
      default: function () {
        return this.classLevels[this.classLevels.length - 1];
      },
    },
    programs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Program",
        required: [true, "Please Enter Your Program."],
      },
    ],
    currentProgram: {
      type: Schema.Types.ObjectId,
      default: function () {
        return this.programs[this.programs.length - 1];
      },
    },
    academicYears: [
      {
        type: Schema.Types.ObjectId,
        ref: "AcademicYear",
        required: [true, "Please Enter Your Academic Year."],
      },
    ],
    examResults: [
      {
        type: Schema.Types.ObjectId,
        ref: "ExamResult",
      },
    ],
    isPromotedOne: {
      type: Boolean,
      default: false,
    },
    isPromotedTwo: {
      type: Boolean,
      default: false,
    },
    isPromotedThree: {
      type: Boolean,
      default: false,
    },
    isPromotedFour: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    achievements: [
      {
        type: Schema.Types.ObjectId,
        ref: "Achievement",
      },
    ],
  },
  { timestamps: true }
);

studentSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});
module.exports = model("Student", studentSchema);
