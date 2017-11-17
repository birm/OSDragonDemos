var prefixurl = "https://cdn.jsdelivr.net/npm/openseadragon@2.3/build/openseadragon/images/";
var tilesources = "./img/duomo.dzi"
var viewer1 = OpenSeadragon({
    id: "first",
    prefixUrl: prefixurl,
    tileSources: tilesources
});
var viewer2 = OpenSeadragon({
    id: "second",
    prefixUrl: prefixurl,
    tileSources: tilesources,
    showNavigationControl: false
});


// add a filter to the second image
viewer1.addHandler('tile-loaded', function(event) {
    var canvas = document.createElement('canvas');
    canvas.width = event.image.width;
    canvas.height = event.image.height;
    var renderedContext = canvas.getContext('2d');
    renderedContext.drawImage(event.image, 0, 0);
    renderedContext.fillStyle = '#f00';
    renderedContext.globalAlpha = 0.2;
    renderedContext.fillRect(0, 0, canvas.width, canvas.height);
    event.tile.context2D = renderedContext;
});
