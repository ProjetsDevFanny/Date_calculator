const start = document.getElementById("start_date");
let startValue = start.value;
const end = document.getElementById("end_date");

// Récupère la date du jour dans les petits calendriers des inputs:
const dateActuelle = new Date();
// console.log(dateActuelle);

// Converti date du jour en format date pour l'input = "yyyy-MM-dd".

let iso = dateActuelle.toISOString();

const dateDestructuring = (iso) => {
  let newDateInput = iso.split("T")[0];
  let [y, m, d] = newDateInput.split("-");
  return [y, m, d].join("-");
};

// Affichage de la date du jour dans l'input start
start.value = dateDestructuring(iso);
end.value = start.value;

// Fonction qui converti la date de l'input "end" en objet date (pour faire + 1 ensuite)
function ajouterJours(dateString, jours) {
  let date = new Date(dateString); // Convertir la chaîne en objet Date
  date.setDate(date.getDate() + jours); // Ajouter les jours
  return date.toISOString().split("T")[0]; // Retourner en format YYYY-MM-DD
}

// Condition pour ne pas avoir une date de départ < date du jour
start.addEventListener("change", function () {
  if (startValue < dateDestructuring(iso)) {
    startValue = dateDestructuring(iso); // Forcer la date actuelle si l'entrée est invalide
  }
});

// Additionne 1 à date start et réinjecte dans input end
start.addEventListener("change", function () {
  let startValue = this.value; // Récupérer la valeur de l'input (YYYY-MM-DD)
  let newDateEnd = ajouterJours(startValue, 1); // Ajouter 1 jour
  end.value = newDateEnd;
});

// Condition pour ne pas avoir une date de fin < date de départ + 1
end.addEventListener("change", function () {


});
