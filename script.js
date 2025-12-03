const insertUrl = "https://xocixmhog3.execute-api.us-east-2.amazonaws.com/prod/";
const getUrl = "https://xocixmhog3.execute-api.us-east-2.amazonaws.com/prod/";

document.getElementById("studentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value
    };

    await fetch(insertUrl, {
        method: "POST",
        body: JSON.stringify(data)
    });

    loadStudents();
});

async function loadStudents() {
    const res = await fetch(getUrl);
    const students = await res.json();

    document.getElementById("students").innerHTML =
        students.map(s => `<p>${s.name} - ${s.email} - ${s.course}</p>`).join("");
}

loadStudents();
