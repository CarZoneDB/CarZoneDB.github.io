const carList = document.getElementById("carList");

let carsData = [];

// ===== PACK LINKS =====
const packLinks = {
  "vip": "https://www.roblox.com/game-pass/984631403/VIP",
  "starter pack": "https://www.roblox.com/game-pass/984407482/Starter-Pack",
  "hyper pack": "https://www.roblox.com/game-pass/1260965456/Hyper-Pack",
  "track pack": "https://www.roblox.com/game-pass/1105690213/Track-Pack"
};

// ===== NORMALIZE NEW JSON FORMAT =====
function normalizeCarData(apiData) {
  return Object.entries(apiData.data || {})
    .map(([key, car]) => {

      if (!car || typeof car !== "object" || Array.isArray(car)) {
        return null;
      }

      return {
        carName: car.CarName || key,
        type: car.TYPE || "Unknown",
        bodyKits: car.BodyKits || false,
        icon: car.ICON || "",
        vmax: car.VMAX || 0,
        acc: car.ACC || 0,
        newCar: car.NEWCAR || false,
        shop: car.SHOP || false,
        power: car.POWER || 0,
        exp: car.EXP || 0,
        price: car.PRICE || 0,
        packName: car.PACKNAME || null,
        gamePassId: car.GAMEPASSID || null
      };
    })
    .filter(Boolean);
}

// ===== RENDER CARS =====
function renderCars(list) {

  if (!list.length) {
    carList.innerHTML = "<p>No cars match your criteria.</p>";
    return;
  }

  carList.innerHTML = list.map(car => {

    const packKey = car.packName?.toLowerCase().trim();
    const packLink = packLinks[packKey] || null;

    const safeId = (car.carName || "car")
      .replace(/[^a-z0-9]+/gi, "-")
      .toLowerCase();

    return `
<article class="car" id="car-${safeId}" tabindex="0">

  ${car.icon ? `
    <img 
      src="https://assetdelivery.roblox.com/v1/asset/?id=${car.icon.replace("rbxassetid://", "")}" 
      alt="${car.carName}" 
      class="car-image"
    >
  ` : ""}

  <h2>${car.carName}</h2>

  <div class="badges">
    ${car.newCar ? '<span class="badge new">NEW</span>' : ''}
    ${car.type === 'Limited' ? '<span class="badge limited">Limited</span>' : ''}
    ${car.bodyKits ? '<span class="badge">BodyKit</span>' : ''}
    ${car.gamePassId ? '<span class="badge gamepass">Gamepass</span>' : ''}

    ${
      packLink
        ? `<a href="${packLink}" target="_blank" class="badge pack">${car.packName} 🔗</a>`
        : (car.packName
            ? `<span class="badge pack">${car.packName}</span>`
            : '')
    }
  </div>

  <div class="car-details">
    <div><strong>Price:</strong> $${car.price.toLocaleString()}</div>
    <div><strong>Horse Power:</strong> ${car.power} HP</div>
    <div><strong>V-Max:</strong> ${car.vmax} MPH</div>
    <div><strong>Acceleration:</strong> 0-60 in ${car.acc} sec</div>
    <div><strong>EXP:</strong> ${car.exp}</div>
    <div><strong>Type:</strong> ${car.type}</div>
    <div><strong>In Shop:</strong> ${car.shop ? "Yes" : "No"}</div>
  </div>

</article>
`;
  }).join("");
}

// ===== FETCH CARS =====
fetch("https://raw.githubusercontent.com/CarZoneDB/CarZoneDB.github.io/refs/heads/main/assets/infojsons/cars.json")
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }
    return res.json();
  })
  .then(api => {
    carsData = normalizeCarData(api);

    renderCars(carsData);
  })
  .catch(err => {
    console.error("Failed to load cars:", err);

    carList.innerHTML = `
      <p style="color:red;">
        Failed to load cars data.
      </p>
    `;
  });
