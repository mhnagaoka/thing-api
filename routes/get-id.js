const Boom = require('boom');
const Joi = require('joi');
const things = require('../things');

module.exports = {
    method: 'GET',
    path: '/{id}',
    options: {
        description: 'Gets one thing',
        notes: 'Returns the thing specified by the id',
        tags: ['api'],
        validate: {
            params: {
                id: Joi.string().required().description('the id of the thing'),
            }
        },
        response: {
            schema: {
                name: Joi.string().required(),
                type: Joi.string().required(),
            }
        }
    },
    handler: async (request) => {
        const requestedId = request.params.id;
        const thing = await things.findOne(requestedId);
        if (!thing) {
            throw Boom.notFound();
        }
        return thing;
    }
};
