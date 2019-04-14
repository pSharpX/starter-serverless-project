const express = require("express");
// import Ctrlrs from "./controllers";
const {
    getByEmployee,
    getAllByEmployee,
    generateReportByEmployee,
    createByEmployee,
    removeLastByEmployee,
} = require("./controllers/attendance.controller");

const router = express.Router({
    mergeParams: true
});

router.get(/^\/(\d+)$/, getByEmployee);
router.get("/:from/:to/report", generateReportByEmployee);
router.get("/:from/:to", getAllByEmployee);
router.get("/", getAllByEmployee);
router.post("/", createByEmployee);
router.delete("/undo", removeLastByEmployee);

module.exports = router;