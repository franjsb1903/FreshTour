const express = require('express');
const router = express.Router();
const path = require('path');

// getCondicions()
router.get('/condicions', (req, res) => {
    res.sendFile(path.join(__dirname, '../legal/condicions.html'));
});

module.exports = router;