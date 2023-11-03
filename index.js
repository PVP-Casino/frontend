const express = require('express');
var compression = require('compression');
var cors = require('cors');
const PORT = process.env.PORT || 443;
var https = require('https');
var fs = require('fs');
const app = express();
require('dotenv').config();

app.use(compression());
app.use(express.static(__dirname + '/build'));
app.use('/static', express.static(__dirname + '/build'));

var indexPage = fs.readFileSync(__dirname + '/build/index.html', 'utf8');

app.get('*', function (req, res) {
    return res.send(indexPage);
});

// https
//   .createServer(
//     {
//       key: fs.readFileSync('privkey.pem'),
//       cert: fs.readFileSync('fullchain.pem'),
//     },
//     app
//   )
//   .listen(PORT, function () {
//     console.log(`Server listening on ${PORT}`);
//   });

app.listen(80, function () {
    console.log(`Server listening on ${80}`);
});
