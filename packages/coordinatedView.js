function coordinatedView(viewer1, viewer2, del_x, del_y) {
      /** Returns a callback which starts bidirectional view coordination
       * run with window.setTimeout((this).initalize(viewer1, viewer2),500);
       */

      function initalize(){
          function transmit(from_viewer, to_viewer){
            return function(){
              var from_point = from_viewer.viewport.getCenter();
              var dest_point = new OpenSeadragon.Point(from_point.x + del_x, from_point.y + del_y);
              to_viewer.viewport.zoomTo(from_viewer.viewport.getZoom(), dest_point, false);
              to_viewer.viewport.panTo(dest_point, false);
            }
          }
          var events=["click", "mouseover", "mousemove", "wheel", "keypress", "zoom", "pan"];
          events.forEach(function(ev){
            viewer1.container.addEventListener(ev ,transmit(viewer1,viewer2));
            viewer2.container.addEventListener(ev ,transmit(viewer2,viewer1));
          })

      }
      return initalize;
}
