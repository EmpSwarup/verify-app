import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/verify', (req: Request, res: Response) => {
    const { code } = req.body as { code: string };

    // Check for nonnumeric values
    if (!/^\d+$/.test(code)) {
        return res.status(400).json({ message: 'Invalid characters: code should contain only digits.' });
    }

    // Check for code length
    if (code.length !== 6) {
        return res.status(400).json({ message: 'Invalid length: code should be exactly 6 digits long.' });
    }

    // Check for 7 at end
    if (code.endsWith('7')) {
        return res.status(400).json({ message: 'Invalid code: code should not end with the digit 7.' });
    }

    res.status(200).json({ message: 'Verification Successfull!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
