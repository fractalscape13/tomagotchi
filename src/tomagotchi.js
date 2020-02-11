export class Tomagotchi {

  constructor(name) {
    this.name = name;
    this.food = (Math.ceil(Math.random()*50)+50);
    this.fun = (Math.ceil(Math.random()*50)+50);
    this.sleep = (Math.floor(Math.random()*50));
  }

  foodTimer() {
    setInterval(() => {
      this.food--;
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
  }

  play() {
    this.fun += 15;
    this.sleep += 5;
  }

  rest() {
    this.sleep -= 20;
  }

}