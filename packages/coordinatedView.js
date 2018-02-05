class coordinatedView {
      /** Returns a callback which starts bidirectional view coordination
       * run with window.setTimeout((this).initalize(viewer1, viewer2),500);
       */
      init(){
       this.del_x = 0;
       this.del_y = 0;
      }

      set_calibration(del_x, del_y){
        this.del_x = del_x;
        this.del_y = del_y;
      }

      static transmit(from_viewer, to_viewer){
        var from_point = from_viewer.viewport.getCenter();
        var dest_point = new OpenSeadragon.Point(from_point.x + this.del_x, from_point.y + this.del_y);
        to_viewer.viewport.zoomTo(from_viewer.viewport.getZoom(), dest_point, true);
        to_viewer.viewport.panTo(dest_point, true);
      }

      initalize(viewer1, viewer2){
        // on any click on an element, transmit
        return function(){
          viewer1.addHandler("zoom", coordinatedView.transmit(viewer1,viewer2));
          viewer1.addHandler("pan", coordinatedView.transmit(viewer1,viewer2));
          viewer2.addHandler("zoom", coordinatedView.transmit(viewer2,viewer1));
          viewer2.addHandler("pan", coordinatedView.transmit(viewer2,viewer1));
        }.bind(this)

      }

}
