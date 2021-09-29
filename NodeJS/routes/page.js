const express = require('express');
const router = express.Router();

router.get('/index',async(req, res, next)=>{
    res.render('/');

});

module.exports = router; 