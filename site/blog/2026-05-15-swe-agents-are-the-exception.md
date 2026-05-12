---
title: 'SWE Agents Are the Exception, Not the Template'
date: '2026-05-15'
tags: ['ai-agents', 'production', 'engineering']
summary: 'Software engineering agents succeed in production in ways that confuse everyone building agents for anything else. The reason isn''t the model. It''s the domain.'
---

Software engineering agents succeed in production in ways that confuse everyone building agents for anything else.

GitHub Copilot works. Cursor works. SWE-Bench benchmark agents achieve 70% pass rates on real-world bug fixes. And then people watch these numbers and think: why does my customer service agent, my financial ops agent, my CRM agent keep failing in ways that my coding agent doesn't?

The answer isn't the model. It isn't the prompting. It's the domain.

## What Code Gets for Free

Code has four properties almost no other business domain does:

**Executable verification.** Tests pass or fail. There's no ambiguity about whether the agent solved the problem — you run the test suite and it either goes green or it doesn't. The agent knows immediately whether its output was correct.

**Measurable ground truth.** Tools like SWE-Bench can grade solutions objectively and at scale. No human judgment required. An agent can run 10,000 attempts and know which ones worked.

**Scoped determinism.** The task definition for coding agents is usually tight: "fix this failing test," "implement this interface," "make this function return the correct value." The success criteria are defined before the agent starts.

**Side-effect-free retries.** When a coding agent fails, it retries. The failed attempt doesn't email your customers, commit funds to the wrong account, or send a message you can't take back. Failure is cheap. That means you can run multiple attempts and pick the best result.

This isn't just helpful infrastructure. This is the entire foundation that makes agent reliability possible.

## What Business Processes Don't Have

Real business processes lack all of it.

There's no test suite for "did this sales email hit the right tone?" No objective grading for "was this support response empathetic enough?" No deterministic success criteria for "did the agent qualify this lead correctly?"

When a coding agent fails at step 3 of a 10-step process and retries, you get a second attempt. When a business process agent fails at step 3 of a 10-step process and the error compounds silently, you get a catastrophic failure at step 10 that looks like a complete mystery.

Here's the math: at 85% per-step accuracy across 10 steps, your agent delivers the correct end result about 20% of the time. The model isn't to blame — it's performing exactly as designed. But 0.85^10 ≈ 0.20. That's not a tuning problem.

## The Governance Problem

The deeper issue is that most teams deploy business process agents the same way they deploy coding agents: with an evaluation suite that measures performance at individual steps, not at system level.

Code reviews itself at every commit. Your business process doesn't.

When Geoffrey Huntley describes the Ralph Loop pattern for software development, it works specifically because it's targeting the one domain where you can close the loop between action and evaluation in seconds. For software, the loop is: write code → run tests → observe pass/fail → iterate. The feedback is immediate, objective, and cheap.

For most business processes, the feedback loop looks like: take action → observe outcome → wait several days/weeks → analyze → maybe update the agent. By then you've taken the action hundreds of times.

## What You Have to Build

If you're deploying agents outside the coding domain, you have to build the evaluation infrastructure that code provides for free.

That means:
- **Defining success criteria before deployment**, not after a production incident
- **Sampling output quality** — not just monitoring for errors, but reviewing whether correct-looking outputs are actually correct
- **Building scope guards** — explicit conditions under which the agent should NOT run, not just when it should
- **Instrumenting the full chain** — not just "did step 5 succeed" but "did the sequence from step 1 to 10 produce a good outcome"
- **Building cheap-retry mechanics** — structuring your agent so that failures are caught early and retried before side effects propagate

None of this is the model's job. None of it appears in SWE-Bench benchmarks. It's the unglamorous systems work that determines whether a capable model translates into a reliable production system.

## The Week's Thesis

This week started with a stat: 79% of enterprises claim AI agent adoption, 11% run agents in production. I argued the gap isn't a technology problem.

The evaluation infrastructure problem is one major reason why. When people see coding agents perform at 70% benchmark accuracy and expect that to translate directly to their domain, they're comparing against the easiest case. Software development has decades of tooling built around the idea that code needs to be continuously tested and verified. Everything else is starting from scratch.

The model is ready. The question — for every domain that isn't software development — is whether you've built what code already has.

If you haven't, the [Systems-Level Agent Checklist](/resources/systems-level-agent-checklist) is a good place to start.
