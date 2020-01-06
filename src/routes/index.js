import express from 'express';
import yml from 'js-yaml'
var router = express.Router();
import { parse } from "../js/commitParser";
import { fetch } from "../js/commitFetcher";
const fs = require('fs');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/commits', function (req, res) {
  let config = {
    regexp: /\s+([\w]*)?(?:\s*,\s*)?([\w]*)\s*\|/
  };
  try {
    config = yml.safeLoad(fs.readFileSync('config.yml', 'utf8'))
  } catch (err) {
    console.log(err.message);
    console.log("Using default regexp - |story#|Pair1/Pair2| message");
  }
  const commits = fetch(req.body.weeks);
  const parsedCommitData = parse(commits, new RegExp(config.regexp, 'gi'));
  res.send(parsedCommitData);
});

export default router;
