import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/config.js';

const userContent = [
    {
        id: 1,
        name: "user",
        mail: "user",
        password: "user",
        role:"user"
    },
    {
        id: 2,
        name:"test",
        mail: "test",
        password: "test",
        role:"admin"
    }
];

export const getUser = (req, res) => {
    res.send(userContent);
}

export const addUser = (req, res) => {
    const userToAdd = req.body;
    const index = userContent.findIndex(user => user.mail === userToAdd.mail);

    if(index < 0){
        userContent.push({
            id: userContent.length+1,
            name: userToAdd.name,
            mail: userToAdd.mail,
            password: userToAdd.password,
            role: "user"
        })
        
        res.send({
            status: "OK",
            description: "ADD USER",
            userContent
        });
    } else {
        res.send({
            status: "NOT OK",
            description: "USER ADD PREV",
            userContent
        });
    }
        
}

export const validateCredential = (req, res) => {
    const credentials = req.body;
    let indexUser = userContent.findIndex(user => user.mail === credentials.user);

    if(indexUser >= 0 && userContent[indexUser].password == credentials.password){
    // if(credentials.user === 'test' && credentials.password === 'test'){
        const payload = {
            user: credentials.user,
            userName: userContent[indexUser].name,
            password: userContent[indexUser].password,
            mail: userContent[indexUser].mail,
            role: userContent[indexUser].role
        };

        const token = jwt.sign(payload, SECRET_KEY);
        res.json({
            status: 'OK',
            token: token
        })
    } else {
        res.json({
            status: 'NOT OK',
            message: 'invalid user or password'
        })
    }
}