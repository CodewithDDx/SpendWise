const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'spendwise_data.json');

const INITIAL_DATA = {
  profile: {
    name: 'Aarav',
    salary: 85000,
    baseSavings: 12000,
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
  transactions: [
    { id: 1, date: 'Oct 28', merchant: 'Swiggy', category: 'Food', amount: 486, confidence: 98, source: 'HDFC Card' },
    { id: 2, date: 'Oct 28', merchant: 'Uber', category: 'Transport', amount: 312, confidence: 97, source: 'UPI' },
    { id: 3, date: 'Oct 27', merchant: 'Netflix', category: 'Subscriptions', amount: 649, confidence: 99, source: 'HDFC Card' },
    { id: 4, date: 'Oct 27', merchant: 'Amazon', category: 'Shopping', amount: 2899, confidence: 91, source: 'ICICI Card' },
    { id: 5, date: 'Oct 26', merchant: 'Zomato', category: 'Food', amount: 724, confidence: 98, source: 'UPI' },
    { id: 6, date: 'Oct 26', merchant: 'Spotify', category: 'Subscriptions', amount: 119, confidence: 99, source: 'HDFC Card' },
    { id: 7, date: 'Oct 25', merchant: 'BESCOM Electricity', category: 'Bills', amount: 2140, confidence: 96, source: 'Bank' },
    { id: 8, date: 'Oct 25', merchant: 'Apollo Pharmacy', category: 'Health', amount: 860, confidence: 94, source: 'UPI' },
    { id: 9, date: 'Oct 24', merchant: 'BookMyShow', category: 'Fun', amount: 780, confidence: 95, source: 'ICICI Card' },
    { id: 10, date: 'Oct 23', merchant: 'Blinkit', category: 'Food', amount: 1240, confidence: 89, source: 'UPI' },
    { id: 11, date: 'Oct 23', merchant: 'Cult.fit', category: 'Health', amount: 1499, confidence: 93, source: 'HDFC Card' },
    { id: 12, date: 'Oct 22', merchant: 'Rapido', category: 'Transport', amount: 148, confidence: 96, source: 'UPI' },
    { id: 13, date: 'Oct 21', merchant: 'Myntra', category: 'Shopping', amount: 3499, confidence: 92, source: 'ICICI Card' },
    { id: 14, date: 'Oct 20', merchant: 'Airtel Broadband', category: 'Bills', amount: 1179, confidence: 98, source: 'Bank' },
    { id: 15, date: 'Oct 19', merchant: 'Cloud storage', category: 'Subscriptions', amount: 210, confidence: 86, source: 'HDFC Card' },
    { id: 16, date: 'Oct 18', merchant: 'Starbucks', category: 'Food', amount: 560, confidence: 97, source: 'UPI' },
    { id: 17, date: 'Oct 17', merchant: 'Steam', category: 'Fun', amount: 1299, confidence: 90, source: 'ICICI Card' },
    { id: 18, date: 'Oct 15', merchant: 'Meal kit box', category: 'Subscriptions', amount: 1899, confidence: 72, source: 'HDFC Card' },
    { id: 19, date: 'Oct 14', merchant: 'Ola', category: 'Transport', amount: 420, confidence: 95, source: 'UPI' },
    { id: 20, date: 'Oct 12', merchant: 'Dominos', category: 'Food', amount: 640, confidence: 97, source: 'UPI' },
    { id: 21, date: 'Oct 10', merchant: 'Rent', category: 'Bills', amount: 18500, confidence: 99, source: 'Bank' },
    { id: 22, date: 'Oct 08', merchant: 'Decathlon', category: 'Shopping', amount: 2150, confidence: 88, source: 'ICICI Card' }
  ],
  recurring: [
    { id: 1, name: 'Rent', category: 'Bills', amount: 18500, when: 'Nov 10', note: 'Steady for 11 months', ok: true },
    { id: 2, name: 'Cult.fit', category: 'Health', amount: 1499, when: 'Nov 23', note: 'Used 3 times in the last 60 days', ok: false },
    { id: 3, name: 'Meal kit box', category: 'Subscriptions', amount: 1899, when: 'Nov 15', note: 'Price rose ₹300 since July', ok: false },
    { id: 4, name: 'Netflix', category: 'Subscriptions', amount: 649, when: 'Nov 27', note: 'Overlaps with 2 other video apps', ok: false },
    { id: 5, name: 'Airtel Broadband', category: 'Bills', amount: 1179, when: 'Nov 20', note: 'On the standard plan', ok: true },
    { id: 6, name: 'Cloud storage', category: 'Subscriptions', amount: 210, when: 'Nov 19', note: 'Using 18% of your space', ok: false },
    { id: 7, name: 'Spotify', category: 'Subscriptions', amount: 119, when: 'Nov 26', note: 'Played daily', ok: true }
  ],
  goals: [
    { id: 1, name: 'Goa trip', emoji: '✈', target: 60000, saved: 22400, months: 6 },
    { id: 2, name: 'Laptop', emoji: '💻', target: 80000, saved: 10000, months: 12 }
  ],
  savingsSuggestions: [
    { id: 1, title: 'Pause Cult.fit for two months', detail: 'You went 3 times in 60 days', monthlySaving: 1499, emoji: '🏋', active: false },
    { id: 2, title: 'Switch meal kit to every other week', detail: 'Price went up ₹300 since July', monthlySaving: 950, emoji: '🥗', active: false },
    { id: 3, title: 'Cap food delivery at ₹4,500 a month', detail: 'You spent ₹6,100 on it this month', monthlySaving: 1600, emoji: '🍜', active: false },
    { id: 4, title: 'Drop one overlapping video app', detail: 'Three services, one regularly watched', monthlySaving: 649, emoji: '📺', active: false }
  ]
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
