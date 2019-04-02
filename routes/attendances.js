const express = require("express");
// import Ctrlrs from "./controllers";
const {
    get,
    getAll,
    search,
    create,
    remove,
    removeLast,
    update
} = require("./controllers/attendance.controller");

const router = express.Router();

// router.get("/:id", get);
router.get(/^\/(\d+)$/, get);
router.get("/", getAll);
router.get("/search", search);
router.post("/", create);
router.put(/^\/(\d+)$/, update);
router.delete(/^\/(\d+)$/, remove);
router.delete("/undo", removeLast);

module.exports = router;