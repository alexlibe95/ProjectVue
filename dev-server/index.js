import express from 'express';
import { registerRoutes } from './routes';
import { setEnvironment } from './config/env';
import { connectToDB } from './config/db';

const app = express()
const port = 3000

setEnvironment(app);
connectToDB();
registerRoutes(app);

console.log(process.env.NODE_ENV + "gamietesssss")
app.get('/', (req, res) => {
    let temp="production";
    if(process.env.NODE_ENV !== temp){
        
        return res.send(
            'Running server in development mode.'
        );
    }else {
        
        return res.sendFile('index.html', {root: __dirname + '/../dist/' });
    }
})

app.listen(port, () => {
    console.log(`MEVN app listening on port ${port} in `+ process.env.NODE_ENV + ' mode!');
});