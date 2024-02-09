const {
  AddUser,
  LoginUser,
  FetchAllUsers,
  UpdateStatus,
} = require("./handlers");

const router = require("express").Router();

router.post("/auth/login", LoginUser);
router.post("/auth/register", AddUser);
router.post("/users/status", UpdateStatus);
router.get("/users", FetchAllUsers);

module.exports = router;
