const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.error("error", err));

const courseShema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPubished: Boolean,
});

const Course = mongoose.model("Course", courseShema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Abhinav",
    tags: ["frontend", "Angular"],
    isPubished: false,
  });
  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const pageNunber = 1;
  const pageSize = 1;
  const coursesInDb = await Course.find()
    .sort({ name: 1 })
    .skip((pageNunber - 1) * pageSize)
    .limit(pageSize)
    .select({ name: 1, tags: 1 });
  console.log(coursesInDb);
}

async function updateCourse(id) {}
