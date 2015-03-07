import express from 'express';
import kraken from 'kraken-js';
import path from 'path';
import getFeatures from '../../index';

const routedir = path.join(__dirname, 'routes');
//regular old express app
const options = {
    onconfig(config, next) {
        //features
        config.set('features', {
            'happy': true,
            'sad': false,
            'weiting': true,
            'beard': false
        });
        //set up routing
        config.set('middleware:router', {
            "module": {
            	"name": "express-enrouten",
                "arguments": [{
                    "directory": path.resolve(routedir)
                }]
            }
        });
        next(null, config);
    }
};

let app = express();
app.use(kraken(options));
app.use(getFeatures());

export default app;
