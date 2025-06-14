import app from '..';
import request from 'supertest';


describe('# SimpleController Suite', () => {
    it('should return hello', async () => {
        const res = await request(app)
            .get('/')
            .expect(200);

        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('hello');
    });
})