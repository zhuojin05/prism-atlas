# Prism — build brief for Claude Design

You are building an interactive web app called **Prism**. This brief is self-contained. A working reference implementation already exists as a single file, `prism.html`, which you can ask the user to attach if you want the exact copy, colours, and logic verbatim. Everything you need to rebuild it from scratch is below.

---

## 1. What Prism is, and why

High school shows students a small fixed set of subjects. Physics, chemistry, biology, maths, a couple of languages, history, art. Students reasonably conclude that these subjects, plus the handful of professions everyone can name, are the whole territory of what you can study. They arrive at university with no idea that materials science, geophysics, biophysics, computational linguistics, or synthetic biology exist. This is worse in less-developed education systems where guidance is thin.

Prism fixes the framing. The core insight is that the exciting fields are **combinations of the school subjects students already have**. Materials science is physics plus chemistry. Biochemistry is the chemistry of living things. Once a student sees fields as "take subject X, apply it to problem Y," the hidden world stops being an intimidating list and becomes something they can explore, and even predict.

The name Prism comes from the metaphor. A prism splits plain white light into a full spectrum. Prism the app splits a plain school subject into the spectrum of fields it feeds into.

**Audience.** Curious 15 to 17 year olds, and the older siblings, parents, or teachers helping them. Not university students. The tone must never feel like a careers-office form or a personality quiz.

**The one rule that matters most.** A tool that only reflects back what a student already likes is useless. The whole point is to widen horizons, so Prism must surface fields the student would never have considered, not just confirm their existing tastes. This shapes the recommendation engine in section 6.

---

## 2. Brand and visual identity

**Mood.** Dark, luminous, calm, and a little wondrous, like a star map or an observatory interface. It should feel intelligent and spacious, never gamified, never Buzzfeed, never neon-startup. Confidence through restraint.

**Logo.** A simple triangular prism with a few thin coloured rays fanning out of one edge (a spectrum). Pair it with the wordmark "Prism" in the display serif.

**Tagline.** "The hidden spectrum of what you can study." Alternate: "School shows you ten subjects. It hides a thousand fields."

**Palette.**
- Background: a deep ink navy, roughly a radial gradient from `#141d34` at the top-centre out to `#06090f` at the edges. Not pure black.
- Text: `#e9edf6` primary, `#9aa4bd` muted, `#5c6685` faint.
- Hairlines and borders: white at about 9% opacity.
- The ten subject colours below are the heart of the palette. Every field's colour is **mixed** from its parent subjects (average their RGB values). This colour-blend is the signature device of the whole product. Lean into it everywhere.

**The ten subject colours (RGB):**

| Subject | RGB | Hex |
|---|---|---|
| Mathematics | 139, 92, 246 | `#8b5cf6` |
| Physics | 59, 130, 246 | `#3b82f6` |
| Chemistry | 249, 115, 22 | `#f97316` |
| Biology | 34, 197, 94 | `#22c55e` |
| Earth Science | 214, 164, 72 | `#d6a448` |
| Computer Science | 34, 211, 238 | `#22d3ee` |
| Psychology | 244, 63, 94 | `#f43f5e` |
| History & Culture | 112, 182, 16 | `#70b610` |
| Economics & Politics | 183, 107, 158 | `#b76b9e` |
| Art & Design | 232, 121, 249 | `#e879f9` |

**Typography.** Display face **Fraunces** (a warm, high-contrast serif) used with restraint for headings, field names, and the wordmark. Body and UI face **Inter**. This pairing gives an encyclopedic, inviting feel against a clean modern interface. Keep the type scale deliberate.

**Signature element.** The colour-mixing made literal. On the map, a field's dot is the averaged colour of its parents. On a field's detail card, show the parent subjects as coloured chips plus a little bar that visually "adds up" to the field's colour. This is the thing the product should be remembered by.

**Motion.** Gentle. Nodes ease and scale in on first load. Soft hover glows. The detail panel slides in. Nothing frantic. Respect `prefers-reduced-motion` fully.

---

## 3. App structure

A fixed top navbar (about 56px tall, translucent dark, blurred) with the Prism logo on the left (returns home) and two links on the right: **Discover** and **Atlas**. Four views, switched client-side:

1. **Home** — the pitch and two entry points.
2. **Discover** — the slider quiz.
3. **Results** — the recommendations.
4. **Atlas** — the full interactive field map (full-bleed).

Home, Discover, and Results are normal scrolling pages inside an ~820px centred column. Atlas is full-bleed and fixed (no page scroll).

---

## 4. Home view

- A large serif headline, e.g. "School shows you ten subjects. It hides a thousand fields." with "thousand fields" in an italic accent colour.
- A sub-line explaining the prism metaphor in one or two plain sentences.
- Two buttons: a primary gradient button "Find fields for me" (to Discover) and a quieter "Explore the atlas" (to Atlas). The gradient runs across the full subject spectrum.
- A thin full-spectrum bar as a divider.
- A short reassuring note that nothing here is a test or a verdict, just doorways to be curious about.
- A three-step "how it works" row (answer sliders / get two kinds of fields / see them on the map).

---

## 5. Atlas view (the map)

This is the centrepiece. Structure carries meaning here, so do not use a generic force-directed hairball where everything floats equally.

**Layout.** The ten subjects sit as larger nodes evenly spaced around an **outer ring**. The 51 fields sit in the **interior**, each positioned near the subjects it is built from. The metaphor is deliberate: the fundamentals you already know are on the edge, and the unfamiliar combinations are built inward from them. Achieve the interior positions with a light force relaxation (fields repel each other and the subject nodes, and are pulled gently toward the centroid of their parent subjects). Precompute positions so the layout is stable, not perpetually jittering.

**Nodes.**
- Subject nodes: larger, filled with the subject colour, white ring, always labelled, soft glow.
- Field nodes: smaller, filled with the **averaged colour of their parents**, faint ring, labels hidden until hover or focus (this keeps the map from overwhelming a newcomer).
- Thin edges connect each field to each of its parent subjects, coloured by the parent, low opacity at rest.

**Interactions.**
- Hover a field: it enlarges, its label appears, its edges to its parents brighten.
- Click a field: open a right-side detail panel (bottom sheet on mobile) and dim everything except that field and its parents.
- Click a subject (or its legend chip): "focus mode." Every field built partly from that subject lights up, everything else dims, and the panel shows how many fields that subject touches. This is the anti-overwhelm mechanism and the "see everything physics touches" moment.
- A "Clear focus" control and clicking empty space both reset.

**Field detail card contents (four parts, in this order).** Avoid a textbook definition.
1. **What it is** — one plain sentence.
2. **What it's obsessed with** — the object or problem at its centre.
3. **On an ordinary Tuesday** — what a person in the field actually does that day. This is the line careers material always omits and the one that makes a field feel real. Never cut it.
4. **Did you know** — one surprising hook.
Plus the **Built from** section: coloured parent chips and the little colour-mix bar.

A subject's card is shorter: its colour, a one-line description, and a note pointing the student to follow the lines inward.

---

## 6. Discover view (the quiz) and the recommendation engine

**The quiz.** Two sections of sliders, each running 0 to 100 with the **middle (50) meaning "no strong feeling," which counts for nothing**. Only moved sliders carry signal. Label the ends.

- Part one, subject affinity: one slider per subject, "Dislike" to "Love." Familiar, low-friction entry. Weight these modestly, because a 15 year old rating "chemistry" is rating school chemistry, which is a weak signal for what the field becomes.
- Part two, disposition statements: sliders labelled "Not me" to "Very me." These carry most of the real signal. The statements are listed in section 7.

