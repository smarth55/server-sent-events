const evtSource = new EventSource('http://localhost:3000/events');

evtSource.addEventListener('count', (event) => {
  console.log('count event listener');
  console.log(JSON.parse(event.data));
});