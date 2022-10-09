const { expect } = require('chai');           // https://semaphoreci.com/community/tutorials/best-practices-for-spies-stubs-and-mocks-in-sinon-js
const { app } = require('../handler');
const supertest = require('supertest');

const request = supertest(app);

describe('GET /roll', () => {
    it('should return a dice throw', async () => {
        const res = await request.get('/roll');
        expect(res.status).to.equal(200);
        expect(res.body.message.startsWith('You rolled')).to.be.true;
    })

    it('should be random', async () => {
        const res = await request.get('/roll');
        const firstRollMessage = res.body.message;
        let nextRes;
        while( true ) {
            nextRes = await request.get('/roll');
            if (nextRes.body.message != firstRollMessage) break;
        }
        expect(firstRollMessage).to.not.equal(nextRes.body.message);
    })    
});

describe('GET /unknown', () => {
    it('should return an error', async () => {
        const res = await request.get('/unknown');
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('No matching API found: /unknown');        
    })
});