A "Show me some fields" button and a "Reset sliders" button.

**The trait space.** Scoring happens in a 16-dimension space: the 10 subjects plus 6 dispositions — `build`, `theory`, `small`, `large`, `people`, `hands`.

**Building the vectors.**
- Each field has a vector: weight 1.0 on each parent subject, plus the disposition weights listed in section 7. Normalise each field vector to unit length.
- The user's vector U: each subject slider value `s` adds `(s - 50) / 50` to that subject dimension. Each statement slider value `a` adds `(a - 50) / 50` times each of that statement's dimension weights. A slider left at 50 contributes zero.

**Scoring and the two zones.** This is the important part.
- `score(field) = dot(U, normalisedFieldVector)`. This can be negative, because a field loaded on a disliked dimension is penalised.
- Let `Uplus` be U with all negative values set to zero. `posAff(field) = dot(Uplus, normalisedFieldVector)`. This measures pull from the things the student *likes*, ignoring their dislikes.
- **Wheelhouse zone:** the top 5 fields by `score`. Fields squarely aligned with what they said.
- **Stretch zone:** from the remaining fields, sorted by `posAff` descending, prefer the ones where `posAff - score > 0.05`. That gap means a disliked dimension is the main thing dragging the field down. Take 3. For each, find the **culprit dimension**: the dimension the student rated negative that the field leans on most, and name it in the copy ("it does lean on maths more than you rated"). Also name the positive dimension that connects them ("people drawn to living things often fall for this"). If the student expressed no dislikes at all, there is no drag story, so fall back to the next-best `posAff` fields with gentler "one step further out" adjacency copy.

The stretch zone is the horizon-widening half and the reason Prism exists. It only produces its best results when students are willing to say what they are *not* into, so consider making one or two disposition statements deliberately polarising.

**Results view.** Two labelled zones, "In your wheelhouse" and "One step outside." Each field is a card: name in the field's mixed colour, the one-line "what it is," and for wheelhouse cards a few matched-interest tags, for stretch cards the "why it might surprise you" line. A card left-border in the field's colour. Clicking any card jumps to the Atlas with that field selected and lit up. Include a "Retake" button and a plain disclaimer that this is a hand-built compass, not a scientific test, and that a surprising result is an invitation to go read, not a judgement.

**Friendly labels** for the trait dimensions, for use in results copy: math → "maths", phys → "physics", chem → "chemistry", bio → "biology", earth → "the planet", cs → "computing", psych → "psychology", historyculture → "history and culture", econpol → "economics and politics", art → "art & design", build → "making things", theory → "understanding why", small → "the very small", large → "the very big", people → "helping people", hands → "hands-on work".

---

## 6a. Slider feel (already built in the reference file, keep it)

The sliders are meant to be physically satisfying for a teenager, not just functional. Preserve all of this on any rebuild.

- **Colour.** Each subject slider is tinted with its own subject colour. As the handle moves from "Dislike" toward "Love", the fill and the handle go from dim and desaturated to vivid and bright, with a soft glow that grows with the value. The part-two disposition sliders do the same across a spectrum of hues. Implement the fill as a live linear-gradient the JS updates on input, and drive the handle colour and glow with CSS custom properties (`--thumb`, `--glow`). The handle scales up slightly while grabbed.
- **Sound.** Pressing and holding a slider starts a sustained, ethereal, reverberant chord pad, like a soft space organ. While the handle is held, dragging it up makes the chord bloom: the loudness swells, a lowpass filter opens so it brightens, and higher voices fade into the chord one by one so it grows richer toward "Love." Releasing the handle lets the chord ring out and fade slowly. Each slider is tuned to a different note of one shared major-pentatonic scale, so sweeping across all of them plays a consonant progression and the whole quiz behaves like a small playable instrument. It is fully synthesised with the Web Audio API (detuned triangle and sine oscillators stacked in a wide chord, through a lowpass, into a convolution reverb built from a generated noise impulse). No audio files. Kept quiet, started only after the first touch (browser autoplay rules), with a "Sound on/off" toggle in the quiz header.
- **Haptics.** A light `navigator.vibrate` tap on each meaningful move and a slightly longer one on release, wrapped in a feature check so it silently does nothing on unsupported devices (most notably iOS Safari).
- **Reduced motion and comfort.** Respect `prefers-reduced-motion` for the visual animation. Keep the audio subtle and never blocking, and make sure the toggle genuinely silences it.
- **Results and Atlas polish (also built in the reference file).** Each suggested field card on the Results page carries a soft background glow in that field's mixed colour (a coloured drop-shadow plus a faint radial tint), which intensifies on hover. Hovering a card, or hovering a node on the Atlas, plays a very quiet magical chime tuned to a note of the same shared scale as the sliders (subjects an octave up, fields sparklier), rate-limited so sweeping across the map stays gentle. Clicking a node or a card plays a soft, tactile press, a damped low thump with a brief filtered-noise texture underneath (the feel of a satisfying membrane key bottoming out, not a mechanical click) plus a faint high shimmer that ties it back to the hover chime and the pad, as the detail sidebar slides in. Avoid anything with a frequency sweep or a "transition" quality (whooshes, swooshes); the sound should read as a confirming press of the thing just tapped, not as an atmospheric effect. All of it runs through the same reverb bus as the pad and obeys the same on/off toggle. Because audio needs a user gesture to begin, the context is woken on the first click anywhere, so hover sounds are live by the time a student reaches the map.

---

## 6b. Export a prompt for an LLM (already built in the reference file, keep it)

On the Results page, a "Continue this with an AI" button opens a modal containing a fully-written, ready-to-copy prompt the student can paste into ChatGPT, Claude, Gemini, or any other AI chat assistant. This lets the student go deeper than Prism itself can, in their own words, using an AI they already have access to. A "Copy prompt" button copies it to the clipboard (with a manual-select fallback for contexts where clipboard access is blocked).

