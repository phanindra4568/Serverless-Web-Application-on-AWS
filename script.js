const API = "https://3te6sd6tt9.execute-api.us-east-2.amazonaws.com/prod";

async function addStudent() {
    const body = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value
    };

    await fetch(API + "/insert", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });

    alert("Student Added");
    getStudents();
}

async function getStudents() {
    let res = await fetch(API + "/students");
    let data = await res.json();

    let html = "";
    data.forEach(s => {
        html += `<p>${s.name} - ${s.email} - ${s.course}</p>`;
    });

    document.getElementById("students").innerHTML = html;
}

getStudents();
