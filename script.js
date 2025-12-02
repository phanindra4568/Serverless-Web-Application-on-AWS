const API_URL = "https://abcdefgh.execute-api.us-east-1.amazonaws.com/prod/students";

document.getElementById("studentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ name, email })
    });

    alert("Student added!");
    loadStudents();
});

async function loadStudents() {
    const response = await fetch(API_URL);
    const students = await response.json();

    let html = "<ul>";
    students.forEach(s => {
        html += `<li>${s.name} (${s.email})</li>`;
    });
    html += "</ul>";

    document.getElementById("students").innerHTML = html;
}

loadStudents();
