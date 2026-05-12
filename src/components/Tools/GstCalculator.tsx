"use client";

import { useMemo, useState, useEffect } from "react";

type TaxType = "exclusive" | "inclusive";

type GstCalculationResult = {
  actual: number;
  gstAmount: number;
  total: number;
};

type ProfitCalculationResult = {
  actualCost: number;
  gstPaid: number;
  actualSell: number;
  gstCollected: number;
  profit: number;
  gstPayable: number;
};

type PredictedPriceResult = {
  actualCost: number;
  gstPaid: number;
  baseSellingPrice: number;
  predictedGst: number;
  predictedSellingPrice: number;
  predictedSellingLabel: string;
};

function normalizeBaseAmount(amount: number, rate: number, taxType: TaxType) {
  if (taxType === "inclusive") {
    return amount / (1 + rate / 100);
  }

  return amount;
}

function calculateTaxAmount(baseAmount: number, rate: number) {
  return (baseAmount * rate) / 100;
}

export default function GstCalculator() {
  // =========================
  // GST CALCULATOR STATE
  // =========================
  const [amount, setAmount] = useState<number>(0);
  const [gst, setGst] = useState<number>(18);
  const [type, setType] = useState<TaxType>("exclusive");

  // =========================
  // PROFIT CALCULATOR STATE
  // =========================
  const [cost, setCost] = useState<number>(100);
  const [costGst, setCostGst] = useState<number>(18);
  const [costType, setCostType] = useState<TaxType>("inclusive");

  const [sell, setSell] = useState<number>(150);
  const [sellGst, setSellGst] = useState<number>(18);
  const [sellType, setSellType] = useState<TaxType>("exclusive");

  // User-editable desired profit
  const [desiredProfit, setDesiredProfit] = useState<number>(65);
  const [profitPercentage, setProfitPercentage] = useState<number>(0);

  // =========================
  // GST CALCULATION
  // =========================
  const gstResult: GstCalculationResult = useMemo(() => {
    if (!amount) {
      return {
        actual: 0,
        gstAmount: 0,
        total: 0,
      };
    }

    if (type === "exclusive") {
      const gstAmount = calculateTaxAmount(amount, gst);

      return {
        actual: amount,
        gstAmount,
        total: amount + gstAmount,
      };
    }

    const actual = normalizeBaseAmount(amount, gst, "inclusive");
    const gstAmount = amount - actual;

    return {
      actual,
      gstAmount,
      total: amount,
    };
  }, [amount, gst, type]);

  // =========================
  // PROFIT CALCULATION
  // =========================
  const profitResult: ProfitCalculationResult = useMemo(() => {
    const actualCost = normalizeBaseAmount(cost, costGst, costType);

    const gstPaid =
      costType === "inclusive"
        ? cost - actualCost
        : calculateTaxAmount(cost, costGst);

    const actualSell = normalizeBaseAmount(sell, sellGst, sellType);

    const gstCollected =
      sellType === "inclusive"
        ? sell - actualSell
        : calculateTaxAmount(sell, sellGst);

    const profit = actualSell - actualCost;
    const gstPayable = gstCollected - gstPaid;

    return {
      actualCost,
      gstPaid,
      actualSell,
      gstCollected,
      profit,
      gstPayable,
    };
  }, [cost, costGst, costType, sell, sellGst, sellType]);

  // =========================
  // PREDICTED SELLING PRICE
  // =========================
  const predictedResult: PredictedPriceResult = useMemo(() => {
    const actualCost = normalizeBaseAmount(cost, costGst, costType);

    const baseSellingPrice = actualCost + desiredProfit;
    const predictedGst = calculateTaxAmount(baseSellingPrice, sellGst);

    let predictedSellingPrice = baseSellingPrice;
    let predictedSellingLabel = "Exclusive Selling Price";

    if (sellType === "exclusive") {
      predictedSellingPrice = baseSellingPrice;
      predictedSellingLabel = "Exclusive Selling Price";
    } else {
      predictedSellingPrice = baseSellingPrice + predictedGst;
      predictedSellingLabel = "Inclusive Selling Price";
    }

    return {
      actualCost,
      gstPaid:
        costType === "inclusive"
          ? cost - actualCost
          : calculateTaxAmount(cost, costGst),
      baseSellingPrice,
      predictedGst,
      predictedSellingPrice,
      predictedSellingLabel,
    };
  }, [cost, costGst, costType, desiredProfit, sellGst, sellType]);

  // =========================
  // SYNC PROFIT % <-> AMOUNT
  // =========================
  const actualCostForSync = normalizeBaseAmount(cost, costGst, costType);

  // when desiredProfit changes → update %
  const handleDesiredProfitChange = (value: number) => {
    setDesiredProfit(value);

    if (actualCostForSync > 0) {
      setProfitPercentage((value / actualCostForSync) * 100);
    } else {
      setProfitPercentage(0);
    }
  };

  // when % changes → update desiredProfit
  const handleProfitPercentageChange = (value: number) => {
    setProfitPercentage(value);

    const profit = (actualCostForSync * value) / 100;
    setDesiredProfit(profit);
  };
  // =========================
  // AUTO SYNC WHEN COST CHANGES
  // =========================
  useEffect(() => {
    const actualCost = normalizeBaseAmount(cost, costGst, costType);

    if (actualCost > 0) {
      const profit = (actualCost * profitPercentage) / 100;
      setDesiredProfit(profit);
    }
  }, [cost, costGst, costType]);

  useEffect(() => {
    const actualCost = normalizeBaseAmount(cost, costGst, costType);

    if (actualCost > 0) {
      const percentage = (desiredProfit / actualCost) * 100;
      setProfitPercentage(percentage);
    }
  }, [desiredProfit]);
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans pt-2 grid-bg">
      {/* ========================= HEADER ========================= */}
      <header className="bg-transparent pt-24 pb-20 border-b border-gray-100 dark:border-zinc-800 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-zinc-100 mb-8 tracking-tighter leading-tight">
              GST <span className="text-[#3A9B9B]">Calculator</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 dark:text-zinc-400 font-medium leading-relaxed">
              Calculate GST, profit, payable tax, and predicted selling price
              with a cleaner dashboard-style layout.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid gap-8">
          {/* ========================= GST CALCULATOR ========================= */}
          <section className="overflow-hidden rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(58,155,155,0.15)] transition-all duration-300">
            <div className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-sm px-8 py-6 sm:px-10">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#3A9B9B]">
                    GST Calculator
                  </p>
                  <h2 className="mt-1 text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                    Calculate GST instantly
                  </h2>
                </div>
                <div className="rounded-full bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-200 dark:border-zinc-700">
                  Exclusive / Inclusive
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="grid gap-5 md:grid-cols-3">
                {/* Amount */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>

                {/* GST % */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    GST %
                  </label>
                  <select
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={gst}
                    onChange={(e) => setGst(Number(e.target.value))}
                  >
                    {[0, 5, 12, 18, 28].map((g) => (
                      <option key={g} value={g}>
                        {g}%
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tax Type */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Tax Type
                  </label>
                  <select
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={type}
                    onChange={(e) => setType(e.target.value as TaxType)}
                  >
                    <option value="exclusive">Exclusive</option>
                    <option value="inclusive">Inclusive</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 text-center hover:border-[#3A9B9B]/30 transition-colors">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Actual Amount
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    ₹{gstResult.actual.toFixed(2)}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 text-center hover:border-[#3A9B9B]/30 transition-colors">
                  <p className="text-sm text-[#3A9B9B]">GST Amount</p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-[#3A9B9B]">
                    ₹{gstResult.gstAmount.toFixed(2)}
                  </p>
                </div>

                <div className="rounded-2xl border-none bg-[#3A9B9B] p-5 text-center shadow-lg shadow-[#3A9B9B]/20">
                  <p className="text-sm text-teal-50 font-bold">Total Amount</p>
                  <p className="mt-2 text-3xl font-black tracking-tighter text-white">
                    ₹{gstResult.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================= PROFIT CALCULATOR ========================= */}
          <section className="overflow-hidden rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(58,155,155,0.15)] transition-all duration-300">
            <div className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-sm px-8 py-6 sm:px-10">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#3A9B9B]">
                    Profit Calculator
                  </p>
                  <h2 className="mt-1 text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                    Profit, GST paid, and payable tax
                  </h2>
                </div>
                <div className="rounded-full bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-200 dark:border-zinc-700">
                  Live profit summary
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="grid gap-5 md:grid-cols-3">
                {/* Cost Price */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Cost Price
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={cost}
                    onChange={(e) => setCost(Number(e.target.value))}
                  />
                </div>

                {/* GST on Purchase */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    GST on Purchase (%)
                  </label>
                  <select
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={costGst}
                    onChange={(e) => setCostGst(Number(e.target.value))}
                  >
                    {[0, 5, 12, 18, 28].map((g) => (
                      <option key={g} value={g}>
                        {g}%
                      </option>
                    ))}
                  </select>
                </div>

                {/* Purchase Tax Type */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Tax Type (Purchase)
                  </label>
                  <select
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={costType}
                    onChange={(e) => setCostType(e.target.value as TaxType)}
                  >
                    <option value="exclusive">Exclusive</option>
                    <option value="inclusive">Inclusive</option>
                  </select>
                </div>

                {/* Selling Price */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Selling Price
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={sell}
                    onChange={(e) => setSell(Number(e.target.value))}
                  />
                </div>

                {/* GST on Selling */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    GST on Selling (%)
                  </label>
                  <select
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={sellGst}
                    onChange={(e) => setSellGst(Number(e.target.value))}
                  >
                    {[0, 5, 12, 18, 28].map((g) => (
                      <option key={g} value={g}>
                        {g}%
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selling Tax Type */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Tax Type (Selling)
                  </label>
                  <select
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={sellType}
                    onChange={(e) => setSellType(e.target.value as TaxType)}
                  >
                    <option value="exclusive">Exclusive</option>
                    <option value="inclusive">Inclusive</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border-none bg-[#5BBD4A] p-5 text-center shadow-lg shadow-[#5BBD4A]/20">
                  <p className="text-sm text-green-50 font-bold">Net Profit</p>
                  <p className="mt-2 text-3xl font-black tracking-tighter text-white">
                    ₹{profitResult.profit.toFixed(2)}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 text-center hover:border-[#3A9B9B]/30 transition-colors">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    GST Paid
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    ₹{profitResult.gstPaid.toFixed(2)}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 text-center hover:border-[#3A9B9B]/30 transition-colors">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    GST Collected
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    ₹{profitResult.gstCollected.toFixed(2)}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 text-center hover:border-[#3A9B9B]/30 transition-colors">
                  <p className="text-sm text-[#3A9B9B]">GST Payable</p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-[#3A9B9B]">
                    ₹{profitResult.gstPayable.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {/* Profit Percentage */}
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:border-[#3A9B9B]/30 transition-colors">
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Profit Percentage (%)
                  </label>
                  <input
                    type="number"
                    className="mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={profitPercentage}
                    onChange={(e) =>
                      handleProfitPercentageChange(Number(e.target.value))
                    }
                  />
                </div>

                {/* Desired Profit */}
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:border-[#3A9B9B]/30 transition-colors">
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Desired Profit
                  </label>
                  <input
                    type="number"
                    className="mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={desiredProfit}
                    onChange={(e) =>
                      handleDesiredProfitChange(Number(e.target.value))
                    }
                  />
                </div>

                {/* Predicted Selling Price */}
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:border-[#3A9B9B]/30 transition-colors">
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Predicted Selling Price
                  </label>
                  <input
                    type="number"
                    className="mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none"
                    value={predictedResult.predictedSellingPrice.toFixed(2)}
                    readOnly
                  />
                  <p className="mt-3 text-xs leading-5 text-[#3A9B9B]">
                    {predictedResult.predictedSellingLabel} based on your
                    desired profit and selling tax type.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Actual Cost
                  </p>
                  <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    ₹{predictedResult.actualCost.toFixed(2)}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Base Selling Price
                  </p>
                  <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    ₹{predictedResult.baseSellingPrice.toFixed(2)}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#3A9B9B]/20 bg-[#E8F7F7] dark:bg-[#3A9B9B]/10 p-5 shadow-sm text-center">
                  <p className="text-sm text-[#3A9B9B] font-bold">
                    Predicted GST on Sale
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#3A9B9B]">
                    ₹{predictedResult.predictedGst.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[2.5rem] p-8 md:p-10 border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(58,155,155,0.15)] transition-all duration-300">
            {/* HEADER */}
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#3A9B9B]">
                User Guide
              </p>

              <h2 className="mt-2 text-3xl md:text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
                How to Use the GST Calculator
              </h2>

              <p className="mx-auto mt-4 max-w-3xl leading-7 text-zinc-600 dark:text-zinc-400">
                Easily calculate GST amounts, total prices, profits, and GST
                payable using the calculator above. Simply enter your amount,
                select the GST percentage, and choose whether the tax is
                inclusive or exclusive.
              </p>
            </div>

            {/* STEP CARDS */}
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {/* Step 1 */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:border-[#3A9B9B]/30 transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3A9B9B]/10 dark:bg-[#3A9B9B]/20 text-lg font-bold text-[#3A9B9B]">
                  1
                </div>

                <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Enter Amount
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Enter the product or service amount in the calculator input
                  field.
                </p>
              </div>

              {/* Step 2 */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:border-[#3A9B9B]/30 transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3A9B9B]/10 dark:bg-[#3A9B9B]/20 text-lg font-bold text-[#3A9B9B]">
                  2
                </div>

                <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Select GST Rate
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Choose the applicable GST slab such as 5%, 12%, 18%, or 28%
                  based on your product or service category.
                </p>
              </div>

              {/* Step 3 */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:border-[#3A9B9B]/30 transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3A9B9B]/10 dark:bg-[#3A9B9B]/20 text-lg font-bold text-[#3A9B9B]">
                  3
                </div>

                <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Choose Tax Type
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Select Inclusive if GST is already included in the amount or
                  Exclusive if GST should be added separately.
                </p>
              </div>
            </div>

            {/* EXAMPLE SECTION */}
            <div className="mt-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-8 md:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* LEFT */}
                <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#3A9B9B]">
                    Example Calculation
                  </p>

                  <h3 className="mt-2 text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                    GST Calculation Example
                  </h3>

                  <p className="mt-3 leading-7 text-zinc-700 dark:text-zinc-300">
                    Suppose a product costs <strong>₹100</strong> and GST is
                    <strong> 18%</strong>.
                  </p>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-2xl bg-white dark:bg-zinc-900/80 p-5 shadow-sm">
                      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        Exclusive GST
                      </p>

                      <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                        ₹100 + 18 Total Amount = ₹118
                      </p>

                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        Actual Amount = ₹100 | GST Amount = ₹18
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white dark:bg-zinc-900/80 p-5 shadow-sm">
                      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        Inclusive GST
                      </p>

                      <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                        Total Amount ₹100 already includes GST
                      </p>

                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        Actual Amount = ₹84.75 | GST Amount = ₹15.25
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="grid gap-4 sm:grid-cols-2 lg:w-[360px]">
                  <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-5 text-center shadow-sm">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Actual Amount
                    </p>

                    <p className="mt-2 text-3xl md:text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
                      ₹100
                    </p>
                  </div>

                  <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-5 text-center shadow-sm">
                    <p className="text-sm text-[#3A9B9B]">GST Amount (18%)</p>

                    <p className="mt-2 text-3xl font-bold text-[#3A9B9B]">
                      ₹18
                    </p>
                  </div>

                  <div className="sm:col-span-2 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-5 text-center shadow-sm">
                    <p className="text-sm text-[#3A9B9B]">Total Amount</p>

                    <p className="mt-2 text-4xl font-bold text-[#3A9B9B]">
                      ₹118
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PREDICTED SELLING PRICE GUIDE */}
            <div className="mt-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-8 md:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* LEFT CONTENT */}
                <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#3A9B9B]">
                    Selling Price Prediction
                  </p>

                  <h3 className="mt-2 text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                    How to Use Predicted Selling Price
                  </h3>

                  <p className="mt-4 leading-7 text-zinc-700 dark:text-zinc-300">
                    The calculator can automatically predict the selling price
                    required to achieve your desired profit based on the GST
                    type and your cost price.
                  </p>

                  {/* STEPS */}
                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl bg-white dark:bg-zinc-900/80 p-5 shadow-sm">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        Step 1 — Enter Cost Price
                      </p>

                      <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        Add the original purchase price of the product along
                        with GST details.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white dark:bg-zinc-900/80 p-5 shadow-sm">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        Step 2 — Enter Desired Profit or Profit %
                      </p>

                      <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        You can either enter the exact profit amount you want or
                        simply provide the desired profit percentage.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white dark:bg-zinc-900/80 p-5 shadow-sm">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        Step 3 — Get Predicted Selling Price
                      </p>

                      <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        The calculator automatically predicts the final selling
                        price needed to achieve your target profit after GST
                        calculations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE EXAMPLE */}
                <div className="w-full max-w-md rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg">
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    Example
                  </h4>

                  <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        Cost Price
                      </span>

                      <span className="font-bold text-zinc-900 dark:text-zinc-100">
                        ₹100
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        Desired Profit
                      </span>

                      <span className="font-bold text-[#3A9B9B]">₹50</span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        GST Rate
                      </span>

                      <span className="font-bold text-zinc-900 dark:text-zinc-100">
                        18%
                      </span>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 text-center hover:border-[#3A9B9B]/30 transition-colors">
                      <p className="text-sm text-[#3A9B9B]">
                        Predicted Selling Price
                      </p>

                      <p className="mt-2 text-4xl font-bold text-[#3A9B9B]">
                        ₹177
                      </p>

                      <p className="mt-2 text-xs leading-5 text-[#3A9B9B]">
                        ₹150 base selling price + 18% GST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM TIPS */}
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:border-[#3A9B9B]/30 transition-colors">
                  <h4 className="text-lg font-bold text-[#3A9B9B]">
                    🎯 Desired Profit
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-[#3A9B9B]">
                    Enter the exact amount of profit you want to earn from the
                    product.
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:border-[#3A9B9B]/30 transition-colors">
                  <h4 className="text-lg font-bold text-[#3A9B9B]">
                    📊 Profit Percentage
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-[#3A9B9B]">
                    Instead of fixed profit, you can use profit percentage like
                    20%, 30%, or 50% to automatically calculate selling price.
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:border-[#3A9B9B]/30 transition-colors">
                  <h4 className="text-lg font-bold text-[#3A9B9B]">
                    🧾 Base Selling Price
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-[#3A9B9B]">
                    Base selling price is the actual product price before adding
                    GST on the final sale.
                  </p>
                </div>
              </div>
            </div>

            {/* EXTRA TIPS */}
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:border-[#3A9B9B]/30 transition-colors">
                <h3 className="text-lg font-bold text-[#3A9B9B]">
                  💡 Inclusive vs Exclusive
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#3A9B9B]">
                  Inclusive prices already contain GST inside the amount.
                  Exclusive prices add GST separately after calculation.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:border-[#3A9B9B]/30 transition-colors">
                <h3 className="text-lg font-bold text-[#3A9B9B]">
                  📈 Profit Calculation
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#3A9B9B]">
                  The Profit Calculator helps businesses understand actual
                  earnings after considering GST paid and GST collected.
                </p>
              </div>
            </div>
          </section>

          {/* ========================= INFO SECTION ========================= */}
          <section className="rounded-[2.5rem] p-8 md:p-10 border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(58,155,155,0.15)] transition-all duration-300">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#3A9B9B]">
                Learn GST
              </p>

              <h2 className="mt-2 text-3xl md:text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
                GST — Goods and Services Tax
              </h2>

              <p className="mx-auto mt-4 max-w-3xl leading-7 text-zinc-600 dark:text-zinc-400">
                GST is an indirect tax introduced in India on July 1, 2017. It
                is applied to the supply of goods and services and replaced
                multiple indirect taxes such as VAT, Service Tax, and Excise
                Duty.
              </p>
            </div>

            {/* INFO CARDS */}
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {/* What is GST */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:border-[#3A9B9B]/30 transition-colors">
                <div className="mb-3 text-3xl">📘</div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  What is GST?
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  GST is a value-added tax charged on goods and services at
                  every stage of sale. Businesses collect GST from customers and
                  pay it to the government after adjusting input tax credits.
                </p>
              </div>

              {/* Inclusive GST */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:border-[#3A9B9B]/30 transition-colors">
                <div className="mb-3 text-3xl">💰</div>

                <h3 className="text-lg font-bold text-[#3A9B9B]">
                  Inclusive GST
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#3A9B9B]">
                  Inclusive GST means the GST amount is already included in the
                  entered price.
                </p>

                <div className="mt-4 rounded-xl bg-white/80 p-3 text-sm font-medium text-[#3A9B9B]">
                  Example: ₹118 inclusive of 18% GST
                  <br />
                  Actual Price = ₹100
                  <br />
                  GST = ₹18
                </div>
              </div>

              {/* Exclusive GST */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:border-[#3A9B9B]/30 transition-colors">
                <div className="mb-3 text-3xl">🧾</div>

                <h3 className="text-lg font-bold text-[#3A9B9B]">
                  Exclusive GST
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#3A9B9B]">
                  Exclusive GST means GST is added separately on top of the
                  entered amount.
                </p>

                <div className="mt-4 rounded-xl bg-white/80 p-3 text-sm font-medium text-[#3A9B9B]">
                  Example: ₹100 + 18% GST
                  <br />
                  GST = ₹18
                  <br />
                  Final Amount = ₹118
                </div>
              </div>

              {/* Input Tax Credit */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:border-[#3A9B9B]/30 transition-colors">
                <div className="mb-3 text-3xl">🔄</div>

                <h3 className="text-lg font-bold text-[#3A9B9B]">
                  Input Tax Credit (ITC)
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#3A9B9B]">
                  Businesses can reduce the GST they owe by claiming credit for
                  GST already paid on purchases and expenses.
                </p>
              </div>

              {/* GST Slabs */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:border-[#3A9B9B]/30 transition-colors">
                <div className="mb-3 text-3xl">📊</div>

                <h3 className="text-lg font-bold text-[#3A9B9B]">
                  Common GST Slabs
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[0, 5, 12, 18, 28].map((rate) => (
                    <div
                      key={rate}
                      className="rounded-xl bg-white px-4 py-3 text-center shadow-sm"
                    >
                      <p className="text-xl font-bold text-[#3A9B9B]">
                        {rate}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profit Tip */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 hover:border-[#3A9B9B]/30 transition-colors">
                <div className="mb-3 text-3xl">📈</div>

                <h3 className="text-lg font-bold text-[#3A9B9B]">Profit Tip</h3>

                <p className="mt-2 text-sm leading-6 text-[#3A9B9B]">
                  Always calculate profit using the base amount before GST. GST
                  collected from customers is payable to the government and
                  should not be treated as business profit.
                </p>
              </div>
            </div>

            {/* BOTTOM NOTE */}
            <div className="mt-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 md:p-8">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Quick Summary
              </h3>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                <li>
                  ✅ Inclusive tax means GST is already included in the amount.
                </li>

                <li>
                  ✅ Exclusive tax means GST is added separately to the amount.
                </li>

                <li>
                  ✅ Businesses can claim GST paid on purchases using Input Tax
                  Credit.
                </li>

                <li>✅ GST payable = GST collected − GST paid.</li>

                <li>
                  ✅ Profit should always be calculated before GST adjustments.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
