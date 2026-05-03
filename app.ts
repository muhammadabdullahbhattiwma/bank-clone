class SimpleATM {
  private readonly correctPin = "1234";
  private balance = 2500;
  private isLoggedIn = false;

  private readonly pinInput = this.getEl("pinInput") as HTMLInputElement;
  private readonly pinPreview = this.getEl("pinPreview");
  private readonly enterBtn = this.getEl("enterBtn") as HTMLButtonElement;
  private readonly clearBtn = this.getEl("clearBtn") as HTMLButtonElement;
  private readonly withdrawInput = this.getEl("withdrawInput") as HTMLInputElement;
  private readonly withdrawBtn = this.getEl("withdrawBtn") as HTMLButtonElement;
  private readonly message = this.getEl("message");
  private readonly subMessage = this.getEl("subMessage");
  private readonly balanceText = this.getEl("balanceText");

  constructor() {
    this.bindEvents();
  }

  private getEl(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (!element) {
      throw new Error(`Missing element: ${id}`);
    }
    return element;
  }

  private bindEvents(): void {
    this.pinInput.addEventListener("input", () => this.updatePinPreview());
    this.pinInput.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.checkPin();
      }
    });
    this.enterBtn.addEventListener("click", () => this.checkPin());
    this.clearBtn.addEventListener("click", () => this.clearPin());
    this.withdrawBtn.addEventListener("click", () => this.withdraw());
  }

  private updatePinPreview(): void {
    const value = this.pinInput.value.replace(/\D/g, "").slice(0, 4);
    this.pinInput.value = value;

    let stars = "";
    for (let i = 0; i < value.length; i += 1) {
      stars += "*";
    }
    this.pinPreview.textContent = stars;
  }

  private checkPin(): void {
    const pin = this.pinInput.value.replace(/\D/g, "").slice(0, 4);
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
      this.balanceText.textContent = `Balance: $${this.balance}`;
      return;
    }

    this.isLoggedIn = false;
    this.message.textContent = "Wrong PIN.";
    this.subMessage.textContent = "Please enter correct PIN.";
    this.balanceText.textContent = "Balance: --";
  }

  private clearPin(): void {
    this.isLoggedIn = false;
    this.pinInput.value = "";
    this.pinPreview.textContent = "";
    this.withdrawInput.value = "";
    this.message.textContent = "Enter your 4-digit PIN.";
    this.subMessage.textContent = "Demo PIN: 1234";
    this.balanceText.textContent = "Balance: --";
  }

  private withdraw(): void {
    if (!this.isLoggedIn) {
      this.message.textContent = "Please login with PIN first.";
      this.subMessage.textContent = "Then you can withdraw.";
      return;
    }

    const amount = Number(this.withdrawInput.value);
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
    this.message.textContent = `Withdraw successful: $${amount}`;
    this.subMessage.textContent = "Amount deducted from your account.";
    this.balanceText.textContent = `Balance: $${this.balance}`;
  }
}

new SimpleATM();
