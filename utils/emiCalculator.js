function calculateEMI(P, R, N) {
  const r = R / 12 / 100;
  const emi = P * r * Math.pow(1 + r, N) / (Math.pow(1 + r, N) - 1);
  const totalPayment = emi * N;
  const totalInterest = totalPayment - P;

  return {
    monthlyEMI: emi.toFixed(2),
    totalPayment: totalPayment.toFixed(2),
    totalInterest: totalInterest.toFixed(2)
  };
}

module.exports = calculateEMI;
