const Joi = require('joi');
const things = require('../things');

module.exports = {
    method: 'PUT',
    path: '/{id}',
    config: {
        description: 'Creates/updates one thing',
        notes: 'Creates or updates the thing specified by the id',
        tags: ['api'],
        validate: {
            params: {
                id: Joi.string()
                    .required()
                    .description('the id of the thing'),
            },
            payload: {
                name: Joi.string().required().description('the name of the thing'),
                type: Joi.string().required().description('the type of the thing'),
            }
        },
    },
    handler: async (request, h) => {
        const requestedId = request.params.id;
        await things.upsert(requestedId, request.payload);
        return h.response().code(204);
    }
};
