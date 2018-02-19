class CalibratedCanvas{
  init(canvas, ref, viewer){
    this.base = base;
    this.ref = ref;
    this.viewer = viewer;
  }
  // method for coordinate conversion
  // do all of the other methods for canvas
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
  clearRect(x, y, width, height)
  fillRec(x, y, width, height)
  strokeRect(x, y, width, height)
  fillText(text, x, y [, maxWidth])
  strokeText(text, x, y [, maxWidth])
  lineWidth -- maybe? -- property, not method
  createLinearGradient(x0, y0, x1, y1)
  createRadialGradient(x0, y0, r0, x1, y1, r1)
  moveTo(x,y)
  lineTo(x,y)
  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
  quadraticCurveTo(cpx, cpy, x, y)
  arc(x, y, radius, startAngle, endAngle [, anticlockwise])
  arcTo(x1, y1, x2, y2, radius)
  ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
  rect(x, y, width, height)
  translate(x,y)
  transform(a,b,c,d,e,f) // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform
  setTransform(a, b, c, d, e, f)
  drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  getImageData(sx, sy, sw, sh)
  putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)
  // just forward other methods

  // probably want to return proxy?
}
