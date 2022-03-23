import mongoose from "mongoose";

const personSchema = mongoose.Schema({
    no: Number,
    school: String,
    voterID: String,
    firstName: String,
    secondName: String,
    thirdName: String,
    familyName: String,
    isVoted: Boolean,
    voteCount: Number,
    // name: String,
    // number: String,
    // done: Boolean,
    // id: Number,
    // doneCount: {
    //     type: Number,
    //     default: 0
    // },
    // createdAt: {
    //     type: Date,
    //     default: new Date()
    // },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

const Person = mongoose.model("Person", personSchema);
export default Person;