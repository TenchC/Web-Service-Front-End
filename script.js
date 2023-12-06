const baseURL = "https://name-color-vibes.onrender.com/name/:";

let data = {
  name: "str",
  primary: "hsl str",
  secondary: "hsl str",
  luck: "number",
  vibe: "str",
};

let vibes = ['intense','reserved','mysterious','bubbly','kind','calm'];

let pageWidth = document.body.scrollWidth;
let pageHeight = document.body.scrollHeight;
let info_div = document.getElementById("info");
let text_divs = document.getElementsByClassName("random_text");

//function for random colors
function randomInt(min, max) {
  let x = Math.random() * (Number(max) - Number(min)) + Number(min);
  x = Math.floor(x);
  if (x == 0) {
    x = 1;
  }
  return x;
}

//async function to ping api
const getData = async function (input) {
  try {
    //ping api with input
    const response = await fetch(`${baseURL}${input}`);
    const responseJSON = await response.json();
    console.log(responseJSON);
    data.name = responseJSON.name
    data.name = data.name.substring(1);
    data.luck = responseJSON.luck
    data.primary = responseJSON.primaryColor
    data.secondary = responseJSON.secondaryColor
    console.log(data)
  } catch (error) {
    console.error(error);
  }
};

//get input from form submission
function handleFormSubmit() {
  // Get the input value
  var userInput = document.getElementById("userInput").value;
  data.name = userInput
  //need Eloise to change CORS permissions, so added in default stuff
  getData(userInput);
  generateFakeData();
  alert("Generating Vibe of... " + userInput);
}

//change position of the vibes
function resizeDivs() {
    i = 0
  for (e of document.getElementsByClassName("random-div")) {
    let width = randomInt(100, 400);
    let height = randomInt(100, 350);
    let xPos = randomInt(0 - width + 10, pageWidth + 50);
    let yPos = randomInt(0 - height + 10, pageHeight);
    let borderRadius = randomInt(0, 100);
    let rot = randomInt(0, 359);
    width = width + "px";
    height = height + "px";
    xPos = xPos + "px";
    yPos = yPos + "px";
    borderRadius = borderRadius + "%";
    rot = rot + "deg";
    e.style.setProperty("rotate", rot);
    e.style.setProperty("width", width);
    e.style.setProperty("height", width);
    e.style.setProperty("left", xPos);
    e.style.setProperty("top", yPos);
    e.style.setProperty("border-radius", borderRadius);
  }
}
//set divs to position before any vibes inserted, basically preloading the page
resizeDivs();

//change the color
function changeColor(color1, color2) {
  var gradient = "linear-gradient(" + color1 + ", " + color2 + ")";
  document.body.style.setProperty("background-image", gradient);
  //for every random div
  for (e of document.getElementsByClassName("random-div")) {
    // 70% chance to be a gradient, if not then solid color
    if (Math.random() > 0.3) {
      if (Math.random() < 0.5) {
        //50/50 for which order of the colors
        var gradient = "linear-gradient(" + color1 + ", " + color2 + ")";
      } else {
        //  50/50 for which order of the colors
        var gradient = "linear-gradient(" + color2 + ", " + color1 + ")";
      }
      e.style.removeProperty("background-color");
      e.style.removeProperty("background-image");
      e.style.setProperty("background-image", gradient);
    } else {
      //30% chance to be solid color
      if (Math.random() < 0.5) {
        // 50/50 for which solid color
        e.style.removeProperty("background-color");
        e.style.removeProperty("background-image");
        e.style.setProperty("background-color", color1);
      } else {
        // 50/50 for which solid color
        e.style.removeProperty("background-color");
        e.style.removeProperty("background-image");
        e.style.setProperty("background-color", color2);
      }
    }
  }

  //change info colors
  info_div.style.setProperty("background-color", color1);
  info_div.style.setProperty("color", color2);
}

function fillShapes(vibe, name, luck){
    for(e of text_divs){
        e.innerHTML = ''
        //% chance based on luck, 10 = 100% chance, 1 luck = 10%
        if(Math.random() > ((1/luck)+.1)){
            if(Math.random()<.5){
        e.innerHTML = vibe
        } else {
            e.innerHTML = name
        }
    }
}
}

//function just for until Eloise does the things
function generateFakeData() {
  data.primary =
    "rgb(" +
    randomInt(0, 255) +
    "," +
    randomInt(0, 255) +
    "," +
    randomInt(0, 255) +
    ")";
  data.secondary =
    "rgb(" +
    randomInt(0, 255) +
    "," +
    randomInt(0, 255) +
    "," +
    randomInt(0, 255) +
    ")";
  resizeDivs();
  data.vibe = (vibes[randomInt(0, vibes.length)])
  data.luck = randomInt(0, 10);
  //would input user data
  changeColor(data.primary, data.secondary);
fillShapes(data.vibe, data.name, data.luck)
}

