class Etudiant {
  constructor(nom, age) {
    this.nom = nom;
    this.age = age;
  }

  info() {
    return `Etudiant nom: ${this.nom} a pour age: ${this.age}`;
  }
}

class Etudiant2 {
  constructor(nom, age) {
    this.nom = nom;
    this.age = age;
  }

  info() {
    return `Etudiant2 nom: ${this.nom} a pour age: ${this.age}`;
  }
}

const etudiants = [
  new Etudiant("Rami", 23),
  new Etudiant2("Mohamed", 21),
];

const studentList = document.querySelector("#student-list");
const studentTotal = document.querySelector("#student-total");
const averageAge = document.querySelector("#average-age");
const resultCount = document.querySelector("#result-count");
const searchInput = document.querySelector("#student-search");
const studentForm = document.querySelector("#student-form");
const nameInput = document.querySelector("#student-name");
const ageInput = document.querySelector("#student-age");
const toast = document.querySelector("#toast");

function createStudentCard(etudiant, index) {
  const card = document.createElement("article");
  card.className = "student-card";

  const top = document.createElement("div");
  top.className = "card-top";

  const identity = document.createElement("div");
  identity.className = "student-identity";

  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = etudiant.nom
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toLocaleUpperCase("fr");

  const nameGroup = document.createElement("div");
  const name = document.createElement("h3");
  name.className = "student-name";
  name.textContent = etudiant.nom;

  const identifier = document.createElement("div");
  identifier.className = "student-index";
  identifier.textContent = `OBJ-${String(index + 1).padStart(3, "0")}`;

  nameGroup.append(name, identifier);
  identity.append(avatar, nameGroup);

  const badge = document.createElement("span");
  badge.className = "type-badge";
  badge.textContent = etudiant instanceof Etudiant2 ? "Etudiant2" : "Etudiant";

  top.append(identity, badge);

  const footer = document.createElement("div");
  footer.className = "card-footer";

  const ageLabel = document.createElement("span");
  ageLabel.className = "data-label";
  ageLabel.textContent = "Âge";

  const age = document.createElement("span");
  age.className = "data-value";
  age.textContent = `${etudiant.age} ans`;

  footer.append(ageLabel, age);
  card.append(top, footer);

  return card;
}

function renderStudents() {
  const query = searchInput.value.trim().toLocaleLowerCase("fr");
  const filteredStudents = etudiants
    .map((etudiant, index) => ({ etudiant, index }))
    .filter(({ etudiant }) => etudiant.nom.toLocaleLowerCase("fr").includes(query));

  studentList.replaceChildren();
  studentTotal.textContent = String(etudiants.length).padStart(2, "0");

  const ageAverage = etudiants.length
    ? Math.round(etudiants.reduce((total, etudiant) => total + etudiant.age, 0) / etudiants.length)
    : null;
  averageAge.replaceChildren();
  averageAge.append(document.createTextNode(ageAverage === null ? "—" : String(ageAverage)));
  if (ageAverage !== null) {
    const unit = document.createElement("small");
    unit.textContent = "ans";
    averageAge.append(unit);
  }

  resultCount.textContent = `${filteredStudents.length} résultat${filteredStudents.length > 1 ? "s" : ""}`;

  if (filteredStudents.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";

    const title = document.createElement("strong");
    title.textContent = etudiants.length === 0 ? "Aucune instance pour le moment" : "Aucun étudiant trouvé";

    const message = document.createElement("span");
    message.textContent =
      etudiants.length === 0
        ? "Créez votre premier objet avec le formulaire."
        : "Essayez une autre recherche ou créez une nouvelle instance.";

    emptyState.append(title, message);
    studentList.append(emptyState);
    return;
  }

  filteredStudents.forEach(({ etudiant, index }) => {
    studentList.append(createStudentCard(etudiant, index));
  });
}

let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2400);
}

searchInput.addEventListener("input", renderStudents);

studentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nom = nameInput.value.trim();
  const age = Number(ageInput.value);
  if (!nom || !Number.isInteger(age) || age < 1 || age > 120) {
    return;
  }

  etudiants.push(new Etudiant(nom, age));
  studentForm.reset();
  searchInput.value = "";
  renderStudents();
  nameInput.focus();
  showToast(`${nom} a rejoint les instances.`);
});

renderStudents();
