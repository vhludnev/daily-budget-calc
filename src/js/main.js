'use strict';

let startBtn = document.getElementById("start"),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
	monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
	yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


	expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
	optionalExpensesBtnClear = document.getElementsByTagName('button')[2],
	countBtn = document.getElementsByTagName('button')[3],
	optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
	percentValue = document.querySelector('.choose-percent'),
	yearValue = document.querySelector('.year-value'),
	monthValue = document.querySelector('.month-value'),
	dayValue = document.querySelector('.day-value');

	
	let money, time;

	expensesBtn.disabled = true;
	optionalExpensesBtn.disabled = true;
	countBtn.disabled = true;

	startBtn.addEventListener('click', function() {
		time = prompt('Enter date YYYY-MM-DD', '');
		while (isNaN(Date.parse(time)) || time == '' || time == null) {
			time = prompt("Check the date YYYY-MM-DD", "");
		}

		money = +prompt("Your monthly budget?", '');
		while (isNaN(money) || money == '' || money == null) {
			money = prompt("Your budget?", "");
		}
		
		appData.budget = money;
		appData.timeData = time;
		budgetValue.textContent = money.toFixed();
		yearValue.value = new Date(Date.parse(time)).getFullYear(); /* [.value] because in html it is in [input] */
		monthValue.value = new Date(Date.parse(time)).getMonth() + 1; /* each month begins with 0 */
		dayValue.value = new Date(Date.parse(time)).getDate();

		expensesBtn.disabled = false;
		optionalExpensesBtn.disabled = false;
		countBtn.disabled = false;
	});
	
	expensesBtn.addEventListener('click', function() {
		let sum = 0;
		for (let i = 0; i < expensesItem.length; i++) {
			let a = expensesItem[i].value,
				b = expensesItem[++i].value;
	
			if ((typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
				appData.expenses[a] = b;
				sum += +b;
				expensesValue.textContent = sum; /* [.textContent] because in html it is in [div] */
			} else {
				i = i - 1;
			}
			if (isNaN(sum)) {
				expensesValue.textContent = "Error! Please, check the prices!";
			}
		}
	});
	
	optionalExpensesBtn.addEventListener('click', function() {
		for (let i = 0; i < optionalExpensesItem.length; i++) {
			let opt = optionalExpensesItem[i].value;
			appData.optionalExpenses[i] = opt;
			optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
		}
	});

	optionalExpensesBtnClear.addEventListener('click', function() {
		optionalExpensesValue.textContent = null;

	});
	
	
	incomeItem.addEventListener('input', () => {   /* [() =>] the same as [function()] */
		let items = incomeItem.value;
		if (isNaN(items) || items != '') {                 
			appData.income = items.split(',');
			incomeValue.textContent = appData.income;
		} else {
			incomeValue.textContent = null;
		}
	});
	
	checkSavings.addEventListener("click", () => {
		if (appData.savings == true) {
			appData.savings = false;
		} else {
			appData.savings = true;
		}
	});
	
	sumValue.addEventListener('input', () => {
		if (appData.savings == true) {
			let sum = +sumValue.value;
			let percent = +percentValue.value;
			if (isNaN(sum) || isNaN(percent)) {                 
				monthSavingsValue.textContent = "Error";
				yearSavingsValue.textContent = "Error";	
				budgetValue.textContent = money.toFixed();
			} else {
				appData.monthIncome = sum/100/12*percent;
				appData.yearIncome = sum/100*percent;
				monthSavingsValue.textContent = appData.monthIncome.toFixed(1); /* toFixed(1) - one decimal value after comma */
				yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
				budgetValue.textContent = money.toFixed() + +appData.monthIncome.toFixed();
			}
		} 
	});
	
	percentValue.addEventListener('input', () => {
		if (appData.savings == true) {
			let sum = +sumValue.value;
			let percent = +percentValue.value;
			if (isNaN(sum) || isNaN(percent)) {                 
				monthSavingsValue.textContent = "Error";
				yearSavingsValue.textContent = "Error";	
				budgetValue.textContent = money.toFixed();
			} else {
				appData.monthIncome = sum/100/12*percent;
				appData.yearIncome = sum/100*percent;
				monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
				yearSavingsValue.textContent = appData.yearIncome.toFixed(1);	
				budgetValue.textContent = money.toFixed() + +appData.monthIncome.toFixed();
			
			}
		} 
	});
	
	countBtn.addEventListener('click', function() {
		if (appData.budget != undefined) {
			appData.moneyPerDay = ((appData.budget + appData.monthIncome - +expensesValue.textContent) / 30).toFixed();
			dayBudgetValue.textContent = appData.moneyPerDay;
			if (appData.moneyPerDay < 100) {
				levelValue.textContent = 'Minimum level of wealth';
			} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
				levelValue.textContent = 'Medium level of wealth';
			} else if (appData.moneyPerDay > 2000) {
				levelValue.textContent = 'High level of wealth';
			} else {
				levelValue.textContent = 'Error';
			}
		} else {
			dayBudgetValue.textContent = 'Error';
		}
	});
	
	
	const appData = {
		budget: money,
		expenses: {},
		optionalExpenses: {},
		income: [],
		timeData: time,
		savings: false
	};