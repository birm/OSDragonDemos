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
  tileSources: tilesources
});
var viewer3 = OpenSeadragon({
  id: "third",
  prefixUrl: prefixurl,
  tileSources: tilesources
});
var viewer4 = OpenSeadragon({
  id: "fourth",
  prefixUrl: prefixurl,
  tileSources: tilesources
});
