interface User {
    id: number;
    name: string;
    email: string;
}

const database: { users: User[] } = {
    users: [
        { id: 1, name: "Богдан", email: "bohdan@gmail.com" },
        { id: 2, name: "Олена", email: "olena@gmail.com" },
        { id: 3, name: "Максим", email: "maksym@gmail.com" }
    ]
}

type findCallback = (error: string | null, user: User | null) => void;

function find(id: number, callback: findCallback): void {
    const user = database.users.find(user => user.id === id);

    if(user) {
        callback(null, user);
    } else {
        callback('Error', null);
    }
}

function doSthElse(data: User): void {
    console.log('I did something else with user ', data);
}

find(1, (err, data) => {
    if(data) {
        doSthElse(data);
    } else {
        console.log(err);
    }
});


async function getUserId(): Promise<number> {
    return 43;
}

console.log(getUserId());

// TS callbacks practise

type setUserCallback = (
    err: string | null,
    user: User | null,
    userSet: User[] | null
) => void;

function setUser(user: User, callback: setUserCallback): void {
    database.users.push(user);

    if(database.users.includes(user)) {
        callback(null, user, database.users);
    } else {
        callback('User was not added to the database', null, null);
    }
}

setUser({id: 12, name: 'Bohdan', email: 'lorem@gmail.com'}, (err, user, userSet) => {
    if(err) {
        console.log(err);
    } else {
        console.log('User ', user?.name, ' was added to the database in ', userSet);
    }
});

// work with file in TS

import fs from 'fs';

interface NextUser {
    firstName: string,
    lastName: string
}

type callbackBody = (
    error: Error | null,
    items: NextUser[] | null,
    user: NextUser | null
) => void;

function saveUser(user: NextUser, callback: callbackBody): void {
    const filePath: string = 'users.json';

    fs.readFile(filePath, 'utf8', (err, data) => {
        if(err) {
            return callback(err, null, null);
        }

        let items: NextUser[] = [];

        try {
            items = JSON.parse(data);
        } catch (e) {
            return callback(e as Error, null, null);
        }

        items.push(user);

        fs.writeFile(filePath, JSON.stringify(items), 'utf8', (error: Error) => {
            if(error) return callback(error, null, null);

            callback(null, items, user);
        });
    });
}

const user: NextUser = { firstName: "Bohdan10", lastName: "Vakh10" };

saveUser(user, (err, items, user) => {
    if(err) return console.log(err);

    console.log('User:', user?.firstName, user?.lastName, 'was saved');
});