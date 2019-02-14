const express = require("express");
// import Ctrlrs from "./controllers";
const {get, getAll, search, create, remove, update} = require("./controllers/employee.controller");

const router = express.Router();

// router.get("/:id", get);
router.get(/^(\d+)$/, get);
router.get("/", getAll);
router.get("/search", search);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
