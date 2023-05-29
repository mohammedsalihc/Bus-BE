const admin_route = require('./admin/admin-routes');
const user_route = require('./user/user-routes');
const bus_owner_route = require('./bus-owner/bus-owner-routes');

const EndPoints = (app) => {
    app.get('/BISS', (req, res) => res.json('welcome to BISS Rest Api Service'));
    app.use('/BISS/api/admin', admin_route);
    app.use('/BISS/api/user', user_route);
    app.use('/BISS/api/bus-owner', bus_owner_route);
};

module.exports = { EndPoints };
