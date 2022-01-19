import { addToCart, getCart, removeFromCart } from './controllers/cart.controller.js';
import { getTest } from './controllers/test.controller.js';
import { addUser, getUser, validateCredential } from './controllers/login.controller.js';
import { SECRET_KEY } from './config/config.js';
import express from 'express';
import jwt from "jsonwebtoken";

export const routes = (app) => {
    app.route('/api/test')
        .get(getTest);
    app.route('/api/cart')
        .get(checkToken, getCart)
        .post(checkToken, addToCart)
        .delete(checkToken, removeFromCart);

    app.route('/api/login')
        .get(getUser)
        .post(validateCredential);

    app.route('/api/login/addUser')
        .post(addUser);
}

const checkToken = express.Router();
checkToken.use((req, res, next) => {
  let token = req.headers['authorization'];
  console.log("TOKEN",token);
  token = token.replace('Bearer ', '');
  console.log("TOKEN CORTADO",token);
     if (token) {
       jwt.verify(token, SECRET_KEY, (err, decoded) => {      
         if (err) {
             return res.json({
                 status: 'NOK',
                 mensaje: 'Token inválido'
             });    
         } else {
           req.decoded = decoded;    
           next();
         }
       });
     } else {
       res.send({
         status: 'NOK',
         mensaje: 'Token no provisto'
       });
    }
})