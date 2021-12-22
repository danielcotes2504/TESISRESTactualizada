
module.exports = function (req, res, next) {
    const { client } = req.body;

    req.body.client = client;
    console.log(client);
    next();
}