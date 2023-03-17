const { Schema, model } = require("mongoose");

const programSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Program Name."],
    },
    description: {
      type: String,
      required: [true, "Please Enter Program Description."],
    },
    duration: {
      type: String,
      default: "4 Years",
      required: [true, "Please Enter Program Duration."],
    },
      code: {
          type: String,
          default: function () {
              return (
                  this.name
                      .split(" ")
                      .map(name => name[0])
                      .join("")
                      .toUpperCase() +
                  Math.floor(10 + Math.random() * 90) +
                  Math.floor(10 + Math.random() * 90)
              );
          },
      },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "Please Enter Program Creator."],
    },
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
        default: [],
      },
    ],
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        default: [],
      },
    ],
  },
  { timestamps: true }
);
module.exports = model("Program", programSchema);
