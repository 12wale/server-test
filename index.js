require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Content = require('./models/Content');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://wlydrftm399_db_user:wlydrftm399_db_user@cluster0.ienuulg.mongodb.net/?appName=Cluster0';

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    // Seed initial data if not exists
    const count = await Content.countDocuments();
    if (count === 0) {
      await Content.create({});
      console.log('Initial content created');
    }
  })
  .catch(err => console.error(err));

// Routes
app.get('/api/content', async (req, res) => {
  try {
    const content = await Content.findOne();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/content', async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    // Update the first document found, or create if it doesn't exist (upsert-like behavior for single doc app)
    let content = await Content.findOne();
    if (!content) {
      content = new Content({ title, description, imageUrl });
    } else {
      content.title = title;
      content.description = description;
      content.imageUrl = imageUrl;
    }
    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
