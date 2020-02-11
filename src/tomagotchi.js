export class Tomagotchi {

  constructor(given, name) {
    this.given = given;
    this.name = name;
    this.food = (Math.ceil(Math.random()*50)+50);
    this.fun = (Math.ceil(Math.random()*50)+50);
    this.sleep = (Math.floor(Math.random()*50));
  }

  foodTimer() {
    setInterval(() => {
      this.food--;
      if (this.food > 110) {
        this.sleep += 2;
      }
    }, 1000);
  }

  funTimer() {
    setInterval(() => {
      this.fun--;
      if (this.sleep < 0) {
        this.fun += this.sleep;
      }
    }, 2000);
  }

  sleepTimer() {
    setInterval(() => {
      this.sleep++;
    }, 3000);
  }

  feed() {
    this.food += 20;
    this.sleep += 3;
  }

  play() {
    this.fun += 15;
    this.sleep += 5;
    this.food -= 3;
  }

  rest() {
    this.sleep -= 20;
    this.food -= 7;
  }

}