import { Tomagotchi } from "./tomagotchi.js";
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function showFood(object) {
  let stat = object.food;
  $("#food"+object.name).attr('style', 'width: '+stat+'%');
  if (object.food < 25 && object.food > 0) {
    $("#foodwarning"+object.name).text(" "+object.name + " is getting hungry...");
  } else if (object.food <= 0) {
    $("#warning"+object.name).text(" "+object.name + " starved you neglectful jerk!");
    endGame(object.name);
  } else {
    $("#foodwarning"+object.name).text("");
  }
}

function showFun(object) {
  let stat = object.fun;
  $("#fun" + object.name).attr('style', 'width: '+stat+'%');
  if (object.fun < 25 && object.fun >0) {
    $("#funwarning"+object.name).text(" "+object.name + " is getting bored...");
  } else if (object.fun <= 0) {
    $("#warning"+object.name).text(" "+object.name + " got bored and ran away!");
    endGame(object.name);
  } else {
    $("#funwarning"+object.name).text("");
  }
}

function showSleep(object) {
  let stat = object.sleep;
  $("#sleep" + object.name).attr('style', 'width: '+stat+'%');
  if (object.sleep >= 100) {
    $("#warning"+object.name).text(" "+object.name + " went insane from sleep deprivation!");
    endGame(object.name);
  } else if (object.sleep < 0) {
    $("#sleepwarning"+object.name).text(" "+object.name + " is sleeping too much and getting bored!");
  } else {
    $("#sleepwarning"+object.name).text("");
  }
}

function endGame(name) {
  $(".stats"+name).hide();
}

const animal = [];
let animalIndex = 0;
function createAnimal(givenName, nameInput) {
  let newAnimal = new Tomagotchi(givenName, nameInput);
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
    $(".animals").append(`<div class="box" id="animal` + animalIndex + `">
          <p>`+ newAnimal.given + `
          <div class="fit" id=`+newAnimal.name+`>
          <img src=${response.message} alt="picture of your animal">
          <div class="stats`+newAnimal.name+`">
          <button type="button" class="feed" id="`+ animalIndex + `">Feed me!</button>
          <div class="progress">
          <div id=food`+newAnimal.name+` class=" progress-bar bg-success" role="progressbar" style="width:`+newAnimal.food+`%" aria-valuemin="0" aria-valuemax="100"></div>
          </div><br>
          <button type="button" class="fun" id="`+ animalIndex + `">Play with me!</button>
          <div class="progress">
          <div id=fun`+newAnimal.name+` class=" progress-bar bg-warning" role="progressbar" style="width:`+newAnimal.fun+`%" aria-valuemin="0" aria-valuemax="100"></div>
          </div><br>
          <button type="button" class="sleep" id="`+ animalIndex + `">Sleepy time!</button>
          <div class="progress">
          <div id=sleep`+newAnimal.name+` class=" progress-bar bg-danger" role="progressbar" style="width:`+newAnimal.sleep+`%" aria-valuemin="0" aria-valuemax="100"></div>
          </div><br>
          </div>
          </div>
          <p id="warning`+newAnimal.name+`"><p>
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
    let givenName = $("input#animalname").val();
    let nameInput = givenName.replace(/\s+/g,"");
    if (nameInput) {
      if (animal.length === 0) {
        createAnimal(givenName, nameInput);
      } else {
        for (let i = 0; i < animalIndex; i++) {
          if (nameInput === animal[i].name) {
            $("#hidden").fadeIn();
            setTimeout(function () { $("#hidden").fadeOut(); }, 2000);
            $("form")[0].reset();
          } else {
            createAnimal(givenName, nameInput);
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
{/* <span id="food`+ newAnimal.name + `"></span><span id="foodwarning`+newAnimal.name+`"></span> */}