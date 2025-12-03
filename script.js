const apiBase = "https://6uau83iv7b.execute-api.us-east-2.amazonaws.com/prod"; // replace with your API URL

// Add student
document.getElementById('studentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const course = document.getElementById('course').value;

    await fetch(`${apiBase}/insertStudentData`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, course})
    });

    loadStudents();
});

// Load students
async function loadStudents() {
    const res = await fetch(`${apiBase}/getStudents`);
    const students = await res.json();
    const list = document.getElementById('studentList');
    list.innerHTML = '';
    students.forEach(s => {
        const li = document.createElement('li');
        li.textContent = `${s.name} - ${s.email} - ${s.course}`;
        list.appendChild(li);
    });
}

// Initial load
loadStudents();
