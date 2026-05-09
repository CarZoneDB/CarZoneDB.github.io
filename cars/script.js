const carList = document.getElementById("carList");
let carsData = [];

// ===== RENDER CARS =====
function renderCars(list) {
  carList.innerHTML = list.length
    ? list.map(car => {

        const packLinks = {
          'vip': 'https://www.roblox.com/game-pass/984631403/VIP',
          'starter pack': 'https://www.roblox.com/game-pass/984407482/Starter-Pack',
          'hyper pack': 'https://www.roblox.com/game-pass/1260965456/Hyper-Pack',
          'track pack': 'https://www.roblox.com/game-pass/1105690213/Track-Pack'
        };

        const packKey = car.packName?.toLowerCase().trim();
        const packLink = packLinks[packKey] || null;

        const safeId = (car.carName || "car")
          .replace(/[^a-z0-9]+/gi, "-")
          .toLowerCase();

        return `
<article class="car" id="car-${safeId}" tabindex="0">
  <h2>${car.carName}</h2>

  <div class="badges">
    ${car.newCar ? '<span class="badge new">NEW</span>' : ''}
    ${car.type === 'Limited' ? '<span class="badge limited">Limited</span>' : ''}
    ${car.bodyKits ? '<span class="badge">BodyKit</span>' : ''}
    ${car.gamePassId ? '<span class="badge gamepass">Gamepass</span>' : ''}

    ${packLink
      ? `<a href="${packLink}" target="_blank" class="badge pack">${car.packName} 🔗</a>`
      : (car.packName ? `<span class="badge pack">${car.packName}</span>` : '')
    }
  </div>

  <div class="car-details">
    <div><strong>Price:</strong> $${car.price?.toLocaleString() || 'N/A'}</div>
    <div><strong>Horse Power:</strong> ${car.power || 'N/A'} HP</div>
    <div><strong>V-Max:</strong> ${car.vmax || 'N/A'} MPH</div>
    <div><strong>Acceleration:</strong> 0-60 in ${car.acc || 'N/A'} sec</div>
    <div><strong>EXP:</strong> ${car.exp || 'N/A'}</div>
    <div><strong>Type:</strong> ${car.type || 'N/A'}</div>
    <div><strong>In Shop:</strong> ${car.shop ? 'Yes' : 'No'}</div>
  </div>
</article>
`;
      }).join('')
    : '<p>No cars match your criteria.</p>';
}

// ===== FETCH CARS (API STYLE FIX) =====
fetch("https://raw.githubusercontent.com/CarZoneDB/CarZoneDB.github.io/refs/heads/main/assets/infojsons/cars.json")
  .then(res => res.json())
  .then(api => {
    carsData = Object.values(api.data || {}).filter(c => c.carName);
    renderCars(carsData);
  });
