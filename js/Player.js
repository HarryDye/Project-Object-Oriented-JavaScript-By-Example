class Player{
  constructor(name, id, color, active = false){
    this.name = name;
    this.id = id;
    this.color = color;
    this.active = active;//boolean
    this.counters = this.createCounters(21);
  }

  //creates counters
  createCounters(number){
    const counters = [];
    for(let i =0; i<number; i++){
      let counter = new Counter(i, this);
      counters.push(counter);
    }
    return counters;
}
  //gets all counters that havnt been used
  get unusedCounters(){
    return this.counters.filter(counter => !counter.dropped);
  }
  //gets the active counter by returniong the first counter in the arry of unused tokens.
  get activeCounters(){
    return this.unusedCounters[0];
  }
 //checks for undropped counters
  checkCounters(){
    return this.unusedCounters.length == 0 ? false :true;
  }


}
