// class object first example
class Etudiant {
  constructor(nom, age) {
    this.nom = nom;
    this.age = age;
  }

  info() {
    return `Etudiant nom: ${this.nom} a pour age: ${this.age}`;
  }
}class Etudiant2 {
  constructor(nom, age) {
    this.nom = nom;
    this.age = age;
  }

  info() {
    return `Etudiant2 nom: ${this.nom} a pour age: ${this.age}`;
  }
}

let et1 = new Etudiant("Rami", 23);
console.log(et1.info());
let et2 = new Etudiant("Mohamed", 21);
console.log(et2.info());
