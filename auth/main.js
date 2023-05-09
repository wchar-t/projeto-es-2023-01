const express = require('express');
const dotenv = require('dotenv');
const { encode, decode } = require('./jwt');

const app = express();
const PORT = 30001;

app.use(express.json());
dotenv.config();

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
});

app.get('/api/verify/:jwt', async (req, res) => {
    const { jwt } = req.query;
    const decoded = await decode(jwt);
    
    if (!decoded) {
      return res.json({
        error: {
          code: 'jwt_error',
          message: 'JWT could\'nt be verified',
        }
      });
    }

    return res.json({ error: false });
});

app.get('/api/token', async (req, res) => {
    return res.json({
        error: false,
        result: {
            jwt: process.env.JWT_TOKEN,
        },
    });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
