'use strict';

// Functions for modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
// console.log(btnsOpenModal);

const openModal = function () {
  console.log('Button clicked');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  // console.log('A key was pressed');
  // console.log(e.key);

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Dynamically create a dropdown of the months and display it on the DOM
document.addEventListener('DOMContentLoaded', function () {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthDropdown = document.getElementById('months');

  months.forEach(month => {
    const option = document.createElement('option');
    option.value = month;
    option.textContent = month;
    monthDropdown.appendChild(option);
  });

  monthDropdown.selectedIndex = new Date().getMonth();
});

// Creating Budget class with methods and properties to handle income, expense, and total budget
class Budget {
  constructor() {
    this.income = [];
    this.expense = [];
    this.savings = [];
  }
  // Add income
  addIncome(description, amount) {
    this.income.push({ description, amount });
  }
  // Add expense
  addExpense(description, amount) {
    this.expense.push({ description, amount });
  }
  // Add savings
  addSavings(description, amount) {
    this.savings.push({ description, amount });
  }
  // Calculate total income
  getTotalIncome() {
    return this.income.reduce((total, income) => total + income.amount, 0);
  }
  // Calculate total expense
  getTotalExpense() {
    return this.expense.reduce((total, expense) => total + expense.amount, 0);
  }
  // Calculate total savings
  getTotalSavings() {
    return this.savings.reduce((total, savings) => total + savings.amount, 0);
  }
  // Calculate total budget
  getTotalBudget() {
    return (
      this.getTotalIncome() - this.getTotalExpense() - this.getTotalSavings()
    );
  }
}
// Creating instance of Budget class
const myBudget = new Budget();

// Update Overview section
function updateOverview() {
  // Update totals
  document.getElementById('total-income').textContent = myBudget
    .getTotalIncome()
    .toFixed(2);
  document.getElementById('total-expenses').textContent = myBudget
    .getTotalExpense()
    .toFixed(2);
  document.getElementById('total-savings').textContent = myBudget
    .getTotalSavings()
    .toFixed(2);
  document.getElementById('remaining-budget').textContent = myBudget
    .getTotalBudget()
    .toFixed(2);
  // Update Details
  const incomeList = document.getElementById('income-list');
  const expenseList = document.getElementById('expense-list');
  const savingsList = document.getElementById('savings-list');

  incomeList.innerHTML = '<h3>Incomes</h3>';
  myBudget.income.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.description}: $${item.amount.toFixed(2)}`;
    incomeList.appendChild(li);
  });

  expenseList.innerHTML = '<h3>Expenses</h3>';
  myBudget.expense.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.description}: $${item.amount.toFixed(2)}`;
    expenseList.appendChild(li);
  });

  savingsList.innerHTML = '<h3>Savings</h3>';
  myBudget.savings.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.description}: $${item.amount.toFixed(2)}`;
    savingsList.appendChild(li);
  });
}
// Add button eventListener
// Income button
document.getElementById('income-btn').addEventListener('click', function () {
  const description = document
    .getElementById('income-description')
    .value.trim();
  const incomeAmount = parseFloat(
    document.getElementById('income-amount').value
  );

  if (!description || isNaN(incomeAmount) || incomeAmount <= 0) {
    alert('Please enter valid details');
    return;
  }
  myBudget.addIncome(description, incomeAmount);
  updateOverview();
  // Clear inputs
  document.getElementById('income-description').value = '';
  document.getElementById('income-amount').value = '';
});
// Expense button
document.getElementById('expense-btn').addEventListener('click', function () {
  const description = document
    .getElementById('expense-description')
    .value.trim();
  const expenseAmount = parseFloat(
    document.getElementById('expense-amount').value
  );

  if (!description || isNaN(expenseAmount) || expenseAmount <= 0) {
    alert('Please enter valid details');
    return;
  }
  myBudget.addExpense(description, expenseAmount);
  updateOverview();
  // Clear inputs
  document.getElementById('expense-description').value = '';
  document.getElementById('expense-amount').value = '';
});
// Savings button
document.getElementById('savings-btn').addEventListener('click', function () {
  const description = document
    .getElementById('savings-description')
    .value.trim();
  const savingsAmount = parseFloat(
    document.getElementById('savings-amount').value
  );

  if (!description || isNaN(savingsAmount) || savingsAmount <= 0) {
    alert('Please enter valid details');
    return;
  }
  myBudget.addSavings(description, savingsAmount);
  updateOverview();
  // Clear input fields
  document.getElementById('savings-description').value = '';
  document.getElementById('savings-amount').value = '';
});
