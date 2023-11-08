const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post(
  '/api/fileanalyse',
  upload.single('upfile'),
  function (req, res, next) {
    console.log(req.file);
    const file = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    };
    res.status(201).json(file);
  }
);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
