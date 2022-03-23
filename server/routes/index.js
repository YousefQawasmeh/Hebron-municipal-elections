import Express from "express";
import {
  getVoters,
  createVoter,
  getSchools,
  getVotersBySchool,
  getCountBySchool,
  getCountBySchools,
  updateVoter,
  vote,
  getCount,
} from "../controlers/voters.js";
const router = Express.Router();

router.get("/voters", getVoters);
router.get("/schools", getSchools);
router.get("/schools/:school", getVotersBySchool);
router.get("/getCountBySchools", getCountBySchools);
router.get("/getCountBySchool", getCountBySchool);
router.put("/voter/:id", updateVoter);
router.post("/vote", vote);
router.get("/count", getCount);

// router.post("/voters", createVoter);
// router.get("/:id", getVoter);
// router.delete("/:id", deleteVoter);

export default router;
