const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const teacherSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name."],
    },
    teacherId: {
      type: String,
      default: function () {
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
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "teacher",
    },
    dateEmployed: {
      type: Date,
      default: Date.now(),
    },
    subject: String,
    classLevel: String,
    program: String,
    academicYear: String,
    academicTerm: String,
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
    },
      accountVerificationCode: String,
      accountVerificationCodeExpire: Date,
      passwordChangedAt: Date,
      passwordResetCode: String,
      passwordResetExpire: Date,
  },
  { timestamps: true }
);

teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = model("Teacher", teacherSchema);
