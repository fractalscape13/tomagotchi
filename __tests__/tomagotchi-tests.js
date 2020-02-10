import { Tomagotchi } from "../src/tomagotchi.js"

describe("Tomagotchi", ()=> {
  jest.useFakeTimers();
  let toma;

  beforeEach(function() {
    toma = new Tomagotchi("Chester");
  });

  afterEach(function() {
    jest.clearAllTimers();
  });

  test("should create a Tomagotchi object with 100 food/fun and 0 sleep", ()=>{
    expect(toma.name).toEqual("Chester");
    expect(toma.food).toEqual(100);
    expect(toma.fun).toEqual(100);
    expect(toma.sleep).toEqual(0);
   });

   test("timer should decrement food", ()=>{
    toma.foodTimer();
    jest.advanceTimersByTime(6001);
    expect(toma.food).toEqual(99);
   });

   test("timer should decrement fun", ()=>{
    toma.funTimer();
    jest.advanceTimersByTime(8001);
    expect(toma.fun).toEqual(99);
   });

   test("timer should increment sleep", ()=>{
    toma.sleepTimer();
    jest.advanceTimersByTime(10001);
    expect(toma.sleep).toEqual(1);
   });

  test("feed method should increment food while timer decrements", ()=>{
    toma.foodTimer();
    jest.advanceTimersByTime(120001);
    toma.feed();
    expect(toma.food).toEqual(100);
  });

  test("play method should increment fun while timer decrements", ()=>{
    toma.funTimer();
    jest.advanceTimersByTime(120001);
    toma.play();
    expect(toma.fun).toEqual(100);
  });

  test("rest method should decrement sleep while timer increments", ()=>{
    toma.sleepTimer();
    jest.advanceTimersByTime(200001);
    toma.rest();
    expect(toma.sleep).toEqual(0);
  });

  test("tomagotchi dies when food = 0", ()=>{
    toma.foodTimer();
    jest.advanceTimersByTime(600001);
    toma.deathWatch();
    expect(toma.dead).toEqual(true);
  });

  test("tomagotchi dies when fun = 0", ()=>{
    toma.funTimer();
    jest.advanceTimersByTime(800001);
    toma.deathWatch();
    expect(toma.dead).toEqual(true);
  });

  test("tomagotchi dies when sleep = 100", ()=>{
    toma.sleepTimer();
    jest.advanceTimersByTime(1000001);
    toma.deathWatch();
    expect(toma.dead).toEqual(true);
  });

  test("tomagotchi updates all properties after one minute", ()=>{
    toma.sleepTimer();
    toma.funTimer();
    toma.foodTimer();
    jest.advanceTimersByTime(60000);
    expect(toma.sleep).toEqual(6);
    expect(toma.fun).toEqual(93);
    expect(toma.food).toEqual(90);
  });
});