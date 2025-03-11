const start = document.getElementById("start_date");
const end = document.getElementById("end_date");
const valider = document.querySelector("button");

// Convertit date du jour en format date pour l'input = "yyyy-MM-dd".
const dateActuelle = new Date().toLocaleDateString("fr-CA").split("T")[0]; // (= new Date() convertion en objet date())

// Conseil ChatGPT:
// la méthode toISOString() renvoie l'heure UTC, ce qui peut provoquer un décalage de date selon le fuseau horaire.
// new Date().toISOString().split("T")[0];
// Utiliser plutôt:
//new Date().toLocaleDateString("fr-CA"); // Format YYYY-MM-DD

// Date start calcul
start.setAttribute("min", dateActuelle); // Désactive les dates passées pour "start" dans le calendrier
start.value.min = dateActuelle; // L'utilisateur ne peut pas sélectionner date départ < date actuelle
start.value = dateActuelle; // Affichage de la date du jour dans l'input start

// Date end calcul
end.setAttribute("min", ajouterJours(dateActuelle, 1)); // Désactive les dates antérieures à "start + 1" pour "end"
end.value.min = ajouterJours(dateActuelle, 1); // L'utilisateur ne peut pas sélectionner date départ < date début + 1
end.value = ajouterJours(dateActuelle, 1); // Affichage de la date de fin (start + 1) dans l'input end

// FONCTIONS

// Fonction qui convertit la date de l'input en objet date (pour faire + 1 ensuite)
function ajouterJours(dateString, jours) {
  const date = new Date(dateString); // Convertir la chaîne en objet Date
  date.setDate(date.getDate() + jours); // Ajouter les jours
  return date.toLocaleDateString("fr-CA").split("T")[0]; // Retourner en format YYYY-MM-DD
}

// EVENTLISTENERS

// Ecouteur d'évènement sur l'input start
start.addEventListener("change", function () {
  if (end.value < start.value) {
    end.value = ajouterJours(start.value, 1); // Additionne 1 à date start et réinjecte dans input end
  }
});

// Condition pour ne pas avoir une date de fin < date de départ + 1
end.addEventListener("change", function () {
  if (end.value < start.value) {
    start.value = ajouterJours(end.value, -1);
  }
});

// Conseil ChatGPT:
// Utiliser Math.max() pour éviter les comparaisons de dates avec des chaînes de caractères
// Plutôt que comparer if (endValue < newDateEnd), qui compare des chaînes, fais ceci :
// end.value = formaterDate(new Date(Math.max(new Date(endValue), new Date(newDateEnd))));

// FONCTION = Affichage du prix total par nuit :
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
    // Prof = Math.abs(endDate - startDate); mais apparemment pas besoin (voir explications tout en bas du code)

    // Convertir la différence en jours (Math.ceil()= arrondit 1,5 jours = 2 jours facturés)
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

    // Calculer le prix total du séjour
    const nightPrice = document.getElementById("nightPrice").textContent;
    const nightPriceNumber = parseInt(nightPrice);

    const total = diffDays * nightPriceNumber;

    // Afficher le prix total du séjour
    const totalSpan = document.getElementById("total");
    totalSpan.textContent = total;
  }
}

start.addEventListener("change", calculerDiffJour);
end.addEventListener("change", calculerDiffJour);

calculerDiffJour();

// EXPLICATIONS: Math.abs():
// Comparaison des deux méthodes :

// Méthode avec différence en millisecondes :
// Fonctionne comme prévu.
// Évite d’additionner de la complexité inutile.
// Si tu veux simplement la différence de temps, c'est la méthode la plus directe et la plus claire.

// Méthode avec Math.abs() :
// Convient si tu veux éviter des valeurs négatives et que l’ordre des dates importe peu.
// Peut introduire une complexité inutile si tu veux juste une différence simple entre les deux dates.

// Conclusion :
// Il est mieux d'utiliser la méthode de la différence de date en millisecondes, comme tu le fais dans ton code.
// Elle est simple, efficace, et ne nécessite pas d’outils supplémentaires comme Math.abs() dans ce cas précis.
