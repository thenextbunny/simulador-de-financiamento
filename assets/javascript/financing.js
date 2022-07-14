import { Installment } from './installment.js';
import { tableBody } from './main.js';

export class Financing {
    #interestRate;
    #deadline;
    #installments = [];

    constructor (value, entry, interestRate, deadline, installments) {
        this.#interestRate = interestRate;
        this.#deadline = deadline;
        this.#installments.push(new Installment(0, 0, 0, 0, value - entry));
    }

    static calculateInterest(value, interestRate) {
        return value * (interestRate / 100);
    }

    calculateMonthlyInstallments() {
        let balance = this.#installments[this.#installments.length - 1].getBalance();
        let deadline = this.#deadline - (this.#installments.length - 1);
        let amortization = balance / deadline; 

        for (let i = 0; i < deadline; i++) {
            const number = this.#installments.length;
            const interest = Financing.calculateInterest(balance, this.#interestRate);
            const value = interest + amortization;
            balance -= amortization;

            if (balance < 0) {
                balance = 0;
            }

            this.#installments.push(new Installment(number, value, interest, amortization, balance));
        }
    }

    displaysInstallments() {
        const installments = this.#installments.slice(1);

        for (const installment of installments) {
            const tableLine = tableBody.insertRow(-1);

            for (const data of installment.getFormattedData()) {
                const cell = tableLine.insertCell(-1);
                cell.textContent = data;
            }
        }
    }

    getInstallments() {
        return this.#installments;
    }
}