import Voter from "../models/voter.js";

// export const getVoters = async (req, res) => {
//     // const voters = await Voter.find({});
//     try {

//         // const voter = {
//         //     no: 55,

//         // };
//         // const result = await Voter.create(voter);
//         // res.status(201).json(result);
//         const voters = await Voter.find({}).limit(10);

//         res.status(200).json(voters);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//         // res.json(error);
//     }
//     // res.json("voters");
// }

export const createVoter = async (req, res) => {
  // const result = await voter.save();
  try {
    return res.send("0000000000000");
    // const voter = new Voter(req.body);
    // const result = await Voter.create(voter);
    // res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // res.json("voter");
};

export const getVoter = async (req, res) => {
  const voter = await Voter.findById(req.params.id);
  res.status(200).json(voter);
};

export const updateVoter = async (req, res) => {
  const voter = await Voter.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(voter);
};

export const deleteVoter = async (req, res) => {
  await Voter.findByIdAndRemove(req.params.id);
  res.status(200).json({ message: "Deleted" });
};

export const getVoterByNo = async (req, res) => {
  const voter = await Voter.findOne({ no: req.params.no });
  res.status(200).json(voter);
};

export const getVoterByName = async (req, res) => {
  const voter = await Voter.findOne({ name: req.params.name });
  res.status(200).json(voter);
};

export const getVotersBySchool = async (req, res) => {
  const voters = await Voter.find({ school: req.params.school });
  res.status(200).json(voters);
};
export const getVotersBySchoolByVote = async (req, res) => {
  const voters = await Voter.find({
    school: req.params.school,
    vote: req.params.vote,
  });
  res.status(200).json(voters);
};

export const getSchools = async (req, res) => {
  const schools = await Voter.distinct("school");
  res.status(200).json(schools);
};
export const vote = async (req, res) => {
  const voter = await Voter.findByIdAndUpdate(req.body._id, {
    isVoted: true,
    $inc: {
      voteCount: 1,
    },
    votedBy: req.body.votedBy,
    updatedAt: new Date(),
  });
  res.status(200).json(voter);
};

// export const getCount = async (req, res) => {
//     const count = await Voter.countDocuments({});
//     res.status(200).json(count);
// }
export const getCountBySchool = async (req, res) => {
  console.log(req.params);
  const count = await Voter.countDocuments({ school: req.params.school });
  res.status(200).json(count);
};
export const getCountBySchools = async (req, res) => {
  const count = await Voter.aggregate({
    $group: {
      _id: {
        school: "$school",
      },
      count: {
        $sum: 1,
      },
    },
  });
  res.status(200).json(count);
};

export const getVotersByVotedBy = async (req, res) => {
  const count = await Voter.aggregate({
    $group: {
      _id: {
        votedBy: "$votedBy",
      },
      count: {
        $sum: 1,
      },
    },
  });
  res.status(200).json(count);
};

export const getCountByVote = async (req, res) => {
  const count = await Voter.countDocuments({ vote: req.params.vote });
  res.status(200).json(count);
};

export const getCount = async (req, res) => {
  const count = await Voter.countDocuments({ ...JSON.parse(req.query.query) });
  res.status(200).json(count);
};

export const getVoters = async (req, res) => {
  // const searchInfo = queryString.parse(req.query);
  // JSON.parse(req.query);
  // console.log(searchInfo);
  console.log(JSON.parse(req.query.query).isVoted);
  const count = await Voter.find({ ...JSON.parse(req.query.query) });
  res.status(200).json(count);
};
