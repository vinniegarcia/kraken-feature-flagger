// node builtins
import assert from 'assert';
import http from 'http';
// ext modules
import request from 'supertest';
import portfinder from 'portfinder';
// modules under test
import getFeatures from '../index';
// test fixtures
import app from './fixtures/app';


const server = http.createServer(app);

const getRequest = () => {
    return {
        app: {
            kraken: {
                get: (item) => {
                    const items = {
                        'features': {
                            'happy': true,
                            'sad': false,
                            'weiting': true,
                            'beard': false
                        }
                    };
                    return items[item] || undefined;
                }
            }
        }
    };
};

describe('feature flag middleware test', () => {
    it('should have some features', function (done) {
        this.timeout(20000);
        let req = getRequest(),
        res = {
            locals: {}
        },
        next = () => {
            assert.ok(Object.keys(req.app.kraken.get('features')).length > 1, 'TWO FEATURES SHOULD BE ENABLED MAN');
            assert.ok(res.locals.featureClasses.indexOf('feature-weiting') !== -1, 'NO WEITING FEATURE? I DEMAND SATISFACTION!');
            assert.ok(res.locals.featureClasses.indexOf('feature-happy') !== -1, 'SO SAD')
            assert.ok(res.locals.featureClasses.indexOf('feature-sad') === -1, 'THERE SHALL BE NO SADNESS HERE');
            assert.ok(req.features.has('happy'), 'NO HAPPY FEATURE');
            assert.ok(req.features.has('weiting'), 'NO WEITING FEATURE');
            done();
        };
        getFeatures()(req, res, next);
    })
});

describe('server test', () => {
	before((done) => {
		portfinder.getPort((err, port) => {
			if (err) {
				return done(err);
			}
			server.listen(port, done);
		});
	});
	after((done) => {
		server.close(done);
	});

	it('should not be able to access the beard route', function (done) {
		request(server)
			.get('/beard')
			.expect(503)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				done();
			});
	});

	it('should be able to access an enabled route', function (done) {
		request(server)
			.get('/weiting')
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				assert.ok(res.body.private && res.body.feature === 'weiting', 'Did not get the expected json body!');
				done();
			});
	});

});