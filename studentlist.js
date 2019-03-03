"use strict";

let arrOfStudents = [];
let filteredList = [];
let currentFilter;
let filter;
let expelledStudents = [];
let arrayOfBlood = [];
const myName = {
  fullname: "Simona Semancova",
  firstname: "Simona",
  lastname: "Semancova",
  house: "Gryffindor",
  image: "-image-",
  blood: "Pure"
};
let template = document.querySelector("#listtemplate").content;
let parent = document.querySelector("main");

window.addEventListener("DOMContentLoaded", init);

function init() {
  document.querySelector("#Gryffindor").addEventListener("click", filterList);
  document.querySelector("#Hufflepuff").addEventListener("click", filterList);
  document.querySelector("#Ravenclaw").addEventListener("click", filterList);
  document.querySelector("#Slytherin").addEventListener("click", filterList);
  document.querySelector("#btnAll").addEventListener("click", filterList);
  document.querySelector("#sort1n").addEventListener("click", sortBy1n);
  document.querySelector("#sort2n").addEventListener("click", sortBy2n);

  getJSON2();
}

function getJSON() {
  fetch("http://petlatkea.dk/2019/students1991.json")
    .then(res => res.json())
    .then(pushToArray);
}

function getJSON2() {
  fetch("http://petlatkea.dk/2019/hogwarts/families.json")
    .then(res => res.json())
    .then(pushToBloodArray);
}

function pushToBloodArray(names) {
  arrayOfBlood = names;
  getJSON();
}

const student = {
  fullname: "-Student fullname-",
  house: "-Student house-",
  firstname: "-First name-",
  lastname: "-last name-",
  image: "-image-",
  blood: "-blood-"
};

function pushToArray(jsonData) {
  console.table(jsonData);
  arrOfStudents.push(myName);
  jsonData.forEach(jsonObject => {
    const student = Object.create(jsonObject);

    const firstSpace = jsonObject.fullname.indexOf(" ");
    const lastSpace = jsonObject.fullname.lastIndexOf(" ");

    //I copy info of each student from the JSON to array
    student.fullname = jsonObject.fullname;
    student.house = jsonObject.house;
    student.firstname = jsonObject.fullname.slice(0, firstSpace);
    student.lastname = jsonObject.fullname.slice(lastSpace + 1);
    student.image =
      "images/" +
      student.lastname.toLowerCase() +
      "_" +
      jsonObject.fullname.substring(0, 1).toLowerCase() +
      ".png";

    if (arrayOfBlood.half.includes(student.lastname)) {
      student.blood = "half";
    } else if (arrayOfBlood.pure.includes(student.lastname)) {
      student.blood = "pure";
    } else {
      student.blood = "muggle";
    }

    //I push each student to the array- arrOffStudents:
    arrOfStudents.push(student);
    filteredList = arrOfStudents;
  });
  showStudentList(arrOfStudents);
}

function filterList() {
  currentFilter = this.getAttribute("id");
  if (currentFilter === "btnAll") {
    showStudentList(arrOfStudents);
    filteredList = arrOfStudents;
  } else {
    function filterByHouse(singleStudent) {
      return singleStudent.house === currentFilter;
    }
    filteredList = arrOfStudents.filter(filterByHouse);

    console.log(filteredList);
    document.querySelector("main").innerHTML = "";
    showStudentList(filteredList);
  }
}

function sortBy1n() {
  function sort(a, b) {
    //console.log(arrOfStudents);
    if (a.firstname < b.firstname) {
      return -1;
    } else {
      return 1;
    }
  }
  filteredList.sort(sort);
  document.querySelector("main").innerHTML = "";
  showStudentList(filteredList);
  console.log(filteredList);
}

function sortBy2n() {
  function sort(a, b) {
    //console.log(arrOfStudents);
    if (a.lastname < b.lastname) {
      return -1;
    } else {
      return 1;
    }
  }

  document.querySelector("main").innerHTML = "";
  filteredList.sort(sort);
  showStudentList(filteredList);
  console.log(filteredList);
}

function showStudentList(data) {
  data.forEach(singleStudent => {
    //console.log(singleStudent.fullname);
    const clone = template.cloneNode(true);

    clone
      .querySelector("#rmbutton")
      .addEventListener("click", () => showStudentInfo(singleStudent));

    clone.querySelector("#firstN").textContent = singleStudent.firstname;
    clone.querySelector("#lastN").textContent = singleStudent.lastname;
    clone.querySelector("#house").textContent = singleStudent.house;

    clone.querySelector("article").id = singleStudent.firstname;
    clone
      .querySelector("#expelb")
      .addEventListener("click", () => expel(singleStudent));

    parent.appendChild(clone);
  });
}

function showStudentInfo(singleStudent) {
  const modal = document.querySelector(".modal");
  const modalImg = document.getElementById("img");

  modal.querySelector(".imgs").src = singleStudent.image;
  modal.querySelector(".name").textContent = singleStudent.firstname;
  modal.querySelector(".surname").textContent = singleStudent.lastname;
  modal.querySelector(".house").textContent = singleStudent.house;
  modal.querySelector(".blood").textContent = singleStudent.blood;

  if (singleStudent.lastname === "Semancova") {
    modalImg.src = `semancova_s.png`;
    modalImg.style.width = "13vw";
  }

  modal.style.display = "grid";
  if (singleStudent.house === "Gryffindor") {
    modal.style.background = "#ce3a0a";
  } else if (singleStudent.house === "Hufflepuff") {
    modal.style.background = "yellow";
  } else if (singleStudent.house === "Ravenclaw") {
    modal.style.background = "blue";
  } else if (singleStudent.house === "Slytherin") {
    modal.style.background = "green";
  }
  const spanclose = document.querySelector(".close");
  spanclose.addEventListener("click", () => (modal.style.display = "none"));
}

function expel(singleStudent) {
  if (singleStudent.firstname === "Simona") {
    let no = document.querySelector(".no");
    no.style.display = "block";
    let closeb = document.getElementById("closeb");
    closeb.addEventListener("click", function() {
      no.style.display = "none";
    });
  } else {
    //console.log(singleStudent.firstname);
    let id = singleStudent.firstname;

    let onestudent = document.querySelector("#" + id);

    onestudent.querySelector("#firstN").textContent = singleStudent.firstname;
    onestudent.querySelector("#lastN").textContent = singleStudent.lastname;
    onestudent.querySelector("#house").textContent = singleStudent.house;

    expelledStudents.push(onestudent);

    document.querySelector("#expelledS").innerHTML = expelledStudents.length;

    document.querySelector("#expelled").appendChild(onestudent);
  }
}
