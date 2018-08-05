const Joi = require('joi');
const things = require('../things');

module.exports = {
    method: 'GET',
    path: '/',
    options: {
        description: 'Gets all things',
        notes: 'Returns all the things \\o/',
        tags: ['api'],
        response: {
            schema: Joi.array().items(Joi.object({
                _id: Joi.string().required(),
                name: Joi.string().required(),
                type: Joi.string().required(),
            })).required()
        },
    },
    handler: async () => {
        return await things.findAll();
    }
};
