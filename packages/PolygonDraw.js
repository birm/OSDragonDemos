class PolygonDraw{
  constructor(parentId, options){
    this.parent = document.getElementById(parentId);
    this.ns = 'http://www.w3.org/2000/svg';
    this.svg = document.createElementNS(this.ns, 'svg')
    this.svg.setAttributeNS(null, 'width', '100%')
    this.svg.setAttributeNS(null, 'height', '100%')
    this.parent.appendChild(this.svg);
    this.nodes_x=[];
    this.nodes_y=[];
    // parse options
    this.color = this.options.color || "black";
    this.width = this.options.width || '5';
  }

  add_node(x,y){
    // add node
    var node = document.createElementNS(this.ns, 'circle');
    node.setAttributeNS(null, 'cx', x);
    node.setAttributeNS(null, 'cy', y);
    node.setAttributeNS(null, 'r', this.width);
    node.setAttributeNS(null, 'stroke', this.color);
    node.setAttributeNS(null, 'stroke-width', this.width);
    this.svg.appendChild(node);
    // add line if applicable
    if (this.nodes_x.length && this.nodes_y.length){
      var line = document.createElementNS(this.ns, 'line');
      line.setAttributeNS(null, 'x1', this.nodes_x[this.nodes_x.length -1])
      line.setAttributeNS(null, 'y1', this.nodes_y[this.nodes_y.length -1])
      line.setAttributeNS(null, 'x2', x);
      line.setAttributeNS(null, 'y2', y);
      line.setAttributeNS(null, 'style', "stroke:" + this.color + ";stroke-width:" + this.width +";");
      this.svg.appendChild(line);
    }
    // register node
    this.nodes_x.append(x);
    this.nodes_y.append(y);
  }
  // TODO selections
  // on creation, a node is automatically selected
  // if there's a selected node, draw a line from the new node to the selected node
  // if there's a line from selected node, delete it and draw from selected to new and new to old dest

  // click on node "Selects" the node

  // method to get list of points and lines

  // method to create from list of points and lines


}
