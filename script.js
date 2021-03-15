$(document).ready(function () {
  $.ajax({
    url: "sismologiaDOM.php",
    type: "POST",
    data: {},
    success: function (data) {
        var terremoto = L.icon({
            iconUrl: 'terremoto.png',
        
            iconSize:     [30, 30], // size of the icon
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
      var mymap = L.map("mapa").setView([40.4167, -3.70325], 6);

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3VpbGxlbWE5OSIsImEiOiJja21hcm5weWoxdGVsMnJxdHMweXNqbmRkIn0.tqfM7CU7elnMc9yGmQ_f6g",
        {
          maxZoom: 18,
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
        }
      ).addTo(mymap);

      data.forEach(punto => {
          console.log(punto);
        var marker = L.marker([punto['lat'], punto['long']], {icon: terremoto}).addTo(mymap);
        marker.bindPopup("<b>" + punto['date'] + " - " + punto['time'] + "</b><br>" + "Magnitud: " + punto['magnitude'] + "<br>" + "Localizacion: " + punto['location']);
      });
    },
    error: function (err) {
      alert(err.statusText);
    },
  });
});
