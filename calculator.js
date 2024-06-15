

// Let the html content load before javascript executes.
document.addEventListener("DOMContentLoaded", function() {
    let results = [];

    while (true) {
        let x = prompt("Give a X value.", "23");
        if (x === null) break; // If client presses cancel
        if (isNaN(x)) {
            x = "Invalid";
        } else {
            x = parseInt(x);
        }

        let op = prompt("Give an operator like '*', '/', '+', '-', '%'", "+");
        if (op === null) break; // If client presses cancel

        let y = prompt("Give a Y value.", "78");
        if (y === null) break; // If client presses cancel
        if (isNaN(y)) {
            y = "Invalid";
        } else {
            y = parseInt(y);
        }

        let result;
        if (x === "Invalid" || y === "Invalid") {
            result = "Invalid Input";
        } else {
            result = calculate(x, op, y);
            if (result === null) result = "Invalid Operator";
        }

        updateTable(x, op, y, result);
        if (typeof result === "number") {
            results.push(result);
        }
    }

    if (results.length > 0) {
        let min = Math.min(...results);
        let max = Math.max(...results);
        let sum = results.reduce((a, b) => a + b, 0);
        let avg = sum / results.length;
        updateSummaryTable(min, max, avg, sum);
    }

    function calculate(x, op, y) {
        switch (op) {
            case "+":
                return x + y;
            case "-":
                return x - y;
            case "*":
                return x * y;
            case "/":
                return x / y;
            case "%":
                return x % y;
            default:
                return null;
        }
    }

    function updateTable(x, op, y, result) {
        const table = document.getElementById("resultsTable").getElementsByTagName("tbody")[0];
        const newRow = table.insertRow();

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);

        cell1.textContent = x;
        cell3.textContent = y;
        cell2.textContent = op;
        cell4.textContent = result;
    }

    function updateSummaryTable(min, max, avg, total) {
        const summaryDiv = document.getElementById("summary");
        let summaryHTML = "<h2>Summary</h2>";
        summaryHTML += "<table border='1'><tr><th>Minimum</th><th>Maximum</th><th>Average</th><th>Total</th></tr>";
        summaryHTML += "<tr><td>" + min + "</td><td>" + max + "</td><td>" + avg + "</td><td>" + total + "</td></tr></table>";
        summaryDiv.innerHTML = summaryHTML;
    }
});
