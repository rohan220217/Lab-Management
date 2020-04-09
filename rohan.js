const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.json());

mongoose.connect('mongodb://localhost/Lib_Management', { useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => {
        const port = process.env.PORT || 4000;
        app.listen(port, () => console.log(`Listening on port ${port}...`));
        console.log('Connected to MongoDB...');
    })
    .catch(err => console.error('Could not connect to MongoDB...'));


const adminRoutes = require('./routes/admin');
const libRoutes = require('./routes/lib');
const authRoutes = require('./routes/auth');
const error = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(libRoutes);
app.use(authRoutes);
app.use(error.get404)

