const Boom = require('boom');
const Joi = require('joi');
const things = require('../things');

module.exports = {
    method: 'DELETE',
    path: '/{id}',
    config: {
        description: 'Deletes one thing',
        notes: 'Deletes the thing specified by the id',
        tags: ['api'],
        validate: {
            params: {
                id: Joi.string().required().description('the id of the thing'),
            }
        }
    },
    handler: async (request, h) => {
        const requestedId = request.params.id;
        const result = await things.delete(requestedId);
        if (!result) {
            throw Boom.notFound();
        }
        return h.response().code(204);
    }
};
