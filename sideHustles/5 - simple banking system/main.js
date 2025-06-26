// Create an account
// Method to deposit money
// Method to withdraw money
// Method to check balance

class BankAccount {
    constructor(name){
        this.name = name;
        this.balance = 0;
    }

    deposit(amount){
        if (amount > 0){
            this.balance += amount;
            return `You have deposited £${amount}. Your new balance is £${this.balance}`;
        } else {
            return "Deposit amount must be positive.";
        } 
    }

    withdraw(amount){
        if (amount <= 0){
            return "Withdrawal amount must be positive.";
        }
        if (amount > this.balance){
            return "Insufficient funds.";
        }
        this.balance -= amount;
        return `You have withdrew £${amount}. Your new balance is £${this.balance}`;
    }

    checkBalance(amount){
        return `You currently have £${amount} in your account.`;
    }
}

const accounts = {};

function createAccount(){
    const name = document.getElementById("createName").value.trim();
    if (!name){
        return show("Please enter your name.");
    }
    if (accounts[name]){
        return show("Account already exists.");
    }
    accounts[name] = new BankAccount(name);
    show(`Account created for ${name}.`);
}

function deposit(){
    const name = document.getElementById("depositName").value.trim();
    const amount = parseFloat(document.getElementById("depositAmount").value);
    const account = accounts[name];
    if (!account){
        return show("Account not found.");
    }
    show(account.deposit(amount));
}

function withdraw(){
    const name = document.getElementById("withdrawName").value.trim();
    const amount = parseFloat(document.getElementById("withdrawAmount").value);
    const account = accounts[name];
    if (!account){
        return show("Account not found.");
    }
    show(account.withdraw(amount));
}

function checkBalance(){
    const name = document.getElementById("balanceName").value.trim();
    const account = accounts[name];
    if (!account){
        return show("Account not found.");
    }
    show(account.checkBalance());
}

function show(message){
    document.getElementById("output").textContent = message;
}