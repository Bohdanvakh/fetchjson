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

// Callback hell

function task1(done) {
    setTimeout(() => {
        done(null, 'Task 1 is completed.');
    }, 1000);                                              // returns text after 1 second
};

function task2(result1, done) {
    setTimeout(() => {
        done(null, 'Task 2 is completed with ' + result1);
    }, 1000);
};

function task3(result2, done) {
    setTimeout(() => {
        done(null, 'Task 3 is completed with ' + result2);
    }, 1000);
};

task1((err, dataForTask2) => {
    if(err) return console.log(err);

    task2(dataForTask2, (err, dataForTask3) => {
        if(err) return console.log(err);

        task3(dataForTask3, (err, data) => {
            if(err) return console.log(err);
                
            console.log(data);
            console.log('All tasks are completed');
        });
    });
});

task1((err, text) => {
    console.log(text);                                     // returns text after 1 second
});

task1((err, text) => {
    console.log(err);                                      // returns error from task1 (null);
});


// promises

function funcWithPromise1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Task 1 is completed.');
        }, 1000);
    });
}

function funcWithPromise2(result1) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Task 2 is completed with ' + result1);
        }, 1000);
    });
}

function funcWithPromise3(result2) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Task 3 is completed with ' + result2);
        }, 1000);
    });
}

funcWithPromise1()
    .then(result1 => funcWithPromise2(result1))
    .then(result2 => funcWithPromise3(result2))
    .then(result3 => {
        console.log(result3);
        console.log('All tasks are completed');
    })
    .catch(err => console.log(err));