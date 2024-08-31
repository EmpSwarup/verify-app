"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.post('/verify', (req, res) => {
    const { code } = req.body;
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
