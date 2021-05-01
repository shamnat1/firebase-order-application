process.env.NODE_ENV = "test";
const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)



describe('Order Endpoints', () => {

    let server = null;

    beforeAll((done) => {
        server = app.listen(4002, () => console.log('Listening on port 3000'));
        done()
    });

    afterAll(async () => {
        await server.close();
    });


    it('Gets the Order List', async done => {
        // Sends GET Request to /order endpoint
        const response = await request.get('/orders')
        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThanOrEqual(1)
        done()
    })


    it('should create a new order', async () => {
        const input = {
                "address": {
                    "city": "Berlin",
                    "street": "Wriezener Str. 12",
                    "zip": "13055"
                },
                "bookingDate": 1554284950000,
                "customer": {
                    "email": "emad.alam@construyo.de", "name": "Emad Alam",
                        "phone": "015252098067"
                },
                "title": "Test Order 1",
            }
        const res = await request.post('/orders')
            .send(input)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
    })

    it('Gets the Order item', async done => {
        const response = await request.get('/orders/18d5b5236b2890e2fdad2')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('title')
        done()
    })


    it('should update an order', async () => {
        const input = {
            "bookingDate": 1554284950000,
            "title": "Test Order",
        }
        const res = await request.put('/orders/18d5b5236b2890e2fdad2')
            .send(input)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
    })

})