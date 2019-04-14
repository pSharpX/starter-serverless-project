const express = require("express");
// import Ctrlrs from "./controllers";
const {
    get,
    getAll,
    getByUuid,
    search,
    create,
    remove,
    update
} = require("./controllers/employee.controller");

const router = express.Router();

// router.get("/:id", get);
router.get(/^\/(\d+)$/, get);
router.get("/", getAll);
router.get("/search", search);
router.get(/^\/uuid\/([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i, getByUuid);
router.post("/", create);
router.put(/^\/(\d+)$/, update);
router.delete(/^\/(\d+)$/, remove);

module.exports = router;