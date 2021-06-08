require('dotenv/config');

export const isAuthenticated = async (req, res, next) => {
    if (!req.query.apiKey) {
        return res.status(401).send({
            message: "must be authenticated with an API key to hit this endpoint"
        })
    } else {
        const { apiKey } = req.query;
        if (apiKey === process.env.API_KEY) {
            return next();
        } else {
            return res.status(401).send({
                message: 'API Key is invalid'
            })
        }
    }
}