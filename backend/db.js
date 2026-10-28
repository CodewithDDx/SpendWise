const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'spendwise_data.json');

const INITIAL_DATA = {
  profile: {
    name: '',
    salary: 0,
    baseSavings: 0,
    maskAmounts: false,
    currency: '₹'
  },
  categories: {
    Food: { color: '#fb923c', emoji: '🍜', name: 'Food' },
    Transport: { color: '#38bdf8', emoji: '🚕', name: 'Transport' },
    Shopping: { color: '#f472b6', emoji: '🛍', name: 'Shopping' },
    Bills: { color: '#a3e635', emoji: '💡', name: 'Bills' },
    Fun: { color: '#8b7bff', emoji: '🎬', name: 'Fun' },
    Health: { color: '#5eead4', emoji: '💊', name: 'Health' },
    Subscriptions: { color: '#fbbf24', emoji: '🔁', name: 'Subscriptions' }
  },
  transactions: [],
  recurring: [],
  goals: [],
  savingsSuggestions: []
};

class Database {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error('Error loading db file, re-initializing:', err);
    }
    this.save(INITIAL_DATA);
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  save(data = this.data) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing to database:', err);
    }
  }

  // Profile
  getProfile() {
    return this.data.profile;
  }

  updateProfile(updates) {
    this.data.profile = { ...this.data.profile, ...updates };
    this.save();
    return this.data.profile;
  }

  // Transactions
  getTransactions(filter = {}) {
    let list = [...this.data.transactions];
    if (filter.category && filter.category !== 'All') {
      list = list.filter(t => t.category.toLowerCase() === filter.category.toLowerCase());
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(t => (t.merchant + ' ' + t.category).toLowerCase().includes(q));
    }
    return list;
  }

  addTransaction(tx) {
    const newTx = {
      id: Date.now(),
      date: tx.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
      merchant: tx.merchant || 'Unknown Merchant',
      category: tx.category || 'Food',
      amount: Number(tx.amount) || 0,
      confidence: Number(tx.confidence) || 100,
      source: tx.source || 'UPI'
    };
    this.data.transactions.unshift(newTx);
    this.save();
    return newTx;
  }

  updateTransaction(id, updates) {
    const idx = this.data.transactions.findIndex(t => t.id == id);
    if (idx === -1) return null;
    this.data.transactions[idx] = { ...this.data.transactions[idx], ...updates };
    this.save();
    return this.data.transactions[idx];
  }

  deleteTransaction(id) {
    const idx = this.data.transactions.findIndex(t => t.id == id);
    if (idx === -1) return false;
    this.data.transactions.splice(idx, 1);
    this.save();
    return true;
  }

  // Recurring
  getRecurring() {
    return this.data.recurring;
  }

  addRecurring(rec) {
    const item = {
      id: Date.now(),
      name: rec.name,
      category: rec.category || 'Subscriptions',
      amount: Number(rec.amount) || 0,
      when: rec.when || 'Monthly',
      note: rec.note || 'User created',
      ok: rec.ok !== undefined ? Boolean(rec.ok) : true
    };
    this.data.recurring.push(item);
    this.save();
    return item;
  }

  updateRecurring(id, updates) {
    const idx = this.data.recurring.findIndex(r => r.id == id);
    if (idx === -1) return null;
    this.data.recurring[idx] = { ...this.data.recurring[idx], ...updates };
    this.save();
    return this.data.recurring[idx];
  }

  deleteRecurring(id) {
    const idx = this.data.recurring.findIndex(r => r.id == id);
    if (idx === -1) return false;
    this.data.recurring.splice(idx, 1);
    this.save();
    return true;
  }

  // Goals
  getGoals() {
    return this.data.goals;
  }

  addGoal(goal) {
    const item = {
      id: Date.now(),
      name: goal.name,
      emoji: goal.emoji || '🎯',
      target: Number(goal.target) || 0,
      saved: Number(goal.saved) || 0,
      months: Number(goal.months) || 6
    };
    this.data.goals.push(item);
    this.save();
    return item;
  }

  updateGoal(id, updates) {
    const idx = this.data.goals.findIndex(g => g.id == id);
    if (idx === -1) return null;
    this.data.goals[idx] = { ...this.data.goals[idx], ...updates };
    this.save();
    return this.data.goals[idx];
  }

  deleteGoal(id) {
    const idx = this.data.goals.findIndex(g => g.id == id);
    if (idx === -1) return false;
    this.data.goals.splice(idx, 1);
    this.save();
    return true;
  }

  // Suggestions
  getSuggestions() {
    return this.data.savingsSuggestions;
  }

  toggleSuggestion(id) {
    const item = this.data.savingsSuggestions.find(s => s.id == id);
    if (item) {
      item.active = !item.active;
      this.save();
    }
    return item;
  }

  // Analytics
  getAnalytics() {
    const totalSpent = this.data.transactions.reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
    const salary = this.data.profile.salary;
    const remaining = salary - totalSpent;
    const recurringTotal = this.data.recurring.reduce((acc, r) => acc + (Number(r.amount) || 0), 0);

    // By category
    const catMap = {};
    for (const cat in this.data.categories) catMap[cat] = 0;
    for (const t of this.data.transactions) {
      catMap[t.category] = (catMap[t.category] || 0) + (Number(t.amount) || 0);
    }
    const byCategory = Object.entries(catMap)
      .map(([name, amount]) => ({ name, amount, ...this.data.categories[name] }))
      .sort((a, b) => b.amount - a.amount);

    // Goal progress
    const totalGoalTarget = this.data.goals.reduce((a, g) => a + g.target, 0);
    const totalGoalSaved = this.data.goals.reduce((a, g) => a + g.saved, 0);
    const goalProgressPct = totalGoalTarget > 0 ? Math.round((totalGoalSaved / totalGoalTarget) * 100) : 0;

    return {
      totalSpent,
      salary,
      remaining,
      recurringTotal,
      savingsRate: salary > 0 ? Math.round((remaining / salary) * 100) : 0,
      goalProgressPct,
      activeGoalsCount: this.data.goals.length,
      byCategory
    };
  }
}

module.exports = new Database();
