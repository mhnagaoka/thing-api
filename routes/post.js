const Joi = require('joi');
const uuid = require('uuid/v4');
const things = require('../things');

module.exports = {
    method: 'POST',
    path: '/',
    options: {
        description: 'Creates a new thing',
        notes: 'Creates a new thing (not idempotent!)',
        tags: ['api'],
        validate: {
            payload: {
                name: Joi.string().required().description('the name of the thing'),
                type: Joi.string().required().description('the type of the thing'),
            }
        },
    },
    handler: async (request, h) => {
        const newId = uuid();
        await things.upsert(newId, request.payload);
        return h.response().header('Location', `/${newId}`).code(201);
    }
};
