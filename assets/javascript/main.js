import { Financing } from './financing.js';
import { FinancingWithLack } from './financing-lack.js'

const withLack = document.querySelector('#lack');
const lackSelect = document.querySelector('#lack-select');
export const tableBody = document.querySelector('#table-body');
const buttonCalculate = document.querySelector('#calculate');
const textValue = document.querySelector('#value');
const textEntry = document.querySelector('#entry');
const textInterest = document.querySelector('#interest');
const textDeadline = document.querySelector('#deadline');

function cleanTableBody() {
    while(tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}

withLack.addEventListener('change', function() {
    if (this.checked) {
        lackSelect.removeAttribute('hidden');
    } else {
        lackSelect.setAttribute('hidden', 'hidden');
    }
});

buttonCalculate.addEventListener('click', function() {
    cleanTableBody();
    const value = parseFloat(textValue.value);
    const entry = parseFloat(textEntry.value);
    const interestRate = parseFloat(textInterest.value);
    const deadline = parseFloat(textDeadline.value);
    let simulation;

    if (withLack.checked) {
        const lack = parseInt(lackSelect.value);
        simulation = new FinancingWithLack(value, entry, interestRate, deadline, lack);
    } else {
        simulation = new Financing(value, entry, interestRate, deadline);
    }

    simulation.calculateMonthlyInstallments();
    simulation.displaysInstallments();
})

