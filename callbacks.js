const database = {
  users: [
    { id: 1, name: "Богдан", email: "bohdan@gmail.com" },
    { id: 2, name: "Олена", email: "olena@gmail.com" },
    { id: 3, name: "Максим", email: "maksym@gmail.com" }
  ]
};

const activeUsers = [];
const notFountIds = [];

function find(id, callback) {
    const user = database.users.find(user => user.id === id);

    if(user) {
        callback(null, user);
    } else {
        callback('lalala error', null);
    }
}

function doSthElse(data) {
    console.log('I did somethng else with User: ', data);
}

find(1, (error, data) => {
    if (error) {
        console.log(error);
    } else {
        doSthElse(data);
    }
});

function getData(id, callback) {
    const user = database.users.find(user => user.id === id);

    if(user) {
        callback(null, saveToActive, null);
    } else {
        callback('User no found', null, saveToNotFound(id));
    }
}

// one more example

const users = [];

function setUser(user, callback) {
    users.push(user);

    callback(users);
}

setUser({firstName: 'Bohdan', lastName: 'Vakh'}, (users) => {
    console.log(users);
});

setUser({firstName: 'Bohdan2', lastName: 'Vakh2'}, (users) => {
    console.log(users);
});

// work with file

import fs from 'fs';

function saveUser(user, callback) {
    const filePath = 'users.json';

    fs.readFile(filePath, 'utf8', (error, data) => {
        let items = [];
        if(!error) {
            items = JSON.parse(data);
        } else {
            return callback(error);
        }

        items.push(user);

        fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf8', (error) => {
            if (error) return callback(error);

            callback(null, items, user)
        });
    });
}

const user = { firstName: "Bohdan", lastName: "Vakh" };

saveUser(user, (error, items, user) => {
    if(error) return console.log(error);

    console.log('User:', user.firstName, user.lastName, 'was saved');
});