/**  **/
function sw_magnifier(viewer, modal_viewer) {
    /**
     * Creates a callback which starts single window magnifitation code
     * Include this file and start with something like:
     * window.setTimeout(magnifier(viewer, modal_viewer),500);
     */
    // return a callback
    return function () {
        document.getElementById(modal_viewer.id).style.position = "absolute";
        var tracker = new OpenSeadragon.MouseTracker({
                element: viewer.container,
                moveHandler: function(e) {
                    var pt = viewer.viewport.pointFromPixel(e.position);
                    modal_viewer.viewport.zoomTo(modal_viewer.viewport.getMaxZoom());
                    modal_viewer.viewport.panTo(pt);
                }
            });
        tracker.setTracking(true);
        document.onmousemove = function(e){
          document.getElementById(modal_viewer.id).style.left = e.clientX + 20 + "px";
          document.getElementById(modal_viewer.id).style.top = e.clientY + 20 + "px";
        }
    }

}
