import request from 'supertest';
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.post('/verify', (req: Request, res: Response) => {
    const { code } = req.body as { code: string };

    if (!/^\d+$/.test(code)) {
        return res.status(400).json({ message: 'Invalid characters: code should contain only digits.' });
    }

    if (code.length !== 6) {
        return res.status(400).json({ message: 'Invalid length: code should be exactly 6 digits long.' });
    }

    if (code.endsWith('7')) {
        return res.status(400).json({ message: 'Invalid code: code should not end with the digit 7.' });
    }

    res.status(200).json({ message: 'Success' });
});

describe('POST /verify', () => {
    it('should return success for valid code', async () => {
        const response = await request(app)
            .post('/verify')
            .send({ code: '123456' });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Success');
    });

    it('should return an error for non-numeric characters', async () => {
        const response = await request(app)
            .post('/verify')
            .send({ code: '12A456' });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid characters: code should contain only digits.');
    });

    it('should return an error for code with invalid length', async () => {
        const response = await request(app)
            .post('/verify')
            .send({ code: '12345' });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid length: code should be exactly 6 digits long.');
    });

    it('should return an error for code ending in 7', async () => {
        const response = await request(app)
            .post('/verify')
            .send({ code: '123457' });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid code: code should not end with the digit 7.');
    });
});
