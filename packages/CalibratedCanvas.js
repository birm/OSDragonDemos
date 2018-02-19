class CalibratedCanvas{
  constructor(canvas, viewer){
    this.base = base;
    this.viewer = viewer;
  }
  // method for coordinate conversion
  // do all of the other methods for canvas
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

  proxy(){
    var handler = {
      get(obj, prop, val){
        // which points need to be converted?
        // 1 and 2 are points, 3 and 4 are len (or not present)
        var _pt2_len2 = ["clearRect", "fillRect", "strokeRect", "moveTo", "lineTo", "rect", "translate", "ellipse"];
        // all args are sets of points
        var _allpoints["createLinearGradient", "createRadialGradient", "bezierCurveTo", "quadraticCurveTo"]
        // transformation matrix
        var _tramat = ["transform", "setTransform"]
        // text x y
        var _txt = ["fillText", "strokeText"]
        if (_pt2_len2.indexOf(prop) >=0){
          return function (...args){
            obj.[prop](...args);
          }
        }
        else if (_allpoints.indexOf(prop) >=0){
          return function (...args){
            obj.[prop](...args);
          }
        }
        else if (_tramat.indexOf(prop) >=0){
          return function (...args){
            obj.[prop](...args);
          }
        }
        else if (_txt.indexOf(prop) >=0){
          return function (...args){
            obj.[prop](...args);
          }
        }
        else if (prop == "arc"){
          return function (...args){
            obj.[prop](...args);
          }
        }
        else if (prop == "arcTo"){
          return function (...args){
            obj.[prop](...args);
          }
        }
        else if (prop == "drawImage"){
          return function (...args){
            obj.[prop](...args);
          }
        }
        else if (prop == "getImageData"){
          return function (...args){
            obj.[prop](...args);
          }
        }
        else if (prop == "putImageData"){
          return function (...args){
            obj.[prop](...args);
          }
        }
      },
      set(obj, prop, val) {
          var _lengthy = ["lineWidth"];
          if (_lengthy.indexOf(prop) >=0){
            // convert val
          }
          obj.[prop] = val;
      }
    }
    return new Proxy(base, handler);
  }

  //clearRect(x, y, width, height)
  //fillRect(x, y, width, height)
  //strokeRect(x, y, width, height)
  //fillText(text, x, y [, maxWidth])
  //strokeText(text, x, y [, maxWidth])
  lineWidth -- -- property, not method
  //createLinearGradient(x0, y0, x1, y1)
  //createRadialGradient(x0, y0, r0, x1, y1, r1)
  //moveTo(x,y)
  //lineTo(x,y)
  //bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
  //quadraticCurveTo(cpx, cpy, x, y)
  //arc(x, y, radius, startAngle, endAngle [, anticlockwise])
  //arcTo(x1, y1, x2, y2, radius)
  //ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
  //rect(x, y, width, height)
  //translate(x,y)
  //transform(a,b,c,d,e,f) // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform
  //setTransform(a, b, c, d, e, f)
  //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  //getImageData(sx, sy, sw, sh)
  //putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)
  // just forward other methods

  // for each image, we want the screen position on the overlay
  // pixel to image coords

  // translation methods;
  static convertPoint(point){
    var pt = new OpenSeaDragon.Point(point.x,point.y);
    // convert
    return this.viewer.viewport.viewerElementToImageCoordinates(pt);
  }

  static convertLen(len){
    var pt = new OpenSeaDragon.Point(len,0);
    // convert
    return this.viewer.viewport.viewerElementToImageCoordinates(pt).x;
  }

  // probably want to return proxy?
}
