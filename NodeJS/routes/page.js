const express = require('express');
const router = express.Router();
/**
 * redirect와 Render를 주의해서 사용해주세요!
 * 
 */

router.get('/',(req, res, next)=>{
    res.redirect('index');
});
router.get('/index',(req,res,next)=>{
    res.render('index',{text:"Hello Friends!"});
})

module.exports = router; 