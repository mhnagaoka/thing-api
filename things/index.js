/*
 * To keep it simple, let us store the data in memory.
 * This will, of course, cause us trouble if the app is clustered or if it shuts down but it would
 * not be difficult to refactor the exported functions to store the data in a real database.
 */

const things = {
    zero: {
        type: 'man',
        name: 'Albert Einstein'
    },
    one: {
        type: 'computer',
        name: 'Apple ][+'
    }
};

exports.clear = () => Promise.resolve(Object.keys(things).forEach(k => Reflect.deleteProperty(things, k)));

exports.findOne = (_id) => Promise.resolve(things[_id] ? { ...things[_id] } : null);

exports.findAll = () => Promise.resolve(Object.entries(things).map(([_id, thing]) => ({ _id, ...thing })));

exports.upsert = (_id, {type, name}) => Promise.resolve(things[_id] = { type, name });

exports.delete = (_id) => Promise.resolve(things.hasOwnProperty(_id) ? Reflect.deleteProperty(things, _id) : false);
