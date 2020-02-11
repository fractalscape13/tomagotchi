import { Tomagotchi } from "./tomagotchi.js";
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function showFood(object) {
  let stat = object.food;
  $("#food"+object.name).text(stat);
}

function showFun(object) {
  let stat = object.fun;
  $("#fun"+object.name).text(stat);
}

function showSleep(object) {
  let stat = object.sleep;
  $("#sleep"+object.name).text(stat);
}

$(document).ready(function(){
  const animal = [];
  let animalIndex = 0;
  $("form").submit(function(event) {
    event.preventDefault();
    let newAnimal = new Tomagotchi($("input#animalname").val());  
    animal.push(newAnimal);
    $(".animals").append(`<div id="animal`+animalIndex+`">
    <p>`+newAnimal.name+`
    <img src="" alt="picture of your animal">
    <p>Food Level: <span id="food`+newAnimal.name+`"></span></p>
    <p>Fun Level: <span id="fun`+newAnimal.name+`"></span></p>
    <p>Sleep Level: <span id="sleep`+newAnimal.name+`"></span></p>
    <button type="button" class="feed" id="`+animalIndex+`">Feed me!</button>
    <button type="button" class="fun" id="`+animalIndex+`">Play with me!</button>
    <button type="button" class="sleep" id="`+animalIndex+`">Sleepy time!</button>
    </div>`);
    showFood(newAnimal);
    showFun(newAnimal);
    showSleep(newAnimal);
    animalIndex++;
    $("form")[0].reset();
  });

  $("#start").click(function(){
    for(let i = 0; i < animal.length; i++) {
      animal[i].foodTimer();
      animal[i].funTimer();
      animal[i].sleepTimer();
    }
    setInterval(() => {
      for(let i=0; i < animal.length; i++) {
        showFood(animal[i]);
        showFun(animal[i]);
        showSleep(animal[i]);
      }
    }, 1000);
  });

  $("div.animals").on("click", "button", function(){
    if (this.className === "feed"){
      animal[this.id].feed();
      showFood(animal[this.id]);
    } else if (this.className === "fun") {
      animal[this.id].play();
      showFun(animal[this.id]);
    } else if (this.className === "sleep") {
      animal[this.id].rest();
      showSleep(animal[this.id]);
    }
  });


});