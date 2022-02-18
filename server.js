const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: SseStream } = require('ssestream');

const PORT = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let eventCount = 0;
let subs = [];

app.post('/increment', (req, res) => {
  eventCount++;
  subs.forEach(sse => {
    sse.write({event: 'count', data: {eventCount}});
  });
});

app.get('/count', (req, res) => {
  let sse = new SseStream();
  sse.pipe(res);
  subs = [...subs, sse];
  console.log(`new sub. current length is ${subs.length}`);
  sse.write({event: 'count', data: {eventCount}});

  req.on('close', () => {
    console.log('connection closed');
    sse.unpipe(res);
    subs = subs.filter(sub => sub !== sse);
    console.log(`remaining subs length is ${subs.length}`);
  });
});

app.listen(PORT, () => console.log(`Server started @ ${PORT}`));