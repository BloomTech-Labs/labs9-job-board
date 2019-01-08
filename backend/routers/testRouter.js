const express = require('express');

const router = express.Router();

// [GET] /test
// testing for server running
router.get('/', (req, res) => {
    res.status(200).json({ bigBrother: 'is always watching' });
});

module.exports = router;