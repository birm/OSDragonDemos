var magnifies = ""; // global magnification identifier

var prefixurl = "https://cdn.jsdelivr.net/npm/openseadragon@2.3/build/openseadragon/images/";
var tilesources = "./img/duomo.dzi"
var viewer = OpenSeadragon({
    id: "mag",
    prefixUrl: prefixurl,
    tileSources: tilesources
});

start_magnifier = function() {
    // short hash of time to get magnifies client id, avoid collision
    // THIS IS NOT A SECURE HASH FUNCTION, just to avoid collision
    var dt = new Date().toString()
    var hash = 0;
    for (i = 0; i < dt.length; i++) {
        char = dt.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
        hash = Math.abs(hash);
    }
    magnifies = hash.toString().substring(0, 3);
    // make the url with this magnifies id
    var previous = location.search.substring(1);
    var p_var = previous ? JSON.parse('{"' + previous.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function(key, value) {
            return key === "" ? value : decodeURIComponent(value)
        }) : {}
    p_var['magnifies'] = magnifies;
    params = Object.keys(p_var).map((i) => i + '=' + p_var[i]).join('&');
    // OPEN THIS LINK, set window size default
    var new_url = [location.protocol, '//', location.host, location.pathname].join('');
    var to_open = new_url + "?" + params
    console.log(to_open);
    window.open(to_open, "magnifier", "height=200,width=200");
    // change cursor to crosshair
    document.body.style.cursor = "crosshair";
    // update the storage point when CURSOR moves
    var tracker = new OpenSeadragon.MouseTracker({
        element: viewer.container,
        moveHandler: function(e) {
            var pt = viewer.viewport.pointFromPixel(e.position);
            var point_str = pt.x + "," + pt.y;
            window.localStorage.setItem(magnifies, point_str);
        }
    });
    tracker.setTracking(true);

}

// is this a magnified image? if so, what do I look for in local storage
function mag_setup(){
  var matches = /magnifies=([^&#=]*)/.exec(window.location.search);
  matches = matches || [];
  if (matches.length > 1) {
      var lookup = matches[1];
      // this is a zoomed window, so zoom
      self.viewer.viewport.zoomTo(viewer.viewport.getMaxZoom());
      // hide the help text
      document.getElementById("head").style.display = 'none';
      // listen for changes to storage and move x and y when localstorage[match]
      window.onstorage = function(e) {
          var pt = window.localStorage.getItem(lookup);
          var coords = pt.split(",");
          if (coords.length >= 1) {
              console.log(coords);
              var osd_point = new OpenSeadragon.Point(Number(coords[0]), Number(coords[1]));
              viewer.viewport.panTo(osd_point, true);
          }
      }
  } else {
    start_magnifier();
  }
}

window.setTimeout(mag_setup,500);
