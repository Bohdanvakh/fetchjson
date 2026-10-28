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

const user: NextUser = { firstName: "Bohdan1", lastName: "Vakh1" };

saveUser(user, (err, items, user) => {
    if(err) return console.log(err);

    console.log('User:', user?.firstName, user?.lastName, 'was saved');
});

// practise promises with TS

function readUsers(filePath: string): Promise<NextUser[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if(err) {
                return reject(err);
            }

            resolve(JSON.parse(data));
        });
    });
}

function writeUsers(filePath: string, user: NextUser): Promise<NextUser[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }

            let items: NextUser[] = [];

            try {
                items = data.trim() === '' ? [] : JSON.parse(data);
            } catch (e) {
                return reject(e);
            }

            items.push(user);

            fs.writeFile(filePath, JSON.stringify(items), 'utf8', (error) => {
                if (error) return reject(error);

                resolve(items);
            });
        });
    });
}

const user11: NextUser = { firstName: "Bohdan11", lastName: "Vakh11" };
const user12: NextUser = { firstName: "Bohdan12", lastName: "Vakh12" };

const filePath: string = 'users.json';

// writeUsers(filePath, user11)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// writeUsers(filePath, user12)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));