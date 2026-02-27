let selectedId = null;

// ADD STUDENT
function addStudent() {

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let course = document.getElementById("course").value;

    fetch("/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name,
            age: age,
            course: course
        })
    })
    .then(function() {
        clearFields();
        getStudents();
    });
}


// GET STUDENTS
function getStudents() {

    fetch("/students")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        var list = document.getElementById("list");
        list.innerHTML = "";

        data.forEach(function(student) {

            var li = document.createElement("li");

            li.innerHTML =
                student.name + " | " +
                student.age + " | " +
                student.course +
                "<br>" +
                "<button class='edit-btn' onclick='editStudent(\"" + student._id + "\", \"" + student.name + "\", \"" + student.age + "\", \"" + student.course + "\")'>Edit</button>" +
                "<button class='delete-btn' onclick='deleteStudent(\"" + student._id + "\")'>Delete</button>";

            list.appendChild(li);
        });
    });
}


// EDIT STUDENT
function editStudent(id, name, age, course) {
    selectedId = id;

    document.getElementById("name").value = name;
    document.getElementById("age").value = age;
    document.getElementById("course").value = course;
}


// UPDATE STUDENT
function updateStudent() {

    if (selectedId == null) {
        alert("Please select a student first");
        return;
    }

    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var course = document.getElementById("course").value;

    fetch("/students/" + selectedId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name,
            age: age,
            course: course
        })
    })
    .then(function() {
        selectedId = null;
        clearFields();
        getStudents();
    });
}


// DELETE STUDENT
function deleteStudent(id) {

    fetch("/students/" + id, {
        method: "DELETE"
    })
    .then(function() {
        getStudents();
    });
}


// CLEAR INPUT FIELDS
function clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("course").value = "";
}


// LOAD DATA WHEN PAGE OPENS
getStudents();