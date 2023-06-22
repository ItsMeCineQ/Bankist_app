'use strict'

const account1 = {
    owner: 'Marcin Luty',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2020-07-12T10:51:36.790Z',
      ],
      currency: 'EUR',
      locale: 'pl-PL', 
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5, // %
    pin: 2222,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
      ],
      currency: 'USD',
      locale: 'en-US',
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

const displayMovements = function(acc, sort = false){
    containerMovements.innerHTML = '';

    const movs = sort ? acc.movements.slice().sort((a,b) => a-b) : acc.movements;

    movs.forEach(function(mov, i){
        const type = mov > 0 ? 'deposit' : 'withdraw';

        const date = new Date(acc.movementsDates[i]);
        const day = `${date.getDate()}`.padStart(2, 0);
        const month = `${date.getMonth() + 1}`.padStart(2, 0);
        const year = date.getFullYear();
        const displayDate = `${day}/${month}/${year}`;

        const html = `
        <div class="movement">
            <span class="${type}">${i+1} ${type}</span>
            <p class="movement-date date">${displayDate}</p>
            <p class="amount">${mov.toFixed(2)} EUR</p>
        </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
}

const calcDisplayBalance = function(acc){
    acc.balance = acc.movements.reduce((acc, cur) => acc + cur);  
    labelBalance.innerHTML = `${acc.balance.toFixed(2)} EUR`;
};

const displaySummary = function(acc){
    const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc+mov, 0);
    labelSumIn.innerHTML = `${incomes.toFixed(2)} EUR`;

    const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc+mov, 0);
    labelSumOut.innerHTML = `${Math.abs(outcomes.toFixed(2))} EUR`;

    const interest = acc.movements.filter(mov => mov>0).map(deposit => deposit*acc.interestRate/100).filter(mov => mov>=1).reduce((acc, mov) => acc+mov);
    labelSumInterest.innerHTML = `${interest.toFixed(2)} EUR`;
};

const interestBalance = function(acc){
    const balance = acc.interestRate * displaySummary(acc.movements);
    labelSumInterest.innerHTML = `${balance.toFixed(2)} EUR`;
};

const createUsernames = function(accounts){
    accounts.forEach(function(acc){
        acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
    });
};
createUsernames(accounts);

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
    displayMovements(acc);
    displaySummary(acc);
    calcDisplayBalance(acc);
}

// FAKE ALWAYS LOGGED IN

/* currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100; */

// DATES


// login 
btnLogin.addEventListener('click', function(e){
    e.preventDefault();
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    
    if(inputLoginUsername.value === currentAccount.username && Number(inputLoginPin.value) === currentAccount.pin){
        containerApp.style.opacity = 100;
        updateUI(currentAccount);
    };
    inputLoginUsername.value = inputLoginPin.value = '';

    // Create current date and time
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);
    labelDate.innerHTML = `${day}/${month}/${year}, ${hour}:${min}`;
});

// Transfer money
btnTransfer.addEventListener('click', function(e){
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiver = accounts.find(acc => acc.username === inputTransferTo.value);
    if(amount > 0 && receiver && amount <= currentAccount.balance && receiver.username !== currentAccount.username){
        
        // Doing the transfer
        currentAccount.movements.push(-amount);
        receiver.movements.push(amount);

        // Add transfer date
        currentAccount.movementsDates.push(new Date().toISOString());
        receiver.movementsDates.push(new Date().toISOString());

        updateUI(currentAccount);
    }
    inputTransferAmount.value = inputTransferTo.value = '';
});

// Loan money
btnLoan.addEventListener('click', function(e){
    e.preventDefault();
    const amount = Math.floor(inputLoanAmount.value);
    if(amount > 0 && currentAccount.movements.some(mov => mov >= amount/10)){
        currentAccount.movements.push(amount);

        currentAccount.movementsDates.push(new Date().toISOString());

        updateUI(currentAccount);
    };
    inputLoanAmount.value = '';
});

// Close account
btnClose.addEventListener('click', function(e){
    e.preventDefault();
    
    if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
        const index = accounts.findIndex(acc => acc.username === currentAccount.username);
        accounts.splice(index, 1);
        updateUI(currentAccount);
    };
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = 0;
});

// Sort
/* let state = false;
btnSort.addEventListener('click', function(e){
    e.preventDefault();
    if(state === false){
        displayMovements(currentAccount.movements, true);
        return state = true;
    }else{
        displayMovements(currentAccount.movements, false);
        return state = false;
    }
}); */

// shorten version
let sort = false;
btnSort.addEventListener('click', function(e){
    e.preventDefault();
    displayMovements(currentAccount.movements, !sort);
    sort = !sort
});

/* labelBalance.addEventListener('click', function(){
    const movementsUI = Array.from(document.querySelectorAll('.amount'));
    console.log(movementsUI.map(el => Number(el.textContent.replace('EUR', ''))));
}); */

labelBalance.addEventListener('click', function(){
    [...document.querySelector('.movement')].forEach(function(row, i){
    if(i % 2 === 0) row.style.backgroundColor = 'orangered';
    if(i % 3 === 0) row.style.backgroundColor = 'blue';
});
});

console.log(new Date(account1.movementsDates[0]));