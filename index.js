const express = require('express');
const _ = require('lodash');
const fs = require('fs');
const pug = require('pug');
const engines = require('consolidate');

const app = express();

var users = [];

fs.readFile('users.json', {encoding: 'utf8'}, (err, data) => {
    if( err ) throw err;

    JSON.parse(data).forEach(user => {
        const full = _.startCase(`${user.name.first} ${user.name.last}`);
        const editedUser = Object.assign({}, user);

        editedUser.name.full = full;

        users.push(user);
    });
});

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => res.render('index', { users: users }));

app.get('/:username', (req, res) => {
    res.render('user.pug', { user: users.find(user => user.username === req.params.username) })
});

const server = app.listen(3000, () => console.log(`Server running at http://localhost:${server.address().port}`));
