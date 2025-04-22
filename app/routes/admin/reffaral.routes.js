const express = require('express');
const router = express.Router();


const referralBonusController = require('../../controller/admin/referal.controller');

router.get('/', referralBonusController.getBonus); // GET /referralbonus
router.post('/update/:id', referralBonusController.updateBonus); // POST /referralbonus/update/:id

module.exports = router;