var prefixurl = "https://cdn.jsdelivr.net/npm/openseadragon@2.3/build/openseadragon/images/";
var tilesources = "./img/duomo.dzi"
var viewer1 = OpenSeadragon({
  id: "drawing",
  prefixUrl: prefixurl,
  tileSources: tilesources
});
