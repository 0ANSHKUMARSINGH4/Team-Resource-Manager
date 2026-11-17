import React, { useState } from 'react'
import { Calculator, ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export const RoiCalculatorSection: React.FC = () => {
  const [teamSize, setTeamSize] = useState<number>(30)
  const [hourlyRate, setHourlyRate] = useState<number>(65)

  // Calculations:
  // Industry benchmark: Average knowledge worker loses ~4.5 hours/week to fragmented spreadsheet status checks, double-entry updates, and disconnected capacity planning.
  const hoursSavedPerPersonPerWeek = 4.2
  const weeksPerYear = 48
  const totalAnnualHoursSaved = Math.round(teamSize * hoursSavedPerPersonPerWeek * weeksPerYear)
  const annualDollarValueSaved = Math.round(totalAnnualHoursSaved * hourlyRate)
  // TRM Pro plan at $24/seat/month
  const annualTrmCost = teamSize * 24 * 12
  const roiMultiplier = ((annualDollarValueSaved / (annualTrmCost || 1))).toFixed(1)

  return (
    <section id="roi-calculator" className="py-24 bg-gray-50/80 dark:bg-slate-950/80 border-t border-gray-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-wider mb-4 border border-emerald-200 dark:border-emerald-800">
            <Calculator size={14} />
            <span>Salesforce-Grade ROI Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-950 dark:text-white tracking-tight">
            Calculate Your Organization&apos;s Savings
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-slate-300">
            See how much time and budget you recover by replacing manual spreadsheets and bloated legacy tools with TRM.
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 p-6 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Sliders Area (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            {/* Slider 1: Team Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-gray-700 dark:text-slate-300">
                  Total Team Members / Employees
                </label>
                <span className="text-xl font-black text-primary dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 px-3.5 py-1 rounded-xl border border-indigo-100 dark:border-indigo-800">
                  {teamSize} people
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="250"
                step="5"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[11px] text-gray-400 font-medium mt-1.5">
                <span>5 (Seed Startup)</span>
                <span>100 (Scaleup)</span>
                <span>250+ (Enterprise)</span>
              </div>
            </div>

            {/* Slider 2: Average Hourly Rate */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-gray-700 dark:text-slate-300">
                  Average Blended Hourly Rate ($/hr)
                </label>
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 px-3.5 py-1 rounded-xl border border-emerald-100 dark:border-emerald-800">
                  ${hourlyRate}/hr
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="150"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-gray-400 font-medium mt-1.5">
                <span>$30/hr</span>
                <span>$85/hr (Industry Avg)</span>
                <span>$150/hr</span>
              </div>
            </div>

            {/* Assumptions note */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-800 text-xs text-gray-500 dark:text-slate-400 space-y-1.5">
              <div className="font-bold text-gray-700 dark:text-slate-300 flex items-center gap-1.5">
                <Clock size={14} className="text-primary" />
                <span>Baseline Efficiency Assumptions:</span>
              </div>
              <p>• 4.2 hours saved per employee each week on manual reporting & status syncs.</p>
              <p>• 48 working weeks calculated per full-time resource per calendar year.</p>
            </div>
          </div>

          {/* Results Area (6 cols) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-800/50">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[90px] rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Annual Impact Projection
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black">
                  {roiMultiplier}x Estimated ROI
                </span>
              </div>

              {/* Big Dollar Metric */}
              <div>
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  ${annualDollarValueSaved.toLocaleString()}
                </div>
                <div className="text-sm text-indigo-200 mt-1 font-medium">
                  Estimated annual capacity value unlocked
                </div>
              </div>

              {/* Secondary Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-indigo-800/60 text-xs">
                <div>
                  <div className="text-indigo-300 font-medium">Hours Reclaimed</div>
                  <div className="text-xl font-black text-white mt-0.5">
                    {totalAnnualHoursSaved.toLocaleString()} hrs/yr
                  </div>
                  <div className="text-[11px] text-indigo-400 mt-0.5">Across whole team</div>
                </div>

                <div>
                  <div className="text-indigo-300 font-medium">Platform Payback</div>
                  <div className="text-xl font-black text-emerald-400 mt-0.5">
                    &lt; 14 Days
                  </div>
                  <div className="text-[11px] text-indigo-400 mt-0.5">Instant breakeven</div>
                </div>
              </div>

              {/* CTA button */}
              <div className="pt-2">
                <Link
                  to="/login"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-gray-100 text-indigo-950 font-extrabold text-sm shadow-lg transition-all hover:scale-[1.02]"
                >
                  <span>Start Unlocking Value Now</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
