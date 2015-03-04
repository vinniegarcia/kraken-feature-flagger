kraken-feature-flags
===

Feature Flag Unifier

##usage
```npm install kraken-feature-flags --save```
In your app initialization code:
```javascript
var kraken = require('kraken-js'),
    app = module.exports = require('express')(),
    features = require('kraken-feature-flags'),
    brogan = require('brogan-paypal'),
    options = {};

app.on('start', function () {
    console.log('app started and ready to serve requests.');
});

app.use(kraken(brogan(options)));
//set features flag middleware here,
//or in your routers
app.use(features());
```
in a route, your features will be on `req.features`:
```javascript
module.exports = function (router) {
	router.get('/', function (req, res) {
		console.log(req.features.enabled); // => ['happy', 'awesome']
		if (req.features.has('awesome')) {
			res.render('awesome');
		} else {
			res.render('sadtrombone');
		}
	});
}
```
You can set feature classes in your views as well, as `res.locals.featureClasses` is created for you:
```html
<body class="{featureClasses}">...</body>
```
returns
```html
<body class="feature-happy feature-awesome">...</body>
```