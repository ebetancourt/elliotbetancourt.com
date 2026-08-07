---
title: 'Why Coding Agents Are the Exception — And What That Tells You About Every Other AI Use Case'
date: '2026-07-04'
tags: ['ai-in-practice', 'architecture', 'agents', 'consulting']
summary: 'Coding agents genuinely work. That success is becoming a dangerous data point.'
---

Coding agents work. Better than almost anything else in AI right now — and I don't mean in a "promising direction" way. Copilot, Claude Code, Devin: real productivity gains, measurable time savings, code that actually ships. The results are not hype.

I think that success is becoming a dangerous data point.

Here's the question I keep coming back to: why does it work so well there, and nowhere near as well everywhere else? It's not that the underlying models are better at code than at other things (though that's partly true). There's something structural going on — and once you see it, you can't unsee it.

Code is a formal language. I mean that in the precise sense: formal grammar, deterministic evaluation, no ambiguity about what "correct" means at the syntactic level. You write a function, you run it, and seconds later you know if it worked. The feedback loop is tight enough that an agent can try ten approaches, discard nine, and ship the one that passed — all before you finish your coffee. Test suites give you regression detection without requiring anyone's judgment. Compilation errors are precise and actionable: "undefined variable on line 42" isn't an opinion, it's a fact.

That's a remarkable set of properties when you think about what they enable. The agent doesn't need to be right on the first try. It just needs to iterate faster than a human would give up. Fast feedback plus automatic verification equals a system where model-centric optimization actually works — throw a better model at it, get a better result. The architecture makes sense.

Now compare that to almost any other domain you'd want to deploy an agent in.

A "correct email" has no grammar checker — not in the formal sense. You can check spelling and sentence structure, but whether it accomplishes what you actually need, whether it strikes the right tone for this particular client relationship at this particular moment in a negotiation, requires a human who understands the context to evaluate. And the feedback loop isn't seconds. It's days or weeks, and even then you're often reading tea leaves about whether the email had anything to do with the outcome.

A "correct strategy recommendation" is worse. The feedback loop is months, the causal chain is murky, and there's no pass/fail at the end — just a mix of factors you'll never fully untangle. A "correct hiring decision" takes years to know. A "correct customer interaction" might never be definitively knowable.

This is the thing I think the AI industry missed when it looked at coding agents and concluded "agents work, deploy agents everywhere."

The abstraction that broke was verification. Formal domains have automatic verification mechanisms — they're built into the domain itself, not bolted on afterward. Code either runs or it doesn't. SQL either returns the right rows or it doesn't. A medical billing code either passes validation or it doesn't. When verification is automatic and fast, you can build model-centric systems that self-correct through iteration. The model makes an attempt, the environment tells it whether that attempt was valid, the model tries again. That loop is what makes the magic work.

Outside formal territory, you don't have that loop. You have humans. And "human in the loop for verification" sounds like a reasonable safety measure until you realize it changes the entire architecture of what you're building. You're no longer building a system that gets smarter through iteration — you're building a workflow with an AI component that surfaces candidates for human judgment. That's valuable! But it's categorically different from what a coding agent is doing. You can't optimize it the same way. You can't measure it the same way. You can't trust it to self-correct the same way.

The dangerous pattern I keep seeing is teams mimicking agent architectures that work for code in domains where the fundamental properties just aren't there. They spend months tuning prompts and swapping models, trying to get the AI to be more reliable at producing "good" outputs — without ever asking whether "good" can be verified programmatically at all. When the system underperforms, they assume it's a model problem. Usually it isn't.

Before you deploy an agent system in a non-trivial domain, I think there are three questions that actually matter:

What is the formal verification mechanism? If the answer is "human review," that's not formal — that's a workflow. Which is fine, but be honest about it.

How fast does the feedback loop close? Coding agents iterate in seconds. If your feedback loop is days or months, you cannot build a system that self-corrects through iteration the way coding agents do. The architecture has to account for that.

Can errors be detected programmatically before they ship? If the answer is no, you need redundancy, escalation paths, and explicit human checkpoints — not just a smarter model.

If you can answer all three cleanly, you might be in territory where model-centric approaches work. If you can't, you're building something that is categorically harder than a coding agent, and it needs systems-level thinking: clear handoffs, explicit failure modes, verification steps designed into the workflow from the beginning.

This connects to something I've been writing about all week — the difference between model-centric AI and systems-level AI. Coding agents work because code happens to live in the narrow slice of the world where model-centric is valid: formal domain, fast feedback, automatic verification. Everything else needs the other framework. Not because AI is bad at those things, but because the environment doesn't give you the conditions that make self-correction possible.

The question isn't "what's the best model for this task?" It's "what's the verification mechanism?" Get that wrong and no model will save you.

That's the real lesson coding agents are teaching us — and most people are learning the wrong one.
