'use strict'

const account1 = {
    owner: 'Marcin Luty',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5, // %
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7, // %
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.current-balance');
const labelSumIn = document.querySelector('.summary_value-in');
const labelSumOut = document.querySelector('.summary_value-out');
const labelSumInterest = document.querySelector('.summary_value-interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.left');

const btnLogin = document.querySelector('.login');
const btnTransfer = document.querySelector('.transfer');
const btnLoan = document.querySelector('.btnLoan');
const btnClose = document.querySelector('.close');
const btnSort = document.querySelector('.sort');

const inputLoginUsername = document.querySelector('.username');
const inputLoginPin = document.querySelector('.pin');
const inputTransferTo = document.querySelector('.form_input-to');
const inputTransferAmount = document.querySelector('.form_input-amount');
const inputLoanAmount = document.querySelector('.form_input-loan');
const inputCloseUsername = document.querySelector('.form_input-user');
const inputClosePin = document.querySelector('.form_input-pin');

const displayMovements = function(movements){
    containerMovements.innerHTML = '';
    movements.forEach(function(mov, i){
        const type = mov > 0 ? 'deposit' : 'withdraw';

        const html = `
        <div class="movement">
            <span class="${type}">${i+1} ${type}</span>
            <p class="amount">${mov}$</p>
        </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
}
displayMovements(account1.movements);