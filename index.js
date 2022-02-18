const evtSource = new EventSource('http://localhost:3000/count');

const countElm = document.querySelector('.event-count');
const button = document.querySelector('.increment');

button.addEventListener('click', () => {
  fetch('http://localhost:3000/increment', {
    method: 'POST'
  });
});

evtSource.addEventListener('count', (event) => {
  console.log('count event listener');
  const data = JSON.parse(event.data);
  countElm.innerHTML = data.eventCount || 0;
});