function oneDirection(viewer1, viewer2) {
    // return a callback
    return function(){
      // get initial zoom and point on load
      prev_point = {
          x: 0.5,
          y: 0.5
      };
      prev_zoom = 1;

      function pan_diff(e) {
          // pan second image by amount first panned by
          var del_x = e.center.x - prev_point.x;
          var del_y = e.center.y - prev_point.y;
          var dest_point = new OpenSeadragon.Point(viewer2.viewport.getCenter().x + del_x, viewer2.viewport.getCenter().y + del_y);
          // this is the new "previous" for next time
          viewer2.viewport.panTo(dest_point);
          prev_point = e.center;
      }

      function zoom_diff(e) {
          // zoom in second image by amount first zoomed by
          var new_zoom = viewer2.viewport.getZoom() + (e.zoom - prev_zoom);
          if (new_zoom <= 0.1) {
              new_zoom = 0.1
          }
          viewer2.viewport.zoomTo(new_zoom, e.refPoint);
          // this is the new "previous" for next time
          console.log(e.refPoint);
          prev_zoom = e.zoom;
          prev_point = viewer1.viewport.getCenter();
      }
      viewer1.addHandler("zoom", zoom_diff);
      viewer1.addHandler("pan", pan_diff);
    }
}
