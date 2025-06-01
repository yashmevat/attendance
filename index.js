const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Middleware to parse JSON body
app.use(express.json());

// Middleware to log request body for debugging
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

mongoose.connect('mongodb+srv://yashmevat16:yashmevat@cluster0.bi4podh.mongodb.net/attendanceDB?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const attendanceSchema = new mongoose.Schema({
  section: String,
  data: String,
  timestamp: { type: Date, default: Date.now },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);


app.get('/get-attendance', async (req, res) => {
  try {
    const allAttendance = await Attendance.find({});
    res.status(200).json(allAttendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});



app.post('/submit-attendance', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Request body missing' });
    }

    const { section, data } = req.body;

    if (!section || !data) {
      return res.status(400).json({ error: "Missing section or data" });
    }

    const newRecord = new Attendance({ section, data });
    await newRecord.save();

    res.status(200).json({ message: 'Saved to MongoDB' });
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
    res.status(500).json({ error: 'Failed to save' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
