const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'SpendWise Backend API', time: new Date() });
});

// Profile & Settings
app.get('/api/profile', (req, res) => {
  try {
    const profile = db.getProfile();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/profile', (req, res) => {
  try {
    const updated = db.updateProfile(req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Transactions CRUD
app.get('/api/transactions', (req, res) => {
  try {
    const { category, search } = req.query;
    const transactions = db.getTransactions({ category, search });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/transactions', (req, res) => {
  try {
    const { merchant, category, amount, date, source, confidence } = req.body;
    if (!merchant || amount === undefined) {
      return res.status(400).json({ error: 'Merchant and amount are required' });
    }
    const created = db.addTransaction({ merchant, category, amount, date, source, confidence });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/transactions/:id', (req, res) => {
  try {
    const updated = db.updateTransaction(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Transaction not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/transactions/:id', (req, res) => {
  try {
    const ok = db.deleteTransaction(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Recurring charges CRUD
app.get('/api/recurring', (req, res) => {
  try {
    res.json(db.getRecurring());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/recurring', (req, res) => {
  try {
    const { name, category, amount, when, note, ok } = req.body;
    if (!name || amount === undefined) {
      return res.status(400).json({ error: 'Name and amount are required' });
    }
    const created = db.addRecurring({ name, category, amount, when, note, ok });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/recurring/:id', (req, res) => {
  try {
    const updated = db.updateRecurring(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Recurring charge not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/recurring/:id', (req, res) => {
  try {
    const ok = db.deleteRecurring(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Recurring charge not found' });
    res.json({ message: 'Recurring charge deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Savings Goals CRUD
app.get('/api/goals', (req, res) => {
  try {
    res.json(db.getGoals());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/goals', (req, res) => {
  try {
    const { name, emoji, target, saved, months } = req.body;
    if (!name || !target) {
      return res.status(400).json({ error: 'Name and target amount are required' });
    }
    const created = db.addGoal({ name, emoji, target, saved, months });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/goals/:id', (req, res) => {
  try {
    const updated = db.updateGoal(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Goal not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/goals/:id', (req, res) => {
  try {
    const ok = db.deleteGoal(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Goal not found' });
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Suggestions
app.get('/api/suggestions', (req, res) => {
  try {
    res.json(db.getSuggestions());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/suggestions/:id/toggle', (req, res) => {
  try {
    const item = db.toggleSuggestion(req.params.id);
    if (!item) return res.status(404).json({ error: 'Suggestion not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Analytics & Dashboard Summary
app.get('/api/analytics', (req, res) => {
  try {
    res.json(db.getAnalytics());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Intelligent Statement Analysis
const KEYWORDS = [
  ['Health', /pharmacy|apollo|hospital|clinic|medplus|1mg|pharmeasy|cult|gym|lab/i],
  ['Subscriptions', /google one|netflix|spotify|prime|hotstar|youtube|icloud|subscription|meal kit|audible|chatgpt/i],
  ['Food', /swiggy|zomato|blinkit|zepto|restaurant|cafe|starbucks|dominos|pizza|mcdonald|kfc|bigbasket|dmart|grocer/i],
  ['Transport', /uber|ola|rapido|metro|fuel|petrol|irctc|redbus|fastag|indigo|parking/i],
  ['Bills', /rent|electric|bescom|water|gas|airtel|jio|broadband|insurance|emi|recharge|vodafone/i],
  ['Shopping', /amazon|flipkart|myntra|ajio|nykaa|decathlon|ikea|meesho/i],
  ['Fun', /bookmyshow|steam|pvr|inox|movie|game/i]
];

function categorizeDescription(desc) {
  for (const [cat, regex] of KEYWORDS) {
    if (regex.test(desc)) return cat;
  }
  return 'Other';
}

app.post('/api/statement/analyze', (req, res) => {
  try {
    const { rows } = req.body;
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ error: 'Rows array required' });
    }

    const salary = db.getProfile().salary;
    const debits = rows.filter(r => !r.isIncome);
    const credits = rows.filter(r => r.isIncome);
    const totalSpent = debits.reduce((acc, r) => acc + (Number(r.amount) || 0), 0);
    const totalIncome = credits.reduce((acc, r) => acc + (Number(r.amount) || 0), 0) || salary;
    const leftover = Math.max(0, totalIncome - totalSpent);

    // Group by category
    const catTotals = {};
    for (const r of debits) {
      const cat = r.category || categorizeDescription(r.description);
      catTotals[cat] = (catTotals[cat] || 0) + Number(r.amount);
    }

    // Generate actionable tailored tips
    const tips = [];
    if (catTotals['Subscriptions'] > 1000) {
      tips.push({
        title: 'Audit recurring subscriptions',
        detail: `You spent ₹${catTotals['Subscriptions']} across subscription services this month.`,
        monthlySaving: Math.round(catTotals['Subscriptions'] * 0.4),
        effort: 'Easy'
      });
    }
    if (catTotals['Food'] > 4000) {
      tips.push({
        title: 'Optimize food deliveries',
        detail: `Dining and food delivery reached ₹${catTotals['Food']}. Cooking 2 extra meals a week can save significantly.`,
        monthlySaving: Math.round(catTotals['Food'] * 0.25),
        effort: 'Medium'
      });
    }
    if (leftover > 0 && leftover / totalIncome < 0.25) {
      tips.push({
        title: 'Automate savings on payday',
        detail: `You save ${Math.round((leftover / totalIncome) * 100)}% of earnings. Auto-transfer to a separate account before discretionary spending.`,
        monthlySaving: Math.round((totalIncome * 0.25 - leftover) / 2),
        effort: 'Easy'
      });
    }

    res.json({
      totalIncome,
      totalSpent,
      leftover,
      savingsRate: Math.round((leftover / totalIncome) * 100),
      categoryBreakdown: catTotals,
      headline: tips.length ? 'Identified high-impact areas to free up monthly cashflow.' : 'Spending is well-balanced.',
      tips
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Full Backup & Restore
app.get('/api/export', (req, res) => {
  res.json(db.data);
});

app.post('/api/import', (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Invalid backup payload' });
    }
    db.save(req.body);
    db.data = req.body;
    res.json({ message: 'Data imported successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server if invoked directly
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SpendWise Backend running on http://0.0.0.0:${PORT}`);
    console.log(`Local access: http://localhost:${PORT}`);
  });
}

module.exports = app;
