"use strict";
let table = document.querySelector(".table");
let add_data = document.querySelector(".add_data");
let name_input = document.getElementById("name_input");
let city_input = document.getElementById("city_input");
let country_input = document.getElementById("country_input");
let btn = document.querySelector(".btn");

let table_data = (data) => {
  // console.log(data.length);
  let tbody = document.querySelector("tbody");
  for (let i = 0; i < data.length; i++) {
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.className = "name_data";
    td1.innerHTML = data[i]["name"];
    let td2 = document.createElement("td");
    td2.className = "city_data";
    td2.innerHTML = data[i]["city"];
    let td3 = document.createElement("td");
    td3.className = "country_data";
    td3.innerHTML = data[i]["country"];
    let td4 = document.createElement("td");
    td4.setAttribute("id", `${data[i]["id"]}`);
    td4.innerHTML = `<a href="#" id="edit_data">Edit</a>`;
    let td5 = document.createElement("td");
    td5.setAttribute("id", `${data[i]["id"]}`);
    td5.innerHTML = `<a href="#" id="delete_data">Delete</a>`;

    tr.append(td1, td2, td3, td4, td5);
    tbody.append(tr);
  }
  
};

let url = "https://623d62aedb0fc039d4b6cc13.mockapi.io/sab";

// MEthod: GET
fetch(url)
  .then((res) => res.json())
  .then((data) => table_data(data));

table.addEventListener("click", (e) => {
  //   console.log("hello");
  e.preventDefault();
  let delbtn = e.target.id == "delete_data";
  let editbtn = e.target.id == "edit_data";

  let id = e.target.parentElement.id;
  // Delete-Remove the existing post from
  // Method:DELETE
  if (delbtn) {
      if(confirm("wanna delele?"))
    fetch(`${url}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => location.reload())
      .catch((err) => console.log(err));
  }

  if (editbtn) {
    let parent = e.target.parentElement.parentElement;
    let name_data = parent.querySelector(".name_data").innerHTML;
    let city_data = parent.querySelector(".city_data").textContent;
    let country_data = parent.querySelector(".country_data").textContent;
    // console.log(name_data);
    name_input.value = name_data;
    city_input.value = city_data;
    country_input.value = country_data;
  }
  btn.addEventListener("click", (e) => {
    length();
    e.preventDefault();
    fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name_input.value,
        city: city_input.value,
        country: country_input.value,
      }),
    })
      .then((res) => res.json())
      .then(() => location.reload())
      .catch((err) => console.log(err));
  });
});

// create-insert new post
// Method: post
add_data.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log("apple")
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name_input.value,
      city: city_input.value,
      country: country_input.value,
    }),
  })
    .then((res) => res.json())
    .then(() => location.reload())
    .catch((err) => console.log(err));
});
function searchFun() {
  //   let input, filter, table, tr, td, txtValue;

  //Intialising Variables
  let input = document.getElementById("myInput");
  let filter = input.value.toUpperCase();
  let body_table = document.getElementById("body_table");
  // console.log(body_table);
  let tr = body_table.getElementsByTagName("tr");
  // console.log(tr.innerText);
  let category = document.getElementById("category").value;

  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[category];
    // console.log(td);
    if (td) {
    let  txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function length(){
  let body_table = document.getElementById("body_table");
  // console.log(body_table);
  let tr = body_table.getElementsByTagName("tr");
  console.log(tr.length);

}


