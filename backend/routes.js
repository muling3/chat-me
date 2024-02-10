const {
  AddUser,
  LoginUser,
  FetchAllUsers,
  UpdateStatus,
} = require("./handlers");

const router = require("express").Router();

// for testing dynamic endpoints without registering the method
router.use("/sam", (req, res, next) => {
  // res.status(500).json({ msg: "See i am working" });
  console.log("Samp is acting as a middleware here inside router mehn!!");
  next();
});

router.use("/sam", (req, res, next) => {
  // res.status(500).json({ msg: "See i am working" });
  console.log("Samp is acting as a middleware here inside router mehn!!");
  res.status(200).send("<h1>MWANA MAMA</h1>");
});

router.all("/hey", (req, res) => {
  res.status(200).send("<h1>UMEKWISHA POTEA</h1>");
});

// testing how to do optional path variables
router.get("/params/:param?", (req, res) => {
  console.log("PARAM VAL", req.params);
  res.status(200).send("<h1>UMEKWISHA POTEA</h1>");
});

router.post("/auth/login", LoginUser);
router.post("/auth/register", AddUser);
router.post("/users/status", UpdateStatus);
router.get("/users", FetchAllUsers);

// for testing dynamic endpoints without registering the method ::=> Middleware way
router.use("/test", (req, res) => {
  res.status(200).json({ req: req.method, headers: req.headers });
});

module.exports = router;
