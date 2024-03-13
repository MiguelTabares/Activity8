const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://silenceisbeautyofsoul:EHC9oBjLTn32l103@cluster0.l5zfnd0.mongodb.net/')
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('Connected to MongoDB');
    //EL ESQUEMA DICE: "ESTO ES LO QUE HAY EN LA BASE DE DATOS, PERO NO A NIVEL DE DATOS SINO A NIVEL DE ESTRUCTURA"
    userSchema = mongoose.Schema({
        nombres: String,
        apellidos: String
    })
    const User = mongoose.model('User', userSchema);

    const app = express();
    app.use(express.json());


    // EJERCICIO 1 - Obtener todos los usuarios que sean mayores de 18 años.
    app.get('/api/users/mayores-18', async (req, res) => {
        const users = await User.find({ edad: { $gt: 18 } }); // Limita la cantidad de documentos devueltos por la consulta
        res.json(users); // Envia los usuarios encontrados como respuesta
    });


    // EJERCICIO 2 - Obtener todos los usuarios que sean de Londres o París
    app.get('/api/users/London-Paris-users', async (req, res) => {
        const users = await User.find({ ciudad: { $in: ['Londres', 'París'] } }); // Limita la cantidad de documentos devueltos por la consulta
        res.json(users); // Envia los usuarios encontrados como respuesta
    });


    // EJERCICIO 3 - Obtener todos los usuarios que ganen más de $2000 al mes y tengan menos de 30 años.
    app.get('/api/users/salary-upper-2000-&-age-less-30', async (req, res) => {
        const users = await User.find({
            $and:
                [
                    { salario: { $gt: 2000 } },
                    { edad: { $lt: 30 } }
                ]
        });
        res.json(users);
    });

    // EJERCICIO 4 - Obtener a todos los usuarios que sean de España y ganen más de $3000 al mes.
    app.get('/api/users/Spain-and-salary-upper-3000', async (req, res) => {
        const users = await User.find({
            país: 'España',
            salario: { $gt: 3000 }
        });
        res.json(users);
    });


    // EJERCICIO 5 - Obtener todos los usuarios que tengan entre 25 y 35 años.
    app.get('/api/users/age-between-25-and-35', async (req, res) => {
        const users = await User.find({
            edad: { $gte: 25, $lte: 35 },
        });
        res.json(users);
    });


    // EJERCICIO 6 - Obtener todos los usuarios que no sean de Estados Unidos.
    app.get('/api/users/users-countries-except-usa', async (req, res) => {
        const users = await User.find({
            país: { $ne: 'Estados Unidos' },
        });
        res.json(users);
    });


    // EJERICIO 7 - Obtener a todos los usuarios que sean de Londres y que ganen más de $2500 o que tengan más de 30 años.
    app.get('/api/users/users-London-and-upper-2500-and-age-upper-30', async (req, res) => {
        const users = await User.find({
            $and:
                [
                    { ciudad: 'Londres' },
                    { salario: { $gt: 2500 } },
                    { edad: { $gt: 30 } }
                ]
        });
        res.json(users);
    });


    // EJERCICIO 8 - Obtener a todos los usuarios que sean de Australia y tengan un peso mayor a 140 libras.
    app.get('/api/users/users-Australia-weight-upper-140', async (req, res) => {
        const users = await User.find({
            $and:
                [
                    { país: 'Australia' },
                    { peso: { $gt: 140 } }
                ]
        });
        res.json(users);
    });


    // EJERICIO 9 - Obtener a todos los usuarios que no sean de Londres ni de París.
    app.get('/api/users/no-london-no-paris', async (req, res) => {
        const users = await User.find({
            ciudad: { $nin: ['Londres', 'París'] },
        });
        res.json(users);
    });


    // EJERICIO 10 - Obtener a todos los usuarios que ganen menos de $2000 al mes o que tengan más de 40 años.
    app.get('/api/users/salary-less-2000-and-age-upper-40', async (req, res) => {
        const users = await User.find({
            $and:
                [
                    { salario: { $lt: 2000 } },
                    { edad: { $gt: 40 } }
                ]
        });
        res.json(users);
    });


    // EJERCICIO 11 - Obtener a todos los usuarios que sean de Canadá y ganen más de $4000 al mes o que tengan una altura mayor a 180 cm.
    app.get('/api/users/canadian-salary-upper-4000-height-upper-180', async (req, res) => {
        const users = await User.find({
            $and:
                [
                    { país: 'Canadá' },
                    { salario: { $gt: 4000 } },
                    { altura: { $gt: 180 } }
                ]
        });
        res.json(users);
    });


    // EJERCICIO 12 - Obtener todos los usuarios que sean de Italia y tengan entre 20 y 30 años.
    app.get('/api/users/italian-age-between-20-30', async (req, res) => {
        const users = await User.find({
            $and:
                [
                    { país: 'Italia' },
                    { edad: { $gte: 20, $lte: 30 } }
                ]
        });
        res.json(users);
    });


    // EJERCICIO 13 - Obtener todos los usuarios que no tengan un correo electrónico registrado.
    app.get('/api/users/email-inexistent', async (req, res) => {
        const users = await User.find({
            correo: { $exists: false }
        });
        res.json(users);
    });


    // EJERICICIO 14 - Obtener todos los usuarios que sean de Francia y que su salario esté entre $3000 y $5000 al mes.
    app.get('/api/users/french-salary-between-3000-5000', async (req, res) => {
        const users = await User.find({
            $and:
                [
                    { país: 'Francia' },
                    { salario: { $gte: 3000, $lte: 5000 } }
                ]
        });
        res.json(users);
    });


    // EJERCICIO 15 - Obtener todos los usuarios que sean de Brasil y que tengan un peso menor a 120 libras o más de 140 libras.
    app.get('/api/users/brasilian-weight-less-120-or-upper-140', async (req, res) => {
        const users = await User.find({
            $and: [
                { país: 'Brasil' },
                {
                    $or: [
                        { peso: { $lt: 120 } },
                        { peso: { $gt: 140 } }
                    ]
                }
            ]
        });
        res.json(users);
    });


    // EJERCICIO 16 - Obtener todos los usuarios que sean de Argentina o de Chile y que tengan una edad menor a 25 años.
    app.get('/api/users/argentinian-or-chilean-age-less-25', async (req, res) => {
        const users = await User.find({
            $and: [
                { $or: [{ país: 'Argentina' }, { país: 'Chile' }] },
                { edad: { $lt: 25 } }
            ]
        });
        res.json(users);
    });


    // EJERCICIO 17 - Obtener a todos los usuarios que no sean de España ni de México y que ganen menos de $3000 al mes.
    app.get('/api/users/no-spain-no-mexico-salary-less-3000', async (req, res) => {
        const users = await User.find({
            país: { $nin: ['España', 'México'] },
            salario: { $lt: 3000 }
        });
        res.json(users);
    });


    // EJERCICIO 18 - Obtener todos los usuarios que sean de Alemania y que tengan un salario menor a $4000 o una edad mayor a 35 años.
    app.get('/api/users/germanian-and-salary-less-4000-or-age-upper-35', async (req, res) => {
        const users = await User.find({
            país: 'Alemania',
            $or: [
                { salario: { $lt: 4000 } },
                { edad: { $gt: 35 } }
            ]
        });
        res.json(users);
    });


    // EJERCICIO 19 - Obtener todos los usuarios que no sean de Colombia y que su altura sea menor a 170 cm.
    app.get('/api/users/no-colombian-and-height-less-170', async (req, res) => {
        const users = await User.find({
            país: { $ne: 'Colombia' },
            altura: { $lt: 170 }
        });
        res.json(users);
    });


    //  EJERCICIO 20 - Obtener todos los usuarios que sean de India y que no tengan un salario registrado.
    app.get('/api/users/indian-and-email-inexistent', async (req, res) => {
        const users = await User.find({
            país: 'India',
            salario: { $exists: false }
        });
        res.json(users);
    });








    app.listen(3000, function () {
        console.log("server listening on port 3000(server arriba");
    });
});    