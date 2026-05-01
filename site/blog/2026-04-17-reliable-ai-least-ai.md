---
title: 'The Most Reliable AI Systems Use the Least AI'
date: '2026-04-17'
tags: ['ai', 'architecture', 'agents', 'engineering']
summary: 'Why the best AI agent systems minimize AI usage — and how a three-layer architecture makes everything faster, cheaper, and actually reliable.'
---

# The Most Reliable AI Systems Use the Least AI

The most reliable AI system I've built uses AI for about 10% of its work. The other 90% is bash scripts, cron jobs, and structured data.

That sounds like a contradiction. It's actually the architecture.

## The Problem: LLMs as Orchestrators

JARVIS — my personal AI agent system — runs 15+ automated workflows daily. Morning briefings, financial summaries, reading lists, lead qualification, content scheduling.

For the first few months, most of these were full LLM sessions. An OpenClaw cron job would spin up a model, let it figure out what data to fetch, format the output, and deliver it to Telegram.

The problems showed up quickly:

- **Inconsistency.** Every run produced slightly different output. Sections would appear in different orders, or disappear entirely. Temperature zero didn't solve it — LLMs are fundamentally non-deterministic.
- **Token waste.** The model was spending tokens fetching data it already had access to. Calendar events, task lists, git commits — all of this is deterministic. The LLM was doing work a shell script handles in milliseconds.
- **Fragility.** One bad API response and the whole session would derail. No graceful degradation — just a confused model trying to recover from unexpected input.

Research backs this up. Stack Overflow published a piece framing it as "building reliability around unreliable LLMs." IntuitionLabs found that deterministic workflows dominate production AI systems, with LLMs reserved for genuinely dynamic decisions. There's even a documented "accuracy cliff" when LLMs handle repetitive structured tasks.

The industry is converging on a simple truth: **we're not making LLMs reliable. We're making systems reliable in spite of them.**

## The Fix: Three Layers

I rebuilt the system around a principle I call "gather then summarize." It separates every workflow into three distinct layers:

### Layer 1: Deterministic Gathering

Shell scripts, APIs, cron jobs. This layer fetches data from external systems — calendar, tasks, weather, git commits, bank balances, RSS feeds. It runs on a schedule, produces structured output, and never fails in interesting ways.

If the API is down, the script returns empty data with a clear error flag. No ambiguity. No hallucination.

### Layer 2: Structured Formatting

Templates, JSON schemas, markdown structures. This layer takes the raw data from Layer 1 and formats it into exactly the shape the LLM needs to see. Pre-computed, pre-structured, pre-validated.

The LLM never sees raw API responses. It sees clean, labeled sections with clear context about what each piece of data means and what it should do with it.

### Layer 3: LLM Reasoning

This is the only layer that needs a model. And it only does what models are actually good at: synthesis, analysis, pattern recognition, natural language generation.

The morning briefing LLM doesn't fetch the calendar. It receives a markdown section called "Today's Calendar" with events already formatted. Its job is to synthesize priorities and flag conflicts — thinking work, not plumbing.

## What Changed

Last week I rewrote four workflows that were running as full LLM sessions:

- **Morning briefing:** Shell script pulls calendar, tasks, and weather. LLM only does the synthesis.
- **Evening recap:** Pure shell. Zero LLM calls. Pulls git commits and task completions, formats directly.
- **Daily reading list:** Shell fetches from Readwise Reader API, structures by category. LLM only needed for relevance scoring (and even that's optional).
- **Financial summary:** Shell fetches balances and upcoming bills. No interpretation needed — it's just numbers in a template.

The results:

- **Token usage dropped 60-80%** across these workflows
- **Consistency went from "usually right" to "always right"** for the deterministic parts
- **Execution time dropped** because shell scripts don't need to negotiate with an API
- **Debugging became trivial** — when something breaks, it's in a specific script, not buried in a prompt

## When to Use an LLM (and When Not To)

The decision tree is simple:

**Use an LLM when:**
- The task requires reasoning, synthesis, or judgment
- The output needs to be different every time based on context
- You need natural language generation that adapts to content

**Use a script when:**
- The task is fetching, formatting, or filtering data
- The output structure is known in advance
- You need the same reliable output every time
- The "thinking" is just following rules

Most agent workflows are 70-90% script-appropriate and 10-30% LLM-appropriate. The mistake is using the LLM for all of it because it *can* do all of it. Can and should are different questions.

## The Broader Principle

This isn't about LLMs being bad. They're extraordinary at what they're good at. The mistake is using them as general-purpose orchestrators when most of the work is deterministic.

The best AI systems I've seen — not just mine — follow this pattern. HYVE's benchmarks show 50-90% token reduction from pre-computing structured data. The Autobot framework uses cron and shell commands for all deterministic work, only invoking the LLM when reasoning is needed.

The industry has a name for this now: context engineering. It's the discipline of controlling what the model sees, when it sees it, and in what format. The less work you ask the model to do, the better it does the work that actually matters.

The most reliable AI systems use the least AI. That's not a limitation. That's engineering.
