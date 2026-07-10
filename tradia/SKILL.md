# talocode-tradia

Use Tradia Agentic Trading OS to plan, risk-check, journal, backtest, and report trades from inside agent workflows.

## When to Use

Use this skill when an agent task involves:
- Generating a structured trade proposal with risk analysis
- Running a risk check on trade parameters before execution
- Journaling a completed trade with lessons and discipline scoring
- Analyzing trading performance (win rate, expectancy, drawdown)
- Generating portfolio reports and public accountability updates
- Simulating backtests on historical trades
- Exporting trade data as markdown or JSON

Do not use this skill for market data feeds, live execution, or financial advice.

## Product Overview

Tradia is an open-source trading OS published as `@talocode/tradia` on npm. It runs fully local (no API key required) or optionally in cloud mode via Talocode Cloud for hosted usage and credit-based billing.

## Required Behavior

- Always include `humanReviewRequired: true` in all outputs
- Always include `notFinancialAdvice: true` in all outputs
- Never claim guaranteed profits
- Never provide financial advice
- Never recommend live autonomous execution
- Always include risk warnings
- Frame outputs as educational analysis
- Prefer local mode by default; use cloud mode only when explicitly requested

## Auth (Cloud Mode)

```
Authorization: Bearer $TALOCODE_API_KEY
```

Base URL: `https://api.talocode.site`

## CLI Usage

```bash
# Propose a trade
tradia propose --symbol XAUUSD --market forex --strategy liquidity_sweep --balance 500 --risk 0.5 --entry 2365.5 --stop 2372 --target 2350

# Risk check
tradia risk --balance 500 --risk 0.5 --entry 2365.5 --stop 2372 --target 2350

# Journal a trade
tradia journal --file trade.json

# Performance analysis
tradia performance --file trades.json --balance 1000

# Portfolio report
tradia report --file trades.json --balance 1000

# Backtest simulation
tradia backtest --file trades.json --balance 1000 --risk 0.5

# Agent trading plan
tradia agent-plan --symbol XAUUSD --strategy liquidity_sweep --mode proposal --balance 500

# Market analysis
tradia market-analyze --symbol XAUUSD --timeframe 1h

# Signal evaluation
tradia signal --symbol XAUUSD --strategy liquidity_sweep

# Public accountability update
tradia public-update --file trade.json

# Accountability card
tradia accountability --file trade.json

# Export
tradia export-markdown --file trade.json
tradia export-json --file trade.json

# Show config
tradia config

# Cloud mode (requires TALOCODE_API_KEY)
TRADIA_ALLOW_LOCAL_UNAUTH=true tradia --cloud propose --symbol XAUUSD ...
```

## SDK Usage

```typescript
import { TradiaClient, checkRisk } from '@talocode/tradia'

const tradia = new TradiaClient({
  apiKey: process.env.TALOCODE_API_KEY,
  baseUrl: process.env.TALOCODE_BASE_URL,
  useCloud: false, // Set true for cloud-hosted mode
})

// Agent trading plan
const plan = await tradia.agent.plan({
  symbol: 'XAUUSD',
  strategy: 'liquidity_sweep',
  mode: 'proposal',
  accountBalance: 500,
  riskPercent: 0.5,
})

// Market context analysis
const market = await tradia.market.analyze({
  symbol: 'XAUUSD',
  timeframe: '1h',
  context: 'NFP week',
})

// Signal evaluation
const signal = await tradia.signal.evaluate({
  symbol: 'XAUUSD',
  strategy: 'liquidity_sweep',
  context: 'Liquidity above recent high',
})

// Risk check
const risk = await tradia.risk.check({
  accountBalance: 500,
  riskPercent: 0.5,
  entry: 2365.5,
  stopLoss: 2372,
  takeProfit: 2350,
})

// Trade proposal
const proposal = await tradia.trade.propose({
  symbol: 'XAUUSD',
  market: 'forex',
  strategy: 'liquidity_sweep',
  accountBalance: 500,
  riskPercent: 0.5,
  entry: 2365.5,
  stopLoss: 2372,
  takeProfit: 2350,
})

// Journal trade
const journal = await tradia.trade.journal({
  symbol: 'XAUUSD',
  direction: 'short',
  entry: 2365.5,
  exit: 2350,
  riskAmount: 2.5,
  profitLoss: 15.5,
  rMultiple: 6.2,
  reason: 'Liquidity sweep above recent high',
  rulesFollowed: true,
})

// Performance analysis
const performance = await tradia.performance.analyze({
  trades: [...],
  startingBalance: 1000,
})

// Portfolio report
const report = await tradia.portfolio.report({
  trades: [...],
  accountBalance: 1000,
})

// Public update
const update = await tradia.publicUpdate.generate({
  label: 'Week 12',
  trade: proposal,
  performance: { sevenDay: 12.5, twentyEightDay: 8.3, threeSixtyFiveDay: null, sinceInception: 45.2 },
})

// Backtest simulation
const backtest = await tradia.backtest.simulate({
  strategy: 'liquidity_sweep',
  trades: [...],
  startingBalance: 1000,
  riskPercent: 0.5,
})

// Accountability card
const card = await tradia.accountability.card({
  tradeProposal: proposal,
  performance: { winRate: 0.65, averageR: 2.1, totalTrades: 50 },
})

// Export
const md = await tradia.export.markdown(data)
const json = await tradia.export.json(data)

// Standalone risk utilities
const riskResult = checkRisk({ accountBalance: 500, riskPercent: 0.5, entry: 2365.5, stopLoss: 2372, takeProfit: 2350 })
console.log(riskResult.riskAmount, riskResult.riskRewardRatio, riskResult.violations)
```

