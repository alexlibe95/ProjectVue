import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

export function setEnvironment(app) {
    let temp='production';
    if(process.env.NODE_ENV !== temp){
        console.log(process.env.NODE_ENV)
        setDevEnv(app)
    }else {
        setProdEnv(app);
    }
}

function setDevEnv(app) {
    process.env.NODE_ENV = 'development';
    process.env.DB_URL = 'mongodb://localhost:27017/vue-db';
    process.env.TOKEN_SECRET = 'my-development-secret';
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(cors());
}

function setProdEnv(app){
    process.env.DB_URL = 'mongodb://localhost:27017/prod-db';
    process.env.TOKEN_SECRET = 'my-production-secret';
    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/../dist'));
    console.log("setting production environment");
}