const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
};

// Je moet hiervoor het volgende installeren: npm install http-proxy-middleware@0.21.0
