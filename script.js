
async function getData(url) {
    let result;
  try {
    const response = await fetch(url, {
  headers: {
    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sZW5nMDU1QGdtYWlsLmNvbSIsImlkIjoxNTg5LCJuYW1lIjpudWxsLCJzdXJuYW1lIjpudWxsLCJpYXQiOjE2NzE2MDMyMTMsImV4cCI6MTE2NzE2MDMyMTMsImlzcyI6ImdvbGVtaW8iLCJqdGkiOiI0YjE1NzU4ZS0yZGM1LTQxNzQtOWZhMS0zNTBmYjRhNTBjMTUifQ.HWF4mKWGmvJQuQTq8WQoBY7Wk-jbN3Vml3ZRyKMy_6g'
  }
});
     result =  await response.json();
   // console.log(result)
  } catch (error) {
    console.error(error);
  }
  return result;
}



async function getTimeMain(station,direction){
  const params = new URLSearchParams();
  params.set('names', station);
  params.set('includeMetroTrains','true')
  const url = `https://api.golemio.cz/v2/pid/departureboards?${params}`;
  console.log(url);
  let data = await getData(url);
  let departures = data.departures.filter(departure =>{return departure.trip.headsign === direction && departure.route.type === 1});
  let date = new Date(departures[0].departure_timestamp.scheduled);
  console.log("Next train going at "+date.getHours().toString().padStart(2, '0')+":"+date.getMinutes().toString().padStart(2, '0')+":"+date.getSeconds().toString().padStart(2, '0'));  
  

}
getTimeMain("Luka","Černý Most");
