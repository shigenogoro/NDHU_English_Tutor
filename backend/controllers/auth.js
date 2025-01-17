import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database.js';

// Utility function to generate JWT
function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Register a new user
const register = async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id',
      [email, username, hashedPassword]
    );
    
    res.status(201).json({ message: 'User registered successfully.', userId: result.rows[0].id });
  } catch (error) {
    if (error.code === '23505') {
      res.status(409).json({ message: 'Email already exists.' });
    } else {
      res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
  }
}

// Sign in
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const result = await pool.query('SELECT id, password, username, role FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user.id);
    res.json({ message: 'Login successful.', token, username: user.username, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
}

// Reset password
const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'UPDATE users SET password = $2 WHERE email = $1 RETURNING id',
      [email, hashedPassword]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Email not found.' });
    }

    res.status(200).json({ message: 'Password reset successfully.', userId: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
}


export default { 
    register, 
    login, 
    resetPassword 
};