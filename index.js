var balance = 1000;
var savedCard = 123456; // card number
var savedPin = 4321; // pin
var isLoggedIn = false;
// 🔐 Login
function login(card, pin) {
    if (card === savedCard && pin === savedPin) {
        isLoggedIn = true;
        return true;
    }
    else {
        return false;
    }
}
// 💰 Deposit
function deposit(amount) {
    if (!isLoggedIn) {
        return -1; // not logged in
    }
    if (amount > 0) {
        balance += amount;
        return balance;
    }
    else {
        return balance;
    }
}
// 💸 Withdraw
function withdraw(amount) {
    if (!isLoggedIn) {
        return -1; // not logged in
    }
    if (amount > balance) {
        return -2; // insufficient balance
    }
    else {
        balance -= amount;
        return balance;
    }
}
// 📊 Check Balance
function checkBalance() {
    if (!isLoggedIn) {
        return -1;
    }
    return balance;
}
// 🚪 Logout
function logout() {
    isLoggedIn = false;
}
// 🧪 Example (Terminal run)
var loginResult = login(123456, 4321);
if (loginResult) {
    deposit(500);
    withdraw(500);
    var finalBalance = checkBalance();
    console.log(finalBalance); // final output
}
else {
    console.log("Login Failed");
}
