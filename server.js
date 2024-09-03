const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads folder

// Use Routes
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

mongoose.connect('mongodb://localhost:27017/PIM3', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
