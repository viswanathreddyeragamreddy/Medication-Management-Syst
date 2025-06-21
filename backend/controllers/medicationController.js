const db = require('../db/database');

exports.getMedications = (req, res) => {
  db.all('SELECT * FROM medications WHERE user_id = ?', [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
};

exports.addMedication = (req, res) => {
  const { name, dosage, frequency } = req.body;
  db.run('INSERT INTO medications (user_id, name, dosage, frequency, taken_dates) VALUES (?, ?, ?, ?, ?)',
    [req.user.id, name, dosage, frequency, '[]'], function (err) {
      if (err) return res.status(500).json({ error: 'Failed to add medication' });
      res.json({ id: this.lastID });
    });
};

exports.markMedicationTaken = (req, res) => {
  const { medId, date } = req.body;
  db.get('SELECT taken_dates FROM medications WHERE id = ? AND user_id = ?', [medId, req.user.id], (err, row) => {
    if (err || !row) return res.status(404).json({ error: 'Medication not found' });
    const dates = JSON.parse(row.taken_dates || '[]');
    dates.push(date);
    db.run('UPDATE medications SET taken_dates = ? WHERE id = ?', [JSON.stringify(dates), medId], function (err) {
      if (err) return res.status(500).json({ error: 'Update failed' });
      res.json({ message: 'Updated' });
    });
  });
};