## API Endpoints (Cloud Mode)

| Method | Endpoint | Credits |
|---|---|---|
| `GET` | `/v1/tradia/health` | 0 |
| `POST` | `/v1/tradia/agent/plan` | 40 |
| `POST` | `/v1/tradia/market/analyze` | 30 |
| `POST` | `/v1/tradia/signal/evaluate` | 30 |
| `POST` | `/v1/tradia/risk/check` | 20 |
| `POST` | `/v1/tradia/trade/propose` | 40 |
| `POST` | `/v1/tradia/trade/journal` | 25 |
| `POST` | `/v1/tradia/portfolio/report` | 50 |
| `POST` | `/v1/tradia/performance/analyze` | 35 |
| `POST` | `/v1/tradia/public-update/generate` | 30 |
| `POST` | `/v1/tradia/backtest/simulate` | 60 |
| `POST` | `/v1/tradia/accountability/card` | 25 |
| `POST` | `/v1/tradia/export/markdown` | 5 |
| `POST` | `/v1/tradia/export/json` | 5 |

## Raw API Examples

```bash
# Health
curl https://api.talocode.site/v1/tradia/health

# Trade proposal
curl -X POST https://api.talocode.site/v1/tradia/trade/propose \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "XAUUSD",
    "market": "forex",
    "strategy": "liquidity_sweep",
    "accountBalance": 500,
    "riskPercent": 0.5,
    "entry": 2365.5,
    "stopLoss": 2372,
    "takeProfit": 2350
  }'

# Risk check
curl -X POST https://api.talocode.site/v1/tradia/risk/check \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"accountBalance": 500, "riskPercent": 0.5, "entry": 2365.5, "stopLoss": 2372, "takeProfit": 2350}'

# Performance analysis
curl -X POST https://api.talocode.site/v1/tradia/performance/analyze \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"trades": [...], "startingBalance": 1000}'
```

## Pricing

| Action | Credits | USD Value |
|---|---|---|
| `tradia.export.markdown` / `tradia.export.json` | 5 | $0.05 |
| `tradia.risk.check` | 20 | $0.20 |
| `tradia.trade.journal` | 25 | $0.25 |
| `tradia.accountability.card` | 25 | $0.25 |
| `tradia.market.analyze` | 30 | $0.30 |
| `tradia.signal.evaluate` | 30 | $0.30 |
| `tradia.public_update.generate` | 30 | $0.30 |
| `tradia.performance.analyze` | 35 | $0.35 |
| `tradia.agent.plan` | 40 | $0.40 |
| `tradia.trade.propose` | 40 | $0.40 |
| `tradia.portfolio.report` | 50 | $0.50 |
| `tradia.backtest.simulate` | 60 | $0.60 |

## Safety Rules

- All outputs include `humanReviewRequired: true` and `notFinancialAdvice: true`
- Never guarantee profits or provide financial advice
- Never recommend live autonomous execution
- Always include risk warnings in proposals and analysis
- Frame all outputs as educational analysis

## Validation Checklist

- [ ] Local mode used by default unless cloud mode explicitly requested
- [ ] All outputs include `humanReviewRequired: true` and `notFinancialAdvice: true`
- [ ] Risk check performed before trade proposals
- [ ] No guaranteed profits claimed
- [ ] No financial advice provided
- [ ] No live autonomous execution recommended
- [ ] API keys not printed or logged in cloud mode
- [ ] Usage credits reported in cloud mode responses

## Notes

- Tradia runs fully local with no external dependencies as a local-first npm package.
- Cloud mode requires `TALOCODE_API_KEY` and charges credits per action.
- All hosted endpoints are under `/v1/tradia/*` on `api.talocode.site`.
- Published on npm as `@talocode/tradia`.
- The CLI entry point is `tradia` (installed via `npx @talocode/tradia` or global install).
