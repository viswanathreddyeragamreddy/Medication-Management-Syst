const db = require('../db/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

exports.signup = (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ message: 'Missing fields' });

  const hashed = bcrypt.hashSync(password, 10);
  db.run('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, hashed, role], function (err) {
    if (err) return res.status(500).json({ message: 'User exists or DB error' });
    const token = jwt.sign({ id: this.lastID, email, role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err || !user) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  });
};
