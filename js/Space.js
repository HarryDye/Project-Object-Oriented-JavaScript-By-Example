class Space{
  constructor(x, y, id, counter){
    this.x = x;
    this.y= y;
    this.id= `space-${x}-${y}`;
    this.counter = null;
    this.diameter = 76;
    this.radius = this.diameter/2;
  }
  //draws svg space
  drawSVGSpace(){
    const svgSpace = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    svgSpace.setAttributeNS(null, "id", this.id);
    svgSpace.setAttributeNS(null, "cx", (this.x * this.diameter) + this.radius);
    svgSpace.setAttributeNS(null, "cy", (this.y * this.diameter) + this.radius);
    svgSpace.setAttributeNS(null, "r", this.radius - 8);
    svgSpace.setAttributeNS(null, "fill", "black");
    svgSpace.setAttributeNS(null, "stroke", "none");

    document.getElementById("mask").appendChild(svgSpace);
  }

//Updates space to reflect a counter has been dropped into it.
  mark(counter){
    this.counter = counter;
  }

 //Checks if space has an associated counter to find its owner
 //@return  {(null|Object)} Returns null or the owner object of the space's associated counter.

get owner() {
    if (this.counter === null) {
        return null;
    } else {
        return this.counter.owner;
    }
  }







}
