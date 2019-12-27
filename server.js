const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ssestream = require('ssestream');

const PORT = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/events', (req, res) => {
  let sse = new ssestream();
  sse.pipe(res);

  let count = 0;

  sse.write({event: 'count', data: {count}});
  const interval = setInterval(() => {
    count++;
    console.log('writing data', count);
    sse.write({event: 'count', data: {count}});
  }, 2000);

  req.on('close', () => {
    console.log('connection closed');
    clearInterval(interval);
  });
});

app.listen(PORT, () => console.log(`Server started @ ${PORT}`));