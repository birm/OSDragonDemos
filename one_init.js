var prefixurl = "https://cdn.jsdelivr.net/npm/openseadragon@2.3/build/openseadragon/images/";
var tilesources = "./img/duomo.dzi"
var viewer = OpenSeadragon({
  id: "first",
  prefixUrl: prefixurl,
  tileSources: tilesources
});
