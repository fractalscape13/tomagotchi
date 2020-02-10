export class Tomagotchi {

  constructor(name) {
    this.name = name;
    this.food = 100;
    this.fun = 100;
    this.sleep = 0;
    this.dead = false;
  }

  deathWatch() {
    if (this.food === 0 || this.fun === 0 || this.sleep === 100) {
      alert("you dead");
    }
  }
  foodTimer() {
    setInterval(() => {
      this.food--;
      if(this.food === 0){
        alert("you dead");
      }
    }, 6000);
  }

  funTimer() {
    setInterval(() => {
      this.fun--;
    }, 8000);
  }

  sleepTimer() {
    setInterval(() => {
      this.sleep++;
    }, 10000);
  }

  feed() {
    this.food += 20;
  }

  play() {
    this.fun += 15;
  }

  rest() {
    this.sleep -= 20;
  }

}

//display functions
//
//doc ready
// new TOmagotchi
// Tomagotchi.watch(food, displayFoodLevel())