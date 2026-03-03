// Initialize map
var map = L.map('map').setView([35.1983, -111.6513], 13);

// Basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


// -------------------
// SAMPLE POINTS
// Replace with your CSV logic
// -------------------

var pointsData = [
  { name: "Location A", lat: 35.20, lng: -111.64 },
  { name: "Location B", lat: 35.19, lng: -111.66 },
  { name: "Location C", lat: 35.21, lng: -111.65 }
];

pointsData.forEach(function(p) {
  L.marker([p.lat, p.lng])
    .bindPopup("<strong>" + p.name + "</strong>")
    .addTo(map);
});


// -------------------
// BOOTSTRAP LEGEND CONTROL
// -------------------

var LegendControl = L.Control.extend({
  options: { position: 'topright' },

  onAdd: function () {

    var div = L.DomUtil.create('div');
    div.className = "legend-card";

    div.innerHTML = `
      <div class="card shadow">
        <div class="card-header d-flex justify-content-between align-items-center">
          Locations
          <button class="btn btn-sm btn-link d-md-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#legendBody"
                  aria-expanded="false">
            ☰
          </button>
        </div>
        <div id="legendBody" class="collapse show">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Location A</li>
            <li class="list-group-item">Location B</li>
            <li class="list-group-item">Location C</li>
          </ul>
        </div>
      </div>
    `;

    // Prevent map drag when touching legend
    L.DomEvent.disableClickPropagation(div);

    return div;
  }
});

map.addControl(new LegendControl());


// -------------------
// AUTO-COLLAPSE ON MOBILE LOAD
// -------------------

if (window.innerWidth <= 768) {
  document.addEventListener("DOMContentLoaded", function () {
    var legendBody = document.getElementById("legendBody");
    if (legendBody) {
      var bsCollapse = new bootstrap.Collapse(legendBody, {
        toggle: false
      });
      bsCollapse.hide();
    }
  });
}
