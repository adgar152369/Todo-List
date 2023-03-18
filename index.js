const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require('method-override')
const Task = require('./models/Task');
const SavedTask = require('./models/SavedTask');

// Connect to Mongo Database
async function dbConnect() {
    await mongoose.connect('mongodb://127.0.0.1:27017/todo');
    console.log('connected to mongodb!')
}
dbConnect().catch(err => console.log(err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static('public'));
app.use('/js', express.static('js'));
app.set('view engine', 'ejs');

// Routes

// get
app.get('/', (req, res) => {
    res.render('home')
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find({});
    const savedTasks = await SavedTask.find({});
    res.render('index', { tasks, savedTasks });
});

app.get('/tasks/new', (req, res) => {
    res.render('new');
});

app.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('show', { task });
});

// post
app.post('/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    console.log(newTask)
    try {
        await newTask.save();
        res.redirect('/tasks');
    } catch (error) {
        console.log(error)
    }
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect('/tasks');
});

// create saved task
app.get('/task/:id', async (req, res) => {
    const { id } = req.params;
    // const task = await Task.findById(id);
    const task = await Task.findOneAndUpdate({ _id: id}, {isSaved: true}, {new: true});
    const newSavedTask = new SavedTask({
        name: task.name,
        description: task.description
    });

    newSavedTask.save();
    res.json(newSavedTask);
});


// delete
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    res.redirect('/tasks');
})

app.listen(3000, () => {
    console.log('listening on port 3000!')
})