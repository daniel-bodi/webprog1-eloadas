const API_URL = 'http://gamf.nhely.hu/ajax2/';
const CODE = 'GFEKAKasd123qwe';
const POST_METHOD = 'POST';

const STUDENT_FORM = document.getElementById('student-form');
const STUDENT_TABLE = document.getElementById('table-body');
const FORM_HEADING = document.querySelector('#form-section h2');
const FORM_SUBMIT_BUTTON = document.querySelector('#form-section button');

let editMode = false;
let currentId = null;

async function loadStudents() {
    const formData = new FormData();
    formData.append('op', 'read');
    formData.append('code', CODE);

    const response = await fetch(API_URL, {
        method: POST_METHOD,
        body: formData
    });

    const result = await response.json();
    if (result.list) {
        STUDENT_TABLE.innerHTML = '';
        result.list.forEach(addStudentRow);
    }

    const heightSum = result.list.reduce((sum, student) => sum + parseInt(student.height), 0);
    const heightAvg = heightSum / result.list.length;
    const heightMax = Math.max(...result.list.map(student => student.height));

    const dataSectionContainer = document.getElementById('data-section-container');
    dataSectionContainer.innerHTML = `
        <p><b>Magasságok összege:</b> ${heightSum}</p>
        <p><b>Magasságok átlaga:</b> ${heightAvg}</p>
        <p><b>Magasságok maximuma:</b> ${heightMax}</p>
        `;
}

window.addEventListener('DOMContentLoaded', async () => {
    await loadStudents();
});

STUDENT_FORM.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);

    if (name.length < 3 || name.length > 20 || height < 120 || height > 300 || weight < 30 || weight > 250) {
        alert('Kérlek ellenőrizd az adatokat!');
        return;
    }

    const formData = new FormData(STUDENT_FORM);
    formData.append('op', editMode ? 'update' : 'create');
    formData.append('code', CODE);
    formData.append('name', name);
    formData.append('height', height.toString());
    formData.append('weight', weight.toString());
    if (editMode) {
        formData.append('id', currentId);
    }

    const response = await fetch(API_URL, {
        method: POST_METHOD,
        body: formData
    });

    const result = await response.text();
    if (result === '1') {
        alert(editMode ? 'Rekord frissítve!' : 'Rekord hozzáadva!');
        STUDENT_FORM.reset();

        editMode = false;
        currentId = null;
        FORM_HEADING.textContent = 'Új diák hozzáadása';
        FORM_SUBMIT_BUTTON.textContent = 'Hozzáadás';

        await loadStudents();
    } else {
        alert("Hiba történt a mentéskor!");
    }
});

function addStudentRow(student) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${student.id}</td>
    <td>${student.name}</td>
    <td>${student.height}</td>
    <td>${student.weight}</td>
    <td>
      <button onclick="fillUpdateStudentForm('${student.id}', '${student.name}', '${student.height}', '${student.weight}', this.parentElement.parentElement)">✏️</button>
      <button onclick="deleteStudent('${student.id}', this.parentElement.parentElement)">🗑️</button>
    </td>
  `;
    STUDENT_TABLE.appendChild(tr);
}

async function fillUpdateStudentForm(id, name, height, weight, row) {
    FORM_HEADING.textContent = `Diák szerkesztése: [${id}]`;
    FORM_SUBMIT_BUTTON.textContent = 'Szerkesztés véglegesítése';

    document.getElementById('name').value = name;
    document.getElementById('height').value = height;
    document.getElementById('weight').value = weight;

    editMode = true;
    currentId = id;
}

async function deleteStudent(id, row) {
    const formData = new FormData();
    formData.append('op', 'delete');
    formData.append('code', CODE);
    formData.append('id', id);

    const res = await fetch(API_URL, {
        method: POST_METHOD,
        body: formData
    });

    const result = await res.text();
    if (result === '1') {
        row.remove();
    }
}

document.querySelectorAll("#student-table th").forEach((th, index) => {
    let asc = true;
    th.addEventListener("click", () => {
        sortTable(document.getElementById("student-table"), index, asc);
        asc = !asc;
    });
});

function sortTable(table, columnIndex, asc = true) {
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((a, b) => {
        const aText = a.cells[columnIndex].textContent.trim();
        const bText = b.cells[columnIndex].textContent.trim();

        const aVal = isNaN(aText) ? aText.toLowerCase() : parseFloat(aText);
        const bVal = isNaN(bText) ? bText.toLowerCase() : parseFloat(bText);

        if (aVal < bVal) return asc ? -1 : 1;
        if (aVal > bVal) return asc ? 1 : -1;
        return 0;
    });

    rows.forEach(row => tbody.appendChild(row));
}

