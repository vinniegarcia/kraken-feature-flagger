function gate(feature) {
	return (req, res, next) => {
		if (!req.features.has(feature)) {
			return next(new Error("Nothing to see here, move along."));
		}
		next();
	};
}

export default gate;