/**  **/
function sw_magnifier(viewer, modal_viewer) {
    /**
     * Creates a callback which starts single window magnifitation code
     * Include this file and start with something like:
     * window.setTimeout(magnifier(viewer, modal_viewer),500);
     */
    // return a callback
    return function () {
        var tracker = new OpenSeadragon.MouseTracker({
                element: viewer.container,
                moveHandler: function(e) {
                    var pt = viewer.viewport.pointFromPixel(e.position);
                    modal_viewer.viewport.zoomTo(modal_viewer.viewport.getMaxZoom());
                    modal_viewer.viewport.panTo(pt);
                    document.getElementById('second').style.position = "absolute";
                    document.getElementById('second').style.left = e.position.x + 20 + "px";
                    document.getElementById('second').style.top = e.position.y + 20 + "px";
                }
            });
        tracker.setTracking(true);
    }

}
