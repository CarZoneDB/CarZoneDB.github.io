Promise.all([
  fetch('https://raw.githubusercontent.com/CarZoneDB/CarZoneDB.github.io/refs/heads/main/assets/infojsons/cars.json').then(res => res.json()),
  fetch('https://raw.githubusercontent.com/CarZoneDB/CarZoneDB.github.io/refs/heads/main/assets/infojsons/races.json').then(res => res.json())
])
.then(([carData, raceData]) => {

  const totalCars = Object.values(carData).filter(car => car.CarName).length;
  const totalRaces = Object.keys(raceData).filter(key => key !== 'updatedDate').length;

  const carUpdated = carData.updatedDate ? new Date(carData.updatedDate) : null;
  const raceUpdated = raceData.updatedDate ? new Date(raceData.updatedDate) : null;

  const format = date =>
    date
      ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
      : 'Unknown';

  const carDate = format(carUpdated);
  const raceDate = format(raceUpdated);

document.getElementById('carsStats').innerHTML = `
  <div class="stat-number">${totalCars.toLocaleString()}</div>
  <div class="stat-label">Cars</div>
  <div class="stat-updated">Last Updated:</div>
  <div class="stat-date">${carDate}</div>
`;

document.getElementById('racesStats').innerHTML = `
  <div class="stat-number">${totalRaces.toLocaleString()}</div>
  <div class="stat-label">Races</div>
  <div class="stat-updated">Last Updated:</div>
  <div class="stat-date">${raceDate}</div>
`;

})
.catch(err => {
  document.getElementById('carsStats').textContent = 'Failed to load stats.';
document.getElementById('racesStats').textContent = 'Failed to load stats.';
  console.error(err);
});
