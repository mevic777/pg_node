const { getCategories, getCategory } = require("./index.js");
const express = require("express");
const path = require("path");
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, "ejs-views", `${page}.ejs`);

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening to port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles'));

app.get("/", async (req, res) => {
    res.render(createPath("index"));
});

app.get("/contacts", (req, res) => {
    res.render(createPath("contacts"));
});

app.get("/about-us", (req, res) => {
    res.redirect("/contacts");
});

app.get("/categories/:id", async (req, res) => {
    const categoryID = req.params.id;
    const category = await getCategory(categoryID);
    res.render(createPath("category", category[0]));
});

app.get('/categories', async (req, res) => {
    const categories = await getCategories();
    res.render(createPath('categories'), { categories });
});

app.post('/add-category', (req, res) => {
    res.send(req.body);
});

app.get('/add-category', (req, res) => {
    res.render(createPath('add-category'));
});

app.use((req, res) => {
    res.status(404).render(createPath("error"));
});
