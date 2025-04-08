let students = [];
let editingIndex = -1;

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const className = document.getElementById("class").value.trim();
    const average = parseFloat(document.getElementById("average").value);

    if (name.length < 3 || name.length > 20 || age < 10 || age > 100 || className.length < 2 || average < 1 || average > 5) {
        alert("Kérlek ellenőrizd az adatokat!");
        return;
    }

    const student = { name, age, className, average };

    if (editingIndex === -1) {
        students.push(student);
    } else {
        students[editingIndex] = student;
        editingIndex = -1;
    }

    this.reset();
    renderTable();
});

function renderTable() {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    const searchName = document.getElementById("searchName").value.toLowerCase();
    const searchClass = document.getElementById("searchClass").value.toLowerCase();

    students
        .filter(s =>
            s.name.toLowerCase().includes(searchName) &&
            s.className.toLowerCase().includes(searchClass)
        )
        .forEach((s, i) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${s.name}</td>
                <td>${s.age}</td>
                <td>${s.className}</td>
                <td>${s.average.toFixed(1)}</td>
                <td class="actions">
                    <button onclick="editStudent(${i})">✏️</button>
                    <button onclick="deleteStudent(${i})">🗑️</button>
                </td>
            `;
            tbody.appendChild(row);
        });
}

function editStudent(index) {
    const s = students[index];
    document.getElementById("name").value = s.name;
    document.getElementById("age").value = s.age;
    document.getElementById("class").value = s.className;
    document.getElementById("average").value = s.average;
    editingIndex = index;
}

function deleteStudent(index) {
    if (confirm("Biztosan törlöd ezt a sort?")) {
        students.splice(index, 1);
        renderTable();
    }
}

function sortTable(colIndex) {
    const keyMap = ["name", "age", "className", "average"];
    const key = keyMap[colIndex];
    students.sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    });
    renderTable();
}

document.getElementById("searchName").addEventListener("input", renderTable);
document.getElementById("searchClass").addEventListener("input", renderTable);

renderTable();
