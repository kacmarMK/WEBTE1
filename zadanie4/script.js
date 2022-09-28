
function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}

function validate(id, errorID) {
    var value = document.getElementById(id).value;
    
    if(value == "") {
        printError(errorID, "Nesprávna hodnota, zadajte číslo <1;9>");
        document.getElementById(id).style.borderColor = "red";
        return false;
    }
    else if((value < 1) || (value > 9)) {
        printError(errorID, "Nesprávna hodnota, zadajte číslo <1;9>");
        document.getElementById(id).style.borderColor = "red";
        return false;
    }
    else {
        printError(errorID, "");
        document.getElementById(id).style.borderColor = "black";
        return true;
    }
}

function generateTable(x, y) {
    var result;
    var xAxis = document.getElementById(x).value;
    var yAxis = document.getElementById(y).value;
    
    var table = document.createElement("table");
    var divtab = document.createElement("div");

    for(var i = 0; i <= yAxis; i++) {
        var row = document.createElement("tr");
        for(var j = 0; j <= xAxis; j++) {
            var col = document.createElement("td");
            if((i == 0) && (j != 0)) {
                result = document.createTextNode("X = " + j);
                var spanX = document.createElement("span");
                spanX.style.fontWeight = "bold";
                spanX.appendChild(result);
                col.appendChild(spanX);
            }
            else if((j == 0) && (i != 0)){
                result = document.createTextNode("Y = " + i);
                var spanY = document.createElement("span");
                spanY.style.fontWeight = "bold";
                spanY.appendChild(result);
                col.appendChild(spanY);
            }
            else if((i == 0) && (j == 0)){
                result = document.createTextNode(" ");
                col.appendChild(result);
            }
                 
            else {
                result = document.createTextNode("" + i * j);
                col.appendChild(result);
            }
            row.appendChild(col);
        }
        table.appendChild(row);
    }
    var close = document.createElement("span");
    close.id= "close";
    close.addEventListener("click", function() {
        var obj = document.getElementById("mainTable");
        if(obj != null) {
            obj.remove();
        }});
    close.innerHTML = 'X';
    divtab.appendChild(close);

    table.style.backgroundColor = "white";
    table.setAttribute("class", "table");
    divtab.appendChild(table);
    divtab.id = "mainTable";


    var elementToAppend = document.getElementById("main"); 
    elementToAppend.appendChild(divtab);
}

function showTable(idX, errorX, idY, errorY) {
    var obj = document.getElementById("mainTable");
    if(obj != null) {
        obj.remove();
    }
    if(validate(idX, errorX)){
        if(validate(idY, errorY)){
            generateTable(idX, idY);
            return;
        }
    }
    validate(idY, errorY);
    //alert("wtf bro");
    return;
}