import express from 'express';

import {signin,signup} from '../controllers/user.js';

const router = express.Router();

// Why it is post -> as we have to send the login credentials to backend.
router.post('/signin',signin);
router.post('/signup',signup);

export default router;