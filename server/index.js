import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Place from './models/Place.js';
import VisitPlan from './models/VisitPlan.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const BASE_PORT = parseInt(process.env.PORT, 10) || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/srilanka_day_planner';
const JWT_SECRET = process.env.JWT_SECRET || 'verysecuresecret';

// Try available ports starting at BASE_PORT
let currentPort = BASE_PORT;
const startServer = () => {
  const server = app.listen(currentPort, () => {
    console.log(`Server running at http://localhost:${currentPort}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.warn(`Port ${currentPort} is in use. Trying next port...`);
      currentPort += 1;
      if (currentPort > BASE_PORT + 10) {
        console.error('No free ports in range available. Set PORT to a different value.');
        process.exit(1);
      }
      setTimeout(() => startServer(), 200);
    } else {
      console.error('Server error:', error);
      process.exit(1);
    }
  });
};

startServer();

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    
    // Seed default admin user if not exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin',
        email: 'admin@srilanka.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Default admin user created: admin@srilanka.com / admin123');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: role || 'tourist' });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.get('/api/places', async (req, res) => {
  const places = await Place.find();
  res.json(places);
});

app.post('/api/places', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const place = await Place.create(req.body);
  res.status(201).json(place);
});

app.put('/api/places/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(place);
});

app.delete('/api/places/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  await Place.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.get('/api/visit-plans', authMiddleware, async (req, res) => {
  const plans = await VisitPlan.find({ ownerId: req.user.id }).populate('places');
  res.json(plans);
});

app.post('/api/visit-plans', authMiddleware, async (req, res) => {
  const plan = await VisitPlan.create({ ...req.body, ownerId: req.user.id });
  res.status(201).json(plan);
});

app.post('/api/visit-plans/:id/complete', authMiddleware, async (req, res) => {
  const plan = await VisitPlan.findOneAndUpdate({ _id: req.params.id, ownerId: req.user.id }, { status: 'completed' }, { new: true });
  res.json(plan);
});

// Server start is handled by startServer() with auto port fallback.

