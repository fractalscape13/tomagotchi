import { Tomagotchi } from "../src/tomagotchi.js"

describe("Tomagotchi", ()=> {
  jest.useFakeTimers();

  test("should create a Tomagotchi object with 100 food/fun and 0 sleep", ()=>{
    let toma = new Tomagotchi("Chester");
    expect(toma.name).toEqual("Chester");
    expect(toma.food).toEqual(100);
    expect(toma.fun).toEqual(100);
    expect(toma.sleep).toEqual(0);
   });
});