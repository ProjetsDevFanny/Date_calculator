const start = document.getElementById("start_date");
const end = document.getElementById("end_date");
let startValue = start.value;
let endValue = end.value;
const valider = document.querySelector("button");

// FONCTIONS

// Convertit date du jour en format date pour l'input = "yyyy-MM-dd".
const dateActuelle = new Date(); // Récupère la date du jour et le converti en objet date()
let iso = dateActuelle.toISOString();

const dateDestructuring = (iso) => {
  let newDateInput = iso.split("T")[0];
  let [y, m, d] = newDateInput.split("-");
  return [y, m, d].join("-");
};
start.value = dateDestructuring(iso); // Affichage de la date du jour dans l'input start

// Fonction qui convertit la date de l'input en objet date (pour faire + 1 ensuite)
function ajouterJours(dateString, jours) {
  let date = new Date(dateString); // Convertir la chaîne en objet Date
  date.setDate(date.getDate() + jours); // Ajouter les jours
  return date.toISOString().split("T")[0]; // Retourner en format YYYY-MM-DD
}
end.value = ajouterJours(dateActuelle, 1); // Affichage de la date de fin (start + 1) dans l'input end

// EVENTLISTENERS

// Condition pour ne pas avoir une date de départ < date du jour
start.addEventListener("change", function () {
  let startValue = this.value;
  if (startValue < dateDestructuring(iso)) {
    start.value = dateDestructuring(iso); // Forcer la date actuelle si l'entrée est invalide
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
  let startValue = start.value; // Récupérer la valeur de l'input (YYYY-MM-DD)
  let newDateEnd = ajouterJours(startValue, 1); // Ajouter 1 jour
  let endValue = end.value;
  if (endValue < newDateEnd) {
    end.value = newDateEnd;
  }
});

// Affichage du prix total par nuit à la validation du formulaire

// Écouteur d'événement pour le bouton "Valider"
valider.addEventListener("click", calculerDiffJour);

function calculerDiffJour() {
  // Récupérer les dates de départ (start) et d'arrivée (end)
  let startValue = start.value; // Date d'arrivée (=chaînes de caractères)
  let endValue = end.value; // Date de départ (=chaînes de caractères)

  // Vérifier si les deux dates sont définies
  if (startValue && endValue) {
    // Convertir les chaînes de caractères en objets Date
    let startDate = new Date(startValue);
    let endDate = new Date(endValue);

    // Calculer la différence en millisecondes
    let diffTime = endDate - startDate;

    // Convertir la différence en jours
    let diffDays = diffTime / (1000 * 3600 * 24);

    // Calculer le prix total du séjour
    let nightPrice = document.getElementById("nightPrice").textContent;
    let nightPrineNumber = parseInt(nightPrice);

    let total = diffDays * nightPrineNumber;

    // Afficher le prix total du séjour
    let totalSpan = document.getElementById("total");
    totalSpan.textContent = total;
  }
}
