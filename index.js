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

async function updateCourse(id) {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        name: "Node Course",
        author: "Abhinav",
      },
    },
    {
      new: true,
    }
  );
  console.log(result);
}

async function removeCourse(_id) {
  const result = await Course.deleteOne({ _id });
  console.log(result);
}

removeCourse("5f15df2fc218b01dd8281232");
