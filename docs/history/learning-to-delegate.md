# Learning to Delegate

A reflection on what it has meant to be a software engineer on this
project — building a design system, auditing it, and migrating a client
to it — while AI did most of the actual implementation. Sixth entry in
the `history/` series, and the first one that's about me rather than
about the work.

The previous entries documented what got built, when, and why. This one
documents the role I've been quietly shifting into. The shift didn't
happen on a single date or with a single tool. It accumulated. By the
time I noticed it had happened, I was a different kind of engineer than
the one who started this project, doing a job that didn't exist when I
learned to code.

## Where I started

I came into this project as someone who writes the code. Not as a
manager of other engineers, not as a designer dispatching specs, not as
an architect drawing boxes for someone else to fill in. Two prior years
of frontend internship work and a CS major at Michigan had shaped a
clear self-image: I am the person at the keyboard. My job is to turn a
problem into a working interface. The model — Opus 4.5, then 4.6 — was
an extremely capable autocomplete with judgment. Useful, but always
secondary to my own typing.

That self-image survived the design-system build. It started getting
strained during the docs audit. By Phase 2 of the client migration it
was incoherent. By Phase 6 it was a costume.

I did not deliberately step out of it. The work pulled me out, one
phase at a time.

## The gradual arc

**The design system itself** — packaged components, tokens, docs — was
built mostly the old way. I knew exactly what each Button variant
should look like. I made the atomic decisions. The model wrote a lot of
the code, but the model was filling in implementations of decisions I
was making in real time. That's the role I had trained for. It felt
normal.

**The docs audit** was the first thing that didn't feel normal. I built
a `review-docs-app-ui` skill that walked through 62 pages and produced
findings I hadn't thought to look for. I built a `junhee` persona to
read the docs as a new team member would. I read those reviews. I
disagreed with some of them, accepted others, and watched a system
emerge that was producing observations I genuinely had not generated
myself. The work was no longer "me, with a tool." Some of it was
"a tool, with me reviewing."

**The migration harness** in Phase -1 was the first time I built
something whose entire purpose was to *not* require me. Six lanes of
infrastructure — `DS_CLIENT_USAGE.md`, the `ds-client-review` agent,
the `ds-client-constrained-execution` skill, the symlink scripts,
`AUTONOMOUS_PROTOCOL.md`. None of it was code that ran in production.
All of it was a frame that the actual migration code would be poured
into. That's a different kind of engineering — closer to how a manager
designs a team's process than how an engineer designs a feature. I
didn't have words for that at the time.

**The autonomous chain** through Phase 1–2 was where I first felt the
ground shift. Lanes ran overnight without me. I'd wake up, review three
PRs, merge two, ask for a revision on the third. The migration moved
forward at hours when I was asleep. I was no longer the engineer
implementing this; I was the reviewer of an implementation that some
*other* implementer — embodied as the autonomous routine — had
produced. The "other implementer" was AI, but the role I was occupying
relative to it had a name in human teams. I just hadn't said it yet.

**Pastiche**, when it cut over mid-Phase-3, made the role split
impossible to keep ignoring. Pastiche is a UI engineer. It also has a
designer in its head. When I invoke pastiche, I am dispatching a
small, opinionated team that knows the design system better than I do
in some respects and cares about the same things I care about. What
remained for me on a pastiche lane was: define the problem clearly
enough that the team could solve it. *Brief them*.

That's a product owner's job. It is not an engineer's job, not in the
sense I had trained for.

The shift was gradual. Each phase pushed one degree further. There is
no clean hinge. There is just the cumulative weight of having stopped
typing the implementation a long time ago and not having quite admitted
it to myself.

## What the model bump made visible

In the middle of Phase 2 the model bumped from Opus 4.6 to 4.7. I felt
the change immediately, though I couldn't name it for a few days.

4.6 was *creative*, for lack of a better word in either of my
languages. If I gave it an abstract task it would assume the missing
parts well. The plan would say "redesign the menu tab"; 4.6 would
generate a redesign that was opinionated, mostly right, and produced
a working surface I could critique in concrete terms after seeing it.
The places where it filled in gaps from its own judgment usually felt
like a senior teammate's intuition.

