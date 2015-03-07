'use strict';

const request = () => {
  const get = (item) => {
    const items = {
      'features': {
        'happy': true,
        'sad': false,
        'weiting': true,
        'beard': false
      }
    };
    return items[item] || undefined;
  };

  return {
    app: {
      kraken: {
        get
      }
    }
  };
};

const response = {
  locals: {}
};

export { request, response };
