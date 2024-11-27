const _center = { lat: 34.66767774804736, lng: 135.43076145097373 }; // Your center point

const BOUNDS = {
  north: _center.lat + 0.004,
  south: _center.lat - 0.004,
  east: _center.lng + 0.006,
  west: _center.lng - 0.005,
};

function initMap() {
  // Update MAP_ID with custom map ID
  map = new google.maps.Map(document.getElementById('map'), {
    center: _center,
    restriction: {
      latLngBounds: BOUNDS,
      strictBounds: false,
    },
    zoom: 18,
    mapTypeId: "satellite",
    mapId: 'MAP_ID',
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    minZoom: 18, // Minimum zoom level
    maxZoom: 20, // Maximum zoom level
  });

  // Markers data: Name, Latitude, Longitude, Image URL, Scaled Size (width, height)
  const markers = [
    ["Yoshi's House", 34.66669734177897, 135.4309054875526, 'yoshi_house.svg', 38, 31, 'Yoshi'], // Added 'Yoshi' tag
    ['You Are Here', 34.66767112713121, 135.4297887322531, 'pointer.svg', 30, 47.8, 'YouAreHere'], 
    ['Ghost House', 34.66832715150856, 135.43292762674864, 'ghosthouse.svg', 40, 48, 'GhostHouse'],
    ['Castle', 34.66775608022106, 135.43139547897843, 'castle.svg', 40, 53, 'Castle'],
    ['Warp Pipe', 34.66739738878135, 135.43225049775214, 'pipe.svg', 38, 42.5, 'WarpPipe'],
    ['Star World', 34.667959023359266, 135.42866400953733, 'star.svg', 38, 38, 'StarWorld'],
    ['Donut Plains', 34.66830355359945, 135.4320565322381, 'hill_with_eyes.svg', 50, 60.7, 'DonutPlains1'],
    ['Donut Plains', 34.66829411443392, 135.43231361996433, 'hill_with_eyes.svg', 50, 60.7, 'DonutPlains2'],
    ['Donut Plains', 34.6683781779677, 135.43217016043528, 'hill_with_eyes.svg', 50, 60.7, 'DonutPlains3'],
  ];

  // Loop over markers array to create markers on the map
  for (let i = 0; i < markers.length; i++) {
    const currMarker = markers[i];

    const marker = new google.maps.Marker({
      position: { lat: currMarker[1], lng: currMarker[2] },
      map,
      title: currMarker[0],
      icon: {
        url: currMarker[3],
        scaledSize: new google.maps.Size(currMarker[4], currMarker[5]),
      },
      animation: google.maps.Animation.DROP,
    });

    const infowindow = new google.maps.InfoWindow({
      content: currMarker[0],
    });

    // Add click event listener for the marker
    marker.addListener('click', () => {
      // Open info window
      infowindow.open(map, marker);
      
      // Update the URL hash when the marker is clicked
      const tag = currMarker[6]; // This is the tag (e.g., 'Yoshi')
      var hashValue = window.location.hash = 'hide-components-tags=' + tag;
      
      // Send the tag to the parent window to modify its header (3DVista)
      window.parent.postMessage({ action: 'update-header', hash: hashValue }, '*');
      
    });
  }
}
