'use strict';
// node builtins
import {ok} from 'assert';
import http from 'http';
// ext modules
import request from 'supertest';
import portfinder from 'portfinder';
// modules under test
import getFeatures from '../index';
// test fixtures
import { response as res, request as wreck } from './fixtures/';
import app from './fixtures/app';

describe('feature flag middleware test', () => {
  const hasClass = (feat) => (res.locals.featureClasses.indexOf(feat) !== -1);

  it('should have some features', (done) => {
      let req = wreck(),
      assertions = () => {
          ok(Object.keys(req.app.kraken.get('features')).length > 1, 'TWO FEATURES SHOULD BE ENABLED MAN');
          ok(hasClass('feature-weiting'), 'NO WEITING FEATURE? I DEMAND SATISFACTION!');
          ok(hasClass('feature-happy'), 'SO SAD');
          ok(!hasClass('feature-sad'), 'THERE SHALL BE NO SADNESS HERE');
          ok(req.features.has('happy'), 'NO HAPPY FEATURE');
          ok(!req.features.has('sad'), 'SO SAD');
          ok(req.features.has('weiting'), 'NO WEITING FEATURE');
          done();
      };
      getFeatures()(req, res, assertions);
  });
});

describe('gate test (kraken server)', () => {

  const server = http.createServer(app);

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

	it('should not be able to access the beard route', (done) => {
		request(server)
			.get('/beard')
			.expect(503)
			.end((err) => {
				if (err) {
					return done(err);
				}
				done();
			});
	});

	it('should be able to access an enabled route', (done) => {
		request(server)
			.get('/weiting')
			.expect(200)
			.end((err, resp) => {
				if (err) {
					return done(err);
				}
				ok(resp.body.private && resp.body.feature === 'weiting', 'Did not get the expected json body!');
				done();
			});
	});

});
