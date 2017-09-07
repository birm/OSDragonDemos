class OsdStateManager {
    constructor(viewer, options) {
        this.animateWaitTime = options.animateWaitTime || 300
        // global object reference used when the "this" object is referring to the window
        window.annotationHandler = this
    }

    getState() {
        var pt = viewer.viewport.getCenter(true);
        var xi = pt.x;
        var yi = pt.y;
        var zi = viewer.viewport.getZoom(true);
        var l = encodeURIComponent(btoa(JSON.stringify({
            "x": xi,
            "y": yi,
            "z": zi
        })));
        window.history.pushState("hi", "Encoded", "?state=" + l);
    }

    setState() {
        //TODO some error handling
        // handle improper encoding gracefully
        // handle missing field in json gracefully
        var matches = /state=([^&#=]*)/.exec(window.location.search);
        matches = matches || [];
        if (matches.length >= 2) {
            var xi = matches[1];
            var l = atob(decodeURIComponent(xi));
            var ll = JSON.parse(l);
            if ("x" in ll && "y" in ll) {
                var pt = new OpenSeadragon.Point(ll.x, ll.y);
                viewer.viewport.zoomTo(ll.z, pt);
                viewer.viewport.panTo(pt, true);
            }
        }
    }
    register(){
      viewer.addHandler("zoom", StateMan.getState);
      viewer.addHandler("pan", StateMan.getState);
    }
}
var prefixurl = "https://cdn.jsdelivr.net/npm/openseadragon@2.3/build/openseadragon/images/";
var tilesources = "./img/duomo.dzi"
var viewer = OpenSeadragon({
    id: "first",
    prefixUrl: prefixurl,
    tileSources: tilesources
});

var StateMan = new OsdStateManager(viewer, {});
setTimeout(StateMan.setState, 100);
setTimeout(StateMan.register, 500);
