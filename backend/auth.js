// authHandlers.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Utility function to generate JWT
function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Register a new user
async function register(req, res, pool) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
      [email, hashedPassword]
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
async function login(req, res, pool) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const result = await pool.query('SELECT id, password FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user.id);
    res.json({ message: 'Login successful.', token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
}

// Forgot password
async function forgotPassword(req, res, pool) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Email not found.' });
    }

    // Placeholder for password reset logic (e.g., sending a reset email)
    res.json({ message: 'Password reset instructions sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
}

export { register, login, forgotPassword };