class oneDirection{
  constructor(viewer1, viewer2){
    this.viewer1 = viewer1;
    this.viewer2 = viewer2;
    // get initial zoom and point on load
    this.prev_point = {x: 0.5, y:0.5};
    this.prev_zoom = 1;
  }

  pan_diff(e){
    // pan second image by amount first panned by
    var del_x = e.center.x - this.prev_point.x;
    var del_y = e.center.y - this.prev_point.y;
    var dest_point = new OpenSeadragon.Point(this.viewer2.viewport.getCenter().x + del_x, this.viewer2.viewport.getCenter().y + del_y);
    // this is the new "previous" for next time
    viewer2.viewport.panTo(dest_point);
    this.prev_point = e.center;
  }

  zoom_diff(e){
    // zoom in second image by amount first zoomed by
    var new_zoom = this.viewer2.viewport.getZoom() + (e.zoom - this.prev_zoom);
    if (new_zoom <=0.1){
      new_zoom = 0.1
    }
    this.viewer2.viewport.zoomTo(new_zoom, e.refPoint);
    // this is the new "previous" for next time
    console.log(e.refPoint);
    this.prev_zoom = e.zoom;
    this.prev_point = this.viewer1.viewport.getCenter();
  }
  register(){
    this.viewer1.addHandler("zoom", this.zoom_diff);
    this.viewer1.addHandler("pan", this.pan_diff);
  }
}
