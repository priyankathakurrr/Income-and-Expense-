// Select elements
const dateInput = document.getElementById('date');
const incomeInput = document.getElementById('income');
const expenseInput = document.getElementById('expense');
const categorySelect = document.getElementById('category');
const transactionTableBody = document.getElementById('transaction-table-body');
const totalIncomeSpan = document.getElementById('total-income');
const totalExpenseSpan = document.getElementById('total-expense');
const balanceSpan = document.getElementById('balance');

// Initialize variables for totals and transactions
let totalIncome = 0;
let totalExpense = 0;
let transactions = [];

// Function to add a transaction
function addTransaction() {
    const date = dateInput.value;
    const income = parseFloat(incomeInput.value) || 0; // Default to 0 if not a number
    const expense = parseFloat(expenseInput.value) || 0; // Default to 0 if not a number
    const category = categorySelect.value;

    if (income <= 0 && expense <= 0) {
        alert("Please enter a valid income or expense amount!"); // Ensure at least one input is valid
        return;
    }

    // Create transaction object
    const transaction = { date, category, income, expense };
    transactions.push(transaction); // Add transaction to the array

    // Add row to the table
    addRowToTable(transaction);

    // Update totals
    totalIncome += income;
    totalExpense += expense;

    // Update displayed totals and balance
    updateTotals();

    // Clear input fields
    clearInputs();
}

// Function to add a row to the table
function addRowToTable(transaction) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.income > 0 ? transaction.income : '-'}</td>
        <td>${transaction.expense > 0 ? transaction.expense : '-'}</td>
        <td><button class="update-transaction" onclick="updateTransaction(${transactions.length - 1})">Update</button></td>
    `;
    transactionTableBody.appendChild(row);
}

// Function to update totals
function updateTotals() {
    totalIncomeSpan.textContent = totalIncome.toFixed(2); // Updates the total income
    totalExpenseSpan.textContent = totalExpense.toFixed(2); // Updates the total expense
    balanceSpan.textContent = (totalIncome - totalExpense).toFixed(2); // Updates the balance
}

// Function to clear input fields
function clearInputs() {
    dateInput.value = new Date().toISOString().split('T')[0]; // Resets to today's date
    incomeInput.value = ''; // Clears the income input field
    expenseInput.value = ''; // Clears the expense input field
    categorySelect.value = 'food'; // Resets the category dropdown to default
}

// Function to clear all transactions
function clearAll() {
    transactionTableBody.innerHTML = ''; // Clears all transaction rows from the table
    transactions = []; // Reset the transactions array
    totalIncome = 0; // Resets total income
    totalExpense = 0; // Resets total expense
    updateTotals(); // Update totals to reflect cleared data
}

// Function to update a transaction
function updateTransaction(index) {
    const transaction = transactions[index]; // Get the transaction to update
    dateInput.value = transaction.date; // Populate the date input
    incomeInput.value = transaction.income; // Populate the income input
    expenseInput.value = transaction.expense; // Populate the expense input
    categorySelect.value = transaction.category; // Populate the category

    // Remove the transaction from the array
    transactions.splice(index, 1);
    transactionTableBody.innerHTML = ''; // Clear the table body
    transactions.forEach(addRowToTable); // Re-add remaining transactions to the table

    // Update totals
    totalIncome -= transaction.income; // Adjust total income
    totalExpense -= transaction.expense; // Adjust total expense
    updateTotals(); // Update displayed totals
}

// Attach event listeners
document.getElementById('add-transaction').addEventListener('click', addTransaction); // Add Transaction button
document.getElementById('clear-all').addEventListener('click', clearAll); // Clear button
