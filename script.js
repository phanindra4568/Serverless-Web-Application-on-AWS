const insertUrl = "https://xyz123.execute-api.ap-south-1.amazonaws.com/prod/insert";
const getUrl = "https://xyz123.execute-api.ap-south-1.amazonaws.com/prod/students";

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
