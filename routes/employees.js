const express = require("express");
// import Ctrlrs from "./controllers";
const {get, getAll, create, remove, update} = require("./controllers/employee.controller");

const router = express.Router();

router.get("/:id", get);
router.get("/", getAll);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
