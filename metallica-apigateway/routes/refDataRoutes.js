const express = require("express");
const router = express.Router();
const RefData = require("../controllers/refDataController");

const { authenticate } = require("../middleware/authenticate");

router.get("/commodities", authenticate, RefData.getCommodities);
router.get("/locations", authenticate, RefData.getLocations);
router.get("/counterparties", authenticate, RefData.getCounterparties);


module.exports = router;
