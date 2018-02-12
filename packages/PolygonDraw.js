class PolygonDraw{
  constructor(parentId){
    this.parent = document.getElementById(parentId);
    this.ns = 'http://www.w3.org/2000/svg';
    this.svg = document.createElementNS(this.ns, 'svg')
    this.svg.setAttributeNS(null, 'width', '100%')
    this.svg.setAttributeNS(null, 'height', '100%')
    this.parent.appendChild(this.svg);
    this.nodes_x=[];
    this.nodes_y=[];
  }

  add_node(x,y){
    // add node
    var node = document.createElementNS(this.ns, 'circle');
    node.setAttributeNS(null, 'cx', x);
    node.setAttributeNS(null, 'cy', y);
    node.setAttributeNS(null, 'r', '5');
    node.setAttributeNS(null, 'stroke', 'black');
    node.setAttributeNS(null, 'stroke-width', '3');
    this.svg.appendChild(node);
    // add line if applicable
    if (this.nodes_x.length && this.nodes_y.length){
      var line = document.createElementNS(this.ns, 'line');
      line.setAttributeNS(null, 'x1', this.nodes_x[this.nodes_x.length -1])
      line.setAttributeNS(null, 'y1', this.nodes_y[this.nodes_y.length -1])
      line.setAttributeNS(null, 'x2', x);
      line.setAttributeNS(null, 'y2', y);
      line.setAttributeNS(null, 'style', "stroke:black;stroke-width:2");
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
