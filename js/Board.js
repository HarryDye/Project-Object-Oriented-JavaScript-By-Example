class Board{
  constructor(){
    this.rows = 6;
    this.columns = 7;
    //this means when board object is created all the space objects are created
    this.spaces = this.createSpaces();
  }
  createSpaces(){
    //value to be returned from method
    const spaces = [];
    //method interates all columns
    for(let x =0; x<this.columns; x++){
      //hold array of individual space objects
      const column = [];
      //
      for(let y =0; y<this.rows; y++){
        //adds the new space, on the conditions of x and y
        const space = new Space(x, y);
        //push the new space to column array
        column.push(space);
      }
      //pushes column into spaces array
      spaces.push(column);

    }

  return spaces;
  }

  drawHTMLBoard(){
    for (let column of this.spaces){
      for (let space of column){
        space.drawSVGSpace();
      }
    }
  }
}
