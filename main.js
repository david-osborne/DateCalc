//initial date set
var date = new Date(Date.now());
var yearSet = date.getFullYear();
var monthSet = date.getMonth();
var monthIndex = monthSet;
var dateSet = date.getDate();
var daySet = date.getDay();
//global array lists
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var daysLong = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var daysShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

function clearMonths() {
    //clear month container
    document.getElementById("monthContainer").innerHTML = "";
}

// Create month function, pass in year & month
function createMonth(year, month) {
    //set month value
    var dateSet = new Date(year, month);
    //create month div inside monthContainer div
    var divCreateMonth = document.createElement("div");
    divCreateMonth.id = "createMonth" + month;
    divCreateMonth.className = "createMonth";
    document.getElementById("monthContainer").appendChild(divCreateMonth);
    //create month header inside month div
    var divMonthHeader = document.createElement("div");
    divMonthHeader.id = "monthHeader";
    divMonthHeader.className = "monthHeader";
    divMonthHeader.innerHTML = months[dateSet.getMonth()] + ", " + dateSet.getFullYear();
    document.getElementById("createMonth" + month).appendChild(divMonthHeader);
    //create DOW header bar
    for (var index = 0; index < 7; index++) {
        var divDOWHeader = document.createElement("div");
        if (index == 0) {
            divDOWHeader.className = "dowHeaderSun";
        }
        else if (index == 6) {
            divDOWHeader.className = "dowHeaderSat";
        }
        else {
            divDOWHeader.className = "dowHeader";
        }
        divDOWHeader.innerHTML = daysShort[index];
        document.getElementById("createMonth" + month).appendChild(divDOWHeader);
    }
    //write days
    var firstDay = new Boolean(false);
    //cycle thru days of the month
    for (var index = 1; index <= getDaysInMonth(year, month); index++) {
        var tempDate = new Date(dateSet.getFullYear(), dateSet.getMonth(), index);
        var dateToday = new Date(Date.now());
        var dateMatch = new Boolean(false);
        if (tempDate.getFullYear() == dateToday.getFullYear() && tempDate.getMonth() == dateToday.getMonth() && tempDate.getDate() == dateToday.getDate()) {
            dateMatch = true;
        }
        //find first day of month
        while (firstDay == false) {
            var firstBlank = new Boolean(false);
            for (var i = 0; i < 7; i++) {
                if (tempDate.getDay() != i) {
                    var divDate = document.createElement("div");
                    if (firstBlank == false) {
                        divDate.className = "dowBlankFirst";
                        firstBlank = true;
                    }
                    else {
                        divDate.className = "dowBlank";
                    }
                    divDate.innerHTML = "";
                    document.getElementById("createMonth" + month).appendChild(divDate);
                }
                else {
                    break;
                }
            }
            firstDay = true;
        }

        var divDate = document.createElement("div");
        divDate.id = "dow" + index;
        if (tempDate.getDay() == 0) {
            divDate.className = "dowFirstDOW";
            if (dateMatch == true) {
                divDate.className = "dowFirstDOWToday";
            }
        }
        else {
            divDate.className = "dow";
            if (dateMatch == true) {
                divDate.className = "dowToday";
            }
        }
        divDate.innerHTML = tempDate.getDate().toString();
        document.getElementById("createMonth" + month).appendChild(divDate);
    }
}

function setMonthHeader() {
    document.getElementById("monthHeader").innerHTML = months[monthSet] + ", " + yearSet;
}

function getDaysInMonth(year, month) {
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    return daysInMonth;
}

function indexMonth(count, year, month) {
    for (var index = 0; index < count; index++) {
        createMonth(year, month);
        monthIndex = monthIndex + 1;
    }
}

window.onload = function () {
    monthIndex = monthSet;
    indexMonth(1, yearSet, monthSet);

    document.getElementById("buttonMonth").onclick = function () {
        clearMonths();
        document.getElementById("buttonMonth+1").disabled = false;
        monthIndex = monthSet;
        indexMonth(1, yearSet, monthSet);
    }

    document.getElementById("buttonMonth+1").onclick = function () {
        indexMonth(1, yearSet, monthIndex);
    }

    document.getElementById("buttonMonth+3").onclick = function () {
        clearMonths();
        document.getElementById("buttonMonth+1").disabled = false;
        monthIndex = monthSet;
        for (var i = 0; i < 3; i++) {
            indexMonth(1, yearSet, monthSet + i);

        }
    }
    document.getElementById("buttonFullYear").onclick = function () {
        clearMonths();
        monthIndex = 0;
        document.getElementById("buttonMonth+1").disabled = true;
        for (var i = 0; i < 12; i++) {
            indexMonth(1, yearSet, monthIndex);
        }
    }
}