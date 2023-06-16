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
const labelSumIn = document.querySelector('.value_in');
const labelSumOut = document.querySelector('.value_out');
const labelSumInterest = document.querySelector('.value_interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.left');

const btnLogin = document.querySelector('.btn-login');
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
            <p class="amount">${mov} EUR</p>
        </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
}

const calcDisplayBalance = function(acc){
    acc.balance = acc.movements.reduce((acc, cur) => acc + cur);  
    labelBalance.innerHTML = `${acc.balance} EUR`;
};

const displaySummary = function(acc){
    const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc+mov, 0);
    labelSumIn.innerHTML = `${incomes} EUR`;

    const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc+mov, 0);
    labelSumOut.innerHTML = `${Math.abs(outcomes)} EUR`;

    const interest = acc.movements.filter(mov => mov>0).map(deposit => deposit*acc.interestRate/100).filter(mov => mov>=1).reduce((acc, mov) => acc+mov);
    labelSumInterest.innerHTML = `${interest} EUR`;
};

const interestBalance = function(acc){
    const balance = acc.interestRate * displaySummary(acc.movements);
    labelSumInterest.innerHTML = `${balance} EUR`;
};

const createUsernames = function(accounts){
    accounts.forEach(function(acc){
        acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
    });
};
createUsernames(accounts);
console.log(accounts);

/* const account = accounts.find(acc => acc.owner == 'Jessica Davis');
console.log(account);
 */
// alternative
/* for(const acc of accounts){
    if(acc.owner == 'Jessica Davis'){
        console.log(acc);
    }
} */

let currentAccount;

const updateUI = function(acc){
    displayMovements(acc.movements);
    displaySummary(acc);
    calcDisplayBalance(acc);
}

// login 
btnLogin.addEventListener('click', function(e){
    e.preventDefault();
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    
    if(inputLoginUsername.value === currentAccount.username && Number(inputLoginPin.value) === currentAccount.pin){
        containerApp.style.opacity = 100;
        updateUI(currentAccount);
    };
    inputLoginUsername.value = inputLoginPin.value = '';
});

// Transfer money
btnTransfer.addEventListener('click', function(e){
    e.preventDefault();
    const amount = inputTransferAmount.value;
    const receiver = inputTransferTo.value;
    if(amount > 0){
        currentAccount.movements.push(-amount);
        accounts.findIndex(acc => acc.username === receiver);
        console.log(accounts.receiver);
        updateUI(currentAccount);
    }
    inputTransferAmount.value = inputTransferTo.value = '';
});

