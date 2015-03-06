import express from 'express';
import kraken from 'kraken-js';
import path from 'path';
import getFeatures from '../../index';

const routedir = path.join(__dirname, 'routes');

const options = {
    onconfig(config, next) {
        config.set('features', {
            'happy': true,
            'sad': false,
            'weiting': true,
            'beard': false
        });
        config.set('middleware:router', {
            "module": {
            	"name": "express-enrouten",
                "arguments": [{
                    "directory": path.resolve(routedir)
                }]
            }
        })
        next(null, config);
    }
};

let app = express();
app.use(kraken(options));
app.use(getFeatures());

export default app;