**What the prompt must contain**, generated live from that student's actual quiz results, not a generic template:
- A short framing that the student is 15 to 17, used Prism, and wants a warm guide rather than someone pushing a decision.
- The wheelhouse fields (name plus the one-line "what it is").
- The stretch fields (name, one-line "what it is," and the same wheelhouse-vs-stretch reasoning already shown on that student's results card, including which disliked dimension is holding it back). Reuse the exact reasoning text so the exported prompt never contradicts what the student already saw on screen.
- A short "a bit about me" block built from whichever sliders were actually moved: subjects rated 70+ ("enjoy"), subjects rated 30 or below ("not drawn to"), and the same thresholds for the disposition statements, phrased in the statement's own words. If nothing was moved far enough to qualify, fall back to one honest line saying the student left most sliders near the middle.
- Explicit instructions asking the receiving AI to help the student go deeper on 2 to 3 fields and to recommend real YouTube videos or channels that explain those fields in an accessible, human way (day-in-the-life content, good explainers, general-audience talks), rather than dry lectures.

**The one non-negotiable design rule: guard against hallucinated links.** Different AI assistants the student pastes this into will have different capabilities, some can browse or search, many cannot. A prompt that just asks for "YouTube videos" will cause a model without browsing to confidently invent fake video titles and URLs, which is worse than giving nothing, especially to a teenager who has no reason to doubt it. The exported prompt must explicitly branch on this: if the receiving assistant can search or browse, it should look up and give real, specific titles or links; if it cannot, it must not invent specific titles or links, and should instead name real, well-known channels or creators covering that kind of content and suggest good search terms, while telling the student that's what it's doing. Preserve this instruction word for word in spirit if you rewrite the prompt template. Do not remove it to make the copy shorter.

**Framing and tone requirements for the exported prompt text itself:**
- Plain, first-person, written as if the student is speaking to the AI.
- Never implies the student must decide anything now. Explicitly says this is exploration, and that the results came from a self-guided tool, not a formal assessment.
- Ends by explicitly inviting the AI to ask the student clarifying questions rather than dumping information on every field at once.

Keep this simple. Do not build curated video databases, do not attempt to fetch or verify YouTube links yourselves at generation time, and do not add deep-link buttons to specific AI products (their URL schemes change and don't reliably support prefilled text). The entire feature is: build one well-written, well-guarded text prompt from data already on the page, show it in a copyable box, done.



### Subjects (with one-line descriptions)

- **Mathematics** — the language everything else is written in. Pattern, structure, and proof.
- **Physics** — the rules the universe runs on, from atoms to galaxies.
- **Chemistry** — what everything is made of, and how it rearranges.
- **Biology** — how living things work, from single molecules to whole ecosystems.
- **Earth Science** — the planet itself. Rocks, oceans, atmosphere, and deep time.
- **Computer Science** — how to compute, store, and reason with information.
- **Psychology** — how individuals think, feel, perceive, and behave.
- **History & Culture** — the human past, and how cultures and societies actually lived and left their mark.
- **Economics & Politics** — how markets, institutions, and governments make decisions, and who that affects.
- **Art & Design** — making things that communicate, move people, or get used.

### Disposition statements (with dimension weights; negative weights allowed)

1. "I like taking things apart to see how they work." → build 0.7, hands 0.6
2. "I'd rather invent something new than study something that already exists." → build 0.8, theory −0.3
3. "Living things fascinate me, how bodies, cells, or ecosystems work." → bio 0.9, small 0.2
4. "I like working with my hands, in a lab or a workshop." → hands 0.9, build 0.3
5. "I want my work to help people in a direct, visible way." → people 0.9, psychology 0.15, economics and politics 0.15
6. "I love reading, writing, arguments, and questions about society." → economics and politics 0.45, history and culture 0.45, theory 0.3, art 0.2
7. "I'm drawn to the very big, space, oceans, climate, whole populations." → large 0.9
8. "I'm drawn to the very small, atoms, molecules, cells, lines of code." → small 0.9
9. "I like computers and the idea of programming." → cs 0.9, theory 0.2
10. "I care how things look and feel, not just whether they work." → art 0.9, build 0.2
11. "I'm comfortable leaning on a lot of maths." → math 0.9, theory 0.4

### The 51 fields

Format: **Name** — parents — disposition weights. Then the four card lines.

1. **Materials Science** — Physics + Chemistry — build 0.8, hands 0.7, small 0.4
   - What: Why stuff behaves the way it does, and how to invent stuff that behaves better.
   - Obsessed: What makes something strong, bendy, transparent, or able to survive a rocket launch.
   - Tuesday: Stretching a new alloy or plastic in a machine until it snaps, and measuring exactly when and why.
   - Did you know: Spider silk is tougher for its weight than steel. A lot of the field is chasing materials nature already figured out.

2. **Biochemistry** — Chemistry + Biology — small 0.7, hands 0.5
   - What: Chemistry, except the reactions are happening inside living things.
   - Obsessed: The molecular machines that keep a cell alive, and what happens when one breaks.
   - Tuesday: Purifying a single protein out of a cell and watching what it does in a tube.
   - Did you know: Your body runs thousands of chemical reactions every second. Most drugs work by jamming exactly one of them.

3. **Biophysics** — Physics + Biology — small 0.7, theory 0.5, hands 0.4
   - What: Using the tools of physics to ask how life holds itself together.
   - Obsessed: The forces, energy, and motion inside a single living cell.
   - Tuesday: Using focused lasers to grab one molecule and measure how hard it pulls.
   - Did you know: A cell isn't a bag of soup. It sorts itself into droplets, like oil in water, and that turns out to be a physics problem.

4. **Geophysics** — Physics + Earth Science — large 0.8, theory 0.4
   - What: Physics aimed at the entire planet.
   - Obsessed: What the Earth is doing thousands of kilometres beneath your feet.
   - Tuesday: Reading earthquake signals to map the inside of the planet, the way an ultrasound maps a body.
   - Did you know: We've never drilled even close to the centre of the Earth. Almost everything we know about the inside comes from listening to it shake.

5. **Astrophysics** — Physics + Mathematics — large 0.9, theory 0.8
   - What: The physics of everything that isn't Earth.
   - Obsessed: How stars, galaxies, and black holes actually work.
   - Tuesday: Writing code to simulate a dying star, or sifting telescope data for one faint signal.
   - Did you know: The gold in a ring was forged in the collision of two neutron stars, long before the Sun existed.

6. **Aerospace Engineering** — Physics + Mathematics — build 0.9, large 0.4
   - What: Making things fly, and not fall out of the sky.
   - Obsessed: How air moves over a wing, and how to survive going very fast.
   - Tuesday: Running a wing shape through a simulated windstorm to shave off drag.
   - Did you know: A wing doesn't get sucked upward. It bends the air downward, and the air pushes back. Newton, basically.

7. **Civil & Structural Engineering** — Physics + Mathematics + Earth Science — build 0.9, large 0.5, people 0.3
   - What: Designing the built world so that it stays standing.
   - Obsessed: How much a bridge, tower, or tunnel can take before it fails.
   - Tuesday: Calculating whether a beam will hold, then checking what an earthquake would do to it.
   - Did you know: Every structure is designed to bend a little. A skyscraper that couldn't sway in the wind would crack.

8. **Bioinformatics** — Biology + Computer Science — small 0.6, theory 0.5
   - What: Reading biology as data, at a scale no human could manage by hand.
   - Obsessed: Finding the one meaningful pattern inside billions of letters of DNA.
   - Tuesday: Writing code to compare thousands of genomes and spot the mutation behind a disease.
   - Did you know: Your genome is about 3 billion letters. Printed out, it would fill a stack of books taller than a house.

9. **Machine Learning & AI** — Computer Science + Mathematics — theory 0.6, build 0.4
   - What: Building systems that learn patterns from examples instead of being told the rules.
   - Obsessed: How to make a machine get better at something the more data it sees.
   - Tuesday: Feeding a model examples, watching it fail, and adjusting until it stops failing.
   - Did you know: Nobody handed a language model a grammar book. It learned grammar by reading, the way you did as a small child, just faster.

10. **Robotics** — Computer Science + Physics — build 0.9, hands 0.6
    - What: Giving machines a body and teaching them to use it.
    - Obsessed: How a machine senses the world and moves through it without breaking things.
    - Tuesday: Debugging why the arm keeps missing the object by two centimetres.
    - Did you know: Walking is one of the hardest things to teach a robot. You do it without thinking. A robot has to solve physics every step.

11. **Neuroscience** — Biology + Physics + Psychology — small 0.6, theory 0.4
    - What: Figuring out how a lump of tissue produces thoughts, memory, and you.
    - Obsessed: How signals move through the brain and turn into experience.
    - Tuesday: Recording the electrical chatter of neurons while an animal makes a decision.
    - Did you know: Your brain uses about as much power as a dim lightbulb to do things no supercomputer can match.

12. **Cognitive Science** — Psychology + Computer Science + Mathematics — theory 0.7
    - What: Reverse-engineering the mind by borrowing from several fields at once.
    - Obsessed: What thinking actually is, in humans and in machines.
    - Tuesday: Designing an experiment to catch the mind making a predictable mistake.
    - Did you know: The same illusions that fool your eyes can fool AI systems. Studying both together says something about thought itself.

13. **Computational Linguistics** — Psychology + Computer Science + Mathematics — theory 0.5, small 0.3
    - What: Teaching machines to handle human language, and using machines to understand it.
    - Obsessed: How meaning gets built out of sound, words, and structure.
    - Tuesday: Building a model that can tell whether two sentences mean the same thing.
    - Did you know: Every language on Earth follows deep hidden rules its own speakers can't explain. This field tries to write them down.

14. **Environmental Science** — Biology + Chemistry + Earth Science — large 0.7, people 0.5, hands 0.4
    - What: How living things and their surroundings affect each other.
    - Obsessed: How pollution, climate, and ecosystems interact, and how to undo the damage.
    - Tuesday: Testing a river's water chemistry to trace where a contaminant came from.
    - Did you know: A single teaspoon of healthy soil holds more living organisms than there are people on Earth.

15. **Oceanography** — Earth Science + Physics + Biology — large 0.9, hands 0.4
    - What: The ocean as a giant, moving, living system.
    - Obsessed: How currents, chemistry, and sea life shape the whole planet.
    - Tuesday: Dropping instruments kilometres deep and reading what they send back up.
    - Did you know: The ocean produces more than half the oxygen you breathe, mostly from microscopic drifting plants.

16. **Climate Science** — Physics + Earth Science + Mathematics — large 0.9, theory 0.5, people 0.4
    - What: The whole atmosphere and ocean, treated as one enormous physics problem.
    - Obsessed: How energy moves through the planet's air and water, and where it's heading.
    - Tuesday: Running a climate simulation and comparing it against a century of real measurements.
    - Did you know: The models that predict next century are tested by making them "predict" the past, which we already have the answer to.

17. **Synthetic Biology** — Biology + Chemistry + Computer Science — build 0.7, small 0.6, hands 0.4
    - What: Treating living cells like machines you can reprogram.
    - Obsessed: Rewriting DNA to make cells do useful new things.
    - Tuesday: Designing a stretch of genetic code, then checking whether the bacteria actually build what you wanted.
    - Did you know: Some of the insulin diabetics depend on is made by bacteria reprogrammed to produce a human protein.

18. **Nanotechnology** — Physics + Chemistry — small 0.9, hands 0.5, build 0.4
    - What: Engineering at the scale of individual molecules.
    - Obsessed: How materials change when you make them almost unimaginably small.
    - Tuesday: Arranging atoms into a structure, then imaging it with a microscope that "feels" surfaces.
    - Did you know: Gold is gold-coloured only in bulk. Shrink it to nanoparticles and it turns red, or purple, depending on the size.

19. **Design Engineering** — Physics + Art & Design + Computer Science — build 0.9, people 0.5, hands 0.4
    - What: Where making things work meets making things people actually want to use.
    - Obsessed: Turning a real human problem into a real object or system.
    - Tuesday: Sketching a product, building a rough prototype, and testing it on the people it's for.
    - Did you know: Good design is invisible. You never notice a door handle that just works. You always notice the one you push when you should pull.

20. **Architecture** — Art & Design + Physics + Psychology — build 0.7, people 0.6, hands 0.3
    - What: Designing the spaces people live, work, and gather in.
    - Obsessed: How a building shapes the way people feel and behave inside it.
    - Tuesday: Balancing a beautiful idea against gravity, budget, and building codes.
    - Did you know: The layout of a hospital corridor can measurably change how quickly patients recover.

21. **Archaeology** — History & Culture + Chemistry + Earth Science — hands 0.6, people 0.4
    - What: Reconstructing the human past from what it left behind.
    - Obsessed: How people lived thousands of years before anyone wrote it down.
    - Tuesday: Dating a fragment of bone by its chemistry, or mapping a buried site with ground radar.
    - Did you know: Modern archaeology reads ancient diets from tooth chemistry, and finds lost cities from scans taken by aircraft.

22. **Forensic Science** — Chemistry + Biology — hands 0.7, people 0.5, small 0.3
    - What: Using science to reconstruct what happened at a crime scene.
    - Obsessed: What physical traces can, and importantly can't, prove.
    - Tuesday: Matching a DNA sample, or working out how a stain ended up where it is.
    - Did you know: The real work looks nothing like the TV version. A single reliable result can take days, not a dramatic minute.

23. **Quantum Computing** — Physics + Computer Science + Mathematics — theory 0.9, small 0.6
    - What: Building computers that run on the strange rules of the very small.
    - Obsessed: Using quantum weirdness to solve problems ordinary computers never could.
    - Tuesday: Fighting to keep a fragile quantum state alive for a few more microseconds.
    - Did you know: A quantum bit can be 0 and 1 at the same time. Chain enough together and some impossible calculations become possible.

24. **Epidemiology** — Biology + Mathematics — large 0.7, people 0.8, theory 0.4
    - What: The science of how disease moves through a population.
    - Obsessed: Why some outbreaks fizzle out and others explode.
    - Tuesday: Building a model of a spreading illness to predict where it goes next.
    - Did you know: Every pandemic dashboard and "flatten the curve" graph came out of this field.

25. **Biomedical Engineering** — Biology + Physics + Computer Science — build 0.8, people 0.7, hands 0.5
    - What: Engineering, pointed straight at the human body.
    - Obsessed: Building devices that repair, replace, or read the body.
    - Tuesday: Testing whether an artificial joint or a new sensor holds up to real use.
    - Did you know: Some prosthetic limbs now wire into nerves, so the person can move them just by thinking.

26. **Soft Matter Physics** — Physics + Chemistry — small 0.7, theory 0.6, hands 0.4
    - What: The physics of squishy, in-between things.
    - Obsessed: Gels, foams, liquid crystals, and the goo inside your cells.
    - Tuesday: Watching how a droplet forms, flows, or falls apart under a microscope.
    - Did you know: Your phone screen, mayonnaise, and the inside of a cell are all "soft matter," governed by the same physics.

27. **Systems Biology** — Biology + Mathematics + Computer Science — theory 0.7, small 0.5
    - What: Studying life as a network instead of one part at a time.
    - Obsessed: How thousands of molecules interact to keep a cell working.
    - Tuesday: Modelling a web of genes to predict what happens if you switch one of them off.
    - Did you know: Knowing every part of a cell isn't enough, the same way knowing every word doesn't tell you the plot. The connections are the story.

28. **Data Science** — Mathematics + Computer Science — theory 0.5, people 0.3
    - What: Pulling real answers out of messy piles of data.
    - Obsessed: The signal hiding inside the noise.
    - Tuesday: Cleaning a broken dataset, then finding the one pattern that actually matters.
    - Did you know: The hardest part is almost never the maths. It's realising the data is quietly lying to you.

29. **Quantitative Economics** — Mathematics + Economics & Politics + Computer Science — theory 0.6, people 0.6, large 0.5
    - What: How people, money, and choices behave, studied with hard numbers.
    - Obsessed: Why markets, incentives, and decisions play out the way they do.
    - Tuesday: Testing an idea about human behaviour against millions of real transactions.
    - Did you know: A lot of modern economics is closer to physics than to business, full of equations about how people react.

30. **Earth Systems & Geology** — Earth Science + Chemistry + Biology — large 0.7, hands 0.6, theory 0.3
    - What: Reading the planet's history and machinery straight from its rocks.
    - Obsessed: How the Earth built itself, and how it keeps changing.
    - Tuesday: Slicing a rock thin enough to see through, then reading its story under a microscope.
    - Did you know: There are rocks on Earth older than 4 billion years, formed before there was any oxygen in the air.

31. **Acoustics & Music Technology** — Physics + Art & Design + Computer Science — build 0.6, hands 0.4
    - What: The science and engineering of sound.
    - Obsessed: How sound is made, shaped, and heard.
    - Tuesday: Tuning the acoustics of a room, or building software that generates and cleans up audio.
    - Did you know: A concert hall is engineered as carefully as a bridge. Move one wall a few metres and the music changes.

32. **Game Design** — Computer Science + Art & Design + Psychology — build 0.8, people 0.5
    - What: Building interactive worlds and the rules that make them fun.
    - Obsessed: What makes a system feel challenging, fair, and worth coming back to.
    - Tuesday: Changing one rule, then watching real players to see if it got more fun or less.
    - Did you know: "Fun" is a design problem you can actually study. A small change to the rules can make a game addictive or unplayable.

33. **Computational & Theoretical Chemistry** — Mathematics + Chemistry — theory 0.8, small 0.6
    - What: Predicting how molecules behave and react using physics and mathematics, before or instead of testing them in a lab.
    - Obsessed: What's actually happening to electrons and atoms during a reaction, at a speed and scale too fast and too small to watch directly.
    - Tuesday: Running a simulation of a molecule's structure and energy, then checking the prediction against what a real experiment measures.
    - Did you know: The 2013 Nobel Prize in Chemistry went to methods for simulating chemical reactions on a computer accurately enough to actually trust.

34. **Cheminformatics & Computational Drug Discovery** — Chemistry + Computer Science — theory 0.5, small 0.6
    - What: Searching, comparing, and predicting how molecules behave using computers, especially as candidate medicines.
    - Obsessed: Which of millions of possible molecules is actually worth the time and cost of making and testing for real.
    - Tuesday: Running a virtual screen of thousands of compounds against a target protein, then ranking which ones deserve a real synthesis and test.
    - Did you know: Most new drug candidates are now tested first inside a computer, against a protein shape that was itself predicted by software rather than measured in a lab.

35. **Geoinformatics & Remote Sensing** — Earth Science + Computer Science — large 0.7, theory 0.5
    - What: Turning satellite images and sensor data into maps of what's actually happening to the planet's surface.
    - Obsessed: How a forest, a coastline, or a city is changing, measured from orbit rather than by walking the ground.
    - Tuesday: Writing code to pull deforestation, flooding, or ice loss out of years of raw satellite imagery.
    - Did you know: Most of what we know about how fast Antarctic ice is disappearing comes from satellites quietly measuring it from space, not people standing on the ice.

36. **Art Conservation & Heritage Science** — Chemistry + Art & Design — hands 0.7, small 0.3
    - What: Using chemistry and careful physical work to analyse, preserve, and restore paintings, sculptures, and historical objects.
    - Obsessed: What a damaged or ageing object is actually made of, and how to stop it decaying further without erasing its history.
    - Tuesday: Testing a tiny paint sample under different light and chemical analysis to work out what pigments an artist actually used centuries ago.
    - Did you know: X-ray and infrared scans have revealed entire hidden paintings underneath famous ones, drafts the artist painted over and never meant anyone to see.

37. **Scientific Illustration & Visualization** — Biology + Art & Design — hands 0.6, people 0.3
    - What: Drawing and designing images that make science, especially living things, understandable at a glance.
    - Obsessed: How to show something true and precise about biology, a cell, a body, an ecosystem, in a way that's also genuinely beautiful.
    - Tuesday: Sketching an organ or organism from multiple references, then refining the drawing until it's both anatomically accurate and clear to someone with no science background.
    - Did you know: Long before photography could capture it, illustrators were the only reason anyone could see what the inside of a cell or a dissected animal actually looked like, and textbooks still lean on drawings over photos for a lot of biology.

38. **Computational & Generative Design** — Mathematics + Art & Design — build 0.7, theory 0.4
    - What: Using mathematical rules and algorithms to generate shapes, patterns, and structures, rather than drawing them by hand one at a time.
    - Obsessed: What happens when you describe a design as a rule or an equation instead of a fixed picture, and let a computer explore the possibilities.
    - Tuesday: Writing a small program that generates hundreds of variations of a pattern or structure, then picking and refining the ones that actually work.
    - Did you know: Some modern buildings and sculptures were never fully drawn by a human. They were grown from a mathematical rule, then checked and adjusted by a designer.

39. **Political Science & Political Psychology** — Psychology + Economics & Politics — theory 0.5, people 0.6, large 0.4
    - What: Studying how power actually works, who has it, how they keep it, and why people vote, protest, or obey the way they do.
    - Obsessed: The gap between how a government or institution is supposed to work on paper and how it actually behaves under pressure.
    - Tuesday: Building a model of voter behaviour from polling data, or picking apart why a policy that looked good on paper failed in practice.
    - Did you know: Small changes in ballot design alone can shift an election's outcome. People vote differently depending on where a candidate's name sits on the page.

40. **Computational Social Science** — Economics & Politics + Computer Science + Mathematics — theory 0.6, large 0.5
    - What: Using data, networks, and computation to study how opinions, movements, and behaviour actually spread through real populations.
    - Obsessed: Why some ideas go viral and others vanish, traced through the actual structure of who talks to whom.
    - Tuesday: Mapping a social network from millions of posts, then modelling how a rumour or a policy idea moves through it.
    - Did you know: Some of the clearest evidence for how fast misinformation spreads came from watching ideas move through social networks the same way real epidemics move through a population.

41. **Technology Ethics & Policy** — Computer Science + Economics & Politics — theory 0.5, people 0.4
    - What: Working out how to govern something that changes faster than the laws meant to regulate it.
    - Obsessed: Who is accountable when an algorithm makes a decision that harms someone, and how you'd even prove it.
    - Tuesday: Reading a proposed AI regulation and stress-testing it against a real, messy case it would actually have to handle.
    - Did you know: Several countries have written laws about self-driving cars and facial recognition before those technologies were fully built, betting on what the technology would become.

42. **Biological & Evolutionary Anthropology** — Biology + History & Culture — hands 0.5, theory 0.4
    - What: Studying human evolution and diversity through bones, genes, and the biology of what makes us human.
    - Obsessed: What a single fossil or bone fragment can prove, and just as often, what it can't.
    - Tuesday: Measuring a fossil skull to work out which species it belongs to, or comparing ancient DNA across populations.
    - Did you know: Most people alive today carry a small percentage of Neanderthal DNA, evidence of interbreeding that happened tens of thousands of years ago.

43. **Digital Humanities** — History & Culture + Computer Science — theory 0.4, hands 0.3
    - What: Using computational tools, text analysis, and digital archives to study history and culture at a scale no single historian could manage by hand.
    - Obsessed: The pattern hiding across thousands of documents that's invisible if you only ever read them one at a time.
    - Tuesday: Running a text-mining tool across a century of newspapers to track how a word's meaning quietly changed.
    - Did you know: Software can now help identify who really wrote an anonymous historical document by analysing sentence rhythm and word choice, the same techniques used to unmask anonymous authors today.

44. **Behavioral Economics** — Psychology + Economics & Politics — theory 0.5, people 0.4
    - What: Studying why people and markets don't behave the way clean economic models predict, and what that means for policy.
    - Obsessed: The specific, repeatable ways human decision-making departs from pure rationality, and how to design around it.
    - Tuesday: Running an experiment to see whether changing the default option on a form changes what people actually choose.
    - Did you know: Automatically enrolling people in a pension plan, rather than asking them to opt in, can raise participation from a small minority to the vast majority, without changing the plan itself at all.

45. **Energy Systems Engineering** — Physics + Earth Science + Economics & Politics — build 0.7, large 0.5
    - What: Engineering and financing the shift to a lower-carbon grid, batteries, solar, wind, and everything that has to connect to them.
    - Obsessed: How to keep a power grid stable when its main sources of electricity stop being constant and predictable.
    - Tuesday: Modelling how much battery storage a region actually needs to survive a week without much wind or sun.
    - Did you know: A modern electrical grid has to match supply and demand within fractions of a second, at a national scale, every moment, or parts of it start to fail.

46. **Climate Policy & Environmental Economics** — Earth Science + Economics & Politics — theory 0.5, people 0.5
    - What: The institutional and economic side of climate change, treaties, carbon markets, and regulation, distinct from modelling the physical climate itself.
    - Obsessed: How to make polluting expensive enough to actually change behaviour, without breaking the economy that has to pay for it.
    - Tuesday: Modelling how a proposed carbon price would actually change emissions, and who ends up bearing the cost.
    - Did you know: Putting an explicit price on a tonne of carbon is one of the most studied policy tools economists have, and countries that have tried it disagree sharply on whether it actually worked.

47. **Urban Planning & Smart Cities** — Computer Science + Economics & Politics + Earth Science — build 0.6, people 0.5
    - What: Planning and running cities as connected systems, traffic, housing, and resources, rather than one building at a time.
    - Obsessed: Why a city works well for some people and badly for others, and what would have to change for more of it to work for more people.
    - Tuesday: Modelling how a new bus route or bike lane would actually change traffic and commute times before anyone builds it.
    - Did you know: Coordinating traffic lights in a timed wave along one direction, instead of each running its own timer, can noticeably cut a city's commute times with no new roads at all.

48. **Cultural Heritage & Museum Studies** — History & Culture + Art & Design — hands 0.4, people 0.5
    - What: Curating, preserving, and telling the story of objects and cultures for the people who come to see them.
    - Obsessed: How to make an object from another time and place mean something real to someone standing in front of it today.
    - Tuesday: Deciding how a single artefact gets displayed, lit, and labelled so a stranger understands why it matters in under a minute.
    - Did you know: Museums quietly return thousands of looted or disputed artefacts to their countries of origin every year, a legal and ethical field in its own right.

49. **Cybersecurity & Cryptography** — Computer Science + Mathematics — theory 0.6, small 0.3
    - What: Protecting information, and mathematically proving that a system can't be broken the way you'd think it could.
    - Obsessed: Finding the one flaw in a system that looks secure, before someone else finds it first.
    - Tuesday: Trying to break your own system on purpose, or proving mathematically that a certain kind of attack against it is impossible.
    - Did you know: Most of today's encryption would become breakable almost overnight if a large enough quantum computer is ever built, which is part of why cryptographers are already designing its replacement.

50. **Astrobiology** — Biology + Physics + Chemistry — theory 0.5, small 0.4
    - What: The search for life beyond Earth, and what extreme environments here can teach us about what life elsewhere might look like.
    - Obsessed: What actually counts as a genuine sign of life, as opposed to a chemical process that just happens to look like one.
    - Tuesday: Analysing data from a Mars rover or a distant moon for a specific chemical signature that life would leave behind.
    - Did you know: Some of the strongest candidates for life elsewhere in our solar system aren't on planets at all, they're in oceans hidden under the ice of Jupiter's and Saturn's moons.

51. **Human-Computer Interaction & UX Research** — Psychology + Computer Science — theory 0.4, people 0.5
    - What: Understanding how minds actually use technology, and designing interfaces around real cognition instead of guesswork.
    - Obsessed: The gap between how a designer assumes people will use something and how people actually use it.
    - Tuesday: Watching real people try to complete a task on a new interface, then working out exactly where and why they got stuck.
    - Did you know: Most people can't tell you why an app feels frustrating to use. Good UX research finds the actual reason, often something as small as one button in the wrong place.

---

## 6c. Honesty about thin signal, and future-facing fields (already built in the reference file, keep it)

**The bug this fixes.** When a student leaves every slider at the neutral midpoint, or moves only one or two by a small amount, the maths behind the recommender has no real signal to rank fields by. Every field scores at or near zero, and a stable sort resolves the tie by whatever order the fields happen to sit in the underlying data array, which has no relationship to the student at all. Left unfixed, this silently dresses up an arbitrary, author-order artifact as a personalised "in your wheelhouse" match, which is actively misleading rather than merely unhelpful, and it also flowed into the exported AI prompt, which would confidently tell an external LLM that these were the student's matched interests. This must not happen. Preserve the fix, don't reintroduce it by simplifying the scoring on a rebuild.

**The fix, in two parts.**
1. Compute the magnitude of the student's full preference vector after converting sliders to signal. If it falls under a small threshold, treat the whole quiz result as "thin": don't show wheelhouse or stretch zones at all. Instead show a short, honest message explaining that there wasn't enough to go on, with a way back to the quiz to add a bit more signal.
2. Independently of the thin/not-thin split, never let a field into the wheelhouse or stretch lists unless it has a genuinely positive score or positive affinity. If a student's signal is real but narrow (say, they only expressed an opinion about one uncommonly-used subject), show however many fields genuinely qualify, even if that's fewer than five, rather than padding the list out with an arbitrary zero-score filler. A shorter, honest list beats a padded, dishonest one.

**Future-facing fields, a genuine standing feature, not just a fallback.** A small, hand-picked subset of the 32 fields (Machine Learning & AI, Climate Science, Synthetic Biology, Materials Science, Epidemiology, Biomedical Engineering, Data Science, Environmental Science) carry an additional one-line note on why demand for that field seems likely to grow over the next couple of decades (ageing populations, climate adaptation, AI's spread into every other discipline, recurring pandemics, and so on). This is deliberately not framed as a ranking of which fields matter most, since that is a genuinely contested value question (people reasonably weigh personal interest, market demand, and expected impact very differently), and Prism should not quietly take a side. Frame it explicitly as one additional lens, worth holding alongside personal interest rather than instead of it. The framing is inspired by 80,000 Hours (80000hours.org), which researches exactly this question in real depth, and the app should say so and link to it rather than presenting the idea as original or definitive.

This future-facing zone always appears at the bottom of the Results page, for every student, not only the ones with thin signal, since it's a useful addition on its own merits. Its introductory copy adapts slightly depending on whether it's standing in for a missing personalised result or sitting alongside one. When Results are thin, the exported AI prompt also switches to an honest version: it tells the receiving AI that personalisation wasn't possible, offers the future-facing fields as a starting point instead, and asks the AI to draw the student out with a few open questions before recommending anything, rather than pretending a match exists.

---

## 6d. Field coverage audit (already actioned in the reference file, keep the balance)

A count of how many fields touch each of the 8 subjects surfaced a real imbalance: Physics anchored 17 of the original 32 fields, while Art & Design anchored only 4, and every one of those 4 was a technical, applied-design flavour of art (Design Engineering, Architecture, Acoustics, Game Design), with no fine art, literature, film, or philosophy anywhere on the map. Six fields were added specifically to close the clearest gaps, pairings where a real, well-established discipline existed but no field represented it anywhere in the dataset, not even as a third parent: Computational & Theoretical Chemistry (Maths + Chemistry), Cheminformatics & Computational Drug Discovery (Chemistry + Computer Science), Geoinformatics & Remote Sensing (Earth Science + Computer Science), Art Conservation & Heritage Science (Chemistry + Art & Design), Scientific Illustration & Visualization (Biology + Art & Design), and Computational & Generative Design (Mathematics + Art & Design). This moved Art & Design from 4 fields to 7 and Chemistry from 9 to 12, a real improvement, verify it holds if you regenerate the dataset rather than assuming any six fields will do.

A known side effect of adding fields, worth knowing about, not a bug: fields with fewer parent subjects get a mild scoring advantage over fields with more parents whenever only one shared dimension matches strongly, because normalising a shorter vector dilutes the matching signal less. Adding several 2-parent fields can therefore nudge an existing 3-parent field out of a bottom wheelhouse or stretch slot even when nothing about the user's answers changed. This is an existing property of the cosine-similarity-style scoring approach, not something introduced by these six fields, and it isn't worth re-architecting the recommender to chase, but don't be surprised by minor reshuffling in the lower slots after adding fields, and don't mistake it for the zero-score padding bug that section 6c fixed.

---

## 6e. The Mind & Society split (already actioned in the reference file, keep this structure)

The single "Mind & Society" primitive was split into two real subjects, once it became clear the bundling wasn't just thin, it was incoherent: across the fields that used it as a parent, it was doing four unrelated jobs at once, standing for individual cognition in Neuroscience and Cognitive Science, for the structure of language in Computational Linguistics, for markets and institutions in Quantitative Economics, and for the human past in Archaeology. The two replacements:

- **Psychology** (kept the original rose, `244,63,94` / `#f43f5e`, since psychology is the closest single continuation of what "mind" mostly meant) — individual cognition, perception, and behaviour. Absorbed Neuroscience, Cognitive Science, Computational Linguistics (linguistics treated as cognitive science, the position that language structure is a question about the mind, not about society), Architecture (its own field description is about how a space shapes how people feel and behave, which is environmental psychology, though this one is genuinely debatable and could equally be argued as sociology), and Game Design (what makes a system feel engaging is behavioural psychology).
- **Society & Economics** (a new colour, `118,182,35` / `#76b623`) — markets, institutions, populations, and the human past. Absorbed Quantitative Economics, Archaeology, Epidemiology (fundamentally a population-level, not an individual-level, science), and Forensic Science (also debatable, criminal psychology pulls toward the other bucket, but the legal/social-systems framing was judged the stronger fit).

A two-way split was chosen over a three-way split (keeping Economics and History fully separate) specifically because of the colour palette. The existing eight hues already span most of a usable wheel; adding one new colour for a two-way split is easy to keep distinct, adding two for a three-way split starts crowding the wheel to the point where different fields' mixed colours risk looking similar, which would quietly undermine the "read a field's composition off its colour" mechanic the whole product is built around. **Update: this deferral did not last long.** Once the person pushed on genuine coverage gaps (politics, sociology, anthropology, philosophy-adjacent fields), piling all of it onto one "Society & Economics" bucket recreated the exact incoherence problem this split was meant to fix, just one level down. Society & Economics was subsequently split again, into History & Culture and Economics & Politics. See section 6f for the full account, including why it turned out to be a cheaper change than this paragraph originally implied.

**How the new colour was chosen, and why it matters to verify this rather than eyeball it.** Don't just pick a hue that "looks different enough." Compute it. The method used: convert all eight existing primitive colours to hue angles, find the largest open gap (it was 103°, between Earth Science at 39° and Biology at 142°, the yellow-through-green range), and search within that gap for a candidate whose minimum RGB Euclidean distance to every existing primitive clears the *current worst pair already in production* (Chemistry and Earth Science, at 78.3, the closest two colours already shipping and accepted) with real margin, not just barely over the line. That alone isn't sufficient, though: also render out every field's actual *mixed* colour under the proposed change and check pairwise distances across the whole set, not just the eight primitives in isolation, since two fields with different parents can still average out to nearly the same colour by coincidence. The first candidate chosen this way looked good on the primitives (a comfortable margin above the floor) but on the full-field check produced a near-exact collision between Oceanography and Epidemiology (RGB distance 2.2, imperceptible), purely from how the specific numbers happened to average. A second pass, biased further from Earth Science's hue specifically, resolved that collision while keeping the primitive-level margin comfortable. The lesson for future colour additions: check the primitives, then check every field's resulting mix against every other field's, not just against the primitives.

**Downstream mechanics this touched, all already handled, verify they stay handled on any rebuild.** The ring layout, the disposition-slider colour and pitch assignment, and the quiz's subject-slider list are all already generic over the primitive list's length, so growing from 8 to 9 subjects required no logic changes there, only data changes. The one thing that did need a deliberate fix: the slider press sound is tuned to a shared pentatonic scale indexed by each subject's position in the primitive list; going from 8 to 9 subjects would otherwise leave two subjects sharing an identical pitch (the last one wrapping back to the first), so the scale itself was extended by one more note in the same pentatonic pattern (adding the interval 19, i.e. the octave-plus-fifth) rather than left to collide silently. Also reassign the two disposition statements that referenced the old "mind" dimension in their weights, thoughtfully, not just search-and-replace: one statement explicitly said "questions about society" and moved cleanly to the new Society & Economics dimension at full weight; the other ("help people in a direct, visible way") was genuinely ambiguous between the two new dimensions and was split as a small, roughly even secondary weight across both, since the statement's primary signal was already carried by the separate "people" disposition trait, not by this secondary subject-nudge.

---

## 6f. Society & Economics split again, into History & Culture and Economics & Politics (already actioned, keep this structure)

This was triggered by a direct request to represent politics, philosophy, sociology, and anthropology properly. Two things had to be untangled before touching any data.

**PPE-style joint degrees don't fit this Atlas's model, and shouldn't be forced in.** Every field on the map is a genuine emergent hybrid discipline with its own methods and its own characteristic day-to-day work, biophysics is a real distinct field, not just "physics class and biology class in the same building." A generalist degree structure like PPE (Politics, Philosophy and Economics) is a different kind of thing, three disciplines studied in parallel for breadth, not fused into one. It has no characteristic Tuesday, a PPE graduate's career is enormously varied. Don't add a field just because a named degree exists; add fields for the underlying disciplines where they genuinely combine two primitives into a real hybrid. Philosophy itself was also deliberately not given a field: it isn't a combination of two subjects, it's closer to a mode of inquiry that runs through all ten (philosophy of science, of mind, of technology, of mathematics), and forcing it into one node would misrepresent it. The closest the Atlas gets is Technology Ethics & Policy, which is where applied philosophical questions about technology actually show up in practice. Purely qualitative, ethnographic sociology and cultural anthropology have the same issue as philosophy: their method isn't downstream of combining two primitives, and the Atlas doesn't claim to represent them.

**Why splitting further was the right call rather than just padding the existing bucket.** Society & Economics, right after the first split, anchored only 4 fields. Naively adding new politics/sociology/anthropology content on top of it would have pushed it to 8 fields spanning economics, political science, physical anthropology, epidemiology, forensics, and tech policy, recreating the original "one colour doing several unrelated jobs" problem the Mind split was meant to fix, just one level down. The actual underlying pattern: six STEM primitives (maths, physics, chemistry, biology, earth science, computer science) map cleanly onto how STEM curricula are actually structured into separate subjects, while the humanities and social sciences, historically, decompose into just as many distinct school and university subjects (history, economics, politics, psychology, sociology, philosophy), not fewer. Two humanities primitives were never going to hold that as coherently as six STEM primitives hold the sciences. This is worth remembering if the same complaint resurfaces after this fix: the fix is more primitives with a real methodological throughline each, not more fields crammed onto the same one or two.

**The grouping logic used: by method, not by subject label.** Political Science, Computational Social Science, and Technology Ethics & Policy all study institutions and collective behaviour through models, incentives, and data, so they joined **Economics & Politics** alongside the retagged Quantitative Economics. Archaeology and Biological & Evolutionary Anthropology both reconstruct who people were and how they lived from physical evidence, closer to detective reasoning than modelling, so they joined **History & Culture**, along with Digital Humanities (added specifically because two fields was judged too sparse to justify a whole colour on its own) and later Cultural Heritage & Museum Studies. Group by what the field's actual day-to-day work looks like, not by which word appears in its name; that's the mistake that made the original "Mind & Society" incoherent in the first place.

**Two existing fields lost a parent, and that's a correction, not a shortcut.** Epidemiology and Forensic Science had each picked up "Mind & Society" as a third parent during the very first split, both flagged as debatable at the time (population-policy for Epidemiology, criminal psychology for Forensic). Revisited now, neither field's actual core method needs that third parent: Epidemiology is honestly just Biology plus Mathematics, Forensic Science is honestly just Chemistry plus Biology. Both were dropped back to two clean parents rather than forced into a home in the new structure. If this pattern turns up again on another field, that's a signal the original parent assignment was weak, not that the new primitive structure has a gap.

**The colour pair, chosen the same rigorous way as before, this time for two colours at once.** With Society & Economics retired, the remaining eight primitives reverted to exactly the original pre-split eight-colour palette (Psychology having kept Mind's rose all along), which is already known-good. Two new colours were needed simultaneously, not one, which changes the search: it's not enough to check each candidate against the existing eight, the two new candidates also have to clear a floor against *each other*. Rather than cramming both into the single widest gap (the 103° span between Earth Science and Biology), they were spread into two different gaps, History & Culture at `112,182,16` / `#70b610` (hue 85°, in that same Earth-Biology gap the old Society colour occupied), and Economics & Politics at `183,107,158` / `#b76b9e` (hue 320°, in the narrower gap between Art & Design and Psychology). Spreading across two gaps rather than crowding one gave both colours a larger margin than squeezing two into one gap would have, and the full-field mixed-colour check (the same pairwise comparison across every field, not just the primitives, that caught the Oceanography/Epidemiology near-collision last time) came back clean: neither new colour produced the closest pair anywhere in the resulting 51-field set. The closest pairs remaining are unrelated pre-existing coincidences (a few 3-parent, maths-heavy fields landing within about 8 to 19 RGB units of each other by chance) that predate this change and aren't worth re-architecting the palette to chase, the same standard already applied in section 6d.

**The pentatonic pitch scale was extended again**, from 9 notes to 10 (adding the interval 21, continuing the same pattern), for the same reason as before: one more subject slider means one more note is needed to keep every slider's press-sound pitch distinct, or two subjects would silently share a note.

**Thirteen new fields landed in this same pass**, five from the initial regrouping (Political Science & Political Psychology, Computational Social Science, Technology Ethics & Policy, Biological & Evolutionary Anthropology, Digital Humanities) and eight more from a follow-up "what's missing that's genuinely relevant right now" brainstorm (Behavioral Economics, Energy Systems Engineering, Climate Policy & Environmental Economics, Urban Planning & Smart Cities, Cultural Heritage & Museum Studies, Cybersecurity & Cryptography, Astrobiology, Human-Computer Interaction & UX Research). Full descriptions are in the numbered field list (entries 39 to 51). A few of these deliberately reuse an existing parent pair (Behavioral Economics and Political Science both sit at Psychology plus Economics & Politics; Technology Ethics & Policy and Urban Planning both touch Computer Science plus Economics & Politics; Cybersecurity shares Computer Science plus Mathematics with the existing Data Science; Astrobiology was deliberately given a third parent, Chemistry, specifically so it would *not* exactly duplicate Biophysics's parent pair). This follows the precedent already set by Materials Science, Nanotechnology, and Soft Matter Physics all sharing Physics plus Chemistry: real, distinct disciplines are allowed to share a parent pair when they're genuinely different fields, and it isn't worth forcing an artificial third parent onto every one just to avoid a repeat.

**One imbalance this pass introduced, worth knowing about rather than hiding.** Computer Science now anchors 22 of the 51 fields, well over 40%, because a large share of "genuinely current" interdisciplinary fields (cybersecurity, HCI, digital humanities, computational social science, tech policy, urban planning) lean on computing. This is arguably an honest reflection of how central computing has become to nearly every modern discipline, not a modelling mistake, but it does mean Computer Science's ring position is now a heavier hub than any other, worth being aware of rather than surprised by if it comes up again.

Final balance after this pass: Computer Science 22, Physics 19, Mathematics 16, Biology 15, Chemistry 13, Earth Science 11, Psychology 8, Economics & Politics 8, Art & Design 8, History & Culture 4. History & Culture stays the thinnest primitive on the whole map even after this effort, which was treated as acceptable rather than something to pad out artificially: it's a smaller but genuinely coherent bucket, not a redo of the original incoherent one.

---

## 8. Tone and copy

Write for a smart 15 year old, not down to them. Plain verbs, concrete nouns, specific over clever. The "Tuesday" line and the "Did you know" hook are where the product earns its keep, so keep those vivid. Never let a result read as a verdict or a diagnosis. Prism is a compass and a set of doorways, and the copy should keep saying so, gently.

Guardrails: keep everything age-appropriate. Do not imply a student must decide their future now. Frame surprising or stretch results as invitations to go read more, never as judgements about who they are.

---

## 9. Quality floor

Fully responsive down to a phone. On mobile the Atlas detail panel becomes a bottom sheet, the legend wraps, and the quiz stays comfortably tappable. Visible keyboard focus on every interactive element. Sliders operable by keyboard. `prefers-reduced-motion` respected (skip the entrance and hover animations). Colour contrast for text kept legible against the dark background. No browser storage APIs.

---

## 10. Open decisions for the user (please ask before assuming)

Two things remain deliberately unresolved. Check with the user rather than guessing.

1. **Public or private.** If this is a private thing the user shares with a sibling and a few friends, a single-page prototype is enough. If it is meant to go public and be found by strangers, it needs a proper hosted, multi-page site, sharper onboarding, and more fields. Ask which it is, because it changes the scope.
2. **Drawing out dislikes.** The stretch zone only shines when students say what they are *not* into. Consider adding one or two deliberately polarising disposition statements, and ask the user whether they want that.

Resolved: Mind & Society was first split into Psychology and Society & Economics (section 6e), then Society & Economics was split again into History & Culture and Economics & Politics (section 6f), once real content made the two-way split feel like the same incoherence problem one level down. Economics and Politics were deliberately kept together rather than fully separated, the same colour-budget reasoning as before, just applied one primitive later. If a future request wants to separate those two fully, that's still open; ask before doing it, don't assume.
