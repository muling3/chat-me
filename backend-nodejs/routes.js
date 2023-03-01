const { AddUser, LoginUser, FetchAllUsers } = require("./handlers")

const router = require("express").Router()

router.post("/auth/login", LoginUser)
router.post("/auth/register", AddUser)
router.get("/users", FetchAllUsers)

module.exports = router