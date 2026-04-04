var balance: number = 1000;

var savedCard: number = 123456;  // card number
var savedPin: number = 4321;     // pin
var isLoggedIn: boolean = false;


// 🔐 Login
function login(card: number, pin: number): boolean {
    if (card === savedCard && pin === savedPin) {
        isLoggedIn = true;
        return true;
    } else {
        return false;
    }
}


// 💰 Deposit
function deposit(amount: number): number {
    if (!isLoggedIn) {
        return -1; // not logged in
    }

    if (amount > 0) {
        balance += amount;
        return balance;
    } else {
        return balance;
    }
}


// 💸 Withdraw
function withdraw(amount: number): number {
    if (!isLoggedIn) {
        return -1; // not logged in
    }

    if (amount > balance) {
        return -2; // insufficient balance
    } else {
        balance -= amount;
        return balance;
    }
}


// 📊 Check Balance
function checkBalance(): number {
    if (!isLoggedIn) {
        return -1;
    }
    return balance;
}


// 🚪 Logout
function logout(): void {
    isLoggedIn = false;
}


// 🧪 Example (Terminal run)
var loginResult = login(123456, 4321);

if (loginResult) {
    deposit(500);
    withdraw(500);
    var finalBalance = checkBalance();
    console.log(finalBalance); // final output
} else {
    console.log("Login Failed");
}