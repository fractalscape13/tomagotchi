export class Tomagotchi {

  constructor(name) {
    this.name = name;
    this.food = (Math.ceil(Math.random()*50)+50);
    this.fun = (Math.ceil(Math.random()*50)+50);
    this.sleep = (Math.floor(Math.random()*50));
    this.dead = false;
  }

  foodTimer() {
    setInterval(() => {
      this.food--;
      if(this.food === 0){
        alert(this.name+" starved you neglectful jerk!");
      }
    }, 6000);
  }

  funTimer() {
    setInterval(() => {
      this.fun--;
      if(this.fun === 0) {
        alert(this.name+" got bored and ran away!");
      }
    }, 8000);
  }

  sleepTimer() {
    setInterval(() => {
      this.sleep++;
      if(this.sleep === 100) {
        alert(this.name+" went insane from sleep deprivation!");
      }
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