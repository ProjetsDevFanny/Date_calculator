const start = document.getElementById("start_date");
const end = document.getElementById("end_date");
let startValue = start.value;



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
