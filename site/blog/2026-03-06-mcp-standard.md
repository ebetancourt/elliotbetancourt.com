---
title: 'MCP Part 1: The USB-C Standard for AI Agents (and Its Hidden Cost)'
date: '2026-03-06'
tags: ['ai', 'agents', 'mcp', 'engineering']
summary: 'MCP won the standards war for AI agents. Every major player ships with it. But every tool you connect costs tokens before your agent does any work — and the bill scales faster than you expect.'
---

## How MCP Won

In November 2024, Anthropic launched the Model Context Protocol — an open standard for connecting AI agents to external tools and data sources. Fourteen months later, it's the de facto standard. OpenAI, Google, Microsoft, AWS, Salesforce — everyone ships with it. 97 million SDK downloads a month. In December 2025, Anthropic donated it to the Linux Foundation's Agentic AI Foundation, co-founded with OpenAI and Block.

That's not adoption. That's gravity.

The analogy I keep reaching for is USB-C. Before USB-C, every device had its own connector. Before MCP, every AI platform had its own way to connect tools. MCP unified the interface. One protocol, every model, every tool. The same way USB-C means one cable charges your laptop, phone, and headphones — MCP means one integration works across Claude, ChatGPT, Gemini, Copilot, and anything else that ships an MCP client.

And like USB-C, MCP won not because it was perfect. It won because it was good enough and everyone adopted it before the alternatives could gain traction.

## The Standard Won. Now What?

I build with MCP every day. My agent system — JARVIS, for the curious — uses MCP connections across my entire workflow: task management, calendar, email, file operations, web search, content publishing. It's the plumbing behind everything.

When it works, it's invisible. And mostly, it works.

But there's a cost that isn't getting enough attention yet. And if you're building anything with more than a handful of tools, you're already paying it.

## The Token Tax

Every tool you connect via MCP comes with a JSON schema. The schema describes the tool's name, parameters, types, validation rules, and documentation. Your agent needs this schema to know what the tool does and how to call it.

One tool? Negligible. Five tools? Barely noticeable.

Twenty tools? That's 15,000+ tokens consumed on tool definitions alone. Before your agent processes a single user request. Before it reads any context. Before it does any work.

I watched this happen in real time as I added capabilities to JARVIS. Each new tool was individually small. But collectively, the tool definitions were eating 10% or more of my context window before anything useful happened.

An arxiv paper from February 2026 — "[MCP Tool Descriptions Are Smelly!](https://arxiv.org/html/2602.14878v1)" — formalized what practitioners were seeing in the field. Tool schemas are verbose, redundant, and scale poorly. The protocol that connects everything has a tax on everything.

## It Gets Worse at Scale

The token cost isn't just about context window consumption. It's about reasoning overhead.

When an agent has access to 20+ tools, it has to evaluate all of them for every request. Which tool fits? What parameters does it need? Should it chain tools? The agent is reasoning over the full tool inventory on every turn.

That reasoning isn't free. It consumes tokens, adds latency, and — critically — it degrades accuracy. The more options an agent has to consider, the more likely it is to pick the wrong one or hallucinate parameters.

Anthropic's own research found a striking result: representing tools as discoverable code rather than JSON schemas reduced context overhead by 98.7%. A multi-tool sales assistant went from ~150,000 tokens of tool context to ~2,000. Same capabilities. 98% less overhead.

The implication is clear: the way MCP currently describes tools to agents is wildly inefficient. The protocol works. The representation doesn't scale.

## What This Means in Practice

If you're building an agent with a handful of tools, none of this matters. The overhead is invisible and the reasoning is simple.

If you're building anything production-grade — an agent that needs to interact with multiple systems, handle complex workflows, or operate within cost constraints — the token tax is a real architectural concern.

Here's what I've been doing with JARVIS:

**Constraining the tool surface.** Not every tool needs to be available for every task. I define tool subsets per workflow — the content pipeline gets content tools, the financial review gets finance tools. The agent never sees tools it doesn't need for the current task.

**Pre-packaging workflows as skills.** Instead of giving the agent 8 raw tools and asking it to figure out the sequence, I bundle common sequences into single skills. A "schedule post" skill replaces separate calls to draft, format, upload image, and push to Buffer. One skill, one invocation, one set of parameters.

**Caching tool definitions.** For tools that don't change between sessions, I cache the schema rather than re-fetching it every time. This doesn't reduce the context window cost, but it eliminates the latency of rediscovery.

These are workarounds, not solutions. The protocol itself will need to evolve — dynamic tool loading, compressed schemas, or the code-based approach Anthropic prototyped. But for now, the workarounds keep costs manageable.

## The Bigger Picture

MCP's token cost problem isn't a dealbreaker. It's a growing pain. The same kind USB-C had with confusing power delivery specs and inconsistent cable quality in its first few years.

The standard won. The ecosystem is building on it. The inefficiencies will get optimized — they always do when there's enough economic pressure and the foundation is solid.

But if you're building with MCP today, understand the cost model. Know that every tool you add isn't just a capability — it's a tax on every interaction. Design accordingly.

Next week: [Part 2 covers the security surface](/blog/2026-03-14-mcp-security/) — what happened when the security community finally turned its attention to the protocol everyone adopted.

---

*This is Part 1 of a 3-part series on MCP in production. [Part 2: The Security Surface](/blog/2026-03-14-mcp-security/) | [Part 3: Deterministic Flows](/blog/2026-03-20-mcp-deterministic-flows/)*
