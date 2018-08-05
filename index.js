const pino = require('pino')();
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const package = require('./package');
const routes = require('./routes');

process.on('unhandledRejection', error => {
    pino.error(`unhandledRejection: ${error.stack}`);
    process.exit(1);
});

(async () => {
    const server = await new Hapi.Server({
        host: 'localhost',
        port: 3000,
    });

    const swaggerOptions = {
        info: {
            title: 'Thing API Documentation',
            version: package.version,
        },
    };

    await server.register([
        {
            plugin: require('hapi-pino'),
            options: {
                prettyPrint: false,
                logEvents: ['response']
            }
        },
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    try {
        await server.start();
        pino.info(`Server running. Check docs at: ${server.info.uri}/documentation`);
    } catch (err) {
        pino.error(err);
    }

    server.route(routes);
})();
