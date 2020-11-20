var express = require('express');
var router = express.Router();
const reddit = require('./reddit');
const fs = require('fs');
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
const spawn = require('child_process').spawn;

/* GET home page. */
router.get('/', function (req, res, next) {
  //res.render('index', { title: 'Express' });
  console.log("Before Reading File")

  fs.readFile('/Users/raymondlee/Desktop/RedditScraper/api/routes/subreddits.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString().replace(/\r\n/g,'\n').split('\n'));
    res.json(data.toString().replace(/\r\n/g,'\n').split('\n'));
  });


  //console.log()
  //res.json('Get Recieved')
});

router.post('/', async (req, res) => {
  console.log(req.body.searchTerm)

  await reddit.initialize(req.body.searchTerm);

  let results = await reddit.getResults(300)

  const data = JSON.stringify(results);
  let filteredResults = [];

  for (i = 0; i < results.length; i++) {
    var title = JSON.stringify(results[i]["title"]).toLowerCase();
    var titleTokenized = tokenizer.tokenize(title)
    var questionWords = ["how", "what", "when", "where", "why", "whom", "help", "please", "you", "your", "recommendation"]
    for (word in titleTokenized) {
      for (num in questionWords) {
        if (titleTokenized[word] == questionWords[num]) {
          console.log("Added Result" + JSON.stringify(results[i]))
          filteredResults.push(results[i])

        }
      }
    }

  }

  //debugger;
  //res.render('index', { title: 'Express' });
  console.log("Return Data")
  res.json(filteredResults)
  res.end()
});



module.exports = router;
