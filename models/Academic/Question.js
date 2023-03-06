const { Schema, model } = require("mongoose");

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: [true, "Please Enter Your Question."],
    },
    options: [
      {
        type: String,
        required: [true, "Please Enter Your Options."],
      },
    ],
    isMultipleChoice: {
      type: Boolean,
      default: false,
    },
    answer: {
      type: String,
      required: [true, "Please Enter Your Answer."],
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Please Enter Your Teacher."],
    },
  },
  { timestamps: true }
);

module.exports = model("Question", questionSchema);