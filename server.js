const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String
});

const Student = mongoose.model("Student", studentSchema);

// CREATE
app.post("/students", async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
});

// READ
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// UPDATE
app.put("/students/:id", async (req, res) => {
    const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updatedStudent);
});

// DELETE
app.delete("/students/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
});

app.listen(5000, () => console.log("Server running on port 5000"));