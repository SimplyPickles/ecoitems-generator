function generate() {
    let extras = "";
    
    document.getElementById("output").value =
`item:
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

effects:
${getValue("effects")}
  - id: add_stat
    args:
      stat: health 
      amount: ${getValue("health")}
            
${getValue("conditions")}
`;
}

function getValue(id) {
  let output = document.getElementById(id);
  
  if (output.value == "" & id != "effects") {
    if (["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"].includes(id) & output.placeholder == "") {
      return "\"\"";
    } else {
      return output.placeholder;
    }
  } else {
    return output.value;
  }
}