---
title: 'The Wrapper Is Getting Commoditized. The Judgment Isn''t.'
date: '2026-07-17'
tags: ['ai', 'agents', 'ai-strategy', 'consulting']
summary: 'OpenAI shipped ChatGPT Work a week after Claude Cowork kept shipping. The long argument behind Tuesday''s post: what happens to bespoke agent work when the foundation labs start selling the packaging themselves.'
---

On Wednesday last week, OpenAI shipped ChatGPT Work. Point it at your files and it hands back a finished document, deck, or spreadsheet — sometimes after working unsupervised for hours. Trade press called it, correctly, OpenAI's answer to Claude Cowork, which has been doing the same thing since February.

Two labs, same pitch, a few months apart. I wrote about the symptom on Tuesday. This is the argument behind it.

## The wrapper was never really defensible

For the last year, I've built some version of "point an agent at a client's files and get useful output back" for almost every engagement I've taken. It's genuinely useful work. It's also, I'll admit now that two chat apps ship it as a checkbox feature, work that was never going to stay bespoke forever.

I don't think that's a controversial claim anymore. A Google Cloud VP, Darren Mowry, said it more bluntly than I would have back in February: thin "wrapper" companies — a prompt layer sitting on top of someone else's foundation model — face what he called existential commoditization risk, as the model providers absorb that functionality directly. I had to read that twice, because he wasn't talking about some adjacent market. He was talking about mine.

The evidence isn't just ChatGPT Work catching up to Cowork. It's a pattern:

- **Anthropic's Claude Code** crossed $2.5B in annualized revenue this year — over half of all enterprise spend on Anthropic's products. "Agent that does real work in your files" isn't a side project for the labs anymore. It's the main event.
- **OpenAI folded Astral** — the team behind `uv`, `Ruff`, and `ty`, tools most Python-adjacent builders use daily — directly into Codex. That's not a chat-agent feature. That's the labs absorbing the tooling layer independent builders used to own.
- **Google's Gemini Interactions API** added stateful tool use as a first-class product surface, not a beta flag.

None of this is "the AI got better." It's the labs vertically integrating the exact layer — agent plus your files, produces a deliverable — that independent consultants and builders have been selling one client at a time.

## What doesn't compress into a SKU

Here's where I'd push back on the doom version of this story, because there is one, and it's wrong in an interesting way.

Vertical AI companies — the ones with genuine proprietary workflow integration or a real data asset, not just an orchestration layer — are still raising at 15 to 30x ARR in the private markets this year, at the same time generic wrapper and aggregator plays are getting flagged as commoditization risks by the same investors. The split isn't AI-native versus not. It's "did you build the wrapper" versus "did you build the judgment."

I'd draw the line in three places, because these are the three questions no chat app answers for you:

**Which task is actually worth automating.** Not which task looks automatable in a demo. A client's real workflow has exceptions, informal escalation paths, and tribal knowledge about which numbers to trust. Picking correctly here is the difference between a project that pays back in a few months and one that grinds for a year and gets quietly shelved — I wrote about that split on Monday, and built a scoring framework for it on Thursday.

**How it plugs into what a specific business already has.** Every client's systems, permissions, and data quality are different. "Point an agent at your files" assumes clean, accessible, well-labeled files. In practice, half the job is making the input good enough for the agent to be useful at all — and that's not a task any foundation lab's product does for you, because it's specific to one company's fifteen-year-old CRM instance, not a general capability.

**Who owns the outcome when the agent gets 80% right.** This is the one that never shows up in a product demo. Every agent I've shipped gets most of the way there and needs a human decision on the last stretch — which invoice is actually disputed, which contract clause is actually novel, which output is confident-but-wrong. Somebody has to own that judgment call, on the record, accountable to the client. A chat app doesn't take that job. A consultant does.

None of these three questions get easier because OpenAI shipped a better wrapper. If anything, they get more valuable, because the wrapper stops being the thing clients are willing to pay a consultant to build from scratch — which means the fee has to be justified entirely by the judgment layer on top of it. That's a smaller, harder-to-fake job than "we built you an agent." I think it's also a better one.

## What I'm actually doing about it

Practically, this changes what I lead with in a new engagement. I stopped pitching "we'll build you an agent that works on your files" as the headline six months ago, mostly by instinct — this research is the retrospective explanation for why that instinct was right. The headline now is closer to: here's the one workflow in your business where automating it will teach you something in a quarter, not a year, and here's how we'll know if it's working before you've spent real money finding out.

If you want the one-page version of how I score which project earns that first slot, I built a framework for it — it's the same one referenced in Thursday's post, [available here](https://elliotbetancourt.com/resources/agent-payback-framework-lead-magnet).

The wrapper was always going to get commoditized. It's infrastructure now, same as compute, same as hosting. The judgment about where to point it was never the wrapper's job in the first place.
