# Growth ops — how Talocode uses domain ingest

## Principle

Deep research compounds. Cold prompts do not.

Before a content sprint or new product lane:

1. Write a domain brief  
2. Ingest 15–40 high-signal public videos (captions when available)  
3. Run SearchLane deep research on the seed questions  
4. Run XSearchLane for complaints from the last ~30 days  
5. Fact-check claim cards until enough are `supported`  
6. Only then plan Shorts / tutorials / product gaps  

## Content mapping

| Claim type | Content move |
|------------|----------------|
| `supported` pain | Short: name the failure + show one Talocode fix |
| `stale` advice | Tutorial: “what changed” + working demo |
| `contested` | Long-form: show both sides + measure |
| `creator-only` | Internal R&D only until verified |

## Product mapping

| Pattern in wiki | Possible Talocode artifact |
|-----------------|----------------------------|
| Repeated agent failure | LeanLane / VerifyLane / PolicyLane skill |
| Missing verification | EvalLane suite or tutorial |
| Context loss | ContextLane / wiki hot.md boot |
| Tool chaos | GateLane policy pack |

## Cadence

- New domain: full ingest sprint (1–2 days research budget)  
- Known domain: weekly social scan + claim recency pass  
- After each major launch: re-query wiki, retire stale claims  

## Hard rules

- Public sources only  
- No third-party brand spam in Talocode public copy  
- No reuploads  
- Human review before publish  
