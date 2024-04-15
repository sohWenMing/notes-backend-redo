const { describe, it, after, beforeEach } = require('node:test');
const  assert  = require('node:assert');
const { logger } = require('../utils/logging/logger');


describe('basic arithmetic', () => {
    after(() => logger.info('finished running a suite'));
    beforeEach(() => logger.info('running next test'));
    it('should work', () => {
        assert.strictEqual(1,1);
    });
});