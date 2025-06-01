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
    try {
        console.log("Received POST /submit-attendance");
        console.log("Body:", req.body);  // This will show if section and data exist

        const { section, data } = req.body;

        if (!section || !data) {
            return res.status(400).json({ error: "Missing section or data" });
        }

        const newRecord = new Attendance({ section, data });
        await newRecord.save();

        res.status(200).json({ message: 'Saved to MongoDB' });
    } catch (error) {
        console.error("Error saving to MongoDB:", error);
        res.status(500).json({ error: 'Failed to save' });
    }
});


app.listen(port, () => console.log(`Server running on port ${port}`));
