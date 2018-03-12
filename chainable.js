//   this techinique will be much more better to expose the api 

// this is also used in library such as Prop Types
// somethis

const makeObjectBasedOnClosure = (a=true, b=true) => {
  // instacing the obejct using the closure variable whos value
  // then can be change with chainable instance 
  // so as to modify the object's state

  const obj =  new class {
    constructor() {
      // this a nd b variable are from the function closure rather than passing
      // from the constructor directly
      this.a = a;
      this.b = b;
    }

    doSomething() {
      if (this.a) {
        // od something
      } else {
        // do another thing
      }
    }

  }();
  makeObjectBasedOnClosure.falsy = makeObjectBasedOnClosure.bind(
    null,
    false,
    false
  );
  return obj;
}


const main = () => {
  // creating an instance based on different vairable based on diffenent values
  // using function chaining
  let c = makeObjectBasedOnClosure()
  console.log(c);
  let d = makeObjectBasedOnClosure.falsy();
  console.log(d);
  
}

main();

