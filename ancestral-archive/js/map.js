const locations = [
  { id: 1, title: "Central marketplace", year: "c. 1978", type: "photo", lat: 23.8103, lng: 90.4125, desc: "The original wooden bazaar with the old banyan tree at the north entrance." },
  { id: 2, title: "The wooden bridge", year: "c. 1982", type: "audio", lat: 23.8150, lng: 90.4200, desc: "Elder Amena recalls the sounds of the bridge before it was rebuilt in 1985." },
  { id: 3, title: "Lower paddy fields", year: "1988", type: "video", lat: 23.8050, lng: 90.4050, desc: "Footage of the flooding season that reshaped the village boundary." },
  { id: 4, title: "Old school building", year: "c. 1965", type: "photo", lat: 23.8200, lng: 90.4080, desc: "First photograph of the newly constructed school, with the original headmaster." },
  { id: 5, title: "Tea stall by the banyan", year: "c. 1975", type: "audio", lat: 23.8090, lng: 90.4160, desc: "Abdul Karim remembers his grandfather's stall and the stories told there." },
  { id: 6, title: "Harvest festival ground", year: "1990", type: "video", lat: 23.8170, lng: 90.4230, desc: "Community gathering for the annual harvest, last recorded on 8mm film." }
];

const typeColors = {
  photo: "#8B6B47",
  audio: "#4a7a9b",
  video: "#5a8a4a"
};

const typeIcons = {
  photo: "&#128247;",
  audio: "&#127911;",
  video: "&#127909;"
};

const map = L.map('map', {
  center: [23.8103, 90.4125],
  zoom: 14,
  zoomControl: true
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function createMarkerIcon(type) {
  return L.divIcon({
    className: '',
    html: '<div style="width:20px;height:20px;border-radius:50%;background:' + typeColors[type] + ';border:2.5px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.25);"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -14]
  });
}

let activeMarkers = [];

function renderMarkers(activeTypes) {
  activeMarkers.forEach(m => map.removeLayer(m));
  activeMarkers = [];

  const listEl = document.getElementById('location-list');
  listEl.innerHTML = '';

  const filtered = locations.filter(loc => activeTypes.includes(loc.type));

  if (filtered.length === 0) {
    listEl.innerHTML = '<p class="sidebar-hint">No locations match the selected filters.</p>';
    return;
  }

  filtered.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng], { icon: createMarkerIcon(loc.type) });

    const popupContent = '<div class="map-popup">'
      + '<div class="map-popup-thumb">' + typeIcons[loc.type] + '</div>'
      + '<p class="map-popup-title">' + loc.title + '</p>'
      + '<p class="map-popup-meta">' + loc.year + ' &middot; ' + loc.type.charAt(0).toUpperCase() + loc.type.slice(1) + '</p>'
      + '<p style="font-size:12px;color:#6b5a48;line-height:1.55;margin-bottom:8px;">' + loc.desc + '</p>'
      + '<a href="#" class="map-popup-link">View full record &rarr;</a>'
      + '</div>';

    marker.bindPopup(popupContent, { maxWidth: 240 });
    marker.addTo(map);
    activeMarkers.push(marker);

    const card = document.createElement('div');
    card.className = 'location-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.innerHTML = '<p class="location-card-title">' + loc.title + '</p>'
      + '<p class="location-card-meta">' + loc.year + ' &middot; ' + loc.type + '</p>';

    card.addEventListener('click', () => {
      map.setView([loc.lat, loc.lng], 15);
      marker.openPopup();
    });

    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        card.click();
      }
    });

    listEl.appendChild(card);
  });
}

const checkboxes = document.querySelectorAll('.filter-check');

function getActiveTypes() {
  return Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
}

checkboxes.forEach(cb => {
  cb.addEventListener('change', () => renderMarkers(getActiveTypes()));
});

renderMarkers(getActiveTypes());
