import { test, expect, request } from '@playwright/test';

test.describe('API Testing using Playwright POST /api/cars', () => {
    let apiContext;

    //Setup the API content before all tests
    test.beforeAll(async () => {
        apiContext = await request.newContext({
            baseURL: process.env.BASE_URL,
            httpCredentials: {
                username: process.env.HTTP_CREDENTIALS_USERNAME,
                password: process.env.HTTP_CREDENTIALS_PASSWORD,
            },
        });
    });

    // //Clean up after all tests
    test.afterAll(async () => {
        await apiContext.dispose();
    });

    test('Add a new car via API', async () => {
        const newCar = {
            carBrandId: 3,
            carModelId: 13,
            mileage: 123,
        };
        const response = await apiContext.post('/api/cars', {
            data: newCar,
        });
        expect(response.status()).toBe(201);
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        expect(responseBody.data.brand).toBe('Ford');
        expect(responseBody.data.model).toBe('Fusion');
        expect(responseBody.data.initialMileage).toBe(123);
    });

    test('Add a new car via API with invalid carBrandId', async () => {
        const newCar = {
            carBrandId: '',
            carModelId: 13,
            mileage: 123,
        };
        const response = await apiContext.post('/api/cars', {
            data: newCar,
        });
        expect(response.status()).toBe(400);
        console.log(response);
        const responseBody = await response.json();
        expect(responseBody.status).toBe('error');
        expect(responseBody.message).toBe('Invalid car brand type');
    });

    test('Add a new car via API with carModelId the doesnt exist', async () => {
        const newCar = {
            carBrandId: 1,
            carModelId: 99,
            mileage: 321,
        };
        const response = await apiContext.post('/api/cars', {
            data: newCar,
        });
        expect(response.status()).toBe(404);
        console.log(response);
        const responseBody = await response.json();
        expect(responseBody.status).toBe('error');
        expect(responseBody.message).toBe('Model not found');
    });
});
