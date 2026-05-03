var SimpleATM = /** @class */ (function () {
    function SimpleATM() {
        this.correctPin = "1234";
        this.balance = 2500;
        this.isLoggedIn = false;
        this.pinInput = this.getEl("pinInput");
        this.pinPreview = this.getEl("pinPreview");
        this.enterBtn = this.getEl("enterBtn");
        this.clearBtn = this.getEl("clearBtn");
        this.withdrawInput = this.getEl("withdrawInput");
        this.withdrawBtn = this.getEl("withdrawBtn");
        this.message = this.getEl("message");
        this.subMessage = this.getEl("subMessage");
        this.balanceText = this.getEl("balanceText");
        this.bindEvents();
    }
    SimpleATM.prototype.getEl = function (id) {
        var element = document.getElementById(id);
        if (!element) {
            throw new Error("Missing element: ".concat(id));
        }
        return element;
    };
    SimpleATM.prototype.bindEvents = function () {
        var _this = this;
        this.pinInput.addEventListener("input", function () { return _this.updatePinPreview(); });
        this.pinInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                _this.checkPin();
            }
        });
        this.enterBtn.addEventListener("click", function () { return _this.checkPin(); });
        this.clearBtn.addEventListener("click", function () { return _this.clearPin(); });
        this.withdrawBtn.addEventListener("click", function () { return _this.withdraw(); });
    };
    SimpleATM.prototype.updatePinPreview = function () {
        var value = this.pinInput.value.replace(/\D/g, "").slice(0, 4);
        this.pinInput.value = value;
        var stars = "";
        for (var i = 0; i < value.length; i += 1) {
            stars += "*";
        }
        this.pinPreview.textContent = stars;
    };
    SimpleATM.prototype.checkPin = function () {
        var pin = this.pinInput.value.replace(/\D/g, "").slice(0, 4);
        this.pinInput.value = pin;
        this.updatePinPreview();
        if (pin.length !== 4) {
            this.message.textContent = "PIN must be 4 digits.";
            this.subMessage.textContent = "Try again.";
            this.balanceText.textContent = "Balance: --";
            return;
        }
        if (pin === this.correctPin) {
            this.isLoggedIn = true;
            this.message.textContent = "Login successful.";
            this.subMessage.textContent = "Your account balance is shown below.";
            this.balanceText.textContent = "Balance: $".concat(this.balance);
            return;
        }
        this.isLoggedIn = false;
        this.message.textContent = "Wrong PIN.";
        this.subMessage.textContent = "Please enter correct PIN.";
        this.balanceText.textContent = "Balance: --";
    };
    SimpleATM.prototype.clearPin = function () {
        this.isLoggedIn = false;
        this.pinInput.value = "";
        this.pinPreview.textContent = "";
        this.withdrawInput.value = "";
        this.message.textContent = "Enter your 4-digit PIN.";
        this.subMessage.textContent = "Demo PIN: 1234";
        this.balanceText.textContent = "Balance: --";
    };
    SimpleATM.prototype.withdraw = function () {
        if (!this.isLoggedIn) {
            this.message.textContent = "Please login with PIN first.";
            this.subMessage.textContent = "Then you can withdraw.";
            return;
        }
        var amount = Number(this.withdrawInput.value);
        if (!(amount > 0)) {
            this.message.textContent = "Enter a valid withdraw amount.";
            this.subMessage.textContent = "Amount should be greater than 0.";
            return;
        }
        if (amount > this.balance) {
            this.message.textContent = "Insufficient balance.";
            this.subMessage.textContent = "Please enter a smaller amount.";
            return;
        }
        this.balance -= amount;
        this.withdrawInput.value = "";
        this.message.textContent = "Withdraw successful: $".concat(amount);
        this.subMessage.textContent = "Amount deducted from your account.";
        this.balanceText.textContent = "Balance: $".concat(this.balance);
    };
    return SimpleATM;
}());
new SimpleATM();
