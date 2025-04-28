let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// حفظ المصاريف في LocalStorage
function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// تحديث عرض المصاريف والمجموع والرسم البياني
function updateExpensesList() {
  const expensesList = document.getElementById('expenses-list');
  const totalAmount = document.getElementById('total-amount');

  expensesList.innerHTML = '';
  let total = 0;

  expenses.forEach((expense, index) => {
    const item = document.createElement('div');
    item.className = 'expense-item';
    item.innerHTML = `
      <span>${expense.date} - ${expense.name} (${expense.category}) - ${expense.amount}€</span>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expensesList.appendChild(item);
    total += Number(expense.amount);
  });

  totalAmount.textContent = total;

  updateChart();
}

// إضافة مصروف جديد
function addExpense() {
  const nameInput = document.getElementById('expense-name');
  const amountInput = document.getElementById('expense-amount');
  const categoryInput = document.getElementById('expense-category');

  const name = nameInput.value.trim();
  const amount = amountInput.value.trim();
  const category = categoryInput.value;

  if (name === '' || amount === '' || category === '') {
    alert('Please fill all fields correctly!');
    return;
  }

  const today = new Date();
  const date = today.toLocaleDateString();

  expenses.push({ name, amount: Number(amount), category, date });
  saveExpenses();
  updateExpensesList();

  nameInput.value = '';
  amountInput.value = '';
  categoryInput.value = '';
}

// حذف مصروف
function deleteExpense(index) {
  expenses.splice(index, 1);
  saveExpenses();
  updateExpensesList();
}

// تحميل نسخة احتياطية للمصاريف
function downloadBackup() {
  if (expenses.length === 0) {
    alert("No expenses to backup!");
    return;
  }

  let content = "Expense Tracker Backup:\n\n";
  expenses.forEach(expense => {
    content += `Date: ${expense.date}\n`;
    content += `Name: ${expense.name}\n`;
    content += `Amount: ${expense.amount}€\n`;
    content += `Category: ${expense.category}\n`;
    content += "------------------------------\n";
  });

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "expenses-backup.txt";
  a.click();
  URL.revokeObjectURL(url);
}
updateExpensesList();