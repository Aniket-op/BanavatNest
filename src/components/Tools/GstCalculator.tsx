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

            <div className="p-4 pt-3 sm:p-10 sm:pt-8">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
                {/* Buy Action Section */}
                <div className="col-span-2 md:col-span-1">
                  <div className="flex items-stretch rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus-within:border-[#3A9B9B] focus-within:ring-2 focus-within:ring-[#3A9B9B]/20 transition-all duration-300 overflow-hidden group">
                    <div className="flex items-center justify-center px-2.5 sm:px-3.5 bg-[#5BBD4A]/8 text-[#5BBD4A] font-semibold text-[10px] sm:text-[11px] uppercase border-r border-zinc-100 dark:border-zinc-800/50 rounded-l-xl transition-colors group-focus-within:bg-[#5BBD4A]/12">
                      Buy
                    </div>
                    <div className="flex-1 px-3 py-1.5 sm:px-4 sm:py-2">
                      <label className="block text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-0.5">
                        AMOUNT
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="w-full bg-transparent text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        value={cost}
                        onChange={(e) => handleCostChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  <select
                    className="w-full h-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 sm:px-4 sm:py-3.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={costGst}
                    onChange={(e) => setCostGst(Number(e.target.value))}
                  >
                    {[0, 5, 12, 18, 28].map((g) => (
                      <option key={g} value={g}>
                        {g}% GST
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-1">
                  <select
                    className="w-full h-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 sm:px-4 sm:py-3.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={costType}
                    onChange={(e) => setCostType(e.target.value as TaxType)}
                  >
                    <option value="exclusive">Exclusive</option>
                    <option value="inclusive">Inclusive</option>
                  </select>
                </div>

                {/* Sell Action Section */}
                <div className="col-span-2 md:col-span-1">
                  <div className="flex items-stretch rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus-within:border-[#3A9B9B] focus-within:ring-2 focus-within:ring-[#3A9B9B]/20 transition-all duration-300 overflow-hidden group">
                    <div className="flex items-center justify-center px-2.5 sm:px-3.5 bg-[#F43F5E]/8 text-[#F43F5E] font-semibold text-[10px] sm:text-[11px] uppercase border-r border-zinc-100 dark:border-zinc-800/50 rounded-l-xl transition-colors group-focus-within:bg-[#F43F5E]/12">
                      Sell
                    </div>
                    <div className="flex-1 px-3 py-1.5 sm:px-4 sm:py-2">
                      <label className="block text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-0.5">
                        AMOUNT
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="w-full bg-transparent text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        value={sell}
                        onChange={(e) => handleSellChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  <select
                    className="w-full h-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 sm:px-4 sm:py-3.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
                    value={sellGst}
                    onChange={(e) => setSellGst(Number(e.target.value))}
                  >
                    {[0, 5, 12, 18, 28].map((g) => (
                      <option key={g} value={g}>
                        {g}% GST
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-1">
                  <select
                    className="w-full h-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 sm:px-4 sm:py-3.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20"
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
                <div className={`relative overflow-hidden rounded-xl sm:rounded-2xl border-none transition-all duration-500 p-2.5 sm:p-5 lg:p-4 text-center shadow-lg ${
                  profitResult.profit < 0 
                    ? "bg-gradient-to-r from-[#F43F5E] to-[#E11D48] shadow-[#F43F5E]/20" 
                    : profitResult.profit > 0
                      ? "bg-gradient-to-r from-[#5BBD4A] to-[#4A9D3B] shadow-[#5BBD4A]/20"
                      : "bg-gradient-to-r from-[#2D3561] to-[#3A9B9B] shadow-[#3A9B9B]/20"
                }`}>
                  <p className="text-[10px] sm:text-sm lg:text-xs text-white/90 font-black uppercase tracking-widest">
                    {profitResult.profit < 0 ? "Net Loss" : "Net Profit"}
                  </p>
                  <p className="mt-0.5 sm:mt-2 lg:mt-1 text-base sm:text-2xl lg:text-xl font-black tracking-tighter text-white">
                    ₹{Math.abs(profitResult.profit).toFixed(2)}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2.5 sm:p-5 lg:p-4 text-center hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-[10px] sm:text-sm lg:text-xs text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-widest">
                    GST Paid
                  </p>
                  <p className="mt-0.5 sm:mt-2 lg:mt-1 text-base sm:text-xl lg:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    ₹{profitResult.gstPaid.toFixed(2)}
                  </p>
                </div>

                {/* Row 2: Profit % & GST Collected */}
                <div className="flex flex-col relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2.5 sm:p-5 lg:p-4 hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <label className="text-[10px] sm:text-sm lg:text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">
                    Profit %
                  </label>
                  <input
                    type="number"
                    placeholder='%'
                    className="mt-1 sm:mt-3 lg:mt-2 w-full rounded-lg sm:rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2 py-1.5 sm:px-4 sm:py-3 lg:py-2 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20 text-sm sm:text-lg lg:text-base font-bold"
                    value={profitPercentage}
                    onChange={(e) => handleProfitPercentageChange(e.target.value)}
                  />
                </div>

                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2.5 sm:p-5 lg:p-4 text-center hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-[10px] sm:text-sm lg:text-xs text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-widest">
                    GST Collected
                  </p>
                  <p className="mt-0.5 sm:mt-2 lg:mt-1 text-base sm:text-xl lg:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    ₹{profitResult.gstCollected.toFixed(2)}
                  </p>
                </div>

                {/* Row 3: Desired Profit & GST Payable */}
                <div className="flex flex-col relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2.5 sm:p-5 lg:p-4 hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <label className="text-[10px] sm:text-sm lg:text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">
                    Desired Profit
                  </label>
                  <input
                    type="number"
                    placeholder="Amount"
                    className="mt-1 sm:mt-3 lg:mt-2 w-full rounded-lg sm:rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2 py-1.5 sm:px-4 sm:py-3 lg:py-2 text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-[#3A9B9B] focus:ring-2 focus:ring-[#3A9B9B]/20 text-sm sm:text-lg lg:text-base font-bold"
                    value={desiredProfit}
                    onChange={(e) => handleDesiredProfitChange(e.target.value)}
                  />
                </div>

                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-2.5 sm:p-5 lg:p-4 text-center hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3561] via-[#3A9B9B] to-[#2D3561]" />
                  <p className="text-[10px] sm:text-sm lg:text-xs text-[#3A9B9B] font-black uppercase tracking-widest">GST Payable</p>
                  <p className="mt-0.5 sm:mt-2 lg:mt-1 text-base sm:text-xl lg:text-lg font-black tracking-tight text-[#3A9B9B]">
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
                Centralized Help & Education
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
                User Guide & <span className="text-[#3A9B9B]">GST Insights</span>
              </h2>
            </div>

            <div className="mt-6 sm:mt-10 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300 group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-800 transition-colors group-hover:bg-[#3A9B9B]" />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3A9B9B]/10 text-sm font-bold text-[#3A9B9B]">1</div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Enter Amount</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Input the product or service amount in the calculator's price field.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300 group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-800 transition-colors group-hover:bg-[#3A9B9B]" />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3A9B9B]/10 text-sm font-bold text-[#3A9B9B]">2</div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Select GST %</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Choose the correct slab (5%, 12%, 18%, or 28%) for your product category.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300 group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-800 transition-colors group-hover:bg-[#3A9B9B]" />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3A9B9B]/10 text-sm font-bold text-[#3A9B9B]">3</div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Tax Type</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Select <strong className="text-zinc-800 dark:text-zinc-200">Inclusive</strong> if price has tax, or <strong className="text-zinc-800 dark:text-zinc-200">Exclusive</strong> if tax is extra.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#3A9B9B]/20 bg-gradient-to-br from-[#3A9B9B]/5 via-white/60 to-[#2D3561]/5 dark:from-[#3A9B9B]/10 dark:via-zinc-900/60 dark:to-[#2D3561]/10 backdrop-blur-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300 group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-800 transition-colors group-hover:bg-[#3A9B9B]" />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3A9B9B]/10 text-sm font-bold text-[#3A9B9B]">4</div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Profit Goals</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Set a <strong className="text-zinc-800 dark:text-zinc-200">Profit %</strong> or <strong className="text-zinc-800 dark:text-zinc-200">Desired Amount</strong> to auto-calculate the sell price.
                </p>
              </div>
            </div>

            {/* Pro Insights Grid */}
            <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 p-5 sm:p-8 backdrop-blur-md">
                <div className="absolute top-0 left-0 h-full w-1 bg-[#3A9B9B]" />
                <div className="flex items-start gap-4">
                  <div className="text-2xl sm:text-3xl">🔄</div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Input Tax Credit (ITC)</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 text-justify">
                      Businesses can reduce their GST liability by claiming credit for GST already paid on purchases. The calculator shows <strong className="text-[#3A9B9B]">GST Payable</strong> by subtracting GST Paid from GST Collected.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 p-5 sm:p-8 backdrop-blur-md">
                <div className="absolute top-0 left-0 h-full w-1 bg-[#5BBD4A]" />
                <div className="flex items-start gap-4">
                  <div className="text-2xl sm:text-3xl">📈</div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Profit Maximization Tip</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 text-justify">
                      Always calculate margins on the <strong className="text-[#5BBD4A]">base amount before GST</strong>. Tax collected is a liability to the government, not part of your business's operational profit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Section */}
            <div className="mt-8 sm:mt-12 rounded-[1.5rem] sm:rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white/20 dark:bg-zinc-900/20 p-4 sm:p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#3A9B9B]">Example Calculation</p>
                <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
              </div>

              <div className="space-y-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center rounded-2xl bg-white/60 dark:bg-zinc-900/60 p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                  <div className="lg:w-72 shrink-0">
                    <span className="inline-block rounded-full bg-[#3A9B9B]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#3A9B9B]">Exclusive GST</span>
                    <p className="mt-2 text-base font-bold text-zinc-900 dark:text-zinc-100">₹100 + 18% GST</p>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Tax is added to the base price. Customer pays ₹118.</p>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                    <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 text-center">
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-500 font-bold uppercase">Base</p>
                      <p className="text-lg font-black text-zinc-900 dark:text-zinc-100">₹100</p>
                    </div>
                    <div className="rounded-xl border border-[#3A9B9B]/20 bg-white dark:bg-zinc-900 p-4 text-center">
                      <p className="text-[10px] text-[#3A9B9B] font-bold uppercase">GST (18%)</p>
                      <p className="text-lg font-black text-[#3A9B9B]">₹18</p>
                    </div>
                    <div className="col-span-2 lg:col-span-1 rounded-xl bg-gradient-to-br from-[#2D3561] to-[#3A9B9B] p-4 text-center">
                      <p className="text-[10px] text-teal-100 font-bold uppercase">Total</p>
                      <p className="text-lg font-black text-white">₹118</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center rounded-2xl bg-white/60 dark:bg-zinc-900/60 p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                  <div className="lg:w-72 shrink-0">
                    <span className="inline-block rounded-full bg-[#2D3561]/10 dark:bg-[#2D3561]/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#2D3561] dark:text-indigo-300">Inclusive GST</span>
                    <p className="mt-2 text-base font-bold text-zinc-900 dark:text-zinc-100">₹100 (Tax Included)</p>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Tax is already inside the price. Base value is extracted.</p>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                    <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 text-center">
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-500 font-bold uppercase">Base</p>
                      <p className="text-lg font-black text-zinc-900 dark:text-zinc-100">₹84.75</p>
                    </div>
                    <div className="rounded-xl border border-[#3A9B9B]/20 bg-white dark:bg-zinc-900 p-4 text-center">
                      <p className="text-[10px] text-[#3A9B9B] font-bold uppercase">GST (18%)</p>
                      <p className="text-lg font-black text-[#3A9B9B]">₹15.25</p>
                    </div>
                    <div className="col-span-2 lg:col-span-1 rounded-xl bg-gradient-to-br from-[#2D3561] to-[#3A9B9B] p-4 text-center">
                      <p className="text-[10px] text-teal-100 font-bold uppercase">Total</p>
                      <p className="text-lg font-black text-white">₹100</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Summary Points */}
            <div className="mt-8 sm:mt-12 p-6 sm:p-10 rounded-2xl bg-zinc-900/5 dark:bg-white/5 border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3A9B9B]" />
                Quick Summary
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-start gap-3">
                  <span className="text-[#3A9B9B]">✅</span>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-zinc-100">Inclusive:</strong> GST is already included in the amount.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#3A9B9B]">✅</span>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-zinc-100">Exclusive:</strong> GST is added separately to the price.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#3A9B9B]">✅</span>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-zinc-100">ITC:</strong> Claim credit for GST paid on business purchases.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#3A9B9B]">✅</span>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-zinc-100">GST Payable:</strong> Calculated as Collected − Paid.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#3A9B9B]">✅</span>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-900 dark:text-zinc-100">Calculations:</strong> Always base profit on pre-GST figures.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
