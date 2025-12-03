const API_INSERT = "https://YOUR_API_ID.execute-api.YOUR_REGION.amazonaws.com/prod/insert";
const API_GET = "https://YOUR_API_ID.execute-api.YOUR_REGION.amazonaws.com/prod/students";

// ------------------ INSERT STUDENT -------------------
document.getElementById("studentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value
    };

    try {
        const response = await fetch(API_INSERT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)   // IMPORTANT → sends JSON body
        });

        const result = await response.json();
        alert("Student Added Successfully!");
        console.log(result);

        loadStudents(); // reload list
    } catch (error) {
        console.error("Error:", error);
    }
});

// ------------------ GET ALL STUDENTS -------------------
async function loadStudents() {
    try {
        const response = await fetch(API_GET);
        const students = await response.json();

        let html = "<ul>";
        students.forEach(s => {
            html += `<li>${s.name} — ${s.email} — ${s.course}</li>`;
        });
        html += "</ul>";

        document.getElementById("students").innerHTML = html;
    } catch (error) {
        console.error("Error loading students:", error);
    }
}

// load on page open
loadStudents();
