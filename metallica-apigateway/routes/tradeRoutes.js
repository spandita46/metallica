const express = require("express");
const router = express.Router();
const Trade = require("../controllers/tradeController");

const { authenticate } = require("../middleware/authenticate");

router.post("/trades/search", authenticate, Trade.searchTrades);
router.post("/trades", authenticate, Trade.createTrade);
router.get("/trades", authenticate, Trade.listTrades);
router.get("/trades/:tradeId", authenticate, Trade.fetchTrade);
router.put("/trades/:tradeId", authenticate, Trade.updateTrade);
router.delete("/trades/:tradeId", authenticate, Trade.deleteTrade);


module.exports = router;
