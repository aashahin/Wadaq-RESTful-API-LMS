const {Schema, model} = require('mongoose');

const classLevelSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter Class Level Name."],
    },
    description: {
        type: String,
        required: [true, "Please Enter Class Level Description."],
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: [true, "Please Enter Class Level Creator."],
    },
    subjects: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subject",
        }
    ],
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "Student",
        }
    ],
    teachers: [
        {
            type: Schema.Types.ObjectId,
            ref: "Teacher",
        }
    ]
},{timestamps:true});

module.exports = model("ClassLevel", classLevelSchema);