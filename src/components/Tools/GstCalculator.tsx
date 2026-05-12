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
  const [amount, setAmount] = useState<string>("");
  const [gst, setGst] = useState<number>(18);
  const [type, setType] = useState<TaxType>("exclusive");

  // =========================
  // PROFIT CALCULATOR STATE
  // =========================
  const [cost, setCost] = useState<string>("");
  const [costGst, setCostGst] = useState<number>(18);
  const [costType, setCostType] = useState<TaxType>("exclusive");

  const [sell, setSell] = useState<string>("");
  const [sellGst, setSellGst] = useState<number>(18);
  const [sellType, setSellType] = useState<TaxType>("exclusive");

  // User-editable desired profit
  const [desiredProfit, setDesiredProfit] = useState<string>("");
  const [profitPercentage, setProfitPercentage] = useState<string>("");

  // =========================
  // GST CALCULATION
  // =========================
  const gstResult: GstCalculationResult = useMemo(() => {
    const numericAmount = Number(amount);

    if (!amount || isNaN(numericAmount)) {
      return {
        actual: 0,
        gstAmount: 0,
        total: 0,
      };
    }

    if (type === "exclusive") {
      const gstAmount = calculateTaxAmount(numericAmount, gst);

      return {
        actual: numericAmount,
        gstAmount,
        total: numericAmount + gstAmount,
      };
    }

    const actual = normalizeBaseAmount(
      numericAmount,
      gst,
      "inclusive"
    );

    const gstAmount = numericAmount - actual;

    return {
      actual,
      gstAmount,
      total: numericAmount,
    };
  }, [amount, gst, type]);

  // =========================
  // PROFIT CALCULATION
  // =========================
  const profitResult: ProfitCalculationResult = useMemo(() => {
    const numericCost = Number(cost);
    const numericSell = Number(sell);

    if (
      !cost ||
      !sell ||
      isNaN(numericCost) ||
      isNaN(numericSell)
    ) {
      return {
        actualCost: 0,
        gstPaid: 0,
        actualSell: 0,
        gstCollected: 0,
        profit: 0,
        gstPayable: 0,
      };
    }

    const actualCost = normalizeBaseAmount(
      numericCost,
      costGst,
      costType
    );

    const gstPaid =
      costType === "inclusive"
        ? numericCost - actualCost
        : calculateTaxAmount(numericCost, costGst);

    const actualSell = normalizeBaseAmount(
      numericSell,
      sellGst,
      sellType
    );

    const gstCollected =
      sellType === "inclusive"
        ? numericSell - actualSell
        : calculateTaxAmount(numericSell, sellGst);

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
    const numericCost = Number(cost);

    if (!cost || isNaN(numericCost)) {
      return {
        actualCost: 0,
        gstPaid: 0,
        baseSellingPrice: 0,
        predictedGst: 0,
        predictedSellingPrice: 0,
        predictedSellingLabel: "Exclusive Selling Price",
      };
    }

    const actualCost = normalizeBaseAmount(
      numericCost,
      costGst,
      costType
    );

    const numericDesiredProfit = Number(desiredProfit);

    const baseSellingPrice =
      actualCost +
      (
        !desiredProfit || isNaN(numericDesiredProfit)
          ? 0
          : numericDesiredProfit
      );

    const predictedGst = calculateTaxAmount(
      baseSellingPrice,
      sellGst
    );

    let predictedSellingPrice = baseSellingPrice;
    let predictedSellingLabel = "Exclusive Selling Price";

    if (sellType === "inclusive") {
      predictedSellingPrice =
        baseSellingPrice + predictedGst;

      predictedSellingLabel = "Inclusive Selling Price";
    }

    return {
      actualCost,
      gstPaid:
        costType === "inclusive"
          ? numericCost - actualCost
          : calculateTaxAmount(numericCost, costGst),
      baseSellingPrice,
      predictedGst,
      predictedSellingPrice,
      predictedSellingLabel,
    };
  }, [cost, costGst, costType, desiredProfit, sellGst, sellType]);

  // =========================
  // SYNC PROFIT % <-> AMOUNT
  // =========================
  const numericCostForSync = Number(cost);

  const actualCostForSync =
    !cost || isNaN(numericCostForSync)
      ? 0
      : normalizeBaseAmount(
        numericCostForSync,
        costGst,
        costType
      );

  // when desiredProfit changes → update %
  const handleDesiredProfitChange = (value: string) => {
    setDesiredProfit(value);

    const numericValue = Number(value);

    if (
      !value ||
      isNaN(numericValue) ||
      actualCostForSync <= 0
    ) {
      setProfitPercentage("");
      return;
    }

    setProfitPercentage(
      ((numericValue / actualCostForSync) * 100).toString()
    );
  };

  const handleProfitPercentageChange = (value: string) => {
    setProfitPercentage(value);

    const numericValue = Number(value);

    if (
      !value ||
      isNaN(numericValue) ||
      actualCostForSync <= 0
    ) {
      setDesiredProfit("");
      return;
    }

    const profit =
      (actualCostForSync * numericValue) / 100;

    setDesiredProfit(profit.toString());
  };
  // =========================
  // AUTO SYNC WHEN COST CHANGES
  // =========================
  useEffect(() => {
    const numericCost = Number(cost);
    const numericProfitPercentage =
      Number(profitPercentage);

    if (
      !cost ||
      !profitPercentage ||
      isNaN(numericCost) ||
      isNaN(numericProfitPercentage)
    ) {
      setDesiredProfit("");
      return;
    }

    const actualCost = normalizeBaseAmount(
      numericCost,
      costGst,
      costType
    );

    if (actualCost > 0) {
      const profit =
        (actualCost * numericProfitPercentage) / 100;

      setDesiredProfit(profit.toString());
    }
  }, [cost, costGst, costType]);

  useEffect(() => {
    const numericCost = Number(cost);
    const numericDesiredProfit =
      Number(desiredProfit);

    if (
      !cost ||
      !desiredProfit ||
      isNaN(numericCost) ||
      isNaN(numericDesiredProfit)
    ) {
      setProfitPercentage("");
      return;
    }

    const actualCost = normalizeBaseAmount(
      numericCost,
      costGst,
      costType
    );

    if (actualCost > 0) {
      const percentage =
        (numericDesiredProfit / actualCost) * 100;

      setProfitPercentage(percentage.toString());
    }
  }, [desiredProfit, cost, costGst, costType]);
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans pt-2 grid-bg">
      {/* ========================= HEADER ========================= */}
      <header className="bg-transparent pt-5 pb-1 border-b border-gray-100 dark:border-zinc-800 mb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-zinc-100 mb-8 tracking-tighter leading-tight">
              GST <span className="text-[#3A9B9B]">Calculator</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-zinc-400 font-medium leading-relaxed">
              Calculate GST, profit, payable tax, and predicted selling price
              with a cleaner dashboard-style layout.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid gap-5">
          {/* ========================= GST CALCULATOR ========================= */}
          <section className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Decorative accent line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
            <div className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-8 py-6 sm:px-10">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>

                  <h2 className="mt-1 text-2xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    Calculate GST instantly
                  </h2>
                </div>

              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                {/* Amount */}
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                {/* GST % */}
                <div className="space-y-2 col-span-1">
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
                <div className="space-y-2 col-span-1">
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

              <div className="mt-4 grid gap-6 sm:grid-cols-3">
                <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 text-center hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Actual Amount
                  </p>
                  <p className="mt-2 text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    ₹{gstResult.actual.toFixed(2)}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 text-center hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-sm text-[#3A9B9B]">GST Amount</p>
                  <p className="mt-2 text-lg font-bold tracking-tight text-[#3A9B9B]">
                    ₹{gstResult.gstAmount.toFixed(2)}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl border-none bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] p-6 text-center shadow-lg shadow-[#3A9B9B]/20">
                  <p className="text-sm text-teal-50 font-bold">Total Amount</p>
                  <p className="mt-2 text-2xl font-black tracking-tighter text-white">
                    ₹{gstResult.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================= PROFIT CALCULATOR ========================= */}
          <section className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Decorative accent line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
            <div className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-sm px-8 py-6 sm:px-10">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>

                  <h2 className="mt-1 text-2xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    Profit, GST paid, and payable tax
                  </h2>
                </div>

              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 ">
                {/* Cost Price */}
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Cost Price
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Cost Price"
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                  />
                </div>

                {/* GST on Purchase */}
                <div className="space-y-2 col-span-1">
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
                <div className="space-y-2 col-span-1">
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
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Selling Price
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Selling Price"
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={sell}
                    onChange={(e) => setSell(e.target.value)}
                  />
                </div>

                {/* GST on Selling */}
                <div className="space-y-2 col-span-1">
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
                <div className="space-y-2 col-span-1">
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

              <div className="mt-4 lg:mt-3 grid grid-cols-2 gap-4 sm:gap-6 lg:gap-4 xl:grid-cols-4">
                <div className="relative overflow-hidden rounded-2xl border-none bg-gradient-to-r from-[#5BBD4A] to-[#4A9D3B] p-4 sm:p-6 lg:p-4 xl:p-5 text-center shadow-lg shadow-[#5BBD4A]/20">
                  <p className="text-xs sm:text-sm text-green-50 font-bold">Net Profit</p>
                  <p className="mt-2 text-lg sm:text-2xl lg:text-xl font-black tracking-tighter text-white">
                    ₹{profitResult.profit.toFixed(2)}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 lg:p-4 xl:p-5 text-center hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                    GST Paid
                  </p>
                  <p className="mt-2 text-base sm:text-lg lg:text-base xl:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    ₹{profitResult.gstPaid.toFixed(2)}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 lg:p-4 xl:p-5 text-center hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                    GST Collected
                  </p>
                  <p className="mt-2 text-base sm:text-lg lg:text-base xl:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    ₹{profitResult.gstCollected.toFixed(2)}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 lg:p-4 xl:p-5 text-center hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-xs sm:text-sm text-[#3A9B9B]">GST Payable</p>
                  <p className="mt-2 text-base sm:text-lg lg:text-base xl:text-lg font-bold tracking-tight text-[#3A9B9B]">
                    ₹{profitResult.gstPayable.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-6 lg:mt-4 grid grid-cols-2 gap-4 lg:gap-3 lg:grid-cols-3">
                {/* Profit Percentage */}
                <div className="flex flex-col relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 lg:p-4 xl:p-5 hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Profit %
                  </label>
                  <input
                    type="number"
                    placeholder='%'
                    className="mt-auto w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20 text-sm"
                    value={profitPercentage}
                    onChange={(e) =>
                      handleProfitPercentageChange(e.target.value)
                    }
                  />
                </div>

                {/* Desired Profit */}
                <div className="flex flex-col relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 lg:p-4 xl:p-5 hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Profit Amount
                  </label>
                  <input
                    type="number"
                    placeholder="Amt"
                    className="mt-auto w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-3 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20 text-sm"
                    value={desiredProfit}
                    onChange={(e) =>
                      handleDesiredProfitChange(e.target.value)
                    }
                  />
                </div>

                {/* Predicted Selling Price */}
                <div className="relative overflow-hidden col-span-2 lg:col-span-1 rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-5 sm:p-6 lg:p-4 xl:p-5 hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Predicted Selling Price
                  </label>
                  <input
                    type="number"
                    className="mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none"
                    value={predictedResult.predictedSellingPrice.toFixed(2)}
                    readOnly
                  />
                  <p className="mt-3 text-xs lg:text-[11px] xl:text-xs leading-5 text-[#3A9B9B] font-medium">
                    {predictedResult.predictedSellingLabel} based on your
                    desired profit and selling tax type.
                  </p>
                </div>
              </div>

              <div className="mt-4 lg:mt-3 grid grid-cols-2 gap-4 sm:gap-6 lg:gap-4 md:grid-cols-3">
                {/* Actual Cost */}
                <div className="flex flex-col relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 lg:p-4 xl:p-5 shadow-sm">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                    Actual Cost
                  </p>
                  <p className="mt-auto pt-2 text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    ₹{predictedResult.actualCost.toFixed(2)}
                  </p>
                </div>

                {/* Base Selling Price */}
                <div className="flex flex-col relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 lg:p-4 xl:p-5 shadow-sm">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                    Base Selling Price
                  </p>
                  <p className="mt-auto pt-2 text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    ₹{predictedResult.baseSellingPrice.toFixed(2)}
                  </p>
                </div>

                {/* Predicted GST on Sale */}
                <div className="flex flex-col relative overflow-hidden col-span-2 md:col-span-1 rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 lg:p-4 xl:p-5 shadow-sm text-center">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-xs sm:text-sm text-[#3A9B9B] font-bold">
                    Predicted GST on Sale
                  </p>
                  <p className="mt-auto pt-2 text-xl sm:text-2xl font-black text-[#3A9B9B]">
                    ₹{predictedResult.predictedGst.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Decorative accent line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
            {/* HEADER */}
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#3A9B9B]">
                User Guide
              </p>

              <h2 className="mt-2 text-2xl md:text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
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
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {/* Step 1 */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3A9B9B]/10 dark:bg-[#3A9B9B]/20 text-base font-bold text-[#3A9B9B]">
                  1
                </div>

                <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Enter Amount
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Enter the product or service amount in the calculator input
                  field.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3A9B9B]/10 dark:bg-[#3A9B9B]/20 text-base font-bold text-[#3A9B9B]">
                  2
                </div>

                <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Select GST Rate
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Choose the applicable GST slab such as 5%, 12%, 18%, or 28%
                  based on your product or service category.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3A9B9B]/10 dark:bg-[#3A9B9B]/20 text-base font-bold text-[#3A9B9B]">
                  3
                </div>

                <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Choose Tax Type
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Select Inclusive if GST is already included in the amount or
                  Exclusive if GST should be added separately.
                </p>
              </div>
            </div>

            {/* EXAMPLE SECTION */}
            <div className="relative overflow-hidden mt-6 rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-8 md:p-10 shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />

              {/* Header */}
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#3A9B9B]">Example Calculation</p>
                <h3 className="mt-2 text-lg md:text-lg font-bold text-zinc-900 dark:text-zinc-100">GST Calculation Example</h3>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Suppose a product costs <strong className="text-zinc-900 dark:text-zinc-100">₹100</strong> and GST is <strong className="text-zinc-900 dark:text-zinc-100">18%</strong>.</p>
              </div>

              <div className="space-y-6">
                {/* ---- Exclusive GST Row ---- */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center rounded-2xl bg-white/60 dark:bg-zinc-900/60 p-4 sm:p-6 border border-zinc-100 dark:border-zinc-800">
                  {/* Left: explanation */}
                  <div className="lg:w-64 shrink-0">
                    <span className="inline-block rounded-full bg-[#3A9B9B]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#3A9B9B]">Exclusive GST</span>
                    <p className="mt-3 text-base font-bold text-zinc-900 dark:text-zinc-100">₹100 + 18% GST on top</p>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-6">GST is added separately over the base price. Customer pays ₹118 in total.</p>
                  </div>

                  {/* Right: stat cards */}
                  <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
                    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3 sm:p-6 text-center shadow-sm">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium">Actual Amount</p>
                      <p className="mt-2 text-base sm:text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">₹100</p>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl border border-[#3A9B9B]/30 bg-white dark:bg-zinc-900 p-3 sm:p-6 text-center shadow-sm">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <p className="text-[10px] sm:text-xs text-[#3A9B9B] font-bold">GST Amount (18%)</p>
                      <p className="mt-2 text-base sm:text-xl font-black tracking-tight text-[#3A9B9B]">₹18</p>
                    </div>
                    <div className="relative overflow-hidden col-span-2 lg:col-span-1 rounded-2xl bg-gradient-to-br from-[#2D3561] to-[#3A9B9B] p-3 sm:p-6 text-center shadow-md">
                      <p className="text-[10px] sm:text-xs text-teal-100 font-bold">Total Amount</p>
                      <p className="mt-2 text-lg sm:text-xl font-black tracking-tight text-white">₹118</p>
                    </div>
                  </div>
                </div>

                {/* ---- Inclusive GST Row ---- */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center rounded-2xl bg-white/60 dark:bg-zinc-900/60 p-4 sm:p-6 border border-zinc-100 dark:border-zinc-800">
                  {/* Left: explanation */}
                  <div className="lg:w-64 shrink-0">
                    <span className="inline-block rounded-full bg-[#2D3561]/10 dark:bg-[#2D3561]/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#2D3561] dark:text-indigo-300">Inclusive GST</span>
                    <p className="mt-3 text-base font-bold text-zinc-900 dark:text-zinc-100">₹100 already includes 18% GST</p>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-6">GST is embedded in the price. The actual base value is extracted by back-calculation.</p>
                  </div>

                  {/* Right: stat cards */}
                  <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
                    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3 sm:p-6 text-center shadow-sm">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium">Actual Amount</p>
                      <p className="mt-2 text-base sm:text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">₹84.75</p>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl border border-[#3A9B9B]/30 bg-white dark:bg-zinc-900 p-3 sm:p-6 text-center shadow-sm">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <p className="text-[10px] sm:text-xs text-[#3A9B9B] font-bold">GST Amount (18%)</p>
                      <p className="mt-2 text-base sm:text-xl font-black tracking-tight text-[#3A9B9B]">₹15.25</p>
                    </div>
                    <div className="relative overflow-hidden col-span-2 lg:col-span-1 rounded-2xl bg-gradient-to-br from-[#2D3561] to-[#3A9B9B] p-3 sm:p-6 text-center shadow-md">
                      <p className="text-[10px] sm:text-xs text-teal-100 font-bold">Total Amount</p>
                      <p className="mt-2 text-lg sm:text-xl font-black tracking-tight text-white">₹100</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PREDICTED SELLING PRICE GUIDE */}
            <div className="relative overflow-hidden mt-6 rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-8 md:p-10 shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* LEFT CONTENT */}
                <div className="max-w-2xl">

                  <p className="text-xs font-bold uppercase tracking-widest text-[#3A9B9B]">
                    Selling Price Prediction
                  </p>

                  <h3 className="mt-2 text-lg md:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    How to Use Predicted Selling Price
                  </h3>

                  <p className="mt-4 leading-7 text-zinc-700 dark:text-zinc-300">
                    The calculator can automatically predict the selling price
                    required to achieve your desired profit based on the GST
                    type and your cost price.
                  </p>

                  {/* STEPS */}
                  <div className="mt-4 space-y-4">
                    <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 shadow-sm">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        Step 1 — Enter Cost Price
                      </p>

                      <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        Add the original purchase price of the product along
                        with GST details.
                      </p>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 shadow-sm">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        Step 2 — Enter Desired Profit or Profit %
                      </p>

                      <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        You can either enter the exact profit amount you want or
                        simply provide the desired profit percentage.
                      </p>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 shadow-sm">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
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
                <div className="relative overflow-hidden w-full max-w-md rounded-3xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 shadow-lg">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Example
                  </h4>

                  <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between rounded-2xl bg-white/40 dark:bg-zinc-900/40 px-4 py-3">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        Cost Price
                      </span>

                      <span className="font-bold text-zinc-900 dark:text-zinc-100">
                        ₹100
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-white/40 dark:bg-zinc-900/40 px-4 py-3">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        Desired Profit
                      </span>

                      <span className="font-bold text-[#3A9B9B]">₹50</span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-white/40 dark:bg-zinc-900/40 px-4 py-3">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        GST Rate
                      </span>

                      <span className="font-bold text-zinc-900 dark:text-zinc-100">
                        18%
                      </span>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 text-center hover:shadow-md transition-all duration-300">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <p className="text-sm text-[#3A9B9B]">
                        Predicted Selling Price
                      </p>

                      <p className="mt-2 text-3xl font-bold text-[#3A9B9B]">
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
              <div className="mt-4 grid gap-6 md:grid-cols-3">
                <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <h4 className="text-base font-bold">
                    🎯 Desired Profit
                  </h4>

                  <p className="mt-2 text-sm leading-6 ">
                    Enter the exact amount of profit you want to earn from the
                    product.
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <h4 className="text-base font-bold ">
                    📊 Profit Percentage
                  </h4>

                  <p className="mt-2 text-sm leading-6 ">
                    Instead of fixed profit, you can use profit percentage like
                    20%, 30%, or 50% to automatically calculate selling price.
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <h4 className="text-base font-bold ">
                    🧾 Base Selling Price
                  </h4>

                  <p className="mt-2 text-sm leading-6 ">
                    Base selling price is the actual product price before adding
                    GST on the final sale.
                  </p>
                </div>
              </div>
            </div>

            {/* EXTRA TIPS */}
            {/* <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <h3 className="text-base font-bold ">
                  💡 Inclusive vs Exclusive
                </h3>

                <p className="mt-3 text-sm leading-6 ">
                  Inclusive prices already contain GST inside the amount.
                  Exclusive prices add GST separately after calculation.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <h3 className="text-base font-bold ">
                  📈 Profit Calculation
                </h3>

                <p className="mt-3 text-sm leading-6 ">
                  The Profit Calculator helps businesses understand actual
                  earnings after considering GST paid and GST collected.
                </p>
              </div>
            </div> */}
          </section>

          {/* ========================= INFO SECTION ========================= */}
          <section className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Decorative accent line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#3A9B9B]">
                Learn GST
              </p>

              <h2 className="mt-2 text-2xl md:text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
                GST — Goods and Services Tax
              </h2>


            </div>

            {/* INFO CARDS */}
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3 py-4">
              {/* What is GST */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="mb-3 text-3xl">📘</div>

                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  What is GST?
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  GST is a value-added tax charged on goods and services at
                  every stage of sale. Businesses collect GST from customers and
                  pay it to the government after adjusting input tax credits.
                </p>
              </div>

              {/* Inclusive GST */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="mb-3 text-3xl">💰</div>

                <h3 className="text-base font-bold ">
                  Inclusive GST
                </h3>

                <p className="mt-2 text-sm leading-6 ">
                  Inclusive GST means the GST amount is already included in the
                  entered price.
                </p>

                <div className="mt-4 rounded-xl bg-white/40 dark:bg-zinc-900/40 p-6 text-sm font-medium ">
                  Example: ₹118 inclusive of 18% GST
                  <br />
                  Actual Price = ₹100
                  <br />
                  GST = ₹18
                </div>
              </div>

              {/* Exclusive GST */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="mb-3 text-3xl">🧾</div>

                <h3 className="text-base font-bold ">
                  Exclusive GST
                </h3>

                <p className="mt-2 text-sm leading-6 ">
                  Exclusive GST means GST is added separately on top of the
                  entered amount.
                </p>

                <div className="mt-4 rounded-xl bg-white/40 dark:bg-zinc-900/40 p-6 text-sm font-medium ">
                  Example: ₹100 + 18% GST
                  <br />
                  GST = ₹18
                  <br />
                  Final Amount = ₹118
                </div>
              </div>

              {/* Input Tax Credit */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="mb-3 text-3xl">🔄</div>

                <h3 className="text-base font-bold ">
                  Input Tax Credit (ITC)
                </h3>

                <p className="mt-2 text-sm leading-6 ">
                  Businesses can reduce the GST they owe by claiming credit for
                  GST already paid on purchases and expenses.
                </p>
              </div>

              {/* GST Slabs */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="mb-3 text-3xl">📊</div>

                <h3 className="text-base font-bold ">
                  Common GST Slabs
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-6">
                  {[0, 5, 12, 18, 28].map((rate) => (
                    <div
                      key={rate}
                      className="rounded-xl bg-white/60 dark:bg-zinc-900/60 px-4 py-3 text-center shadow-sm"
                    >
                      <p className="text-lg font-bold ">
                        {rate}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profit Tip */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="mb-3 text-3xl">📈</div>

                <h3 className="text-base font-bold ">Profit Tip</h3>

                <p className="mt-2 text-sm leading-6 ">
                  Always calculate profit using the base amount before GST. GST
                  collected from customers is payable to the government and
                  should not be treated as business profit.
                </p>
              </div>
            </div>

            {/* BOTTOM NOTE */}
            <div className="relative overflow-hidden mt-6 rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-8 md:p-10">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Quick Summary
              </h3>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400 font-medium">
                <li>
                  ✅ Inclusive tax means GST is already included in the amount.
                </li>
                <li>
                  ✅ Exclusive tax means GST is added separately to the amount.
                </li>
                <li>
                  ✅ Businesses can claim GST paid on purchases using Input Tax Credit.
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

