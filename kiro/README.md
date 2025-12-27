# GullySense — The Local Street Intelligence AI

## Inspiration
Every city has invisible rules that only locals understand. GullySense was built to capture and preserve that street-level intelligence using AI.

## What it does
GullySense provides hyperlocal insights about:
- Street food safety
- Real traffic behavior
- Area-specific slang and cultural cues

## How we built it
- Used Kiro Agent with a custom `product.md` context file
- Encoded local heuristics instead of generic data
- Steered responses using strict context adherence
- Designed for explainable, human-like answers

## Challenges
- Translating human intuition into structured rules
- Preventing generic AI responses
- Balancing simplicity with realism

## Accomplishments
- Built a culturally-aware AI guide
- Demonstrated strong Agent Steering
- Created reusable city context architecture

## What we learned
- Custom context dramatically improves personalization
- AI feels smarter when it reasons like a human
- Constraints create better UX

## What’s next
- Multi-city support
- Community-contributed product.md files
- Real-time signals (weather, events)

## Repository Structure
/
├── .kiro/
│   └── product.md
├── app/
├── README.md
