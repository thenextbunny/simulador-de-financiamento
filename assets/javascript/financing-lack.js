import { Financing } from "./financing.js";
import { Installment } from "./installment.js";

export class FinancingWithLack extends Financing {
    #lack;
    #interestRate;
    #installments = [];

    constructor (value, entry, interestRate, deadline, lack) {
        super(value, entry, interestRate, deadline);
        this.#interestRate = interestRate;
        this.#installments = super.getInstallments();
        this.#lack = lack;
    }

    calculateMonthlyInstallments() {
        let balance = this.#installments[0].getBalance();

        for (let i = 0; i < this.#lack; i++) {
            const number = this.#installments.length;
            balance += Financing.calculateInterest(balance, this.#interestRate);
            this.#installments.push(new Installment(number, 0, 0, 0, balance));
        }

        super.calculateMonthlyInstallments();
    }

}