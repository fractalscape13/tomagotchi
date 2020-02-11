import { Tomagotchi } from "./tomagotchi.js";
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function showFood(object) {
  let stat = object.food;
  $("#food" + object.name).text(stat);
  if (object.food < 25 && object.food > 0) {
    $("#foodwarning").text(object.name + " is getting hungry...");
  } else if (object.food <= 0) {
    $("#warning").text(object.name + " starved you neglectful jerk!");
  } else {
    $("#foodwarning").text("");
  }
}

function showFun(object) {
  let stat = object.fun;
  $("#fun" + object.name).text(stat);
  if (object.fun < 25 && object.fun >0) {
    $("#funwarning").text(" "+object.name + " is getting bored...");
  } else if (object.fun <= 0) {
    $("#warning"+object.name).text(" "+object.name + " got bored and ran away!");
  } else {
    $("#funwarning").text("");
  }
}

function showSleep(object) {
  let stat = object.sleep;
  $("#sleep" + object.name).text(stat);
  if (object.sleep >= 100) {
    $("#warning"+object.name).text(" "+object.name + " went insane from sleep deprivation!");
  } else if (object.sleep < 0) {
    $("#sleepwarning").text(" "+object.name + " is sleeping too much and getting bored!");
  } else {
    $("#sleepwarning").text("");
  }
}

const animal = [];
let animalIndex = 0;
function createAnimal(nameInput) {
  let newAnimal = new Tomagotchi(nameInput);
  animal.push(newAnimal);
  let request = new XMLHttpRequest();
  const url = `https://dog.ceo/api/breeds/image/random`;

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      showAnimal(response);
    }
  };
  request.open("GET", url, true);
  request.send();

  const showAnimal = function (response) {
    $(".animals").append(`<div id="animal` + animalIndex + `">
          <p>`+ newAnimal.name + `
          <img src=${response.message} alt="picture of your animal">
          <p>Food Level: <span id="food`+ newAnimal.name + `"></span><span id="foodwarning"></span></p>
          <p>Fun Level: <span id="fun`+ newAnimal.name + `"></span><span id="funwarning"></span></p>
          <p>Sleep Level: <span id="sleep`+ newAnimal.name + `"></span><span id="sleepwarning"></span></p>
          <p id="warning`+newAnimal.name+`"><p>
          <button type="button" class="feed" id="`+ animalIndex + `">Feed me!</button>
          <button type="button" class="fun" id="`+ animalIndex + `">Play with me!</button>
          <button type="button" class="sleep" id="`+ animalIndex + `">Sleepy time!</button>
          </div>`);
    showFood(newAnimal);
    showFun(newAnimal);
    showSleep(newAnimal);
    animalIndex++;
    $("form")[0].reset();
  };
}

$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();
    let nameInput = $("input#animalname").val();
    if (nameInput) {
      if (animal.length === 0) {
        createAnimal(nameInput);
      } else {
        for (let i = 0; i < animalIndex; i++) {
          if (nameInput === animal[i].name) {
            $("#hidden").fadeIn();
            setTimeout(function () { $("#hidden").fadeOut(); }, 2000);
            $("form")[0].reset();
          } else {
            createAnimal(nameInput);
          }
          break;
        }
      }
    } else {
      $("form")[0].reset();
      $("#hidden").fadeIn();
      setTimeout(function () { $("#hidden").fadeOut(); }, 2000);
    }
  });

  $("#start").click(function () {
    for (let i = 0; i < animal.length; i++) {
      animal[i].foodTimer();
      animal[i].funTimer();
      animal[i].sleepTimer();
    }
    setInterval(() => {
      for (let i = 0; i < animal.length; i++) {
        showFood(animal[i]);
        showFun(animal[i]);
        showSleep(animal[i]);
      }
    }, 500);
    $("#start").hide();
    $(".animalform").hide();
  });

  $("div.animals").on("click", "button", function () {
    if (this.className === "feed") {
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
