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