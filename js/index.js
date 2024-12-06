function getInputValueById(id) {
  return parseFloat(document.getElementById(id).value);
}

function showError(id) {
  document.getElementById(id).classList.remove("hidden");
}

// add event listener for calculate button

let count = 0;

const calculateButton = document.getElementById("calculate");
calculateButton.addEventListener("click", function () {
  count += 1;
  //   const income = parseFloat(document.getElementById("income").value);
  //   console.log(income);
  //   const software = parseFloat(document.getElementById("software").value);
  //   console.log(software);
  //   const courses = parseFloat(document.getElementById("courses").value);
  //   console.log(courses);
  //   const internet = parseFloat(document.getElementById("internet").value);
  //   console.log(internet);
  //   console.log({ income, software, courses, internet });
  //   console.table({ income, software, courses, internet });

  //   get value from function
  const income = getInputValueById("income");
  const software = getInputValueById("software");
  const courses = getInputValueById("courses");
  const internet = getInputValueById("internet");

  if (income <= 0 || isNaN(income)) {
    // document.getElementById("income-error").classList.remove("hidden");
    showError("income-error");
    return;
  }

  const totalExpenses = software + courses + internet;
  const balance = income - totalExpenses;
  //   console.log(totalExpenses, balance);

  if (totalExpenses > income) {
    document.getElementById("logic-error").classList.remove("hidden");
    return;
  }

  const totalExpensesElement = document.getElementById("total-expenses");
  totalExpensesElement.innerText = totalExpenses.toFixed(2);

  const balanceElement = document.getElementById("balance");
  balanceElement.innerText = balance.toFixed(2);

  const result = document.getElementById("results");
  result.classList.remove("hidden");

  const historyItem = document.createElement("div");
  historyItem.className =
    "bg-white p-3 rounded-md border-l-2 border-indigo-500";
  historyItem.innerHTML = `
    <p>Serial: ${count}</p>
    <p class="text-xs text-gray-500">${new Date().toLocaleDateString()}</p>
    <p class="text-xs text-gray-500">Income: ${income.toFixed(2)}</p>
    <p class="text-xs text-gray-500">Expenses: ${totalExpenses.toFixed(2)}</p>
    <p class="text-xs text-gray-500">Balance: ${balance.toFixed(2)}</p>
  `;
  const historyContainer = document.getElementById("history-list");
  historyContainer.insertBefore(historyItem, historyContainer.firstChild);
});

// add event listener for saving button
const calculateSavingsButton = document.getElementById("calculate-savings");
calculateSavingsButton.addEventListener("click", function () {
  const savingParcentace = parseFloat(document.getElementById("savings").value);
  const income = parseFloat(document.getElementById("income").value);
  //   console.log(income);
  const software = parseFloat(document.getElementById("software").value);
  //   console.log(software);
  const courses = parseFloat(document.getElementById("courses").value);
  //   console.log(courses);
  const internet = parseFloat(document.getElementById("internet").value);
  //   console.log(internet);
  const totalExpenses = software + courses + internet;
  const balance = income - totalExpenses;
  const savingAmount = (savingParcentace * balance) / 100;

  const remainingBalance = balance - savingAmount;
  const remainingElement = document.getElementById("remaining-balance");

  remainingElement.innerText = remainingBalance.toFixed(2);

  //   console.log(savingAmount);
  const savingElement = document.getElementById("savings-amount");
  savingElement.innerText = savingAmount.toFixed(2);
});

// history tab functionality

const historyTab = document.getElementById("history-tab");
const assistantTab = document.getElementById("assistant-tab");
historyTab.addEventListener("click", function () {
  historyTab.classList.add(
    "text-white",
    "bg-gradient-to-r",
    "from-blue-500",
    "to-purple-600"
  );
  historyTab.classList.remove("text-gray-600");
  assistantTab.classList.remove(
    "text-white",
    "bg-gradient-to-r",
    "from-blue-500",
    "to-purple-600"
  );
  assistantTab.classList.add("text-gray-600");

  document.getElementById("expense-form").classList.add("hidden");
  document.getElementById("history-section").classList.remove("hidden");
});

assistantTab.addEventListener("click", function () {
  assistantTab.classList.add(
    "text-white",
    "bg-gradient-to-r",
    "from-blue-500",
    "to-purple-600"
  );
  historyTab.classList.remove(
    "text-white",
    "bg-gradient-to-r",
    "from-blue-500",
    "to-purple-600"
  );
  document.getElementById("expense-form").classList.remove("hidden");
  document.getElementById("history-section").classList.add("hidden");
});

// live validation for input
document.getElementById("income").addEventListener("input", function () {
  const inputValue = parseFloat(document.getElementById("income").value);
  console.log(inputValue);
  if (isNaN(inputValue) || inputValue <= 0) {
    document.getElementById("income-error").classList.remove("hidden");
    return;
  }
});
