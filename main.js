let data = {};
let triggers = [];
let itemArguments = [];

let craftable = false;
let hideAttributes = false;

fetch("./data.json")
  .then((r) => {
  return r.json();
}).then((d) => { data = d });

function naming() {
  document.getElementsByClassName("naming")[0].style.display = "block";
  document.getElementsByClassName("stats")[0].style.display = "none";
  document.getElementsByClassName("craftingDiv")[0].style.display = "none";
  document.getElementsByClassName("effects")[0].style.display = "none";
  document.getElementsByClassName("output")[0].style.display = "none";
}

function stats() {
  document.getElementsByClassName("naming")[0].style.display = "none";
  document.getElementsByClassName("stats")[0].style.display = "block";
  document.getElementsByClassName("craftingDiv")[0].style.display = "none";
  document.getElementsByClassName("effects")[0].style.display = "none";
  document.getElementsByClassName("output")[0].style.display = "none";
}

function crafting() {
  document.getElementsByClassName("naming")[0].style.display = "none";
  document.getElementsByClassName("stats")[0].style.display = "none";
  document.getElementsByClassName("craftingDiv")[0].style.display = "block";
  document.getElementsByClassName("effects")[0].style.display = "none";
  document.getElementsByClassName("output")[0].style.display = "none";
}

function effects() {
  document.getElementsByClassName("naming")[0].style.display = "none";
  document.getElementsByClassName("stats")[0].style.display = "none";
  document.getElementsByClassName("craftingDiv")[0].style.display = "none";
  document.getElementsByClassName("effects")[0].style.display = "block";
  document.getElementsByClassName("output")[0].style.display = "none";
}

function output() {
  document.getElementsByClassName("naming")[0].style.display = "none";
  document.getElementsByClassName("stats")[0].style.display = "none";
  document.getElementsByClassName("craftingDiv")[0].style.display = "none";
  document.getElementsByClassName("effects")[0].style.display = "none";
  document.getElementsByClassName("output")[0].style.display = "block";
}

setTimeout(() => {
  for (let i = 0; i < Object.keys(data.effects).length; i++) {
    let name = Object.keys(data.effects)[i];
    //let displayName = name.split("_")[0][0].toLocaleUpperCase() + name.split("_")[0].slice(1) + " " + name.split("_")[1][0].toLocaleUpperCase() + name.split("_")[1].slice(1);

    document.getElementById("effectsDropdown").add(new Option(name, ''), undefined);
  }

  for (let i = 0; i < data.triggers.length; i++) {
    document.getElementById("triggersDropdown").add(new Option(data.triggers[i], ''), undefined);
  }

  for (let i = 0; i < data.triggers.length; i++) {
    document.getElementById("triggersDropdown").add(new Option(data.triggers[i], ''), undefined);
  }

  updateEffects();
}, 100);


function addTrigger() {
  let trigger = document.getElementById("triggersDropdown").options[document.getElementById("triggersDropdown").selectedIndex].text;
  if (!triggers.includes(trigger)) {
    triggers.push(trigger);
    document.getElementById("triggersList").innerHTML += `<button class = "argument"> ${trigger} </button> <br>`;
  }
}

function clearTriggers() {
  triggers = [];
  document.getElementById("triggersList").innerHTML = "";
}

function updateEffects() {
  let arguments = data.effects[document.getElementById("effectsDropdown").options[document.getElementById("effectsDropdown").selectedIndex].text].args;
  itemArguments = arguments;

  document.getElementById("argumentsDropdown").innerHTML = "";
  for (let i = 0; i < arguments.length; i++) {
    document.getElementById("argumentsDropdown").innerHTML += `<input type = "text" class = "argument" id = "${i.toString()}"></input> ${arguments[i]} <br>`;
  }
}

function addEffect() {
  document.getElementById("argumentsDropdown")

  let triggersFormatted = "";
  let argumentsFormatted = "";
  
  for (let i = 0; i < triggers.length; i++) {
    triggersFormatted += `    - ${triggers[i]}\n`;
  }
  
  for (let i = 0; i < itemArguments.length; i++) {
    if (document.getElementById(i.toString()).value == "") continue;
    if (i == 0) {
      argumentsFormatted += `    ${itemArguments[i]}: ${document.getElementById(i.toString()).value}\n`;
    } else {
      argumentsFormatted += `      ${itemArguments[i]}: ${document.getElementById(i.toString()).value}\n`;
    }
  }

  document.getElementById("effects").value += 
`  - id: ${document.getElementById("effectsDropdown").options[document.getElementById("effectsDropdown").selectedIndex].text}
    args:
  ${argumentsFormatted}
    triggers:
  ${triggersFormatted}
  `;
}

function generate() {
  let extras = "";

  let name = document.getElementById("name").value;
  let itemID = document.getElementById("item").value;

  let lorelines = document.getElementById("lore").value.split("\n");
  let lore = ``;

  if (lorelines.length != 1) {
    for (let i = 0; i < lorelines.length; i++) {
      if (i == 0) {
        lore += '\n    - ' + lorelines[i];
      } else {
        lore += '    - ' + lorelines[i];
      }
      lore += '\n';
    }
  } else {
    lore = document.getElementById("lore").value
  }

  let damage = document.getElementById("damage").value;
  let attackSpeed = document.getElementById("attackSpeed").value;
  let durability = document.getElementById("durability").value;
  let slot = document.getElementById("slot").value;

  let c1 = document.getElementById("c1").value;
  let c2 = document.getElementById("c2").value;
  let c3 = document.getElementById("c3").value;
  let c4 = document.getElementById("c4").value;
  let c5 = document.getElementById("c5").value;
  let c6 = document.getElementById("c6").value;
  let c7 = document.getElementById("c7").value;
  let c8 = document.getElementById("c8").value;
  let c9 = document.getElementById("c9").value;
  
  let giveAmount = document.getElementById("giveAmount").value;

  if (hideAttributes) extras += " hide_attributes";
  document.getElementById("output").value = 

`item:
  item: ${itemID}${extras}
  display-name: "${name}"
  lore: ${lore}
  craftable: ${craftable}
  recipe:
    - ${c1}
    - ${c2}
    - ${c3}
    - ${c4}
    - ${c5}
    - ${c6}
    - ${c7}
    - ${c8}
    - ${c9}
  recipe-give-amount: ${giveAmount}

`

if (slot != '') document.getElementById("output").value += `slot: ${slot}\n`;

if (damage != '') document.getElementById("output").value += `base-damage: ${damage}\n`;
if (attackSpeed != '') document.getElementById("output").value += `base-attack-speed: ${attackSpeed}\n`;
if (durability != '') document.getElementById("output").value += `effective-durability: ${durability}\n`;

document.getElementById("output").value +=
`

effects:
${document.getElementById("effects").value}
conditions: ${document.getElementById("conditions").value}
`;
}
