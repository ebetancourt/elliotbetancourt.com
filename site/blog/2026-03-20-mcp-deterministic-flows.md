---
title: 'MCP Part 3: When Your Agent Needs to Be Right, Not Creative'
date: '2026-03-20'
tags: ['ai', 'agents', 'mcp', 'engineering']
summary: 'The most reliable AI agent is often the one with the least autonomy on critical paths. Part 3 of the MCP series — why deterministic flows beat agentic improvisation in production.'
---

## The Series So Far

[Part 1](/blog/2026-03-06-mcp-standard/) covered MCP's token cost — tool definitions eating your context window before any work begins. [Part 2](/blog/2026-03-14-mcp-security/) covered the security surface — 30 CVEs in 60 days, the protocol everyone adopted before securing it.

This is Part 3: the reliability problem. And the answer that surprised me.

## The Most Reliable Part of JARVIS Isn't the AI

I've been building JARVIS — a multi-agent system that runs my consultancy — for about three months now. I can prototype an agent in an afternoon. Three months ago that took a week.

But shipping one that actually works? One that humans trust enough to delegate to without checking? That still takes the same amount of time it always did.

The creative work got faster. The operational work didn't.

## The Data Backs This Up

[MCPAgentBench](https://arxiv.org/html/2512.24565v1) tested how well AI agents perform when given tools to use:

- **Single-tool tasks:** 91% success rate
- **Serial multi-tool tasks:** 57.8% efficiency
- **Parallel multi-tool tasks:** 24% average
- **OpenAI's best models on dual parallel tasks:** 0%

Not low. Zero.

When an agent has to decide which of 20-30 tools to use, in what order, with what parameters, performance collapses. Every autonomous decision point is a potential failure mode. And in production, potential failure modes become actual failure modes on a predictable schedule.

## What Actually Works: Let the AI Think, Let the Code Execute

I landed on this after three iterations of JARVIS, and I think it's the most important architectural decision I've made.

Let the LLM handle creative judgment. Writing, reasoning, analysis, synthesis. These are genuinely hard problems where probabilistic models shine. When I need an agent to draft a post, analyze a dataset, or reason through a strategy question, the LLM is the right tool.

Let scripts handle everything that has to be right every time. Scheduling posts, syncing data, deploying changes, moving items between systems. No model in the loop. No model deciding whether to run the script. The script just runs.

My content pipeline is a good example. The pipeline structure (Research → Angle → Draft → De-AI → Voice → Polish) is completely deterministic. The agent doesn't decide what step comes next. The code does. But within each step, the LLM does genuine creative work.

The scheduling script that pushes to Buffer? Pure bash. The data sync between Todoist and my planning system? A cron job. The deployment process? A shell script that runs on a $6/month server.

These aren't sophisticated. They're reliable. And in production, reliable beats sophisticated EVERY time.

## The Industry Landed Here Too

Every major agent framework has arrived at the same conclusion.

**CrewAI** split its architecture into two modes: "Crews" for autonomous experimentation and "Flows" for production workloads. The naming tells you everything. Production gets deterministic flows.

**LangGraph** uses conditional edges that look agentic but are actually developer-defined paths. The agent appears to "choose" a direction, but the developer pre-specified every possible path. The autonomy is bounded.

**Temporal** insists on deterministic workflows specifically so a run can replay exactly after failures. When you need absolute reliability guarantees, you remove the agent from the decision loop entirely.

[Gartner predicted](https://www.gartner.com/en) that over 40% of agentic AI projects will be scrapped by 2027. Not because models fail, but because teams cannot operationalize them reliably. The bottleneck isn't model capability. It's operational reliability.

## When Should Agents Actually Improvise?

I'm not arguing that autonomy is always bad. It's essential in specific contexts.

**Novel problems.** When you genuinely don't know the solution path, a deterministic workflow can't be written. Autonomous agents are excellent R&D tools for exploring unknown territory.

**The hybrid prototyping pattern.** Deploy an autonomous agent on a new, poorly-defined problem. When it solves it successfully, reverse-engineer the successful approach into a deterministic workflow. Autonomy is the R&D phase. Determinism is the production phase. I think most teams will land on some version of this loop (even if they don't call it that).

**Creative generation within bounded steps.** This is the nuanced case. The agent improvises the *content* — what words to write, what analysis to produce — but the *process* is deterministic. This is exactly how my content pipeline operates.

## The Rule of Thumb

The practitioner consensus emerging in 2026: use autonomy where the problem space is genuinely open-ended. Use determinism everywhere else.

Most "agentic" pipelines in production are about 80% deterministic flow with 20% LLM-powered judgment at specific, bounded decision points. The 80% is what makes it reliable. The 20% is what makes it useful.

## Tying the Series Together

The three MCP problems — token cost, security surface, reliability — all share a root cause. MCP's power comes from giving agents access to many tools. But many tools means large tool definitions (token cost), broad attack surface (security), and a decision space complex enough to guarantee reliability failures.

The fix is the same across all three: constrain the agent's decision surface. Pre-define what tools are available, in what sequence, under what conditions. Use skills (pre-packaged workflows) instead of raw tool access. Let the agent be creative where creativity matters, and deterministic where correctness matters.

The most reliable agent isn't the most autonomous one. It's the one where someone thought carefully about which decisions should be made by a model and which should be made by code.

Or, as I keep telling myself: the bash script just runs.

---

*This is Part 3 of a 3-part series on MCP in production. [Part 1: The Token Cost](/blog/2026-03-06-mcp-standard/) | [Part 2: The Security Surface](/blog/2026-03-14-mcp-security/)*
