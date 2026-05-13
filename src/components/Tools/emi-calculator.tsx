"use client";

import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function getSliderBackground(value: number, min: number, max: number) {
  const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;

  return `linear-gradient(to right, #3A9B9B 0%, #3A9B9B ${percent}%, rgba(161,161,170,0.5) ${percent}%, rgba(161,161,170,0.5) 100%)`;
}

const COLORS = ["#3A9B9B", "#2D3561"];

export default function EmiCalculator() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(3);
  const [tenureType, setTenureType] = useState<"years" | "months">("years");

  const [loanType, setLoanType] = useState<"home" | "personal" | "car">("home");

  const emiData = useMemo(() => {
    const months = tenureType === "years" ? tenure * 12 : tenure;

    if (!months || amount <= 0) {
      return {
        emi: 0,
        totalPayment: 0,
        totalInterest: 0,
      };
    }

    const monthlyRate = rate / 12 / 100;

    if (monthlyRate === 0) {
      return {
        emi: amount / months,
        totalPayment: amount,
        totalInterest: 0,
      };
    }

    const pow = Math.pow(1 + monthlyRate, months);
    const emi = (amount * monthlyRate * pow) / (pow - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - amount;

    return {
      emi,
      totalPayment,
      totalInterest,
    };
  }, [amount, rate, tenure, tenureType]);

  const chartData = useMemo(
    () => [
      {
        name: "Total Interest",
        value: Math.max(0, emiData.totalInterest),
      },
      {
        name: "Principal Loan Amount",
        value: Math.max(0, amount),
      },
    ],
    [amount, emiData.totalInterest],
  );

  const [showBreakdown, setShowBreakdown] = useState(false);

  const loanMonths = useMemo(() => {
    return tenureType === "years" ? tenure * 12 : tenure;
  }, [tenure, tenureType]);

  const monthlyBreakdown = useMemo(() => {
    if (!loanMonths || amount <= 0 || emiData.emi <= 0) return [];

    const rows = [];
    const monthlyRate = rate / 12 / 100;
    let balance = amount;

    for (let month = 1; month <= loanMonths; month++) {
      const openingBalance = balance;
      const interest = monthlyRate === 0 ? 0 : openingBalance * monthlyRate;
      const principal =
        monthlyRate === 0 ? amount / loanMonths : emiData.emi - interest;

      const principalPaid = month === loanMonths ? openingBalance : principal;
      const closingBalance = Math.max(0, openingBalance - principalPaid);

      rows.push({
        month,
        openingBalance,
        emi: emiData.emi,
        interest,
        principal: principalPaid,
        closingBalance,
      });

      balance = closingBalance;
    }

    return rows;
  }, [amount, rate, loanMonths, emiData.emi]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans pt-2 grid-bg">
      <div className="print:hidden">
        <header className="bg-transparent pt-5 pb-1 border-b border-zinc-100 dark:border-zinc-800 mb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
             
              <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-zinc-100 mb-6 md:mb-8 tracking-tighter leading-tight">
                EMI <span className="text-[#3A9B9B]">Calculator</span>
              </h1>
              <p className="text-base md:text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl">
                Calculate monthly EMI payments, total interest, and repayment amount instantly.
              </p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-24 grid gap-5">
          <section className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Decorative accent line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
            {/* Section Header */}
            <div className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-6 py-5 sm:px-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between items-center">
              <div>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">Calculate your loan EMI</h2>
              </div>
            </div>
            <div className="p-4 pt-2 sm:p-8 sm:pt-4 md:p-10 md:pt-6">
              <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
                <div>
                  <p className="mb-4 text-sm sm:text-lg font-semibold text-[#3A9B9B]">
                    I want to calculate -
                  </p>

                  <div className="mb-6 flex w-full sm:w-fit rounded-full bg-zinc-100 dark:bg-zinc-800/50 p-1">
                    <button
                      type="button"
                      onClick={() => setLoanType("home")}
                      className={`flex-1 sm:flex-none rounded-full px-3 sm:px-7 py-2.5 sm:py-3 text-[11px] sm:text-sm font-semibold transition-all duration-300 hover:scale-[1.03] ${loanType === "home"
                          ? "bg-[#3A9B9B] text-white shadow-md"
                          : "text-zinc-500 dark:text-zinc-400"
                        }`}
                    >
                      Home
                    </button>

                    <button
                      type="button"
                      onClick={() => setLoanType("personal")}
                      className={`flex-1 sm:flex-none rounded-full px-3 sm:px-7 py-2.5 sm:py-3 text-[11px] sm:text-sm font-semibold transition-all duration-300 hover:scale-[1.03] ${loanType === "personal"
                          ? "bg-[#3A9B9B] text-white shadow-md"
                          : "text-zinc-500 dark:text-zinc-400"
                        }`}
                    >
                      Personal
                    </button>

                    <button
                      type="button"
                      onClick={() => setLoanType("car")}
                      className={`flex-1 sm:flex-none rounded-full px-3 sm:px-7 py-2.5 sm:py-3 text-[11px] sm:text-sm font-semibold transition-all duration-300 hover:scale-[1.03] ${loanType === "car"
                          ? "bg-[#3A9B9B] text-white shadow-md"
                          : "text-zinc-500 dark:text-zinc-400"
                        }`}
                    >
                      Car
                    </button>
                  </div>

                  <div className="mb-6">
                    <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      <label className="text-sm sm:text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
                        {loanType === "home"
                          ? "Home Loan Amount"
                          : loanType === "personal"
                            ? "Personal Loan Amount"
                            : "Car Loan Amount"}
                      </label>

                      <div className="flex overflow-hidden rounded border border-[#3A9B9B] w-full sm:w-fit">
                        <div className="flex items-center border-r border-[#3A9B9B] px-3 sm:px-4 font-bold text-[#3A9B9B] bg-zinc-50 dark:bg-zinc-900/30">
                          ₹
                        </div>
                        <input
                          type="number"
                          value={amount}
                          min={0}
                          onChange={(e) =>
                            setAmount(Number(e.target.value || 0))
                          }
                          className="flex-1 sm:w-48 bg-transparent px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold outline-none"
                        />
                      </div>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={20000000}
                      step={100000}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="emi-slider w-full"
                      style={{
                        background: getSliderBackground(amount, 0, 20000000),
                      }}
                    />

                    <div className="mt-2 flex justify-between text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400">
                      <span>0</span>
                      <span>25L</span>
                      <span>50L</span>
                      <span>75L</span>
                      <span>1CR</span>
                      <span>1.5CR</span>
                      <span>2CR</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      <label className="text-sm sm:text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
                        Loan Tenure
                      </label>

                      <div className="flex overflow-hidden rounded border border-[#3A9B9B] w-full sm:w-fit">
                        <input
                          type="number"
                          value={tenure}
                          min={0}
                          onChange={(e) =>
                            setTenure(Number(e.target.value || 0))
                          }
                          className="flex-1 sm:w-24 bg-transparent px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold outline-none"
                        />

                        <button
                          type="button"
                          onClick={() => setTenureType("years")}
                          className={`px-3 sm:px-4 text-xs sm:text-sm font-semibold transition ${tenureType === "years"
                              ? "bg-[#3A9B9B] text-white"
                              : "bg-white dark:bg-zinc-900 text-[#3A9B9B]"
                            }`}
                        >
                          Y
                        </button>

                        <button
                          type="button"
                          onClick={() => setTenureType("months")}
                          className={`border-l border-[#3A9B9B] px-3 sm:px-4 text-xs sm:text-sm font-semibold transition ${tenureType === "months"
                              ? "bg-[#3A9B9B] text-white"
                              : "bg-white dark:bg-zinc-900 text-[#3A9B9B]"
                            }`}
                        >
                          M
                        </button>
                      </div>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={tenureType === "years" ? 30 : 360}
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="emi-slider w-full"
                      style={{
                        background: getSliderBackground(tenure, 0, tenureType === "years" ? 30 : 360),
                      }}
                    />

                    <div className="mt-2 flex justify-between text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400">
                      {tenureType === "years" ? (
                        <>
                          <span>0Y</span>
                          <span>5Y</span>
                          <span>10Y</span>
                          <span>15Y</span>
                          <span>20Y</span>
                          <span>25Y</span>
                          <span>30Y</span>
                        </>
                      ) : (
                        <>
                          <span>0M</span>
                          <span>60M</span>
                          <span>120M</span>
                          <span>180M</span>
                          <span>240M</span>
                          <span>300M</span>
                          <span>360M</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      <label className="text-sm sm:text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
                        Interest Rate
                      </label>

                      <div className="flex overflow-hidden rounded border border-[#3A9B9B] w-full sm:w-fit">
                        <input
                          type="number"
                          value={rate}
                          step={0.1}
                          min={0}
                          onChange={(e) => setRate(Number(e.target.value || 0))}
                          className="flex-1 sm:w-28 bg-transparent px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold outline-none"
                        />
                        <div className="flex items-center border-l border-[#3A9B9B] px-3 sm:px-4 font-bold text-[#3A9B9B] bg-zinc-50 dark:bg-zinc-900/30">
                          %
                        </div>
                      </div>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={20}
                      step={0.1}
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className="emi-slider w-full"
                      style={{
                        background: getSliderBackground(rate, 0, 20),
                      }}
                    />

                    <div className="mt-2 flex justify-between text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400">
                      <span>0%</span>
                      <span>5%</span>
                      <span>10%</span>
                      <span>15%</span>
                      <span>20%</span>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-8 shadow-lg transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
                  <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-sm">
                    <h3 className="text-center text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {loanType === "home"
                        ? "Home Loan EMI"
                        : loanType === "personal"
                          ? "Personal Loan EMI"
                          : "Car Loan EMI"}
                    </h3>

                    <div className="mt-3 text-center text-3xl sm:text-5xl font-black tracking-tighter text-[#3A9B9B]">
                      ₹ {formatINR(emiData.emi)}
                    </div>
                    <p className="text-center text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 mt-1 font-medium">per month</p>

                    <div className="my-5 border-t border-dashed" />

                    <div className="flex flex-col gap-0 divide-y divide-dashed divide-zinc-200 dark:divide-zinc-700">
                      {/* Total Interest */}
                      <div className="flex items-center justify-between gap-2 py-3 min-w-0">
                        <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 shrink-0">Total Interest Payable</p>
                        <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 text-right truncate">
                          ₹ {formatINR(emiData.totalInterest)}
                        </p>
                      </div>
                      {/* Total Payment */}
                      <div className="flex items-center justify-between gap-2 py-3 min-w-0">
                        <div className="shrink-0">
                          <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">Total Payment</p>
                          <p className="text-[9px] sm:text-[10px] text-zinc-400 dark:text-zinc-500">(Principal + Interest)</p>
                        </div>
                        <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 text-right truncate">
                          ₹ {formatINR(emiData.totalPayment)}
                        </p>
                      </div>
                    </div>

                    <div className="my-5 border-t border-dashed" />

                    <h4 className="text-center text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      Break-up of Total Payment
                    </h4>

                    <div className="mt-4 h-[180px] sm:h-[210px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={50}
                            paddingAngle={4}
                            dataKey="value"
                            animationBegin={0}
                            animationDuration={1200}
                            isAnimationActive
                          >
                            {chartData.map((_, index) => (
                              <Cell key={index} fill={COLORS[index]} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value, name) => {
                              const numericValue =
                                typeof value === "number" ? value : 0;

                              return [`₹ ${formatINR(numericValue)}`, name];
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="mt-2 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-5">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 sm:h-3 sm:w-3 rounded bg-[#3A9B9B]" />
                        <span className="text-[10px] sm:text-xs text-gray-600 dark:text-zinc-400">
                          Total Interest
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 sm:h-3 sm:w-3 rounded bg-[#2D3561]" />
                        <span className="text-[10px] sm:text-xs text-gray-600 dark:text-zinc-400">
                          Principal Amount
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 p-3 sm:p-5 border border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="mb-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#3A9B9B] hover:bg-[#2a7676] px-5 py-3.5 sm:py-4 text-center text-sm sm:text-base font-bold text-white shadow-md transition hover:scale-[1.01] hover:shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                  Download / Print Report
                </button>

                <button
                  type="button"
                  onClick={() => setShowBreakdown((prev) => !prev)}
                  className="relative overflow-hidden flex w-full items-center justify-between rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm px-4 sm:px-5 py-3.5 sm:py-4 text-left transition hover:shadow-md"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <div className="pr-2">
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#3A9B9B]">
                      Month-wise Breakdown
                    </p>
                    <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                      View full schedule and balance details
                    </p>
                  </div>

                  <span
                    className={`text-xl sm:text-2xl text-zinc-500 dark:text-zinc-400 transition-transform duration-300 ${showBreakdown ? "rotate-180" : ""
                      }`}
                  >
                    ⌄
                  </span>
                </button>

                {showBreakdown && (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                    <div className="max-h-[420px] overflow-y-auto">
                      <table className="min-w-full border-collapse text-sm">
                        <thead className="sticky top-0 bg-zinc-50 dark:bg-zinc-900/50">
                          <tr className="text-left text-zinc-600 dark:text-zinc-400">
                            <th className="px-4 py-3 font-semibold">Month</th>
                            <th className="px-4 py-3 font-semibold">
                              Opening Balance
                            </th>
                            <th className="px-4 py-3 font-semibold">EMI</th>
                            <th className="px-4 py-3 font-semibold">
                              Interest
                            </th>
                            <th className="px-4 py-3 font-semibold">
                              Principal
                            </th>
                            <th className="px-4 py-3 font-semibold">
                              Closing Balance
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                          {monthlyBreakdown.map((row) => (
                            <tr key={row.month} className="hover:bg-zinc-50 dark:bg-zinc-900/50">
                              <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                                {row.month}
                              </td>
                              <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                                ₹ {formatINR(row.openingBalance)}
                              </td>
                              <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                                ₹ {formatINR(row.emi)}
                              </td>
                              <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                                ₹ {formatINR(row.interest)}
                              </td>
                              <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                                ₹ {formatINR(row.principal)}
                              </td>
                              <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                                ₹ {formatINR(row.closingBalance)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          <section className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
            <div className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-6 py-5 sm:px-10 text-center">
              <h2 className="mt-1 text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">What is EMI?</h2>
            </div>
            <div className="p-6 pt-1 sm:p-10">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium text-justify">
                Equated Monthly Instalment or EMI is the fixed amount a borrower
                pays every month towards the repayment of their loan. It has two
                components — the <strong className="text-zinc-900 dark:text-zinc-100">principal</strong> and the <strong className="text-zinc-900 dark:text-zinc-100">interest</strong> — and is usually paid
                on a fixed date every month.
              </p>
            </div>
          </section>
          <section className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
            <div className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-6 py-5 sm:px-10 text-center">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#3A9B9B]">Key Factors</p>
              <h2 className="mt-1 text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">What affects your due amount?</h2>
            </div>
            <div className="p-4 sm:p-10">
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: "🏠", title: "Principal Amount", text: "The higher the principal amount, the more you will pay in dues." },
                  { icon: "📈", title: "Interest Rates", text: "Interest rates play a key role in determining your due amount." },
                  { icon: "📅", title: "Repayment Tenure", text: "Longer repayment tenure can lower your monthly EMI dues." },
                  { icon: "⚠️", title: "Fees & Penalties", text: "Additional charges and penalties can increase your due amount." },
                ].map((item) => (
                  <div key={item.title} className="flex flex-col relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                    <div className="flex items-center gap-3 sm:flex-col sm:text-center">
                      <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-full bg-[#3A9B9B]/10 dark:bg-[#3A9B9B]/20 text-lg sm:text-2xl shrink-0">{item.icon}</div>
                      <h3 className=" sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 text-justify sm:pt-3">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
            <div className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-6 py-5 sm:px-10 text-center">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#3A9B9B] ">User Guide</p>
              <h2 className="mt-1 text-lg sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">How to use the EMI calculator?</h2>
            </div>
            <div className="p-6 pt-1 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-2 items-center">
                <div className="space-y-4">
                  {[
                    { step: "1", text: "Select your loan type — Home, Personal, or Car Loan." },
                    { step: "2", text: "Enter your loan amount using the slider or input field." },
                    { step: "3", text: "Set the loan tenure in years or months." },
                    { step: "4", text: "Adjust the interest rate to see your monthly EMI instantly." },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3A9B9B]/10 dark:bg-[#3A9B9B]/20 text-xs font-black text-[#3A9B9B]">{s.step}</div>
                      <p className="pt-1 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium text-justify">{s.text}</p>
                    </div>
                  ))}
                </div>
                <div className="hidden lg:flex items-center justify-center">
                  <div className="rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900 p-14 text-8xl border border-zinc-100 dark:border-zinc-800">🧮</div>
                </div>
              </div>
            </div>
          </section>
          <section className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
            <div className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-6 py-5 sm:px-10 text-center">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#3A9B9B]">The Formula</p>
              <h2 className="mt-1 text-lg sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">How do EMI Calculators work?</h2>
            </div>
            <div className="p-6 sm:p-10">
              <div className="mx-auto max-w-3xl">
                <p className="text-base sm:text-lg font-medium text-zinc-600 dark:text-zinc-400 text-center">The formula for calculating EMI is:</p>
                <div className="relative overflow-hidden mt-4 rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm px-4 py-4 sm:px-8 sm:py-6 text-sm sm:text-xl md:text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight shadow-sm text-center">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  EMI = [P × r × (1 + r)^n] / [(1 + r)^n − 1]
                </div>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { var: "P", label: "Principal", desc: "The original loan amount borrowed" },
                    { var: "r", label: "Rate", desc: "Monthly interest rate (annual rate ÷ 12 ÷ 100)" },
                    { var: "n", label: "Tenure", desc: "Total number of monthly installments" },
                  ].map((v, idx) => (
                    <div key={v.var} className={`flex flex-col relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-5 hover:shadow-md transition-all duration-300 ${idx === 2 ? "col-span-2 sm:col-span-1" : ""}`}>
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <div className="flex items-center gap-2">
                        <div className="text-2xl sm:text-3xl font-black text-[#3A9B9B]">{v.var}</div>
                        <div className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">{v.label}</div>
                      </div>
                      <div className="mt-2 text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed text-justify">{v.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      {/* --- PRINT ONLY LAYOUT --- */}
      <div className="hidden print:block bg-white text-black min-h-screen max-w-5xl mx-auto print:px-8 print:pt-0 print:pb-8">
        {/* Company Header */}
        <div className="flex items-center justify-between border-b-[3px] border-slate-900 pt-2 pb-6 mb-8">
          <div className="flex flex-shrink-0 items-center justify-center">
            <img
              src="/logo.jpg"
              className="h-14 w-32 object-contain"
              alt="Logo"
            />
          </div>
          <div className="flex flex-col items-end gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              info@banavatnest.com
            </span>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
              www.banavatnest.com
            </span>
          </div>
        </div>

        {/* Report Title */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-[#3A9B9B] uppercase tracking-wider">
            EMI Loan Report
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 font-medium mt-2 text-sm">
            Generated on {new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <div className="mt-4 inline-block rounded-full border border-[#3A9B9B] bg-zinc-50 dark:bg-zinc-800/50 px-4 py-1 text-sm font-bold text-[#3A9B9B] uppercase tracking-widest">
            {loanType} Loan
          </div>
        </div>

        {/* Summary Details */}
        <div className="mb-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-4 uppercase tracking-widest">
            Loan Summary
          </h2>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Loan Amount</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">₹ {formatINR(amount)}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Interest Rate</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{rate}% p.a.</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Tenure</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{tenure} {tenureType}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Monthly EMI</p>
              <p className="text-xl font-bold text-[#3A9B9B]">₹ {formatINR(emiData.emi)}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Total Interest</p>
              <p className="text-xl font-bold text-red-600">₹ {formatINR(emiData.totalInterest)}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Total Payment</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">₹ {formatINR(emiData.totalPayment)}</p>
            </div>
          </div>
        </div>

        {/* Chart Visualization */}
        <div className="mb-12 flex justify-center items-center">
          <div className="w-[300px] h-[300px] relative">
            <PieChart width={300} height={300}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                isAnimationActive={false}
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest">Total Payment</p>
              <p className="text-lg font-black text-zinc-900 dark:text-zinc-100">₹ {formatINR(emiData.totalPayment)}</p>
            </div>
          </div>
          <div className="ml-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-sm bg-[#3A9B9B]" />
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase">Total Interest</p>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">₹ {formatINR(emiData.totalInterest)} ({emiData.totalPayment > 0 ? (emiData.totalInterest / emiData.totalPayment * 100).toFixed(1) : 0}%)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-sm bg-[#14163A]" />
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase">Principal Amount</p>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">₹ {formatINR(amount)} ({emiData.totalPayment > 0 ? (amount / emiData.totalPayment * 100).toFixed(1) : 0}%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Month-wise Breakdown */}
        <div className="w-full page-break-before-auto">
          <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-4 uppercase tracking-widest">
            Month-wise Repayment Schedule
          </h2>
          <table className="min-w-full border-collapse border border-zinc-200 dark:border-zinc-800 text-sm text-left">
            <thead className="bg-zinc-100 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
              <tr className="text-zinc-700 dark:text-zinc-300 uppercase tracking-wider text-[11px]">
                <th className="px-4 py-3 font-bold border-r border-zinc-200 dark:border-zinc-800">Month</th>
                <th className="px-4 py-3 font-bold border-r border-zinc-200 dark:border-zinc-800">Opening Balance</th>
                <th className="px-4 py-3 font-bold border-r border-zinc-200 dark:border-zinc-800">EMI</th>
                <th className="px-4 py-3 font-bold border-r border-zinc-200 dark:border-zinc-800">Interest</th>
                <th className="px-4 py-3 font-bold border-r border-zinc-200 dark:border-zinc-800">Principal</th>
                <th className="px-4 py-3 font-bold">Closing Balance</th>
              </tr>
            </thead>
            <tbody>
              {monthlyBreakdown.map((row, index) => (
                <tr key={row.month} className={index % 2 === 0 ? "bg-white" : "bg-zinc-50 dark:bg-zinc-900/50"}>
                  <td className="px-4 py-2 border-r border-zinc-200 dark:border-zinc-800 font-medium">{row.month}</td>
                  <td className="px-4 py-2 border-r border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">₹ {formatINR(row.openingBalance)}</td>
                  <td className="px-4 py-2 border-r border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-[#3A9B9B]">₹ {formatINR(row.emi)}</td>
                  <td className="px-4 py-2 border-r border-zinc-200 dark:border-zinc-800 text-red-600">₹ {formatINR(row.interest)}</td>
                  <td className="px-4 py-2 border-r border-zinc-200 dark:border-zinc-800 text-green-700">₹ {formatINR(row.principal)}</td>
                  <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100 font-medium">₹ {formatINR(row.closingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-slate-400 font-medium uppercase tracking-widest">
          Generated by EMI Calculator • Not an official bank statement
        </div>
      </div>

      <style jsx global>{`
        .emi-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 999px;
          outline: none;
        }

        .emi-slider::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 999px;
          background: transparent;
        }

        .emi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #ffffff; /* dark mode thumb */
          border: 3px solid #1b9aaa;
          cursor: pointer;
          margin-top: -5px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .emi-slider::-moz-range-track {
          height: 6px;
          border-radius: 999px;
          background: transparent;
        }

        .emi-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #ffffff; /* dark mode thumb */
          border: 3px solid #1b9aaa;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        @media print {
          @page {
            margin: 8mm 15mm;
            size: auto;
          }
          tr, td, th {
            page-break-inside: avoid;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
