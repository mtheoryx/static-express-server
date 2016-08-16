const express = require('express');
const _ = require('lodash');
const fs = require('fs');

const app = express();

var users = [];

fs.readFile('users.json', {encoding: 'utf8'}, (err, data) => {
    if( err ) {
        throw err;
    }
    JSON.parse(data).forEach(user => {
        user.name.full = _.startCase(`${user.name.first} ${user.name.last}`);
        users.push(user);
    });
});

app.get('/', (req, res) => {
    var buffer = '';

    users.forEach(user => {
       buffer += `<a href="/${user.username}">${user.name.first} ${user.name.last}</a><br>`;
    });

    res.send(buffer);
});

app.get(/big.*/, (req, res, next) => {
    console.log('BIG USER ACCESSED!');
    next();
});

app.get('/:username', (req, res) => res.send(`Hello, ${req.params.username}`));

const server = app.listen(3000, () => console.log(`Server running at http://localhost:${server.address().port}`));
