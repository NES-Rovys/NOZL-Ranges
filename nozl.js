var table = document.getElementById("table-body");
var weapons = [];
var points = [];
var max;

function loadValues() {
    for (i=0; i<table.rows.length; i++) {
        weapons[i] = table.rows[i].cells[0].innerHTML;
        points[i] = table.rows[i].cells[1].innerHTML;
    }
    max = table.rows[1].cells[8].innerHTML;
}