const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

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
    try {
        console.log("saved")
        const newRecord = new Attendance(req.body);
        await newRecord.save();
        res.status(200).json({ message: 'Saved to MongoDB' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save' });
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
