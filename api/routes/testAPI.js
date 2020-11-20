var express = require('express')
var router = express.Router();

router.get("/", function(req, res, next){
    res.send("API is working")
})

router.post('/', function(req, res) {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    res.send(req.body);
});

module.exports = router