4.7 doesn't do this. 4.7 follows the plan exactly and respects what's
written. If the plan is missing a constraint, 4.7 produces something
literally consistent with the plan but missing the constraint. It does
not fill in.

My first reaction was that 4.7 was harder to work with. My second
reaction, which took longer to admit, was that 4.7 was *honest about
what I had not specified*. 4.6 had been quietly making product
decisions on my behalf, and they had usually been good enough that I
didn't notice. 4.7 surfaced every plan gap, every unstated assumption,
every implicit "and obviously this should also be true" — by failing
to do them.

I had been writing detailed plans. But I had not been reviewing them
carefully. I had been trusting that the model would close the loop on
ambiguity the way 4.6 used to. 4.7 doesn't close that loop. The
literalness was not a regression. It was a calibration: it made the
specification quality of my work visible.

This was the lesson I needed to learn the hardest, because the
solution was not technical. It was that **when I delegate to AI, my
job is not engineering. It is product ownership.** And I had been doing
it carelessly because the previous tool had been forgiving.

## The two roles, named

By Phase 4 I had stopped resisting the new shape and started leaning
into it. Two roles, both mine, both required:

### Product owner — per task

For each lane, the question is no longer "how do I implement this." It
is: **what does this thing need to be true to count as done?** What
copies must appear. What states must be covered. What is required, what
is optional, what is left to the implementer's judgment. What
constraints exist that aren't self-evident from the surrounding code.

I made the same mistake repeatedly through Phase 4 before it stuck:
when briefing pastiche, I would over-specify the implementation. I
would name atoms — "use Tabs with size lg" — when I should have named
the requirement — "the tab strip is the page's primary tap target on
mobile and needs to read as such." I would prescribe a token when I
should have described the visual hierarchy goal. Every time I did
this, pastiche either followed the prescription literally and missed
something better that would have emerged from the requirement, or
flagged a doubt because my prescription contradicted the FACT surface.

The lesson came slowly: **specifying *how* is engineering speech.
Specifying *what should be true* is product speech.** When I'm
dispatching to an implementer — whether human, autonomous chain, or
pastiche — I need to be in product speech. The implementer is the one
allowed to choose how. My job is to be unambiguous about what.

This was harder than it sounds. I had spent years training for the
opposite — describing implementations precisely. Describing requirements
precisely is a different muscle. I'm still building it.

### Harness engineer — at the system level

The other half of the job is what's actually left of "engineer" in the
old sense. Designing the harness, the testing infra, the execution
infra, the constraint docs, the review agents, the autonomous routines,
the symlink scripts that let the client consume WIP DS without a
registry roundtrip from a tunnel inside a military base. Writing
`AUTONOMOUS_PROTOCOL.md`. Splitting Mode C into C1 and C2 because
parallel terminals collide. Recognizing that `dev` had become a
serialization queue and codifying it.

This work doesn't run in production. It's the frame the production
work pours into. It's where my technical judgment goes — into the
shape of the whole system rather than into any one feature. It's
closer to how a senior architect designs a team's tooling than how an
engineer designs a screen.

This half of the job, I find, does *not* shrink as the implementation
half collapses into AI. If anything it grows. The better the
implementer, the more leverage there is in a well-designed harness
around it. PR #12, between Phase 2 and Phase 3, was nine days of pure
harness work that produced zero client code. Looking back, it was one
of the highest-leverage stretches of the entire project.

## Pastiche as the clearest instantiation

Pastiche didn't cause the role shift. It made the role shift
impossible to misread. By the time pastiche cut over, the shift had
already happened in fact; pastiche just made the vocabulary
unavoidable.

