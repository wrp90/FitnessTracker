const http = require('http');
const es6Renderer = require('express-es6-template-engine');
const express = require('express');
const hostname = '127.0.0.1';
const path = require('path');
const { User, Exercise} = require('./models');
const port = 3000;
const app = express();
const server = http.createServer(app);

app.engine('html', es6Renderer);

app.set('views', 'templates');
app.set('view engine', 'html');
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static('templates'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.get('/workouts', (req, res) => {
    res.render('workouts');
});

app.get('/users/exercises', async (req, res) => {
    const users = await User.findAll({
        include: [{
            model: Exercise
        }]
    });
    res.json(users);
});

app.post('/register', async (req, res) => {
    console.log(req.body)
    const { first_name, last_name, email, password } = req.body;
    const newUser = await User.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
    })
    res.send(newUser);
});

app.post('/exercise', async (req, res) => {
    const { name, type, difficulty, instructions, user_id } = req.body;
    const newExercise = await Exercise.create({
        name: name,
        type: type,
        difficulty: difficulty,
        instructions: instructions,
        user_id: user_id
    })
    res.send(newExercise);
});

app.get('/exercises/:user_id', async (req, res) => {
    const { user_id } = req.params
    const exercises = await Exercise.findAll({
        where: {user_id: user_id}
    });
    res.json(exercises);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});




