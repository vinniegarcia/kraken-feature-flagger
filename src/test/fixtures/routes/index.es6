import gate from '../../../gate';

const controller = (router) => {
    router.get('/', function(req, res) {
        res.json({
            public: true
        });
    });
    router.get('/beard', gate('beard'), (req, res) => {
        res.json({
            private: true,
            feature: 'beard'
        });
    });

    router.get('/weiting', gate('weiting'), (req, res) => {
        res.json({
            private: true,
            feature: 'weiting'
        });
    });
};

export default controller;
