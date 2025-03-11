const start = document.getElementById("start_date");
const end = document.getElementById("end_date");
const valider = document.querySelector("button");

// FONCTIONS

// Convertit date du jour en format date pour l'input = "yyyy-MM-dd".
const dateActuelle = new Date(); // Récupère la date du jour et le converti en objet date()
const iso = dateActuelle.toISOString();

const dateDestructuring = (iso) => {
  const newDateInput = iso.split("T")[0];
  const [y, m, d] = newDateInput.split("-");
  return [y, m, d].join("-");
};

// Désactive les dates passées pour "start" dans le calendrier
start.setAttribute("min", dateDestructuring(iso));
start.value = dateDestructuring(iso); // Affichage de la date du jour dans l'input start

// Conseil ChatGPT:
// Utiliser toLocaleDateString() au lieu de split("T")[0]
// La méthode toISOString() renvoie l'heure UTC, ce qui peut provoquer un décalage de date selon le fuseau horaire. Pour éviter cela :
// function formaterDate(date) {
//   return date.toLocaleDateString("fr-CA"); // Format YYYY-MM-DD
// }

// Au lieu de :
// function formaterDate(date) {
//   return date.toISOString().split("T")[0];
// }

// Fonction qui convertit la date de l'input en objet date (pour faire + 1 ensuite)
function ajouterJours(dateString, jours) {
  const date = new Date(dateString); // Convertir la chaîne en objet Date
  date.setDate(date.getDate() + jours); // Ajouter les jours
  return date.toISOString().split("T")[0]; // Retourner en format YYYY-MM-DD
}
// Désactive les dates antérieures à "start + 1" pour "end"
end.setAttribute("min", ajouterJours(dateActuelle, 1));
end.value = ajouterJours(dateActuelle, 1); // Affichage de la date de fin (start + 1) dans l'input end

// EVENTLISTENERS

// Ecouteur d'évènement sur l'input start
start.addEventListener("change", function () {
  const startValue = this.value;
  // Condition pour ne pas avoir une date de fin < date de départ + 1
  if (startValue < dateDestructuring(iso)) {
    start.value = dateDestructuring(iso);
  }
  // Additionne 1 à date start et réinjecte dans input end
  end.setAttribute("min", ajouterJours(start.value, 1));
  end.value = ajouterJours(start.value, 1); // Mettre à jour end automatiquement
});

// Condition pour ne pas avoir une date de fin < date de départ + 1
end.addEventListener("change", function () {
  const startValue = start.value; // Récupérer la valeur de l'input (YYYY-MM-DD)
  const newDateEnd = ajouterJours(startValue, 1); // Ajouter 1 jour
  const endValue = end.value;
  if (endValue < newDateEnd) {
    end.value = newDateEnd;
  }
});

// Conseil ChatGPT:
// Utiliser Math.max() pour éviter les comparaisons de dates avec des chaînes de caractères
// Plutôt que comparer if (endValue < newDateEnd), qui compare des chaînes, fais ceci :
// end.value = formaterDate(new Date(Math.max(new Date(endValue), new Date(newDateEnd))));

// Affichage du prix total par nuit à la validation du formulaire

// Écouteur d'événement pour le bouton "Valider"
valider.addEventListener("click", function (event) {
  event.preventDefault();
  calculerDiffJour();
});

function calculerDiffJour() {
  // Récupérer les dates de départ (start) et d'arrivée (end)
  const startValue = start.value; // Date d'arrivée (=chaînes de caractères)
  const endValue = end.value; // Date de départ (=chaînes de caractères)

  // Vérifier si les deux dates sont définies
  if (startValue && endValue) {
    // Convertir les chaînes de caractères en objets Date
    const startDate = new Date(startValue);
    const endDate = new Date(endValue);

    // Calculer la différence en millisecondes
    const diffTime = endDate - startDate;

    // Convertir la différence en jours
    const diffDays = diffTime / (1000 * 3600 * 24);

    // Calculer le prix total du séjour
    const nightPrice = document.getElementById("nightPrice").textContent;
    const nightPriceNumber = parseInt(nightPrice);

    const total = diffDays * nightPriceNumber;

    // Afficher le prix total du séjour
    const totalSpan = document.getElementById("total");
    totalSpan.textContent = total;
  }
}
