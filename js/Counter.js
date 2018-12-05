class Counter{
  constructor(index, owner){
    this.owner = owner;
    this.id = `counter-${index}-${owner.id}`;
    this.dropped = false;
    this.columnLocation = 0;
  }

  get htmlCounter(){
    return document.getElementById(this.id);

  }
  //returns the html Element
  get offsetLeft(){
    return this.htmlCounter.offsetLeft;
  }

  drawHTMLCounter(){
    const counter = document.createElement('div');
    document.getElementById('game-board-underlay').appendChild(counter);
    counter.setAttribute('id', this.id);
    counter.setAttribute('class', 'counter');
    counter.style.backgroundColor = this.owner.color;
  }
  //moves counter left
  moveLeft(){
    //stops it moving left if its in the left most corner
    if (this.columnLocation > 0){
        //updates the counter location, 76px is one column
        this.htmlCounter.style.left = this.offsetLeft - 76;
        //updates the column location property
        this.columnLocation -= 1;
    }
  }

  //moves counter right
  moveRight(columns){
    if (this.columnLocation < columns - 1){
        this.htmlCounter.style.left = this.offsetLeft + 76;
        this.columnLocation += 1;
    }
  }
  //this drops the counter, target is the space, reset is the callback after the animation is complete
  drop(target, reset){
    this.dropped = true;
    //this animates the counter in jquery
    $(this.htmlCounter).animate({
    top: (target.y * target.diameter)
    }, 750, 'easeOutBounce', reset);
  }





}
