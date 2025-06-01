const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://yashmevat16:yashmevat@cluster0.bi4podh.mongodb.net/attendanceDB?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((data)=>{console.log("connected")});

const attendanceSchema = new mongoose.Schema({
    section: String,
    data: String,
    timestamp: { type: Date, default: Date.now },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

app.post('/submit-attendance', async (req, res) => {
    app.post('/submit-attendance', async (req, res) => {
    try {
        console.log("Received body:", req.body);
        const newRecord = new Attendance(req.body);
        const saved = await newRecord.save();
        console.log("Saved to DB:", saved);
        res.status(200).json({ message: 'Saved to MongoDB', data: saved });
    } catch (error) {
        console.error("Save error:", error);
        res.status(500).json({ error: 'Failed to save', detail: error.message });
    }
});

});

app.listen(port, () => console.log(`Server running on port ${port}`));