The honest analogy is that **pastiche is a UI-engineer intern**. It
knows the design system well, has good taste within the system's
conventions, can produce a polished first draft from a clear brief,
and gets confused or makes mistakes if the brief is ambiguous or
contradicts the codebase's prior art. It writes follow-up notes
("this surfaces a KNOWLEDGE gap") that it expects me to triage. It
needs review. It does not need a colleague typing alongside it.

The skill I'm developing on the migration is the skill of being the
person that intern reports to. That's a real skill, and it's not the
skill I started this project with. It's a skill I would have called
"non-engineering" two years ago. Now I think it's the engineering work
that is left.

Pastiche does not always produce a perfect UI. Polish iterations
happen on `dev` after the worktree merges, and the live session doing
the polish does not have FACT/KNOWLEDGE/WISDOM in its head. So polish
fixes can drift away from DS rules. I noted this as a possible
"hotfix pastiche" skill while I was writing the previous retro. Having
sat with it: I don't think it should be a skill. The volume is too
low (3–5 polish issues per phase, ~5–10 minutes each) and the cheaper
shape is procedural — a CLAUDE.md rule that says "during post-merge
polish on `dev`, run `pastiche-reviewer` against the diff before
committing." Reuses an existing agent, costs nothing to add, fixes the
"forgot to consult FACT" failure mode without spawning a new tool. If
volume scales — say I migrate a second client with weaker DS
conformance — promote it to a skill then. Not now.

## What I optimized for, and what I should have

Two honest critiques of how I actually executed this project. Both
about me, not about the tools.

**Plan-review laziness.** I wrote detailed plans. I did not review
them carefully before dispatching the implementer. Phase 6 alone
produced 17 lane issues; the migration's cumulative issue count
crossed a hundred. The volume was real — too many to read with full
attention if I also wanted to ship. But that framing is also a
defense, and I should be honest about which side of the tension
actually dominated.

I came up in a "ship fast, fix later" culture. Tesla's frontend team
ran that way and I took the philosophy with me. Combined with AI
making shipping cheap, the equilibrium I drifted to was: write the
plan, dispatch, fix what comes back on the next pass. That works
when the implementer is forgiving (4.6 era). It works less well
when the implementer is literal (4.7 era), because the plan gaps
that used to be filled in silently now ship as defects.

I don't think "ship fast, fix later" is wrong as a philosophy. I
think its calibration has to change when implementation cost
approaches zero. When AI is honest about what it was given, the
tax moves from typing code to writing specs, and the quality of
the specs becomes the quality of the output. I under-invested
there. The output was good enough that the under-investment was
usually invisible — but "usually invisible" is exactly how a bad
habit survives.

**The frontend knowledge I didn't close the gap on.** Pastiche's
reviewer, `vercel-react-best-practices`, and `toss-fe-review`
together flagged hundreds of small engineering observations across
P4–P6 — bundle implications of a particular import, rendering-
strategy choices that affected hydration cost, hooks-discipline
rules I hadn't internalized, build-graph patterns I couldn't
independently evaluate the tradeoff of. The honest read: I had a
once-in-a-career window to learn from those reviews, lane by lane,
by reading the suggestions slowly and internalizing the *why*. I
scanned them, accepted what felt correct, deferred what felt
expensive, and kept shipping.

The domain — frontend at the depth where build graph, render
strategy, and runtime cost meet — is exactly the domain I most
need to expand into. I was looking at it daily. I did not look
hard. To brief pastiche better in the future, and to evaluate its
output more rigorously, I need engineering knowledge I don't yet
have. I knew this and I had the material to fix it. I didn't.

The military framing makes this worse, not better. I have unusual
amounts of time at the unit. The reason to ship anything at all
in this period is to use the time to **expand the domain**, not
to maximize artifact count. Treating shipping volume as the metric
inverts the actual purpose. I drifted toward the wrong metric and
I should not pretend otherwise.

Both critiques are forms of the same mistake: optimizing for
output when the real value of this period was supposed to be
*intake* — absorbing what the system was telling me about specs,
about frontend craft, about my own gaps. AI took implementation
off my plate. The right response was to use the recovered time to
get better at the surrounding work. I used some of it that way.
Too much of it I used producing more output, because output is
what I trained myself to feel productive about.

