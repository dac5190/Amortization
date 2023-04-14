import { Component } from '@angular/core';


@Component({
  selector: 'app-loan-amortization',
  templateUrl: './loan-amortization.component.html',
  styleUrls: ['./loan-amortization.component.scss']
})
export class LoanAmortizationComponent {
  loanAmount!: number;
  interestRate!: number;
  loanTerm!: number;
  paymentFrequency!: number;
  amortizationBreakdown: any[] = [];
  showAmortization: boolean = false;

  calculateAmortization(): void {
    const numPayments = this.loanTerm * this.paymentFrequency;
    const interestRateMonthly = this.interestRate / 12 / 100;
    const paymentAmount =
      (this.loanAmount *
        interestRateMonthly *
        Math.pow(1 + interestRateMonthly, numPayments)) /
      (Math.pow(1 + interestRateMonthly, numPayments) - 1);

    let balance = this.loanAmount;

    for (let i = 0; i < numPayments; i++) {
      const interestPayment = balance * interestRateMonthly;
      const principalPayment = paymentAmount - interestPayment;
      balance -= principalPayment;

      this.amortizationBreakdown.push({
        paymentNumber: i + 1,
        paymentAmount: paymentAmount.toFixed(2),
        principalPayment: principalPayment.toFixed(2),
        interestPayment: interestPayment.toFixed(2),
        balance: balance.toFixed(2)
      });
    }

    this.showAmortization = true;
  }
}
