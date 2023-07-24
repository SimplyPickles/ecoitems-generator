let data = {};
let triggers = [];
let itemArguments = [];

fetch("./data.json")
  .then((r) => {
  return r.json();
}).then((d) => { data = d });

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
    triggersFormatted += `- ${triggers[i]}\n      `;
  }
  
  for (let i = 0; i < itemArguments.length; i++) {
    argumentsFormatted += `${itemArguments[i]}: ${document.getElementById(i.toString()).value}\n      `;
  }

  document.getElementById("effects").value += 
  `- id: ${document.getElementById("effectsDropdown").options[document.getElementById("effectsDropdown").selectedIndex].text}
    args:
      ${argumentsFormatted}
    triggers:
      ${triggersFormatted}
  `;
}

function generate() {
  let extras = [];
  
  document.getElementById("output").value = 
`${getValue("name").toLocaleLowerCase().replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_")}:
    item: ${getValue("item")} ${extras}
    display-name: "${getValue("name")}"
    lore:
        - "${getValue("lore").toString()}"
    craftable: true
    recipe:
        - ${getValue("c1")}
        - ${getValue("c2")}
        - ${getValue("c3")}
        - ${getValue("c4")}
        - ${getValue("c5")}
        - ${getValue("c6")}
        - ${getValue("c7")}
        - ${getValue("c8")}
        - ${getValue("c9")}
    recipe-give-amount: ${getValue("giveAmount")}


base-damage: ${getValue("damage")}
base-attack-speed: ${getValue("attackSpeed")}
effective-durability: ${getValue("durability")}
slot: ${getValue("slot")}

effects: ${getValue("effects")}
conditions: ${getValue("conditions")}
`;
}

function getValue(id) {
  let output = document.getElementById(id);
  
  if (output.value == "" & id != "effects" & id != "conditions") {
    if (["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"].includes(id) & output.placeholder == "") {
      return "\"\"";
    } else {
      return output.placeholder;
    }
  } else {
    if (output.value == "" & (id == "effects" || id == "conditions")) {
      return "[]";
    } else {
      if (id == "effects" || id == "conditions") {
        return "\n" + output.value;
      } else {
        return output.value;
      }
    }
  }
}
