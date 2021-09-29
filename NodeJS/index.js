const express = require('express');
const app = express();
const pageRouter = require("./routes/page");

app.set('port', process.env.PORT || 8080)



app.use('/',pageRouter);




app.get('/',(req,res)=>{
    res.send('Hello Friends this is CloneCoidng!')
})
app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'-Port is Ready!')
})