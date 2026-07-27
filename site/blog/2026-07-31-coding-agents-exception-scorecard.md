---
title: 'The Coding Agent Exception, Six Months Later: A Scorecard for Your Next Project'
date: '2026-07-31'
tags: ['ai', 'agents', 'engineering', 'systems-thinking']
summary: 'Back in March I wrote about why coding agents are a best-case scenario, not a template. This week I turned that reasoning into six questions you can run against your next candidate project before you build it.'
---

Back in March I wrote about [why coding agents are the exception](/blog/2026-03-27-coding-agents-exception) — six structural reasons software engineering is a best-case scenario for AI agents, not evidence that agents are ready for everything else. That post held up. It's still the argument I reach for when a client points to a coding agent demo and asks why their own agent project stalled.

What I hadn't done until this week was turn it into something you can actually use before you start.

## The pushback that made me revisit it

Tuesday I wrote about agent failures looking like systems problems, not model problems — old state interfering with new decisions, failed paths still shaping behavior. Someone pushed back with the obvious counterexample: coding agents are famously simple (read file, write file, edit, run a command, loop) and their quality tracks model quality almost directly. Doesn't that undercut the whole "it's a systems problem" argument?

No — because coding is the one domain where the model-centric approach and the systems-centric approach happen to point the same direction. The six advantages from March (few tools, plain-text medium, built-in correctness checks, dense prior art, and a discipline that already thinks in systems) mean a stronger model shows up as better results almost immediately, with none of the memory-and-state degradation that shows up in longer-running, less-structured agent work. That's not a contradiction. It's what happens when the systems layer is already this good — the model becomes the bottleneck, because it's the only thing left that isn't already solved.

Most business processes aren't there yet. That's the gap that needs a name.

## Turning six reasons into six questions

This week I converted the March argument into a scorecard: six dimensions, scored 1-5, that predict whether a candidate process is actually ready for an agent, or whether it just looks like one on a slide.

1. **Tool surface** — does the task need one or two tools, or a dozen bespoke integrations?
2. **Medium** — is the work in plain text, or does it live in meetings, tone, and body language?
3. **Correctness signal** — does something tell you immediately when the output is wrong, or is "wrong" a judgment call made weeks later?
4. **Prior art** — is there a decade of documented examples, or is this genuinely novel territory?
5. **Process structure** — does an established methodology already exist, or does every instance of this task get handled a little differently?
6. **Judgment requirement** — and the one that's inverse-scored on purpose: does success depend on taste, empathy, or reading a room? If yes, that's not a gap to close. That's where the human stays the value.

Coding scores close to a perfect six. Most of what actually eats a knowledge worker's week doesn't — and that's fine. The scorecard isn't there to talk you out of agent projects. It's there to tell you, before you spend a quarter building one, whether you're looking at a coding-agent-shaped problem or something that needs more scaffolding around it first.

## What changes if you take the gap seriously

If a candidate process scores low on tool surface and correctness signal, you don't shelve it. You restructure it first — narrow the tool surface, define what "correct" means before the agent runs, and build the equivalent of a compiler for your domain, even a crude one. That restructuring work is the actual project. The agent is what you add once the restructuring is done, not instead of it.

I use a version of this scorecard with clients now before we write a single line of agent code. Ten minutes, six questions, and a much shorter path to a project that survives contact with production.
