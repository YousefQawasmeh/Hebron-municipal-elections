import mongoose from "mongoose";

const voterSchema = mongoose.Schema({
  no: Number,
  school: String,
  voterID: String,
  firstName: String,
  secondName: String,
  thirdName: String,
  familyName: String,
  isVoted: Boolean,
  voteCount: Number,
  votedBy: String,
  boxID: String,
  updatedAt: Date,
  fullName: String,
});

const Voter = mongoose.model("voters", voterSchema);
export default Voter;
