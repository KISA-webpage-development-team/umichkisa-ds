idea 1: yep, this is a really good finding.
r1 and r2 are mostly reading the same wisdom and fact.
so we can pause r1 implementer and wait for r1 reviewer
then resume with reviewer's output
this will save tokens.
but need to prevent implementer not to be biased on it's r1 implementation.


idea 2: tbh not sure
think about how reviewer collects the atoms that are in diff.
how it know that the code is 'atom'? that's based on full reading of fact.
fact is not that heavy doc. reviewer should know whole category always.


idea 3: not sure
reading whole file might be necessary to grab the full context of
what's going on in the commented line.
not sure.


idea 4: ok
yeah...this might be a good idea. 
we already have a curated high-level sections on knowledge.md
honestly, it's better to provide a 'fixed but extendible' high level sections on knowledge.md template if we release this project.
UI/UX scenario has general sections so.
these can be used as a high-level index for implementer, dont' need to read a full file.
but also these can be used to fill in knowledge.md easily by first-time user on pastiche, setting up pastiche on their DS.

idea 5: prompt caching, yeah
I agree, but don't know how to do this hoenstly.
