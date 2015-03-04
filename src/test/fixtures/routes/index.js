import gate from '../../../gate';

function router(app) {
    app.get('/', function(req, res) {
        res.json({
            public: true
        });
    });
    app.get('/beard', gate('beard'), (req, res) => {
        res.json({
            private: true,
            feature: 'beard'
        });
    });

    app.get('/weiting', gate('weiting'), (req, res) => {
        res.json({
            private: true,
            feature: 'weiting'
        });
    });
}

export default router;