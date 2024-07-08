const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

var fname;

app.use(express.static("public"));

app.get("/",(req,res)=>{
  res.render("index.ejs");
})

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where you want to store uploaded files
    cb(null, './public/video');
  },
  filename: (req, file, cb) => {
    // Rename file to avoid name collisions
    fname = file.originalname;
    cb(null, "input.mp4");
  }
});

// Initialize multer instance
const upload = multer({ storage });

// Route to handle file uploads
app.post('/upload', upload.array('files'), (req, res) => {
  // Log uploaded files
  console.log('Uploaded files:', req.files);
  
  // Respond with success message
  const numberOfFilesUploaded = req.files.length;
  res.render('index.ejs',{file : numberOfFilesUploaded,
  fn : "input.mp4"});
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
