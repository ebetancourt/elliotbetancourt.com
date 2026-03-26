---
title: 'Why Coding Agents Are the Exception (And Why It Doesn''t Matter)'
date: '2026-03-27'
tags: ['ai', 'agents', 'engineering', 'coding']
summary: 'Coding agents hit 76.8% on SWE-bench with just two tools. That says more about code than it does about AI. Six reasons software is the best-case scenario — and what that means for everyone else.'
---

Coding agents are having a moment. And not a small one.

In February 2026, Claude 4.5 Opus scored 76.8% on SWE-bench — a benchmark that measures whether an AI can actually solve real GitHub issues from open-source projects. Claude 2 scored 1.96% on the same test in 2023. That's a 39x improvement in under three years.

Anthropic's own SWE-bench agent uses exactly two tools: bash and edit. Two tools, 76.8% accuracy.

Geoffrey Huntley has a [GitHub repo](https://github.com/ghuntley/how-to-build-a-coding-agent) called "how-to-build-a-coding-agent" where he shows you how you can build your own (admittedly simple) coding agent — roughly 300 lines of code running in a loop with LLM tokens. Read file, edit file, run command, check output, repeat. During a talk, he had a coding agent build its own coding agent. On stage.

Huntley is also the [originator of the "Ralph Loop"](https://ghuntley.com/ralph/) - a literal single line of code that just pipes a specially formatted markdown prompt to the coding agent of your choice...in a never-ending loop. What does the prompt tell it to do? What's in the prompt? The prompt tells the coding agent to look at a product spec, look at the current implementation and identify the most important task to bring the current implementation closer to the spec and do it. In a loop. FOREVER...or until it achieves its goal...or more likely runs out of tokens.

The miracle isn't that its good (its not REALLY). The miracle is that it works AT ALL. It definitely SHOULD NOT work.

I think the more interesting question isn't how this works. It's why it only works here.

## Code Is the Best-Case Scenario

Software engineering is almost uniquely suited for LLM-based agents. Six reasons, and they compound:

**The toolset is tiny.** Read a file, write a file, edit a section, run a command. That's it. A marketing agent would need CRMs, email platforms, analytics dashboards, ad managers, social APIs — each with their own auth and rate limits and data formats. A coding agent needs four tools. This isn't a minor advantage. Every additional tool is another decision point where the agent can go wrong, another set of parameters to get right, another API that might change under it.

**The medium is plain text.** No images to interpret, no tone of voice to read, no body language to parse. LLMs are text machines. Code is a text problem. That alignment is so clean it's easy to miss how unusual it is. Most professional work happens across a mix of media: documents, conversations, whiteboard sessions, spreadsheets, emails with context that only makes sense if you were in the room.

**Built-in correctness checks.** Code compiles or it doesn't. Tests pass or they fail. Type checkers catch mismatches. The agent gets instant, unambiguous feedback on whether it succeeded. No human in the loop required. This is a tight feedback loop that most domains would kill for. There's no "compile" step for a sales pitch. No type checker for a project status update.

**The documentation is absurd.** Open source libraries ship with READMEs, API docs, type definitions, and thousands of worked examples across Stack Overflow and GitHub. The models trained on all of it. Most professional domains run on tribal knowledge, internal wikis that haven't been updated since 2019, and "ask Janet, she knows how that works."

**Training data for days.** Hundreds of millions of GitHub repos. Decades of Stack Overflow. Textbooks, tutorials, conference talks transcribed and indexed. No other professional domain has this volume of structured examples to learn from (and it's not even close). A lawyer's best precedent research lives behind Westlaw paywalls. A financial analyst's models are proprietary. A therapist's clinical notes are (rightly) confidential.

**Software engineering IS systems thinking.** MVC. Design Patterns. TDD. Frameworks. Architectural patterns with names and documented trade-offs. The field spent decades building structured, composable approaches to problem-solving — approaches that were literally designed to be reasoned about. An LLM doesn't have to figure out how to think about software problems. Hundreds of thousands of engineers already codified that for it.

## The Ralph Loop Works Because Code Lets It

Huntley's Ralph Loop is elegant because the domain allows elegance. A one-line loop builds software because the work decomposes into a tight cycle: read → edit → run → check. Each iteration gives the agent clean signal. Did the test pass? Did the build succeed? Did the linter complain? The agent knows exactly what to do next.

Now try that same loop on legal contract negotiation. Financial planning. Organizational change management. Therapy.

It falls apart. Not because the LLM isn't smart enough. Because there's no compiler for org charts. No test suite for client relationships. No linter for emotional intelligence. The feedback is ambiguous, delayed, and often comes in the form of a human shaking their head six weeks later.

## The Benchmark Problem

SWE-bench exists for code. Nothing equivalent exists for any other professional domain. There's no benchmark that tells you whether an AI can manage a product roadmap, close a deal, or navigate a reorg. And I think that absence is telling. It's not just that nobody built those benchmarks yet. It's that the domains don't lend themselves to the kind of objective measurement that makes benchmarks meaningful.

When we celebrate 76.8%, we're measuring performance on the one domain that was practically designed for agents to succeed at. And even there, the picture is mixed. Developer AI adoption sits at 62%, but favorability is actually declining (77% down to 72%). 45% of developers say AI fails them on complex tasks.

Simon Willison nailed something I think about a lot: coding agents operationalize management skills. The people who use them best aren't the strongest coders. They're the ones who decompose problems clearly, write precise specs, and review output with a critical eye. The skill that makes coding agents useful is the skill that was always the bottleneck — the human part.

Armin Ronacher made the flip-side observation: agents excel at code but "freeze basic composition" when you point them at anything else. Same model, same architecture, wildly different results depending on whether the domain cooperates.

## Writing Code Was Never the Bottleneck

Marc Andreessen said software will eat the world. He was right. But writing code was never the true bottleneck to building great software.

Understanding what to build. Why to build it. How users will actually interact with it. How to prioritize when everything feels urgent. How to explain a technical constraint to someone who doesn't think in technical constraints. That's where projects succeed or fail. Every engineer who's spent a sprint building the wrong feature knows this. The code was fine. The decision to write it wasn't.

Same principle applies across every profession. Sending emails and pulling reports are not the valuable parts of anyone's job. The judgment calls, the relationship management, the strategic thinking. Those are the parts that matter. And those are exactly the parts the Ralph Loop can't touch.

## What I'm Actually Doing About It

I'm not making a theoretical argument here. I've built a multi-agent system that runs my consultancy: content creation, lead identification, financial tracking, task management. I use coding agents every single day. The productivity gain is real and I'm not giving it back.

But I think the framing matters. These agents succeed at code because code is a best-case scenario for the model-centric approach. That doesn't mean the model-centric approach works everywhere. Outside of code, you need more structure around the agent. Pre-built data pipelines, deterministic workflows, human checkpoints. The agent becomes one component in a larger system, not the system itself.

We are not Ralph Loops. We don't decompose into read → edit → run → check cycles. Our value is in the messy, ambiguous, context-dependent work that no tight loop can capture.

But we CAN use Ralph Loops. To handle the mechanical parts of our work. To free up attention for the parts that require actual human judgment. To spend less time on the things that were never where our value came from anyway.

That's not a consolation prize. That's where the real leverage is.
