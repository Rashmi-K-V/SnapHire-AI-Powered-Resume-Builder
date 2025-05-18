'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/parse-resume',
      handler: 'parse-resume.parse',
      config: {
        auth: false, // Set true if you want auth
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/upload-resume',
      handler: 'parse-resume.uploadAndParse',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
