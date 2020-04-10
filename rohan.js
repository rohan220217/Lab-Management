const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const helmet = require('helmet');
const compression = require('compression-;')

const User = require('./models/user');
const MONGODB_URI = 'mongodb://localhost/Lib_Management';

const app = express();

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.json());


const adminRoutes = require('./routes/admin');
const libRoutes = require('./routes/lib');
const authRoutes = require('./routes/auth');
const error = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});
app.use(flash());
app.use(helmet());
app.use(compression());
app.use('/admin', adminRoutes);
app.use(libRoutes);
app.use(authRoutes);
app.use(error.get404)

mongoose.connect( MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const port = process.env.PORT || 4000;
        app.listen(port, () => console.log(`Listening on port ${port}...`));
        console.log('Connected to MongoDB...');
    })
    .catch(err => console.error('Could not connect to MongoDB...'));
