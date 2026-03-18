---
title: 'MCP Part 2: 30 CVEs in 60 Days'
date: '2026-03-14'
tags: ['ai', 'agents', 'mcp', 'security', 'engineering']
summary: '30 CVEs in 60 days. 38% of MCP servers have no authentication. And the SDK itself is an attack surface. Part 2 of the MCP series — the security story underneath the adoption story.'
---

## The Security Story Underneath

[Part 1](/blog/2026-03-06-mcp-standard/) covered how MCP won the standards war — 97 million monthly SDK downloads, every major player on board, donated to the Linux Foundation. The protocol that connects AI agents to everything.

What I didn't cover was what happened when the security community finally turned its attention to the thing everyone just adopted.

30 CVEs in 60 days. That's the number from January and February 2026.

## The Numbers

The raw scan data is sobering:

- **38% of scanned MCP servers have no authentication.** Not weak authentication. Not misconfigured authentication. None. Out of 560 servers scanned, 203 had no auth at all.
- **82% of implementations flagged for path traversal risk.** Across 2,614 MCP implementations reviewed by multiple research teams.
- **67% flagged for code injection risk.** Consistent across Endor Labs and Practical DevSecOps assessments.
- **~37% exposed to SSRF.** Microsoft's analysis of the MarkItDown integration surfaced latent server-side request forgery in over a third of servers.

These aren't theoretical vulnerabilities in contrived scenarios. These are real servers, running in production, connected to real AI agents that have access to real data.

## The Breach That Made It Real

In early 2026, a path traversal vulnerability in [Smithery.ai](https://www.gitguardian.com/) — one of the largest MCP server hosting platforms — compromised over 3,000 servers in a single incident. Thousands of API keys leaked. The attacker didn't need anything sophisticated. The vulnerability was a missing path validation on file access — the kind of bug that would fail a junior developer's code review.

Other exposed servers found during the same period:
- **ForexGPT:** 45 trading tools exposed without authentication
- **Sendit:** 131 tools exposed
- **Payram:** Payment processing endpoints with no auth

When your AI agent connects to a tool server, it trusts that server implicitly. If the server is compromised, your agent is compromised. And everything your agent has access to — files, APIs, credentials — is now accessible to the attacker.

## The SDK Is the Attack Surface

This is the part that actually got me.

Most security coverage focuses on bad implementations — insecure servers, missing auth, sloppy code. Fair enough. But two critical CVEs were filed against `@modelcontextprotocol/sdk` itself — the official TypeScript SDK that most MCP servers are built on.

**CVE-2026-0621** is a Regular Expression Denial of Service (ReDoS) vulnerability in the SDK's `UriTemplate` class. A nested quantifier in the `partToRegExp()` function means a crafted request can peg a server at 100% CPU utilization. One request. The server hangs. Every client connected to that server loses access.

This isn't a bug in someone's implementation. It's a bug in the foundation. Every server running `@modelcontextprotocol/sdk` version 1.25.1 or earlier is vulnerable. FastMCP alone — one of the most popular MCP server frameworks — sees over a million downloads daily.

**CVE-2025-6514** is worse: a critical CVSS 9.6 vulnerability in `mcp-remote` that enables arbitrary OS command execution when connecting to an untrusted server. Connect to the wrong server, run arbitrary commands on your machine.

Even Anthropic's own Git MCP server shipped with three medium-severity CVEs — path validation bypass, arbitrary repo creation, and file overwrite via `git_diff`. If Anthropic's own team ships MCP servers with security bugs, what does that tell us about the broader ecosystem?

## Why This Happened

MCP's security story follows a pattern that's almost cliché in technology adoption:

1. **Protocol designed for functionality.** MCP was built to solve the tool integration problem — and it does. Security was considered but not battle-tested.
2. **Adoption outpaces hardening.** 97 million monthly downloads. Enterprise deployments via Microsoft Copilot Studio and Azure AI Foundry. The ecosystem grew faster than the security infrastructure could mature.
3. **Security researchers arrive.** Once something is deployed at scale, the security community starts probing. eSentire, Endor Labs, GitGuardian, Palo Alto Unit 42, Microsoft, Red Hat — all published MCP security research in Q1 2026.
4. **The CVE wave hits.** 30 CVEs in 60 days. Not because MCP is uniquely insecure — because it's newly scrutinized at scale.

This is the same arc as Docker containers, Kubernetes, and OAuth. The security comes after adoption, not before. That's not ideal, but it's how the industry actually works.

## What I Changed in JARVIS

I've been hardening JARVIS's MCP connections since late February. Here's what I did:

**Pinned SDK versions.** No automatic updates on the SDK. I update manually after reviewing changelogs and checking for CVE patches. The ReDoS fix landed in v1.26.0 — I upgraded within 24 hours of the advisory.

**Auth on everything.** Every MCP server JARVIS connects to requires authentication. For self-hosted servers, that's API key auth with keys rotated monthly. For third-party servers, I verify their auth model before connecting.

**Network isolation.** MCP servers run in their own network segment. If a server is compromised, the blast radius is contained. The server can't reach JARVIS's other services or the host filesystem.

**Input validation at the agent level.** JARVIS validates tool responses before acting on them. If a tool returns unexpected data shapes or suspiciously large payloads, the response is logged and dropped.

**Minimal tool exposure.** This connects back to [Part 1's token cost argument](/blog/2026-03-06-mcp-standard/). Fewer tools means less attack surface AND lower token overhead. The incentives align: constrain the tool surface for both cost and security.

## The Uncomfortable Truth

MCP is going to get more secure. The Linux Foundation stewardship, the CVE response cycle, the security research attention — these are all positive signals. The protocol will harden.

But right now, in March 2026, MCP is in its "move fast and break things" phase while simultaneously being deployed in enterprise production. That gap between deployment maturity and security maturity is where incidents happen.

If you're building with MCP:
- Treat every MCP server as an untrusted network endpoint
- Pin your SDK versions and patch CVEs aggressively
- Audit the auth model of every server you connect to
- Assume compromise and design for containment

The protocol is sound. The ecosystem is maturing. But "maturing" means it isn't mature yet — and your agent's security posture can't wait for the ecosystem to catch up.

Next week: [Part 3 covers the reliability problem](/blog/2026-03-20-mcp-deterministic-flows/) — and why the most reliable part of my AI system is a bash script.

---

*This is Part 2 of a 3-part series on MCP in production. [Part 1: The Token Cost](/blog/2026-03-06-mcp-standard/) | [Part 3: Deterministic Flows](/blog/2026-03-20-mcp-deterministic-flows/)*
