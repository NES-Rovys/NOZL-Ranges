var table = document.getElementById("table-body");
var weapons = [];
var points = [];
var level = [];
var kraken = [];
var hidden = [];
var maxPoints = [];
var dupe = [];
var max;
var current = 0;
var remaining = 3;
var background;
var ban = false;
var limit = false;
function loadValues() {
    for (i=0; i<table.rows.length; i++) {
        weapons[i] = table.rows[i].cells[0].innerHTML;
        points[i] = table.rows[i].cells[1].innerHTML;
        level[i] = 1;
        kraken[i] = table.rows[i].cells[5].innerHTML;
        hidden[i] = false;
        dupe[i] = 0;
    }
    maxPoints[0] = table.rows[1].cells[8].innerHTML;
    maxPoints[1] = table.rows[2].cells[8].innerHTML;
    maxPoints[2] = table.rows[3].cells[8].innerHTML;
    max = maxPoints[0];
    createTables();
}

function createTables() {
    search = document.getElementById("searchWeapon").value;
    var check = 0;
    if (search != "Search") {
        for (i=0; i<weapons.length; i++) {
            if (weapons[i].toLowerCase().includes(search.toLowerCase())) {
                hidden[i] = false;
            } else {
                hidden[i] = true;
            }
        }
    } else  {
        for (i=0; i<weapons.length; i++) {
            hidden[i] = false;
        }
    }

    table = document.getElementById("comp");
    table.innerHTML = "<thead> <tr style='background-color:#34a853; font-size=20px'> <th></th> <th>Weapons</th> <th>Points</th> </tr> </thead> <tbody id='table-body'>";
    for (i=0; i<weapons.length; i++) {
        if (level[i] == 3 || level[i] == 4) {
            for (j=0; j<dupe[i]; j++) {
                if (check % 2 == 0) {
                    background = 1;
                } else {
                    background = 2;
                }
                check++;
                table.innerHTML += "<tr id='c" + i + "' class='tableText" + background + "' onclick='outComp(id)'> <td> <img src='img/" + (weapons[i].replace(".", "")).replace("'", "") + ".png' width='60px' height='60px'> </td> <td>" + weapons[i] + "</td> <td>" + points[i] + "</td> </tr>";
            }
        }
    }
    table.innerHTML += "</tbody>";
    check = 0;

    table = document.getElementById("table-body")
    table.innerHTML = "<thead> <tr style='background-color:#34a853; font-size=20px'> <th></th> <th>Weapons</th> <th>Points</th> </tr> </thead> <tbody id='table-body'>";
    for (i=0; i<weapons.length; i++) {
        if ((level[i] == 1 || level[i] == 3) && hidden[i] == false) {
            if (check % 2 == 0) {
                background = 1;
            } else {
                background = 2;
            }
            check++;
            table.innerHTML += "<tr id='a" + i + "' class='tableText" + background + "' onclick='toComp(id)'> <td> <img src='img/" + (weapons[i].replace(".", "")).replace("'", "") + ".png' width='60px' height='60px'> </td> <td>" + weapons[i] + "</td> <td>" + points[i] + "</td> </tr>"
        }
        }
    table.innerHTML += "</tbody>";
    check = 0;

    table = document.getElementById("full")
    table.innerHTML = "<thead> <tr style='background-color:color-mix(in srgb,#34a853, black 50%); font-size=20px'> <th></th> <th>Weapons</th> <th>Points</th> </tr> </thead> <tbody id='table-body'>";
    for (i=0; i<weapons.length; i++) {
        if ((level[i] == 2 || level[i] == 4) && hidden[i] == false) {
            if (check % 2 == 0) {
                background = 3;
            } else {
                background = 4;
            }
            check++;
            table.innerHTML += "<tr id='u" + i + "' class='tableText" + background + "'> <td> <img src='img/" + (weapons[i].replace(".", "")).replace("'", "") + ".png' width='60px' height='60px'> </td> <td>" + weapons[i] + "</td> <td>" + points[i] + "</td> </tr>"
        }
        }
    table.innerHTML += "</tbody>";
}

function toComp(id) {
    id = id.substring(1);
    level[id] = 3;
    dupe[id]++;
    current += Number(points[id]);
    remaining--;
    document.getElementById("pointCounter").innerHTML = "Points Remaining: " + (max - current);
    if (kraken[id] == "+1") {
        ban = true;
    }
    checkComp();
}

function outComp(id) {
    id = id.substring(1);
    dupe[id]--;
    if (dupe[id] == 0) {
        level[id] = 1;
    }
    current -= Number(points[id]);
    remaining++;
    document.getElementById("pointCounter").innerHTML = "Points Remaining: " + (max - current);
    if (kraken[id] == "+1") {
        ban = false;
    }
    checkComp();
}

function checkComp() {
    for (i=0; i<weapons.length; i++) {
        if (level[i] == 1 || level[i] == 3) {
            if (points[i] > max - current - 2 * remaining || current == max || (ban && kraken[i] == "+1" && limit)) {
                if (level[i] == 3) {
                    level[i] = 4;
                } else {
                    level[i] = 2;
                }
            }
        } else if (level[i] == 2 || level[i] == 4) {
            if (points[i] <= max - current - 2 * remaining && (!ban || kraken[i] != "+1" || !limit)) {
                if (level[i] == 4) {
                    level[i] = 3;
                } else {
                    level[i] = 1;
                }
            }
        }
    }
    createTables();
}

function showMenu() {
    document.getElementById("menu").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.menuButton')) {
      var dropdowns = document.getElementsByClassName("menu");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}

function changeMax(id) {
    max = maxPoints[id];
    document.getElementById("menuButton").innerHTML = document.getElementById(id).innerHTML;
    remaining = Number(document.getElementById(id).innerHTML) - 1;
    for (i=0; i<weapons.length; i++) {
        if (level[i] != 1) {
            level[i] = 1;
        }
    }
    document.getElementById("pointCounter").innerHTML = "Points Remaining: " + max;
    createTables();
}

function swapLimit() {
    if (limit) {
        limit = false;
    } else {
        limit = true;
    }
    checkComp();
}