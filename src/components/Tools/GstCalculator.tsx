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
  // SYNC CALCULATIONS
  // =========================

  const syncAllFromProfitPercentage = (percent: string, currentCost: string, cGst: number, cType: TaxType, sGst: number, sType: TaxType) => {
    const numericPercent = Number(percent);
    const numericCost = Number(currentCost);
    if (isNaN(numericPercent) || isNaN(numericCost) || !percent || !currentCost) return;

    const actualCost = normalizeBaseAmount(numericCost, cGst, cType);
    const profitAmount = (actualCost * numericPercent) / 100;
    setDesiredProfit(profitAmount.toFixed(2));

    const baseSell = actualCost + profitAmount;
    const finalSell = sType === "inclusive" ? baseSell * (1 + sGst / 100) : baseSell;
    setSell(finalSell.toFixed(2));
  };

  const syncAllFromDesiredProfit = (profit: string, currentCost: string, cGst: number, cType: TaxType, sGst: number, sType: TaxType) => {
    const numericProfit = Number(profit);
    const numericCost = Number(currentCost);
    if (isNaN(numericProfit) || isNaN(numericCost) || !profit || !currentCost) return;

    const actualCost = normalizeBaseAmount(numericCost, cGst, cType);
    const percentage = (numericProfit / actualCost) * 100;
    setProfitPercentage(percentage.toFixed(2));

    const baseSell = actualCost + numericProfit;
    const finalSell = sType === "inclusive" ? baseSell * (1 + sGst / 100) : baseSell;
    setSell(finalSell.toFixed(2));
  };

  const syncAllFromSell = (sellVal: string, currentCost: string, cGst: number, cType: TaxType, sGst: number, sType: TaxType) => {
    const numericSell = Number(sellVal);
    const numericCost = Number(currentCost);
    if (isNaN(numericSell) || isNaN(numericCost) || !sellVal || !currentCost) return;

    const actualCost = normalizeBaseAmount(numericCost, cGst, cType);
    const actualSell = normalizeBaseAmount(numericSell, sGst, sType);
    const profit = actualSell - actualCost;

    setDesiredProfit(profit.toFixed(2));
    if (actualCost > 0) {
      setProfitPercentage(((profit / actualCost) * 100).toFixed(2));
    }
  };

  const handleProfitPercentageChange = (value: string) => {
    setProfitPercentage(value);
    syncAllFromProfitPercentage(value, cost, costGst, costType, sellGst, sellType);
  };

  const handleDesiredProfitChange = (value: string) => {
    setDesiredProfit(value);
    syncAllFromDesiredProfit(value, cost, costGst, costType, sellGst, sellType);
  };

  const handleSellChange = (value: string) => {
    setSell(value);
    syncAllFromSell(value, cost, costGst, costType, sellGst, sellType);
  };

  const handleCostChange = (value: string) => {
    setCost(value);
    // When cost changes, we maintain the profit percentage and update sell/desired profit
    if (profitPercentage) {
      syncAllFromProfitPercentage(profitPercentage, value, costGst, costType, sellGst, sellType);
    } else if (sell) {
      syncAllFromSell(sell, value, costGst, costType, sellGst, sellType);
    }
  };

  // Sync when tax settings change
  useEffect(() => {
    if (profitPercentage) {
      syncAllFromProfitPercentage(profitPercentage, cost, costGst, costType, sellGst, sellType);
    } else if (desiredProfit) {
      syncAllFromDesiredProfit(desiredProfit, cost, costGst, costType, sellGst, sellType);
    }
  }, [costGst, costType, sellGst, sellType]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans pt-2 grid-bg">
      <main className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8 pb-24">
        <div className="grid gap-5">
          {/* ========================= GST CALCULATOR ========================= */}
          <section className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
            <div className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-5 py-4 sm:px-10 sm:py-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-center items-center">
                <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter leading-tight">
                  GST <span className="text-[#3A9B9B]">Calculator</span>
                </h1>
              </div>
            </div>

            <div className="p-4 pt-3 sm:p-10 sm:pt-5">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
                <div className="space-y-1 sm:space-y-2 col-span-2 md:col-span-1">
                  <label className="text-[11px] sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 px-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-1 sm:space-y-2 col-span-1">
                  <label className="text-[11px] sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 px-1">
                    GST %
                  </label>
                  <select
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
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

                <div className="space-y-1 sm:space-y-2 col-span-1">
                  <label className="text-[11px] sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 px-1">
                    Tax Type
                  </label>
                  <select
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={type}
                    onChange={(e) => setType(e.target.value as TaxType)}
                  >
                    <option value="exclusive">Exclusive</option>
                    <option value="inclusive">Inclusive</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="relative overflow-hidden rounded-xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-3 sm:p-6 text-center hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-[10px] sm:text-sm text-zinc-500 dark:text-zinc-400">
                    Actual Amount
                  </p>
                  <p className="mt-0.5 sm:mt-2 text-sm sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    ₹{gstResult.actual.toFixed(2)}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-3 sm:p-6 text-center hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-[10px] sm:text-sm text-[#3A9B9B]">GST Amount</p>
                  <p className="mt-0.5 sm:mt-2 text-sm sm:text-lg font-bold tracking-tight text-[#3A9B9B]">
                    ₹{gstResult.gstAmount.toFixed(2)}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-xl border-none bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] p-3 sm:p-6 text-center shadow-lg shadow-[#3A9B9B]/20">
                  <p className="text-[10px] sm:text-sm text-teal-50 font-bold">Total Amount</p>
                  <p className="mt-0.5 sm:mt-2 text-lg sm:text-2xl font-black tracking-tighter text-white">
                    ₹{gstResult.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================= PROFIT CALCULATOR ========================= */}
          <section className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
            <div className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-sm px-5 py-4 sm:px-10 sm:py-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-center items-center">
                <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter leading-tight">
                  Profit <span className="text-[#3A9B9B]">Calculator</span>
                </h1>
              </div>
            </div>

            <div className="p-4 pt-3 sm:p-10 sm:pt-5">
              <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 ">
                {/* Buy Action Section */}
                <div className="space-y-1 sm:space-y-2 col-span-2 md:col-span-1">
                  <label className="text-[11px] sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 px-1">
                    Buy
                  </label>
                  <div className="flex items-stretch rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus-within:border-[#3A9B9B] focus-within:ring-2 focus-within:ring-[#3A9B9B]/20 transition overflow-hidden">
                    <div className="flex items-center justify-center px-3 sm:px-4 bg-[#5BBD4A]/10 text-[#5BBD4A] font-black text-[9px] sm:text-[10px] uppercase border-r border-zinc-200 dark:border-zinc-800">
                      Buy
                    </div>
                    <div className="flex-1 px-3 py-1.5 sm:px-4 sm:py-0.5">
                      <label className="block text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-0.5">
                        AMOUNT
                      </label>
                      <input
                        type="number"
                        placeholder="Enter price"
                        className="w-full bg-transparent text-sm sm:text-xs font-bold text-zinc-900 dark:text-zinc-100 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                        value={cost}
                        onChange={(e) => handleCostChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2 col-span-1">
                  <label className="text-[11px] sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 px-1">
                    GST (%)
                  </label>
                  <select
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
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

                <div className="space-y-1 sm:space-y-2 col-span-1">
                  <label className="text-[11px] sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 px-1">
                    Tax Type
                  </label>
                  <select
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={costType}
                    onChange={(e) => setCostType(e.target.value as TaxType)}
                  >
                    <option value="exclusive">Exclusive</option>
                    <option value="inclusive">Inclusive</option>
                  </select>
                </div>

                {/* Sell Action Section */}
                <div className="space-y-1 sm:space-y-2 col-span-2 md:col-span-1">
                  <label className="text-[11px] sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 px-1">
                    Sell
                  </label>
                  <div className="flex items-stretch rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus-within:border-[#3A9B9B] focus-within:ring-2 focus-within:ring-[#3A9B9B]/20 transition overflow-hidden">
                    <div className="flex items-center justify-center px-3 sm:px-4 bg-[#F43F5E]/10 text-[#F43F5E] font-black text-[9px] sm:text-[10px] uppercase border-r border-zinc-200 dark:border-zinc-800">
                      Sell
                    </div>
                    <div className="flex-1 px-3 py-1.5 sm:px-4 sm:py-0.5">
                      <label className="block text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-0.5">
                        AMOUNT
                      </label>
                      <input
                        type="number"
                        placeholder="Enter price"
                        className="w-full bg-transparent text-sm sm:text-xs font-bold text-zinc-900 dark:text-zinc-100 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                        value={sell}
                        onChange={(e) => handleSellChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2 col-span-1">
                  <label className="text-[11px] sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 px-1">
                    GST (%)
                  </label>
                  <select
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
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

                <div className="space-y-1 sm:space-y-2 col-span-1">
                  <label className="text-[11px] sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 px-1">
                    Tax Type
                  </label>
                  <select
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={sellType}
                    onChange={(e) => setSellType(e.target.value as TaxType)}
                  >
                    <option value="exclusive">Exclusive</option>
                    <option value="inclusive">Inclusive</option>
                  </select>
                </div>
              </div>

              {/* Rearranged Result Cards Layout - Responsive 2-column grid */}
              <div className="mt-4 sm:mt-8 grid grid-cols-2 gap-2 sm:gap-6 lg:gap-4 xl:gap-5">
                {/* Row 1: Net Profit & GST Paid */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-none bg-gradient-to-r from-[#5BBD4A] to-[#4A9D3B] p-2.5 sm:p-5 lg:p-4 text-center shadow-lg shadow-[#5BBD4A]/20">
                  <p className="text-[9px] sm:text-sm lg:text-xs text-green-50 font-black uppercase tracking-widest">Net Profit</p>
                  <p className="mt-0.5 sm:mt-2 lg:mt-1 text-sm sm:text-2xl lg:text-xl font-black tracking-tighter text-white">
                    ₹{profitResult.profit.toFixed(2)}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2.5 sm:p-5 lg:p-4 text-center hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-[9px] sm:text-sm lg:text-xs text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-widest">
                    GST Paid
                  </p>
                  <p className="mt-0.5 sm:mt-2 lg:mt-1 text-sm sm:text-xl lg:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    ₹{profitResult.gstPaid.toFixed(2)}
                  </p>
                </div>

                {/* Row 2: Profit % & GST Collected */}
                <div className="flex flex-col relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2.5 sm:p-5 lg:p-4 hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <label className="text-[9px] sm:text-sm lg:text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">
                    Profit %
                  </label>
                  <input
                    type="number"
                    placeholder='%'
                    className="mt-1 sm:mt-3 lg:mt-2 w-full rounded-lg sm:rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2 py-1 sm:px-4 sm:py-3 lg:py-2 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20 text-[11px] sm:text-lg lg:text-base font-bold"
                    value={profitPercentage}
                    onChange={(e) => handleProfitPercentageChange(e.target.value)}
                  />
                </div>

                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2.5 sm:p-5 lg:p-4 text-center hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-[9px] sm:text-sm lg:text-xs text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-widest">
                    GST Collected
                  </p>
                  <p className="mt-0.5 sm:mt-2 lg:mt-1 text-sm sm:text-xl lg:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    ₹{profitResult.gstCollected.toFixed(2)}
                  </p>
                </div>

                {/* Row 3: Desired Profit & GST Payable */}
                <div className="flex flex-col relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2.5 sm:p-5 lg:p-4 hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <label className="text-[9px] sm:text-sm lg:text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">
                    Desired Profit
                  </label>
                  <input
                    type="number"
                    placeholder="Amount"
                    className="mt-1 sm:mt-3 lg:mt-2 w-full rounded-lg sm:rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2 py-1 sm:px-4 sm:py-3 lg:py-2 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20 text-[11px] sm:text-lg lg:text-base font-bold"
                    value={desiredProfit}
                    onChange={(e) => handleDesiredProfitChange(e.target.value)}
                  />
                </div>

                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2.5 sm:p-5 lg:p-4 text-center hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-[9px] sm:text-sm lg:text-xs text-[#3A9B9B] font-black uppercase tracking-widest">GST Payable</p>
                  <p className="mt-0.5 sm:mt-2 lg:mt-1 text-sm sm:text-xl lg:text-lg font-black tracking-tight text-[#3A9B9B]">
                    ₹{profitResult.gstPayable.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================= USER GUIDE ========================= */}
          <section className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-5 sm:p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
            <div className="text-center">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#3A9B9B]">
                User Guide
              </p>
            </div>

            <div className="mt-4 sm:mt-6 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-3.5 sm:p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#3A9B9B]/10 dark:bg-[#3A9B9B]/20 text-xs sm:text-sm font-bold text-[#3A9B9B]">
                    1
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Enter Amount
                  </h3>
                </div>
                <p className="mt-2 text-[11px] sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 text-justify">
                  Enter the product or service amount in the calculator input field.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-3.5 sm:p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#3A9B9B]/10 dark:bg-[#3A9B9B]/20 text-xs sm:text-sm font-bold text-[#3A9B9B]">
                    2
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Select GST Rate
                  </h3>
                </div>
                <p className="mt-2 text-[11px] sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 text-justify">
                  Choose the applicable GST slab such as 5%, 12%, 18%, or 28% based on your product or service category.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-3.5 sm:p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#3A9B9B]/10 dark:bg-[#3A9B9B]/20 text-xs sm:text-sm font-bold text-[#3A9B9B]">
                    3
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Choose Tax Type
                  </h3>
                </div>
                <p className="mt-2 text-[11px] sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 text-justify">
                  Select Inclusive if GST is already included in the amount or Exclusive if GST should be added separately.
                </p>
              </div>

              {/* Profit % Guide Card */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-3.5 sm:p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#3A9B9B]/10 dark:bg-[#3A9B9B]/20 text-xs sm:text-sm font-bold text-[#3A9B9B]">
                    4
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Using Profit %
                  </h3>
                </div>
                <p className="mt-2 text-[11px] sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 text-justify">
                  Entering Profit % automatically calculates the required selling price based on your desired profit margin.
                </p>
              </div>
            </div>

            {/* EXAMPLE SECTION */}
            <div className="relative overflow-hidden mt-4 sm:mt-6 rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-8 md:p-10 shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
              <div className="mb-4 sm:mb-6">
                <p className="text-[9px] sm:text-xs font-bold uppercase tracking-widest text-[#3A9B9B] py-1 sm:py-2">Example Calculation</p>
                <p className="mt-0.5 text-[11px] sm:text-sm text-zinc-500 dark:text-zinc-400">Suppose a product costs <strong className="text-zinc-900 dark:text-zinc-100">₹100</strong> and GST is <strong className="text-zinc-900 dark:text-zinc-100">18%</strong>.</p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center rounded-xl sm:rounded-2xl bg-white/60 dark:bg-zinc-900/60 p-3 sm:p-6 border border-zinc-100 dark:border-zinc-800">
                  <div className="lg:w-64 shrink-0">
                    <span className="inline-block rounded-full bg-[#3A9B9B]/10 px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-[#3A9B9B]">Exclusive GST</span>
                    <p className="mt-1 sm:mt-2 text-xs sm:text-base font-bold text-zinc-900 dark:text-zinc-100">₹100 + 18% GST on top</p>
                    <p className="mt-1 text-[10px] sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed text-justify">GST is added separately over the base price. Customer pays ₹118 in total.</p>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-2 sm:gap-6 lg:grid-cols-3">
                    <div className="relative overflow-hidden rounded-lg sm:rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 sm:p-6 text-center shadow-sm">
                      <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <p className="text-[8px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium">Actual Amount</p>
                      <p className="mt-0.5 sm:mt-2 text-sm sm:text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">₹100</p>
                    </div>
                    <div className="relative overflow-hidden rounded-lg sm:rounded-2xl border border-[#3A9B9B]/30 bg-white dark:bg-zinc-900 p-2 sm:p-6 text-center shadow-sm">
                      <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <p className="text-[8px] sm:text-xs text-[#3A9B9B] font-bold">GST Amount (18%)</p>
                      <p className="mt-0.5 sm:mt-2 text-sm sm:text-xl font-black tracking-tight text-[#3A9B9B]">₹18</p>
                    </div>
                    <div className="relative overflow-hidden col-span-2 lg:col-span-1 rounded-lg sm:rounded-2xl bg-gradient-to-br from-[#2D3561] to-[#3A9B9B] p-2 sm:p-6 text-center shadow-md">
                      <p className="text-[8px] sm:text-xs text-teal-100 font-bold">Total Amount</p>
                      <p className="mt-0.5 sm:mt-2 text-sm sm:text-xl font-black tracking-tight text-white">₹118</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center rounded-xl sm:rounded-2xl bg-white/60 dark:bg-zinc-900/60 p-3 sm:p-6 border border-zinc-100 dark:border-zinc-800">
                  <div className="lg:w-64 shrink-0">
                    <span className="inline-block rounded-full bg-[#2D3561]/10 dark:bg-[#2D3561]/30 px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-[#2D3561] dark:text-indigo-300">Inclusive GST</span>
                    <p className="mt-1 sm:mt-2 text-xs sm:text-base font-bold text-zinc-900 dark:text-zinc-100">₹100 includes 18% GST</p>
                    <p className="mt-1 text-[10px] sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed text-justify">GST is embedded in the price. The actual base value is extracted by back-calculation.</p>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-2 sm:gap-6 lg:grid-cols-3">
                    <div className="relative overflow-hidden rounded-lg sm:rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 sm:p-6 text-center shadow-sm">
                      <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <p className="text-[8px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium">Actual Amount</p>
                      <p className="mt-0.5 sm:mt-2 text-sm sm:text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">₹84.75</p>
                    </div>
                    <div className="relative overflow-hidden rounded-lg sm:rounded-2xl border border-[#3A9B9B]/30 bg-white dark:bg-zinc-900 p-2 sm:p-6 text-center shadow-sm">
                      <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                      <p className="text-[8px] sm:text-xs text-[#3A9B9B] font-bold">GST Amount (18%)</p>
                      <p className="mt-0.5 sm:mt-2 text-sm sm:text-xl font-black tracking-tight text-[#3A9B9B]">₹15.25</p>
                    </div>
                    <div className="relative overflow-hidden col-span-2 lg:col-span-1 rounded-lg sm:rounded-2xl bg-gradient-to-br from-[#2D3561] to-[#3A9B9B] p-2 sm:p-6 text-center shadow-md">
                      <p className="text-[8px] sm:text-xs text-teal-100 font-bold">Total Amount</p>
                      <p className="mt-0.5 sm:mt-2 text-sm sm:text-xl font-black tracking-tight text-white">₹100</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================= INFO SECTION ========================= */}
          <section className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-5 sm:p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561] rounded-t-3xl" />
            <div className="text-center">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#3A9B9B]">
                Learn GST
              </p>
            </div>

            <div className="mt-4 sm:mt-6 grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 py-2 sm:py-4">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-3.5 sm:p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="text-lg sm:text-2xl">📘</div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                    What is GST?
                  </h3>
                </div>
                <p className="mt-2 text-[11px] sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 text-justify">
                  GST is a value-added tax charged on goods and services at every stage of sale. Businesses collect GST from customers and pay it to the government after adjusting input tax credits.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-3.5 sm:p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="text-lg sm:text-2xl">💰</div>
                  <h3 className="text-sm sm:text-base font-bold ">
                    Inclusive GST
                  </h3>
                </div>
                <p className="mt-2 text-[11px] sm:text-sm leading-relaxed text-justify">
                  Inclusive GST means the GST amount is already included in the entered price.
                </p>
                <div className="mt-3 sm:mt-4 rounded-lg sm:rounded-xl bg-white/40 dark:bg-zinc-900/40 p-3 sm:p-4 text-[11px] sm:text-sm font-medium ">
                  Ex: Inclusive 18% Gst on ₹100
                  <br />
                  Actual Price = ₹84.75
                  <br />
                  GST = ₹15.25
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-3.5 sm:p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="text-lg sm:text-2xl">🧾</div>
                  <h3 className="text-sm sm:text-base font-bold ">
                    Exclusive GST
                  </h3>
                </div>
                <p className="mt-2 text-[11px] sm:text-sm leading-relaxed text-justify">
                  Exclusive GST means GST is added separately on top of the entered amount.
                </p>
                <div className="mt-3 sm:mt-4 rounded-lg sm:rounded-xl bg-white/40 dark:bg-zinc-900/40 p-3 sm:p-4 text-[11px] sm:text-sm font-medium ">
                  Ex: Exclusive 18% Gst on ₹100
                  <br />
                  Actual Price = ₹100
                  <br />
                  GST = ₹18
                  <br />
                  Final Amount = ₹118
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-3.5 sm:p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="text-lg sm:text-2xl">🔄</div>
                  <h3 className="text-sm sm:text-base font-bold ">
                    Input Tax Credit (ITC)
                  </h3>
                </div>
                <p className="mt-2 text-[11px] sm:text-sm leading-relaxed text-justify">
                  Businesses can reduce the GST they owe by claiming credit for GST already paid on purchases and expenses.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="mb-2 sm:mb-3 text-2xl sm:text-3xl">📊</div>
                  <h3 className="text-sm sm:text-base font-bold ">
                    Common GST Slabs
                  </h3>
                </div>
                <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-3 sm:gap-6">
                  {[5, 12, 18, 28].map((rate) => (
                    <div key={rate} className="rounded-lg sm:rounded-xl bg-white/60 dark:bg-zinc-900/60 px-3 py-2 sm:px-4 sm:py-3 text-center shadow-sm">
                      <p className="text-sm sm:text-lg font-bold ">{rate}%</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-3.5 sm:p-6 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="text-lg sm:text-3xl">📈</div>
                  <h3 className="text-sm sm:text-base font-bold ">Profit Tip</h3>
                </div>
                <p className="mt-2 text-[11px] sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 text-justify">
                  Always calculate profit using the base amount before GST. GST collected from customers is payable to the government and should not be treated as business profit.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden mt-4 sm:mt-6 rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-5 sm:p-8 md:p-10">
              <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                Quick Summary
              </h3>
              <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-[11px] sm:text-sm leading-relaxed sm:leading-6 text-zinc-600 dark:text-zinc-400 font-medium">
                <li>✅ Inclusive tax means GST is already included in the amount.</li>
                <li>✅ Exclusive tax means GST is added separately to the amount.</li>
                <li>✅ Businesses can claim GST paid on purchases using Input Tax Credit.</li>
                <li>✅ GST payable = GST collected − GST paid.</li>
                <li>✅ Profit should always be calculated before GST adjustments.</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
