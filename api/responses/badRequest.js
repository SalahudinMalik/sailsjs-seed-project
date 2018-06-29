/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(data);
 * return res.badRequest(data, 'some/specific/badRequest/view');
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Please choose a valid `password` (6-12 characters)',
 *   'trial/signup'
 * );
 * ```
 */

module.exports = function badRequest(data, options) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;

    // Set status code
    res.status(400);

    // Log error to console
    if (data !== undefined) {
        sails.log.verbose('Sending 400 ("Bad Request") response: \n', data);
    }
    else {
        sails.log.verbose('Sending 400 ("Bad Request") response');
    }

    if(!_.isUndefined(data && data.error)){
        data.err = data.error;
        delete data.error;
    }
    else if(!_.isUndefined(data && data.message)){
        data.err = data.message;
        delete data.message;
    }

    if(typeof data == 'string')
        data = {err: data};

    // Only include errors in response if application environment
    // is not set to 'production'.  In production, we shouldn't
    // send back any identifying information about errors.
    // TODO:: review this. do we want to provide error information in production mode?
    //if (sails.config.environment === 'production') {
    //    data = undefined;
    //}
    //
    //if (data && data.model) {
    //    delete data.model;
    //}

    // Serve data as JSON(P) if appropriate
    if (req.param('callback')) {
        return res.jsonp(data);
    } else {
        return res.json(data);
    }

};

