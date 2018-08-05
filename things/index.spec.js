const test = require('tape');
const things = require('./index');

function wrap(fn) {
    return (t) => {
        Promise.resolve()
            .then(() => fn(t))
            .catch(err => {
                t.fail(`Unexpected exception: ${err.message}`);
            });
    };
}

test('clear should remove all stored items', wrap(async (t) => {
    await things.clear();

    t.equal((await things.findAll()).length, 0, 'number of things after clear() should be zero');
    t.end();
}));

test('upsert should create a thing if it none exists', wrap(async (t) => {
    await things.clear();
    await things.upsert('one', { type: 'Operating System', name: 'Linux' });

    t.equal((await things.findAll()).length, 1, 'number of things after inserting the first element should be 1');

    await things.upsert('two', { type: 'Operating System', name: 'Mac OS' });

    t.equal((await things.findAll()).length, 2, 'number of things after inserting the second element should be 2');
    t.end();
}));

test('upsert should update a thing if it already exists', wrap(async (t) => {
    await things.clear();
    await things.upsert('one', { type: 'Operating System', name: 'Linux' });

    t.equal((await things.findAll()).length, 1, 'number of things after inserting the first element should be 1');

    await things.upsert('one', { type: 'Operating System', name: 'Mac OS' });

    t.equal((await things.findAll()).length, 1, 'number of things after updating the first element should be 1');
    t.end();
}));

test('find an existing element', wrap(async (t) => {
    await things.clear();
    const original = { type: 'Operating System', name: 'Linux' };
    await things.upsert('one', original);

    const found = await things.findOne('one');
    t.deepEqual(found, original, 'found and original should be equal');
    t.end();
}));

test('we gotta have all the things \\o/', wrap(async (t) => {
    await things.clear();
    const original1 = { type: 'Operating System', name: 'Linux' };
    await things.upsert('one', original1);
    const original2 = { type: 'Developer', name: 'Linus Torvalds' };
    await things.upsert('two', original2);

    const found = await things.findAll();
    t.equal(found.length, 2, 'number of inserted elements should match');

    const indexedFound = found.reduce((sum, {_id, name, type}) => {
        sum[_id] = { name, type };
        return sum;
    }, {});

    t.deepEqual(indexedFound['one'], original1, 'found and first original should be equal');
    t.deepEqual(indexedFound['two'], original2, 'found and second original should be equal');
    t.end();
}));
