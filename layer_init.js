var prefixurl = "https://cdn.jsdelivr.net/npm/openseadragon@2.3/build/openseadragon/images/";
var tilesources = ["./img/duomo.dzi", "./img/duomo_bw.dzi"]
var viewer = OpenSeadragon({
  id: "first",
  prefixUrl: prefixurl,
  tileSources: tilesources
});
viewer.goToPage(0);