I'm naming this here because without it the rest of the essay
reads as an arrival narrative — "I learned the new roles, I
executed them, the project worked." A truer version is that I
learned the shape of the new roles and executed them at maybe 60%
of what I could have. The missing 40% is the part where I should
have slowed down and learned from what the tools were trying to
teach me.

## What's left for me

If implementation is increasingly not my job, and harness design is,
and per-task product specification is, then the engineer I am is not
the engineer I started as. The change was not loud. I did not retrain.
I did not pivot. I just kept showing up and doing the next thing the
work needed, and the work increasingly needed me to do something
other than type.

What's left when AI does the implementation, in the shape this
project taught me:

- **Define the system.** Harness, infra, constraints, review agents,
  routines, deployment, gates. The frame that everything else runs in.
  This is where my code-writing instincts still live, and they have
  more leverage here than they ever did when I was writing features.
- **Define the task.** What must be true, in product terms, for each
  lane. Brief the implementer well enough that "good" is unambiguous
  and "wrong" is detectable. Stop reaching for code-shaped
  prescriptions when requirement-shaped ones are what the implementer
  needs.
- **Review.** The single bottleneck that does not parallelize is me
  looking at the rendered screen. `dev` as a serialization queue is
  not a workflow choice; it's the shape forced by being one human
  doing visual review in a project where parallel implementation is
  free. This is the part of the work that AI most clearly cannot
  replace, and I think it will stay that way for longer than the
  optimistic version of the AI-engineering story suggests.

Three things, none of them "implement features." Two of them I could
recognize as engineering work; the middle one I had to learn to take
seriously.

There is a temptation here to produce a generalization — *this is
what software engineering is becoming, this is what your job will be
in two years* — and I want to resist it. I have done one project
under one set of constraints with one model family and one design
system. The shape of my role on this project is not necessarily the
shape of the role anywhere else. What I can say is narrower:

> *On this project, in these conditions, I gradually became someone
> who designs systems and writes specs and reviews rendered screens,
> and stopped being someone who writes the implementation. The
> transition was not visible until the model character changed and
> stopped covering for me.*

That's a true statement about my last six months. I'll find out what
it generalizes to when I do the next project.

## A note on the constraint

I have been writing this code from a computer room inside a military
unit, accessed through a VSCode tunnel from off-duty hours. There is
no local development environment at the unit. The machine I
physically use is shared and not mine. The way I work — short
sessions, occasionally longer ones, autonomous routines for the days
I can't show up at all — is shaped by this.

I think the constraint is not incidental to the role shift. The
roles I've described — harness designer, product-spec author,
reviewer — are *exactly* the roles that survive a fragmented work
schedule. They are durable across interruptions. They produce
artifacts (docs, plans, briefs, reviews) that survive me being
offline. Implementation is the role most punished by interruption,
because state in your head decays the fastest. AI implementation is
exactly the part of the work that doesn't decay when I close the
laptop.

I would have arrived at the same role shift in a normal job, I
think. The constraint accelerated it. By the time I rejoin civilian
software engineering in April 2027, the role I'm walking into is
probably the role this project has been training me for, and the
muscles I've built — specifying clearly, designing harnesses,
reviewing carefully — are the ones the next phase of the industry
seems to be asking for.

I don't know if that's true. But it's the bet the last six months
have been, whether I named it as a bet or not.

---

The previous entries in this `history/` directory are about the
artifacts. This one is about the person who made them, and what he
became while the artifacts were being made. Both are real records.
Neither is the whole story. The whole story is that the artifacts and
the person changed shape in the same period, in response to the same
forces, and the changes were the same change seen from two sides. The
design system, the migration harness, the pastiche skill, and the
engineer who delivered them all converged on the same thing at the
same time: a kind of work where the human's job is to be unambiguous
about what should be true, and to design the system that turns "what
should be true" into running code, and to look carefully at what the
system produces. The implementation is no longer the work. The
implementation is the output.
