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