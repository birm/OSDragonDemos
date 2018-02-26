function OSDCanvas(base, viewer){
  // conversion utilities
  function _convertPointStore(x, y) {
      var pt = new OpenSeadragon.Point(x, y);
      var pt2 = viewer.viewport.pointFromPixel(pt);
      return viewer.viewport.viewportToImageCoordinates(pt2);
  }

  function _convertLenStore(x, y) {
      var pt = new OpenSeadragon.Point(x, y);
      var pt_ref = new OpenSeadragon.Point(0, 0);
      var vp_pt = viewer.viewport.pointFromPixel(pt);
      var vp_pt_ref = viewer.viewport.pointFromPixel(pt_ref);
      var im_pt = viewer.viewport.viewportToImageCoordinates(vp_pt);
      var im_pt_ref = viewer.viewport.viewportToImageCoordinates(vp_pt_ref);
      return im_pt.minus(im_pt_ref);
  }

  function _convertPointDraw(x, y) {
      var pt = new OpenSeadragon.Point(x, y);
      return viewer.viewport.imageToViewerElementCoordinates(pt);
  }

  function _convertLenDraw(x, y) {
      var pt = new OpenSeadragon.Point(x, y);
      var pt_ref = new OpenSeadragon.Point(0, 0);
      var ve_pt = viewer.viewport.imageToViewerElementCoordinates(pt);
      var ve_pt_ref = viewer.viewport.imageToViewerElementCoordinates(pt_ref);
      return ve_pt.minus(ve_pt_ref);
  }

  function _canvas_convert(prop, args, draw) {
      // on store, convert screen to image coords
      // on draw, convert image to screen coords
      if (draw) {
          var convertPoint = _convertPointDraw;
          var convertLen = _convertLenDraw;
      } else {
          var convertPoint = _convertPointStore;
          var convertLen = _convertLenStore;
      }
      // which points need to be converted for which method
      // 1 and 2 are points, 3 and 4 are len (or not present)
      var _pt2_len2 = ["clearRect", "fillRect", "strokeRect", "moveTo", "lineTo", "rect", "translate", "ellipse"];
      // all args are sets of points
      var _allpoints = ["createLinearGradient", "createRadialGradient", "bezierCurveTo", "quadraticCurveTo", "drawImage", "getImageData"]
      // transformation matrix
      var _tramat = ["transform", "setTransform"]
      // text x y
      var _txt = ["fillText", "strokeText"]
      if (_pt2_len2.indexOf(prop) >= 0) {
          if (args.length >= 2) {
              var pt = convertPoint(args[0], args[1])
              args[0] = pt.x;
              args[1] = pt.y;
          }
          if (args.length >= 4) {
              var pt = convertLen(args[2], args[3])
              args[2] = pt.x;
              args[3] = pt.y;
          }
      } else if (_allpoints.indexOf(prop) >= 0) {
          // for each set of two, convert
          for (var i = 0; i < Math.floor(args.length / 2); i++) {
              var pt = convertPoint(args[2 * i], args[2 * i + 1])
              args[2 * i] = pt.x;
              args[2 * i + 1] = pt.y;
          }
      } else if (_tramat.indexOf(prop) >= 0) {

          if (args.length >= 6) {
              var pt = convertPoint(args[4], args[5])
              args[4] = pt.x;
              args[5] = pt.y;
          }

      } else if (_txt.indexOf(prop) >= 0) {

          if (args.length >= 3) {
              var pt = convertPoint(args[1], args[2])
              args[1] = pt.x;
              args[2] = pt.y;
          }
          if (args.length >= 4) {
              args[3] = convertLen(args[3], 0).x;
          }

      } else if (prop == "arc") {
          //x, y, radius
          if (args.length >= 2) {
              var pt = convertPoint(args[0], args[1])
              args[0] = pt.x;
              args[1] = pt.y;
          }
          if (args.length >= 3) {
              args[2] = convertLen(args[2], 0).x;
          }
      } else if (prop == "arcTo") {
          //x1, y1, x2, y2, radius
          if (args.length >= 2) {
              var pt = convertPoint(args[0], args[1])
              args[0] = pt.x;
              args[1] = pt.y;
          }
          if (args.length >= 4) {
              var pt = convertPoint(args[2], args[3])
              args[2] = pt.x;
              args[3] = pt.y;
          }
          if (args.length >= 5) {
              args[4] = convertLen(args[4], 0).x;
          }
      } else if (prop == "putImageData") {
          //imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight
          if (args.length >= 3) {
              var pt = convertPoint(args[1], args[2])
              args[1] = pt.x;
              args[2] = pt.y;
          }
          if (args.length >= 5) {
              var pt = convertPoint(args[3], args[4])
              args[3] = pt.x;
              args[4] = pt.y;
          }
          if (args.length >= 7) {
              var pt = convertPoint(args[5], args[6])
              args[5] = pt.x;
              args[6] = pt.y;
          }
      } else if (prop == "lineWidth"){
          // this is a set property
          args = convertLen(val,0).x;
      }
      return args
  }
  // add our delay functions/objects to base
  base.__queue = [];
  base.__apply_all = function(new_base){
    base.__queue.forEach(function(instruction){
      if (instruction[0]==="set"){
        new_base[instruction[1]] = _canvas_convert(instruction[1], instruction[2], true);
      }
      else if (instruction[0]==="fcn"){
        if (typeof new_base[instruction[1]] === "function"){
          new_base[instruction[1]](..._canvas_convert(instruction[1], instruction[2], true));
        }
      }
    })
  }
  var handler = {
    get(obj, prop, val){
      // what if we're looking for queue or apply all?
      if (prop === "__queue"){
        return obj.__queue;
      }
      else if (prop === "__apply_all"){
        return obj.__apply_all;
      } else {
        return function (...args){
          obj.__queue.push(["fcn", prop, _canvas_convert(prop, args, false)]);
        }
      }
    },
    set(obj, prop, val) {
        obj.__queue.push(["set", prop, _canvas_convert(prop, val, false)]);
    }
  }
  return new Proxy(base, handler);
}
