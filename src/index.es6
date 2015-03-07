'use strict';

const getFeatures = () => {

    return (req, res, next) => {
        const features = req.app.kraken.get('features'),
        enabled = Object.keys(features).filter((feat) => features[feat]),
        featureClasses = enabled.map((feat) => `feature-${feat}`).join(' ');
        req.features = {
            enabled,
            has(feature) {
                return enabled.indexOf(feature) !== -1;
            }
        };
        res.locals.featureClasses = featureClasses;
        next();
    };
};

export default getFeatures;
