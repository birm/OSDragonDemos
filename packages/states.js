/* Use URLs to hold encoded string info with viewer state */
class OsdStateManager {
    constructor(viewer, options) {
        this.animateWaitTime = options.animateWaitTime || 300
        // global object reference used when the "this" object is referring to the window
        window.annotationHandler = this
    }

    getState() {
        /* Get the current state, encode it (base64) and put it in the url */
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
        /* Set the viewer state from the url */
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
    register() {
        /* Register the state manager to the viewer */
        var self = this;
        console.log("begun");

        function addGetState() {
            console.log(self.getState)
            viewer.addHandler("zoom", self.getState);
            viewer.addHandler("pan", self.getState);
        }
        setTimeout(self.setState, 100);
        setTimeout(addGetState, 500);
    }
}
