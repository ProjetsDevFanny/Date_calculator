const start = document.getElementById("start_date");
const end = document.getElementById("end_date");

// Récupère la date du jour dans les petits calendriers des inputs:
const dateActuelle = new Date();
// console.log(dateActuelle);

// Convert today date to input format = "yyyy-MM-dd".
let Timestamp = Date.parse(dateActuelle);
// console.log(Timestamp);

let iso = dateActuelle.toISOString();
console.log(iso);

const dateDestructuring = (iso) => {
  let newDateInput = iso.split("T")[0];
  let [y, m, d] = newDateInput.split("-");
  return [y, m, d].join("-");
};

console.log(dateDestructuring(iso));

// Affichage de la date du jour dans l'input start
start.value = dateDestructuring(iso);
