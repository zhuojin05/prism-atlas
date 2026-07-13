(function () {
    "use strict";
    const SVGNS = "http://www.w3.org/2000/svg";

    /* ============ DATA ============ */
    const PRIMS = {
      math: { name: "Mathematics", rgb: [139, 92, 246], blurb: "The language everything else is written in. Pattern, structure, and proof." },
      phys: { name: "Physics", rgb: [59, 130, 246], blurb: "The rules the universe runs on, from atoms to galaxies." },
      chem: { name: "Chemistry", rgb: [249, 115, 22], blurb: "What everything is made of, and how it rearranges." },
      bio: { name: "Biology", rgb: [34, 197, 94], blurb: "How living things work, from single molecules to whole ecosystems." },
      earth: { name: "Earth Science", rgb: [214, 164, 72], blurb: "The planet itself. Rocks, oceans, atmosphere, and deep time." },
      cs: { name: "Computer Science", rgb: [34, 211, 238], blurb: "How to compute, store, and reason with information." },
      psych: { name: "Psychology", rgb: [244, 63, 94], blurb: "How individuals think, feel, perceive, and behave." },
      historyculture: { name: "History & Culture", rgb: [112, 182, 16], blurb: "The human past, and how cultures and societies actually lived and left their mark." },
      econpol: { name: "Economics & Politics", rgb: [183, 107, 158], blurb: "How markets, institutions, and governments make decisions, and who that affects." },
      art: { name: "Art & Design", rgb: [232, 121, 249], blurb: "Making things that communicate, move people, or get used." }
    };
    const PORDER = ["math", "phys", "chem", "bio", "earth", "cs", "psych", "historyculture", "econpol", "art"];

    // scoring dimensions = 10 subjects + 6 dispositions
    const DIMS = ["math", "phys", "chem", "bio", "earth", "cs", "psych", "historyculture", "econpol", "art", "build", "theory", "small", "large", "people", "hands"];
    const DIMLABEL = {
      math: "maths", phys: "physics", chem: "chemistry", bio: "biology", earth: "the planet",
      cs: "computing", psych: "psychology", historyculture: "history and culture", econpol: "economics and politics", art: "art & design", build: "making things", theory: "understanding why",
      small: "the very small", large: "the very big", people: "helping people", hands: "hands-on work"
    };

    // each field: parents (subjects, weight 1) + disposition weights
    const FIELDS = [
      {
        id: "materials", name: "Materials Science", par: ["phys", "chem"], disp: { build: .8, hands: .7, small: .4 },
        what: "Why stuff behaves the way it does, and how to invent stuff that behaves better.",
        obsessed: "What makes something strong, bendy, transparent, or able to survive a rocket launch.",
        tuesday: "Stretching a new alloy or plastic in a machine until it snaps, and measuring exactly when and why.",
        hook: "Spider silk is tougher for its weight than steel. A lot of the field is chasing materials nature already figured out.",
        future: "Batteries, solar cells, and lower-carbon construction are all bottlenecked on better materials, a slower and less visible problem than the technologies built on top of it."
      },
      {
        id: "biochem", name: "Biochemistry", par: ["chem", "bio"], disp: { small: .7, hands: .5 },
        what: "Chemistry, except the reactions are happening inside living things.",
        obsessed: "The molecular machines that keep a cell alive, and what happens when one breaks.",
        tuesday: "Purifying a single protein out of a cell and watching what it does in a tube.",
        hook: "Your body runs thousands of chemical reactions every second. Most drugs work by jamming exactly one of them."
      },
      {
        id: "compchem", name: "Computational & Theoretical Chemistry", par: ["math", "chem"], disp: { theory: .8, small: .6 },
        what: "Predicting how molecules behave and react using physics and mathematics, before or instead of testing them in a lab.",
        obsessed: "What's actually happening to electrons and atoms during a reaction, at a speed and scale too fast and too small to watch directly.",
        tuesday: "Running a simulation of a molecule's structure and energy, then checking the prediction against what a real experiment measures.",
        hook: "The 2013 Nobel Prize in Chemistry went to methods for simulating chemical reactions on a computer accurately enough to actually trust."
      },
      {
        id: "biophys", name: "Biophysics", par: ["phys", "bio"], disp: { small: .7, theory: .5, hands: .4 },
        what: "Using the tools of physics to ask how life holds itself together.",
        obsessed: "The forces, energy, and motion inside a single living cell.",
        tuesday: "Using focused lasers to grab one molecule and measure how hard it pulls.",
        hook: "A cell isn't a bag of soup. It sorts itself into droplets, like oil in water, and that turns out to be a physics problem."
      },
      {
        id: "geophys", name: "Geophysics", par: ["phys", "earth"], disp: { large: .8, theory: .4 },
        what: "Physics aimed at the entire planet.",
        obsessed: "What the Earth is doing thousands of kilometres beneath your feet.",
        tuesday: "Reading earthquake signals to map the inside of the planet, the way an ultrasound maps a body.",
        hook: "We've never drilled even close to the centre of the Earth. Almost everything we know about the inside comes from listening to it shake."
      },
      {
        id: "astro", name: "Astrophysics", par: ["phys", "math"], disp: { large: .9, theory: .8 },
        what: "The physics of everything that isn't Earth.",
        obsessed: "How stars, galaxies, and black holes actually work.",
        tuesday: "Writing code to simulate a dying star, or sifting telescope data for one faint signal.",
        hook: "The gold in a ring was forged in the collision of two neutron stars, long before the Sun existed."
      },
      {
        id: "aero", name: "Aerospace Engineering", par: ["phys", "math"], disp: { build: .9, large: .4 },
        what: "Making things fly, and not fall out of the sky.",
        obsessed: "How air moves over a wing, and how to survive going very fast.",
        tuesday: "Running a wing shape through a simulated windstorm to shave off drag.",
        hook: "A wing doesn't get sucked upward. It bends the air downward, and the air pushes back. Newton, basically."
      },
      {
        id: "civil", name: "Civil & Structural Engineering", par: ["phys", "math", "earth"], disp: { build: .9, large: .5, people: .3 },
        what: "Designing the built world so that it stays standing.",
        obsessed: "How much a bridge, tower, or tunnel can take before it fails.",
        tuesday: "Calculating whether a beam will hold, then checking what an earthquake would do to it.",
        hook: "Every structure is designed to bend a little. A skyscraper that couldn't sway in the wind would crack."
      },
      {
        id: "bioinfo", name: "Bioinformatics", par: ["bio", "cs"], disp: { small: .6, theory: .5 },
        what: "Reading biology as data, at a scale no human could manage by hand.",
        obsessed: "Finding the one meaningful pattern inside billions of letters of DNA.",
        tuesday: "Writing code to compare thousands of genomes and spot the mutation behind a disease.",
        hook: "Your genome is about 3 billion letters. Printed out, it would fill a stack of books taller than a house."
      },
      {
        id: "ml", name: "Machine Learning & AI", par: ["cs", "math"], disp: { theory: .6, build: .4 },
        what: "Building systems that learn patterns from examples instead of being told the rules.",
        obsessed: "How to make a machine get better at something the more data it sees.",
        tuesday: "Feeding a model examples, watching it fail, and adjusting until it stops failing.",
        hook: "Nobody handed a language model a grammar book. It learned grammar by reading, the way you did as a small child, just faster.",
        future: "AI is being built into almost every other field faster than most institutions can train people to build, evaluate, or question it well."
      },
      {
        id: "robotics", name: "Robotics", par: ["cs", "phys"], disp: { build: .9, hands: .6 },
        what: "Giving machines a body and teaching them to use it.",
        obsessed: "How a machine senses the world and moves through it without breaking things.",
        tuesday: "Debugging why the arm keeps missing the object by two centimetres.",
        hook: "Walking is one of the hardest things to teach a robot. You do it without thinking. A robot has to solve physics every step."
      },
      {
        id: "neuro", name: "Neuroscience", par: ["bio", "phys", "psych"], disp: { small: .6, theory: .4 },
        what: "Figuring out how a lump of tissue produces thoughts, memory, and you.",
        obsessed: "How signals move through the brain and turn into experience.",
        tuesday: "Recording the electrical chatter of neurons while an animal makes a decision.",
        hook: "Your brain uses about as much power as a dim lightbulb to do things no supercomputer can match."
      },
      {
        id: "sciillus", name: "Scientific Illustration & Visualization", par: ["bio", "art"], disp: { hands: .6, people: .3 },
        what: "Drawing and designing images that make science, especially living things, understandable at a glance.",
        obsessed: "How to show something true and precise about biology, a cell, a body, an ecosystem, in a way that's also genuinely beautiful.",
        tuesday: "Sketching an organ or organism from multiple references, then refining the drawing until it's both anatomically accurate and clear to someone with no science background.",
        hook: "Long before photography could capture it, illustrators were the only reason anyone could see what the inside of a cell or a dissected animal actually looked like, and textbooks still lean on drawings over photos for a lot of biology."
      },
      {
        id: "cogsci", name: "Cognitive Science", par: ["psych", "cs", "math"], disp: { theory: .7 },
        what: "Reverse-engineering the mind by borrowing from several fields at once.",
        obsessed: "What thinking actually is, in humans and in machines.",
        tuesday: "Designing an experiment to catch the mind making a predictable mistake.",
        hook: "The same illusions that fool your eyes can fool AI systems. Studying both together says something about thought itself."
      },
      {
        id: "complling", name: "Computational Linguistics", par: ["psych", "cs", "math"], disp: { theory: .5, small: .3 },
        what: "Teaching machines to handle human language, and using machines to understand it.",
        obsessed: "How meaning gets built out of sound, words, and structure.",
        tuesday: "Building a model that can tell whether two sentences mean the same thing.",
        hook: "Every language on Earth follows deep hidden rules its own speakers can't explain. This field tries to write them down."
      },
      {
        id: "envsci", name: "Environmental Science", par: ["bio", "chem", "earth"], disp: { large: .7, people: .5, hands: .4 },
        what: "How living things and their surroundings affect each other.",
        obsessed: "How pollution, climate, and ecosystems interact, and how to undo the damage.",
        tuesday: "Testing a river's water chemistry to trace where a contaminant came from.",
        hook: "A single teaspoon of healthy soil holds more living organisms than there are people on Earth.",
        future: "Ecosystems under strain from pollution, extraction, and land use need people who can actually measure the damage and design ways to limit it."
      },
      {
        id: "ocean", name: "Oceanography", par: ["earth", "phys", "bio"], disp: { large: .9, hands: .4 },
        what: "The ocean as a giant, moving, living system.",
        obsessed: "How currents, chemistry, and sea life shape the whole planet.",
        tuesday: "Dropping instruments kilometres deep and reading what they send back up.",
        hook: "The ocean produces more than half the oxygen you breathe, mostly from microscopic drifting plants."
      },
      {
        id: "climate", name: "Climate Science", par: ["phys", "earth", "math"], disp: { large: .9, theory: .5, people: .4 },
        what: "The whole atmosphere and ocean, treated as one enormous physics problem.",
        obsessed: "How energy moves through the planet's air and water, and where it's heading.",
        tuesday: "Running a climate simulation and comparing it against a century of real measurements.",
        hook: "The models that predict next century are tested by making them 'predict' the past, which we already have the answer to.",
        future: "Governments, cities, and companies will keep needing people who can actually model and predict a changing climate, not just discuss it."
      },
      {
        id: "synbio", name: "Synthetic Biology", par: ["bio", "chem", "cs"], disp: { build: .7, small: .6, hands: .4 },
        what: "Treating living cells like machines you can reprogram.",
        obsessed: "Rewriting DNA to make cells do useful new things.",
        tuesday: "Designing a stretch of genetic code, then checking whether the bacteria actually build what you wanted.",
        hook: "Some of the insulin diabetics depend on is made by bacteria reprogrammed to produce a human protein.",
        future: "Reprogramming living cells is becoming a real engineering discipline, spanning medicine, food, and materials, and it needs people who understand the biology and the risks together."
      },
      {
        id: "cheminfo", name: "Cheminformatics & Computational Drug Discovery", par: ["chem", "cs"], disp: { theory: .5, small: .6 },
        what: "Searching, comparing, and predicting how molecules behave using computers, especially as candidate medicines.",
        obsessed: "Which of millions of possible molecules is actually worth the time and cost of making and testing for real.",
        tuesday: "Running a virtual screen of thousands of compounds against a target protein, then ranking which ones deserve a real synthesis and test.",
        hook: "Most new drug candidates are now tested first inside a computer, against a protein shape that was itself predicted by software rather than measured in a lab."
      },
      {
        id: "nano", name: "Nanotechnology", par: ["phys", "chem"], disp: { small: .9, hands: .5, build: .4 },
        what: "Engineering at the scale of individual molecules.",
        obsessed: "How materials change when you make them almost unimaginably small.",
        tuesday: "Arranging atoms into a structure, then imaging it with a microscope that 'feels' surfaces.",
        hook: "Gold is gold-coloured only in bulk. Shrink it to nanoparticles and it turns red, or purple, depending on the size."
      },
      {
        id: "designeng", name: "Design Engineering", par: ["phys", "art", "cs"], disp: { build: .9, people: .5, hands: .4 },
        what: "Where making things work meets making things people actually want to use.",
        obsessed: "Turning a real human problem into a real object or system.",
        tuesday: "Sketching a product, building a rough prototype, and testing it on the people it's for.",
        hook: "Good design is invisible. You never notice a door handle that just works. You always notice the one you push when you should pull."
      },
      {
        id: "arch", name: "Architecture", par: ["art", "phys", "psych"], disp: { build: .7, people: .6, hands: .3 },
        what: "Designing the spaces people live, work, and gather in.",
        obsessed: "How a building shapes the way people feel and behave inside it.",
        tuesday: "Balancing a beautiful idea against gravity, budget, and building codes.",
        hook: "The layout of a hospital corridor can measurably change how quickly patients recover."
      },
      {
        id: "archaeo", name: "Archaeology", par: ["historyculture", "chem", "earth"], disp: { hands: .6, people: .4 },
        what: "Reconstructing the human past from what it left behind.",
        obsessed: "How people lived thousands of years before anyone wrote it down.",
        tuesday: "Dating a fragment of bone by its chemistry, or mapping a buried site with ground radar.",
        hook: "Modern archaeology reads ancient diets from tooth chemistry, and finds lost cities from scans taken by aircraft."
      },
      {
        id: "artcons", name: "Art Conservation & Heritage Science", par: ["chem", "art"], disp: { hands: .7, small: .3 },
        what: "Using chemistry and careful physical work to analyse, preserve, and restore paintings, sculptures, and historical objects.",
        obsessed: "What a damaged or ageing object is actually made of, and how to stop it decaying further without erasing its history.",
        tuesday: "Testing a tiny paint sample under different light and chemical analysis to work out what pigments an artist actually used centuries ago.",
        hook: "X-ray and infrared scans have revealed entire hidden paintings underneath famous ones, drafts the artist painted over and never meant anyone to see."
      },
      {
        id: "forensic", name: "Forensic Science", par: ["chem", "bio"], disp: { hands: .7, people: .5, small: .3 },
        what: "Using science to reconstruct what happened at a crime scene.",
        obsessed: "What physical traces can, and importantly can't, prove.",
        tuesday: "Matching a DNA sample, or working out how a stain ended up where it is.",
        hook: "The real work looks nothing like the TV version. A single reliable result can take days, not a dramatic minute."
      },
      {
        id: "quantum", name: "Quantum Computing", par: ["phys", "cs", "math"], disp: { theory: .9, small: .6 },
        what: "Building computers that run on the strange rules of the very small.",
        obsessed: "Using quantum weirdness to solve problems ordinary computers never could.",
        tuesday: "Fighting to keep a fragile quantum state alive for a few more microseconds.",
        hook: "A quantum bit can be 0 and 1 at the same time. Chain enough together and some impossible calculations become possible."
      },
      {
        id: "epi", name: "Epidemiology", par: ["bio", "math"], disp: { large: .7, people: .8, theory: .4 },
        what: "The science of how disease moves through a population.",
        obsessed: "Why some outbreaks fizzle out and others explode.",
        tuesday: "Building a model of a spreading illness to predict where it goes next.",
        hook: "Every pandemic dashboard and 'flatten the curve' graph came out of this field.",
        future: "Outbreaks are a recurring, foreseeable event, and the world has repeatedly had too few people who can track and model how disease spreads before it becomes a crisis."
      },
      {
        id: "biomed", name: "Biomedical Engineering", par: ["bio", "phys", "cs"], disp: { build: .8, people: .7, hands: .5 },
        what: "Engineering, pointed straight at the human body.",
        obsessed: "Building devices that repair, replace, or read the body.",
        tuesday: "Testing whether an artificial joint or a new sensor holds up to real use.",
        hook: "Some prosthetic limbs now wire into nerves, so the person can move them just by thinking.",
        future: "Populations are ageing across most of the world, and the need for better medical devices, diagnostics, and care technology is only going up."
      },
      {
        id: "softmatter", name: "Soft Matter Physics", par: ["phys", "chem"], disp: { small: .7, theory: .6, hands: .4 },
        what: "The physics of squishy, in-between things.",
        obsessed: "Gels, foams, liquid crystals, and the goo inside your cells.",
        tuesday: "Watching how a droplet forms, flows, or falls apart under a microscope.",
        hook: "Your phone screen, mayonnaise, and the inside of a cell are all 'soft matter', governed by the same physics."
      },
      {
        id: "sysbio", name: "Systems Biology", par: ["bio", "math", "cs"], disp: { theory: .7, small: .5 },
        what: "Studying life as a network instead of one part at a time.",
        obsessed: "How thousands of molecules interact to keep a cell working.",
        tuesday: "Modelling a web of genes to predict what happens if you switch one of them off.",
        hook: "Knowing every part of a cell isn't enough, the same way knowing every word doesn't tell you the plot. The connections are the story."
      },
      {
        id: "datasci", name: "Data Science", par: ["math", "cs"], disp: { theory: .5, people: .3 },
        what: "Pulling real answers out of messy piles of data.",
        obsessed: "The signal hiding inside the noise.",
        tuesday: "Cleaning a broken dataset, then finding the one pattern that actually matters.",
        hook: "The hardest part is almost never the maths. It's realising the data is quietly lying to you.",
        future: "Health systems, climate policy, and markets all generate more data than anyone can make sense of by hand, and that gap isn't closing on its own."
      },
      {
        id: "econ", name: "Quantitative Economics", par: ["math", "econpol", "cs"], disp: { theory: .6, people: .6, large: .5 },
        what: "How people, money, and choices behave, studied with hard numbers.",
        obsessed: "Why markets, incentives, and decisions play out the way they do.",
        tuesday: "Testing an idea about human behaviour against millions of real transactions.",
        hook: "A lot of modern economics is closer to physics than to business, full of equations about how people react."
      },
      {
        id: "geol", name: "Earth Systems & Geology", par: ["earth", "chem", "bio"], disp: { large: .7, hands: .6, theory: .3 },
        what: "Reading the planet's history and machinery straight from its rocks.",
        obsessed: "How the Earth built itself, and how it keeps changing.",
        tuesday: "Slicing a rock thin enough to see through, then reading its story under a microscope.",
        hook: "There are rocks on Earth older than 4 billion years, formed before there was any oxygen in the air."
      },
      {
        id: "geoinfo", name: "Geoinformatics & Remote Sensing", par: ["earth", "cs"], disp: { large: .7, theory: .5 },
        what: "Turning satellite images and sensor data into maps of what's actually happening to the planet's surface.",
        obsessed: "How a forest, a coastline, or a city is changing, measured from orbit rather than by walking the ground.",
        tuesday: "Writing code to pull deforestation, flooding, or ice loss out of years of raw satellite imagery.",
        hook: "Most of what we know about how fast Antarctic ice is disappearing comes from satellites quietly measuring it from space, not people standing on the ice."
      },
      {
        id: "acoustics", name: "Acoustics & Music Technology", par: ["phys", "art", "cs"], disp: { build: .6, hands: .4 },
        what: "The science and engineering of sound.",
        obsessed: "How sound is made, shaped, and heard.",
        tuesday: "Tuning the acoustics of a room, or building software that generates and cleans up audio.",
        hook: "A concert hall is engineered as carefully as a bridge. Move one wall a few metres and the music changes."
      },
      {
        id: "gendesign", name: "Computational & Generative Design", par: ["math", "art"], disp: { build: .7, theory: .4 },
        what: "Using mathematical rules and algorithms to generate shapes, patterns, and structures, rather than drawing them by hand one at a time.",
        obsessed: "What happens when you describe a design as a rule or an equation instead of a fixed picture, and let a computer explore the possibilities.",
        tuesday: "Writing a small program that generates hundreds of variations of a pattern or structure, then picking and refining the ones that actually work.",
        hook: "Some modern buildings and sculptures were never fully drawn by a human. They were grown from a mathematical rule, then checked and adjusted by a designer."
      },
      {
        id: "gamedesign", name: "Game Design", par: ["cs", "art", "psych"], disp: { build: .8, people: .5 },
        what: "Building interactive worlds and the rules that make them fun.",
        obsessed: "What makes a system feel challenging, fair, and worth coming back to.",
        tuesday: "Changing one rule, then watching real players to see if it got more fun or less.",
        hook: "'Fun' is a design problem you can actually study. A small change to the rules can make a game addictive or unplayable."
      },
      {
        id: "polisci", name: "Political Science & Political Psychology", par: ["psych", "econpol"], disp: { theory: .5, people: .6, large: .4 },
        what: "Studying how power actually works, who has it, how they keep it, and why people vote, protest, or obey the way they do.",
        obsessed: "The gap between how a government or institution is supposed to work on paper and how it actually behaves under pressure.",
        tuesday: "Building a model of voter behaviour from polling data, or picking apart why a policy that looked good on paper failed in practice.",
        hook: "Small changes in ballot design alone can shift an election's outcome. People vote differently depending on where a candidate's name sits on the page."
      },
      {
        id: "compsocsci", name: "Computational Social Science", par: ["econpol", "cs", "math"], disp: { theory: .6, large: .5 },
        what: "Using data, networks, and computation to study how opinions, movements, and behaviour actually spread through real populations.",
        obsessed: "Why some ideas go viral and others vanish, traced through the actual structure of who talks to whom.",
        tuesday: "Mapping a social network from millions of posts, then modelling how a rumour or a policy idea moves through it.",
        hook: "Some of the clearest evidence for how fast misinformation spreads came from watching ideas move through social networks the same way real epidemics move through a population."
      },
      {
        id: "techethics", name: "Technology Ethics & Policy", par: ["cs", "econpol"], disp: { theory: .5, people: .4 },
        what: "Working out how to govern something that changes faster than the laws meant to regulate it.",
        obsessed: "Who is accountable when an algorithm makes a decision that harms someone, and how you'd even prove it.",
        tuesday: "Reading a proposed AI regulation and stress-testing it against a real, messy case it would actually have to handle.",
        hook: "Several countries have written laws about self-driving cars and facial recognition before those technologies were fully built, betting on what the technology would become."
      },
      {
        id: "bioanthro", name: "Biological & Evolutionary Anthropology", par: ["bio", "historyculture"], disp: { hands: .5, theory: .4 },
        what: "Studying human evolution and diversity through bones, genes, and the biology of what makes us human.",
        obsessed: "What a single fossil or bone fragment can prove, and just as often, what it can't.",
        tuesday: "Measuring a fossil skull to work out which species it belongs to, or comparing ancient DNA across populations.",
        hook: "Most people alive today carry a small percentage of Neanderthal DNA, evidence of interbreeding that happened tens of thousands of years ago."
      },
      {
        id: "digitalhum", name: "Digital Humanities", par: ["historyculture", "cs"], disp: { theory: .4, hands: .3 },
        what: "Using computational tools, text analysis, and digital archives to study history and culture at a scale no single historian could manage by hand.",
        obsessed: "The pattern hiding across thousands of documents that's invisible if you only ever read them one at a time.",
        tuesday: "Running a text-mining tool across a century of newspapers to track how a word's meaning quietly changed.",
        hook: "Software can now help identify who really wrote an anonymous historical document by analysing sentence rhythm and word choice, the same techniques used to unmask anonymous authors today."
      },
      {
        id: "behavioralecon", name: "Behavioral Economics", par: ["psych", "econpol"], disp: { theory: .5, people: .4 },
        what: "Studying why people and markets don't behave the way clean economic models predict, and what that means for policy.",
        obsessed: "The specific, repeatable ways human decision-making departs from pure rationality, and how to design around it.",
        tuesday: "Running an experiment to see whether changing the default option on a form changes what people actually choose.",
        hook: "Automatically enrolling people in a pension plan, rather than asking them to opt in, can raise participation from a small minority to the vast majority, without changing the plan itself at all."
      },
      {
        id: "energysys", name: "Energy Systems Engineering", par: ["phys", "earth", "econpol"], disp: { build: .7, large: .5 },
        what: "Engineering and financing the shift to a lower-carbon grid, batteries, solar, wind, and everything that has to connect to them.",
        obsessed: "How to keep a power grid stable when its main sources of electricity stop being constant and predictable.",
        tuesday: "Modelling how much battery storage a region actually needs to survive a week without much wind or sun.",
        hook: "A modern electrical grid has to match supply and demand within fractions of a second, at a national scale, every moment, or parts of it start to fail."
      },
      {
        id: "climatepolicy", name: "Climate Policy & Environmental Economics", par: ["earth", "econpol"], disp: { theory: .5, people: .5 },
        what: "The institutional and economic side of climate change, treaties, carbon markets, and regulation, distinct from modelling the physical climate itself.",
        obsessed: "How to make polluting expensive enough to actually change behaviour, without breaking the economy that has to pay for it.",
        tuesday: "Modelling how a proposed carbon price would actually change emissions, and who ends up bearing the cost.",
        hook: "Putting an explicit price on a tonne of carbon is one of the most studied policy tools economists have, and countries that have tried it disagree sharply on whether it actually worked."
      },
      {
        id: "urbanplanning", name: "Urban Planning & Smart Cities", par: ["cs", "econpol", "earth"], disp: { build: .6, people: .5 },
        what: "Planning and running cities as connected systems, traffic, housing, and resources, rather than one building at a time.",
        obsessed: "Why a city works well for some people and badly for others, and what would have to change for more of it to work for more people.",
        tuesday: "Modelling how a new bus route or bike lane would actually change traffic and commute times before anyone builds it.",
        hook: "Coordinating traffic lights in a timed wave along one direction, instead of each running its own timer, can noticeably cut a city's commute times with no new roads at all."
      },
      {
        id: "culturalheritage", name: "Cultural Heritage & Museum Studies", par: ["historyculture", "art"], disp: { hands: .4, people: .5 },
        what: "Curating, preserving, and telling the story of objects and cultures for the people who come to see them.",
        obsessed: "How to make an object from another time and place mean something real to someone standing in front of it today.",
        tuesday: "Deciding how a single artefact gets displayed, lit, and labelled so a stranger understands why it matters in under a minute.",
        hook: "Museums quietly return thousands of looted or disputed artefacts to their countries of origin every year, a legal and ethical field in its own right."
      },
      {
        id: "cybersec", name: "Cybersecurity & Cryptography", par: ["cs", "math"], disp: { theory: .6, small: .3 },
        what: "Protecting information, and mathematically proving that a system can't be broken the way you'd think it could.",
        obsessed: "Finding the one flaw in a system that looks secure, before someone else finds it first.",
        tuesday: "Trying to break your own system on purpose, or proving mathematically that a certain kind of attack against it is impossible.",
        hook: "Most of today's encryption would become breakable almost overnight if a large enough quantum computer is ever built, which is part of why cryptographers are already designing its replacement."
      },
      {
        id: "astrobio", name: "Astrobiology", par: ["bio", "phys", "chem"], disp: { theory: .5, small: .4 },
        what: "The search for life beyond Earth, and what extreme environments here can teach us about what life elsewhere might look like.",
        obsessed: "What actually counts as a genuine sign of life, as opposed to a chemical process that just happens to look like one.",
        tuesday: "Analysing data from a Mars rover or a distant moon for a specific chemical signature that life would leave behind.",
        hook: "Some of the strongest candidates for life elsewhere in our solar system aren't on planets at all, they're in oceans hidden under the ice of Jupiter's and Saturn's moons."
      },
      {
        id: "hci", name: "Human-Computer Interaction & UX Research", par: ["psych", "cs"], disp: { theory: .4, people: .5 },
        what: "Understanding how minds actually use technology, and designing interfaces around real cognition instead of guesswork.",
        obsessed: "The gap between how a designer assumes people will use something and how people actually use it.",
        tuesday: "Watching real people try to complete a task on a new interface, then working out exactly where and why they got stuck.",
        hook: "Most people can't tell you why an app feels frustrating to use. Good UX research finds the actual reason, often something as small as one button in the wrong place."
      }
    ];

    // quiz statements -> dim weights (positive or negative)
    const STATEMENTS = [
      { t: "I like taking things apart to see how they work.", w: { build: .7, hands: .6 } },
      { t: "I'd rather invent something new than study something that already exists.", w: { build: .8, theory: -.3 } },
      { t: "Living things fascinate me, how bodies, cells, or ecosystems work.", w: { bio: .9, small: .2 } },
      { t: "I like working with my hands, in a lab or a workshop.", w: { hands: .9, build: .3 } },
      { t: "I want my work to help people in a direct, visible way.", w: { people: .9, psych: .15, econpol: .15 } },
      { t: "I love reading, writing, arguments, and questions about society.", w: { econpol: .45, historyculture: .45, theory: .3, art: .2 } },
      { t: "I'm drawn to the very big, space, oceans, climate, whole populations.", w: { large: .9 } },
      { t: "I'm drawn to the very small, atoms, molecules, cells, lines of code.", w: { small: .9 } },
      { t: "I like computers and the idea of programming.", w: { cs: .9, theory: .2 } },
      { t: "I care how things look and feel, not just whether they work.", w: { art: .9, build: .2 } },
      { t: "I'm comfortable leaning on a lot of maths.", w: { math: .9, theory: .4 } }
    ];

    // fields worth surfacing regardless of personal fit, because of where the world seems to be heading.
    // deliberately a small, mixed-domain subset, not a ranking of every field's "importance".
    const FUTURE_IDS = ["ml", "climate", "synbio", "materials", "epi", "biomed", "datasci", "envsci"];

    /* ============ small utils ============ */
    const rgb = a => `rgb(${a[0]},${a[1]},${a[2]})`;
    const rgba = (a, al) => `rgba(${a[0]},${a[1]},${a[2]},${al})`;
    function mix(pars) {
      let r = 0, g = 0, b = 0; pars.forEach(p => { const c = PRIMS[p].rgb; r += c[0]; g += c[1]; b += c[2]; });
      const n = pars.length; return [Math.round(r / n), Math.round(g / n), Math.round(b / n)];
    }
    const byId = id => document.getElementById(id);
    const el = (tag, attrs) => { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };

    // build normalized field vectors over DIMS
    const fieldVecs = {};
    FIELDS.forEach(f => {
      const v = {}; DIMS.forEach(d => v[d] = 0);
      f.par.forEach(p => { v[p] = 1; });
      for (const d in f.disp) v[d] = (v[d] || 0) + f.disp[d];
      let norm = Math.sqrt(DIMS.reduce((s, d) => s + v[d] * v[d], 0)) || 1;
      const hat = {}; DIMS.forEach(d => hat[d] = v[d] / norm);
      fieldVecs[f.id] = { raw: v, hat: hat };
    });

    /* ============ ROUTER ============ */
    const views = ["home", "discover", "results", "atlas"];
    let isTransitioning = false;

    function runTransitionAnimation() {
      isTransitioning = true;

      // Play beautiful organ transition sound
      Sound.playOrganTransition();

      const canvas = byId("transition-canvas");
      canvas.style.display = "block";

      const home = byId("home");
      const discover = byId("discover");

      // Set up canvas sizing
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      const ctx = canvas.getContext("2d");

      // Fade out home view
      home.classList.add("fade-out");

      // Theme colors list
      const COLORS = [
        [139, 92, 246], // math (purple)
        [59, 130, 246], // phys (blue)
        [34, 211, 238], // cs (cyan)
        [244, 63, 94],  // psych (rose)
        [232, 121, 249] // art (magenta)
      ];
      const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

      // Frustum spread factors
      const wVal = window.innerWidth || 1200;
      const hVal = window.innerHeight || 800;
      const spreadX = wVal / 800;
      const spreadY = hVal / 800;

      // Starfield variables - less defined, more glowing, using random project colors
      const numStars = 60;
      const stars = [];
      for (let i = 0; i < numStars; i++) {
        const starZ = Math.random() * 900 + 100;
        stars.push({
          x: (Math.random() - 0.5) * starZ * spreadX,
          y: (Math.random() - 0.5) * starZ * spreadY,
          z: starZ,
          rgb: randomColor()
        });
      }

      // Starfield glows - soft glowing light blobs zooming in with 3D perspective
      const numGlows = 12;
      const glows = [];
      for (let i = 0; i < numGlows; i++) {
        const glowZ = Math.random() * 900 + 100;
        glows.push({
          x: (Math.random() - 0.5) * glowZ * spreadX,
          y: (Math.random() - 0.5) * glowZ * spreadY,
          z: glowZ,
          baseSize: Math.random() * 24 + 18, // size in 3D
          rgb: randomColor(),
          pulseSpeed: Math.random() * 0.05 + 0.02,
          pulsePhase: Math.random() * Math.PI
        });
      }

      const startTime = performance.now();
      const duration = 3500; // 3.5 seconds

      let animId;

      function draw(now) {
        const elapsed = now - startTime;
        const p = Math.min(1, elapsed / duration);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // Clear screen
        ctx.fillStyle = "#06090f";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw cosmic nebula gradients
        // The nebula peaks in opacity around p = 0.5
        const nebulaOpacity = p < 0.5 ? p * 2 : (1 - p) * 2;
        const gradOpacity = Math.max(0, Math.min(0.65, nebulaOpacity));

        if (gradOpacity > 0.01) {

          // Purple blob
          const g1 = ctx.createRadialGradient(
            cx + Math.sin(elapsed * 0.001) * 100,
            cy + Math.cos(elapsed * 0.0012) * 100,
            0,
            cx, cy, Math.max(cx, cy)
          );
          g1.addColorStop(0, `rgba(139, 92, 246, ${gradOpacity * 0.4})`);
          g1.addColorStop(1, "rgba(6, 9, 15, 0)");
          ctx.fillStyle = g1;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Cyan/Blue blob
          const g2 = ctx.createRadialGradient(
            cx + Math.cos(elapsed * 0.0008) * 150,
            cy + Math.sin(elapsed * 0.0015) * 80,
            0,
            cx, cy, Math.max(cx, cy)
          );
          g2.addColorStop(0, `rgba(34, 211, 238, ${gradOpacity * 0.35})`);
          g2.addColorStop(1, "rgba(6, 9, 15, 0)");
          ctx.fillStyle = g2;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Rose/Magenta blob
          const g3 = ctx.createRadialGradient(
            cx + Math.sin(elapsed * 0.0015) * 120,
            cy + Math.cos(elapsed * 0.0007) * 150,
            0,
            cx, cy, Math.max(cx, cy)
          );
          g3.addColorStop(0, `rgba(244, 63, 148, ${gradOpacity * 0.3})`);
          g3.addColorStop(1, "rgba(6, 9, 15, 0)");
          ctx.fillStyle = g3;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Draw aurora borealis-like wave
        if (gradOpacity > 0.01) {
          ctx.save();
          ctx.globalCompositeOperation = "screen";
          const sampleStep = 15;
          for (let x = 0; x < canvas.width; x += sampleStep) {
            // Wave equation
            const y = cy - 40 + Math.sin(x * 0.0035 + elapsed * 0.001) * 80 + Math.sin(x * 0.0012 - elapsed * 0.0007) * 40;

            // Vertical linear gradient representing the aurora curtain
            const grad = ctx.createLinearGradient(x, y - 200, x, y + 200);
            const hue = (160 + (x / canvas.width) * 110 + elapsed * 0.015) % 360;
            grad.addColorStop(0, "rgba(0,0,0,0)");
            grad.addColorStop(0.2, `hsla(${hue}, 90%, 60%, 0)`);
            grad.addColorStop(0.5, `hsla(${hue}, 95%, 50%, ${gradOpacity * 0.28})`);
            grad.addColorStop(0.8, `hsla(${hue}, 90%, 60%, 0)`);
            grad.addColorStop(1, "rgba(0,0,0,0)");

            ctx.strokeStyle = grad;
            ctx.lineWidth = sampleStep + 2;
            ctx.beginPath();
            ctx.moveTo(x, y - 200);
            ctx.lineTo(x, y + 200);
            ctx.stroke();
          }
          ctx.restore();
        }

        // Star warp drive speed calculation
        // Speeds up to peak around p = 0.5, then slows down
        const speedMult = p < 0.5
          ? 3 + Math.pow(p * 2, 3) * 22
          : 3 + Math.pow((1 - p) * 2, 3) * 22;

        // Draw warp stars as glowing streaks
        stars.forEach(star => {
          const prevZ = star.z;
          star.z -= speedMult;

          if (star.z <= 0) {
            star.z = 1000;
            const sX = canvas.width / 800;
            const sY = canvas.height / 800;
            star.x = (Math.random() - 0.5) * 1000 * sX;
            star.y = (Math.random() - 0.5) * 1000 * sY;
            return;
          }

          // Project onto screen
          const scale = 800;
          const x1 = (star.x / prevZ) * scale + cx;
          const y1 = (star.y / prevZ) * scale + cy;
          const x2 = (star.x / star.z) * scale + cx;
          const y2 = (star.y / star.z) * scale + cy;

          // Draw star trail if moving fast enough
          if (x2 >= 0 && x2 <= canvas.width && y2 >= 0 && y2 <= canvas.height) {
            const starAlpha = Math.min(1, (1000 - star.z) / 400) * (1 - p);

            // Create gradient for smooth glow trail fade
            const grad = ctx.createLinearGradient(x1, y1, x2, y2);
            grad.addColorStop(0, `rgba(${star.rgb[0]}, ${star.rgb[1]}, ${star.rgb[2]}, 0)`);
            grad.addColorStop(1, `rgba(${star.rgb[0]}, ${star.rgb[1]}, ${star.rgb[2]}, ${starAlpha * 0.8})`);

            ctx.strokeStyle = grad;
            ctx.lineWidth = Math.min(4, 5 / (star.z / 300));
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        });

        // Draw 3D perspective glows (soft glowing nebula spots)
        glows.forEach(glow => {
          // Zooming in space: glows move closer to viewer
          // Parallax speed: slightly slower velocity than stars to give depth
          glow.z -= speedMult * 0.35;
          glow.pulsePhase += glow.pulseSpeed;

          if (glow.z <= 0) {
            glow.z = 1000;
            const sX = canvas.width / 800;
            const sY = canvas.height / 800;
            glow.x = (Math.random() - 0.5) * 1000 * sX;
            glow.y = (Math.random() - 0.5) * 1000 * sY;
            glow.baseSize = Math.random() * 24 + 18;
            glow.rgb = randomColor();
            return;
          }

          // 3D Projection
          const scale = 800;
          const sx = (glow.x / glow.z) * scale + cx;
          const sy = (glow.y / glow.z) * scale + cy;
          const currentSize = (glow.baseSize / glow.z) * scale * (0.8 + Math.sin(glow.pulsePhase) * 0.2);

          // Smoothly fade in glows as they enter from center, and fade out when passing by
          let glowAlpha = 1.0;
          if (glow.z > 800) {
            glowAlpha = (1000 - glow.z) / 200;
          } else if (glow.z < 250) {
            glowAlpha = glow.z / 250;
          }
          glowAlpha *= (1 - p); // fade out over the transition

          if (glowAlpha > 0.01 && sx >= -currentSize && sx <= canvas.width + currentSize && sy >= -currentSize && sy <= canvas.height + currentSize) {
            ctx.beginPath();
            const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, currentSize);
            g.addColorStop(0, `rgba(${glow.rgb[0]}, ${glow.rgb[1]}, ${glow.rgb[2]}, ${glowAlpha * 0.65})`);
            g.addColorStop(0.3, `rgba(${glow.rgb[0]}, ${glow.rgb[1]}, ${glow.rgb[2]}, ${glowAlpha * 0.22})`);
            g.addColorStop(1, `rgba(${glow.rgb[0]}, ${glow.rgb[1]}, ${glow.rgb[2]}, 0)`);
            ctx.fillStyle = g;
            ctx.arc(sx, sy, currentSize, 0, Math.PI * 2);
            ctx.fill();
          }
        });
        ctx.globalAlpha = 1.0;

        // Cross-fade the views
        if (elapsed >= 1500 && home.classList.contains("active")) {
          home.classList.remove("active", "fade-out");

          discover.classList.add("active", "fade-in-start");
          // Force reflow
          void discover.offsetWidth;

          discover.classList.remove("fade-in-start");

          // Update nav links activation state
          document.querySelectorAll(".navlinks button").forEach(b => b.classList.toggle("active", b.dataset.go === "discover"));
          document.body.style.overflow = "auto";
          window.scrollTo(0, 0);
        }

        if (p < 1) {
          animId = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(animId);
          window.removeEventListener("resize", resizeCanvas);
          canvas.style.display = "none";
          isTransitioning = false;
        }
      }

      animId = requestAnimationFrame(draw);
    }

    function showView(name) {
      if (isTransitioning) return;

      const currentActiveView = document.querySelector(".view.active");
      const currentName = currentActiveView ? currentActiveView.id : "";

      if (currentName === "home" && name === "discover") {
        runTransitionAnimation();
        return;
      }

      views.forEach(v => byId(v).classList.toggle("active", v === name));
      document.querySelectorAll(".navlinks button").forEach(b => b.classList.toggle("active", b.dataset.go === name));
      document.body.style.overflow = (name === "atlas") ? "hidden" : "auto";
      if (name !== "atlas") window.scrollTo(0, 0);
    }
    document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => showView(b.dataset.go)));

    /* ============ QUIZ ============ */
    const subjWrap = byId("subjSliders"), dispWrap = byId("dispSliders");
    function sliderRow(id, question, leftLabel, rightLabel) {
      const row = document.createElement("div"); row.className = "slider-row";
      row.innerHTML = `<p class="q">${question}</p>
      <div class="slider-shell">
        <span class="end">${leftLabel}</span>
        <input type="range" min="0" max="100" value="50" id="${id}">
        <span class="end r">${rightLabel}</span>
      </div>`;
      return row;
    }
    PORDER.forEach(p => subjWrap.appendChild(sliderRow("subj_" + p, PRIMS[p].name, "Dislike", "Love")));
    STATEMENTS.forEach((s, i) => dispWrap.appendChild(sliderRow("disp_" + i, s.t, "Not me", "Very me")));

    /* ---- slider feel: colour, sound, haptics ---- */
    const subjColor = {}; PORDER.forEach(p => subjColor["subj_" + p] = PRIMS[p].rgb);
    const dispColor = {}; STATEMENTS.forEach((s, i) => dispColor["disp_" + i] = PRIMS[PORDER[i % PORDER.length]].rgb);
    function sliderRGB(id) { return subjColor[id] || dispColor[id] || [59, 130, 246]; }

    const Sound = (function () {
      let ctx = null, master = null, dry = null, wet = null, conv = null, on = true;
      function impulse(dur, decay) {
        const rate = ctx.sampleRate, len = Math.max(1, Math.floor(rate * dur));
        const buf = ctx.createBuffer(2, len, rate);
        for (let ch = 0; ch < 2; ch++) {
          const d = buf.getChannelData(ch);
          for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
        }
        return buf;
      }
      function ensure() {
        if (ctx) { if (ctx.state === "suspended") ctx.resume(); return; }
        try {
          const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
          ctx = new AC();
          master = ctx.createGain(); master.gain.value = 0.5; master.connect(ctx.destination);
          dry = ctx.createGain(); dry.gain.value = 0.5; dry.connect(master);
          conv = ctx.createConvolver(); conv.buffer = impulse(2.8, 2.2);
          wet = ctx.createGain(); wet.gain.value = 0.62; conv.connect(wet); wet.connect(master);
        } catch (e) { ctx = null; }
      }
      const INTERVALS = [0, 7, 12, 16, 19, 24];              // root, 5th, 8ve, maj10, 12th, 2-8ve
      const semiRatio = s => Math.pow(2, s / 12);
      function makePad(f0) {
        ensure(); if (!ctx) return null;
        const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 650; lp.Q.value = 0.5;
        const padGain = ctx.createGain(); padGain.gain.value = 0.0001;
        lp.connect(padGain); padGain.connect(dry); padGain.connect(conv);
        const voices = INTERVALS.map((s, i) => {
          const f = f0 * semiRatio(s);
          const vg = ctx.createGain(); vg.gain.value = 0.0001; vg.connect(lp);
          const oscs = [-6, 6].map(det => {
            const o = ctx.createOscillator();
            o.type = (i < 2 ? "triangle" : "sine"); o.frequency.value = f; o.detune.value = det;
            o.connect(vg); o.start(); return o;
          });
          return { vg, oscs };
        });
        return { lp, padGain, voices, alive: true };
      }
      function updatePad(pad, t) {
        if (!pad || !ctx || !pad.alive) return; const now = ctx.currentTime;
        pad.padGain.gain.setTargetAtTime(0.05 + 0.22 * t, now, 0.12);        // loudness swells
        pad.lp.frequency.setTargetAtTime(600 + 4600 * t, now, 0.08);         // opens up / brightens
        pad.voices.forEach((v, i) => {                                    // higher voices fade in
          const tgt = Math.max(0, Math.min(1, (t - i * 0.14) / 0.24)) * 0.14;
          v.vg.gain.setTargetAtTime(tgt, now, 0.09);
        });
      }
      function release(pad) {
        if (!pad || !ctx) return; const now = ctx.currentTime;
        pad.padGain.gain.setTargetAtTime(0.0001, now, 0.4);              // slow ethereal fade
        const stopAt = now + 1.7;
        pad.voices.forEach(v => v.oscs.forEach(o => { try { o.stop(stopAt); } catch (e) { } }));
        pad.alive = false;
      }
      let lastHover = 0;
      function hover(freq) {
        ensure(); if (!ctx || !on) return;
        const w = performance.now(); if (w - lastHover < 70) return; lastHover = w;
        const t = ctx.currentTime;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.045, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
        const o1 = ctx.createOscillator(); o1.type = "sine"; o1.frequency.value = freq;
        const o2 = ctx.createOscillator(); o2.type = "sine"; o2.frequency.value = freq * 2.01;   // shimmer
        const o2g = ctx.createGain(); o2g.gain.value = 0.4; o2.connect(o2g);
        o1.connect(g); o2g.connect(g); g.connect(dry); g.connect(conv);
        o1.start(t); o2.start(t); o1.stop(t + 0.55); o2.stop(t + 0.55);
      }
      function press() {
        ensure(); if (!ctx || !on) return;
        const t = ctx.currentTime;
        // soft low thump: the felt/rubber give of a membrane key bottoming out
        const thump = ctx.createOscillator(); thump.type = "sine";
        thump.frequency.setValueAtTime(220, t);
        thump.frequency.exponentialRampToValueAtTime(150, t + 0.05);
        const thumpGain = ctx.createGain();
        thumpGain.gain.setValueAtTime(0.0001, t);
        thumpGain.gain.exponentialRampToValueAtTime(0.11, t + 0.006);
        thumpGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
        thump.connect(thumpGain); thumpGain.connect(dry);
        // brief filtered noise: the tactile texture of a press, not a pure tone
        const len = Math.floor(ctx.sampleRate * 0.03);
        const buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.2);
        const noise = ctx.createBufferSource(); noise.buffer = buf;
        const nf = ctx.createBiquadFilter(); nf.type = "lowpass"; nf.frequency.value = 1100; nf.Q.value = 0.6;
        const noiseGain = ctx.createGain(); noiseGain.gain.value = 0.045;
        noise.connect(nf); nf.connect(noiseGain); noiseGain.connect(dry);
        // faint shimmer, the one thread tying this back to the pad and the hover chime
        const shim = ctx.createOscillator(); shim.type = "sine"; shim.frequency.value = 880;
        const shimGain = ctx.createGain();
        shimGain.gain.setValueAtTime(0.0001, t);
        shimGain.gain.exponentialRampToValueAtTime(0.018, t + 0.012);
        shimGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
        shim.connect(shimGain); shimGain.connect(dry); shimGain.connect(conv);
        thump.start(t); thump.stop(t + 0.12);
        noise.start(t); noise.stop(t + 0.03);
        shim.start(t); shim.stop(t + 0.32);
      }

      function playOrganNote(freq, start, duration, maxVolume) {
        if (!ctx) return;
        const t = ctx.currentTime + start;
        const end = t + duration;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(300, t);
        filter.frequency.exponentialRampToValueAtTime(1200, t + duration * 0.4);
        filter.frequency.exponentialRampToValueAtTime(400, end);

        const voiceGain = ctx.createGain();
        voiceGain.gain.setValueAtTime(0.0001, t);
        voiceGain.gain.exponentialRampToValueAtTime(maxVolume, t + duration * 0.4);
        voiceGain.gain.setValueAtTime(maxVolume, t + duration * 0.6);
        voiceGain.gain.exponentialRampToValueAtTime(0.0001, end);

        filter.connect(voiceGain);
        voiceGain.connect(dry);
        voiceGain.connect(conv);

        const harmonics = [
          { mult: 1, type: "triangle", gain: 0.35, detune: -6 },
          { mult: 2, type: "sine", gain: 0.25, detune: 6 },
          { mult: 3, type: "triangle", gain: 0.15, detune: -3 },
          { mult: 4, type: "sine", gain: 0.15, detune: 3 },
          { mult: 8, type: "sine", gain: 0.10, detune: 0 }
        ];

        harmonics.forEach(h => {
          const osc = ctx.createOscillator();
          osc.type = h.type;
          osc.frequency.value = freq * h.mult;
          osc.detune.value = h.detune;

          const hGain = ctx.createGain();
          hGain.gain.value = h.gain;

          osc.connect(hGain);
          hGain.connect(filter);
          osc.start(t);
          osc.stop(end + 0.1);
        });
      }

      function playOrganTransition() {
        ensure(); if (!ctx || !on) return;
        const chord1 = [130.81, 196.00, 293.66, 392.00, 523.25, 587.33];
        const chord2 = [130.81, 196.00, 329.63, 493.88, 587.33, 783.99];

        chord1.forEach(freq => {
          playOrganNote(freq, 0, 2.5, 0.05);
        });
        chord2.forEach(freq => {
          playOrganNote(freq, 1.2, 3.8, 0.04);
        });
      }

      return {
        wake: ensure, makePad, updatePad, release, hover, press, playOrganTransition,
        toggle() { on = !on; ensure(); if (ctx && master) master.gain.setTargetAtTime(on ? 0.5 : 0.0001, ctx.currentTime, 0.06); return on; },
        isOn() { return on; }
      };
    })();
    function haptic(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { } }

    function styleSlider(input) {
      const rgb = sliderRGB(input.id), v = +input.value, t = v / 100, a = 0.28 + 0.72 * t;
      const br = x => Math.round(x + (255 - x) * 0.18 * t);           // nudge toward white when bright
      const cr = `${br(rgb[0])},${br(rgb[1])},${br(rgb[2])}`;
      input.style.background = `linear-gradient(90deg, rgba(${cr},${a}) 0%, rgba(${cr},${a}) ${v}%, rgba(255,255,255,.07) ${v}%, rgba(255,255,255,.13) 100%)`;
      input.style.setProperty("--thumb", `rgb(${cr})`);
      input.style.setProperty("--glow", `0 0 ${5 + 18 * t}px rgba(${rgb[0]},${rgb[1]},${rgb[2]},${0.18 + 0.6 * t}), 0 2px 6px rgba(0,0,0,.4)`);
    }
    const PENTA = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21], PROOT = 130.81;     // C major pentatonic, C3 up, extended to 10 notes for 10 subjects
    function rootFor(id) {
      let idx = 0;
      if (id.indexOf("subj_") === 0) idx = PORDER.indexOf(id.slice(5));
      else idx = parseInt(id.slice(5), 10) || 0;
      const off = PENTA[((idx % PENTA.length) + PENTA.length) % PENTA.length];
      return PROOT * Math.pow(2, off / 12);
    }
    function wireSlider(input) {
      styleSlider(input);
      let pad = null;
      function start() {
        Sound.wake(); if (pad && pad.alive) return;
        pad = Sound.makePad(rootFor(input.id)); Sound.updatePad(pad, (+input.value) / 100); haptic(10);
      }
      function move() { styleSlider(input); if (pad && pad.alive) Sound.updatePad(pad, (+input.value) / 100); }
      function end() { if (pad) { Sound.release(pad); pad = null; haptic(12); } }
      input.addEventListener("pointerdown", start);
      input.addEventListener("input", move);
      input.addEventListener("pointerup", end);
      input.addEventListener("pointercancel", end);
      input.addEventListener("lostpointercapture", end);
      input.addEventListener("blur", end);
      window.addEventListener("pointerup", end);          // catch release outside the handle
      input.addEventListener("keydown", () => {
        start(); styleSlider(input);
        clearTimeout(input._kt); input._kt = setTimeout(end, 800);
      });   // keyboard swell then fade
    }
    const allQuizSliders = () => document.querySelectorAll("#subjSliders input[type=range], #dispSliders input[type=range]");
    allQuizSliders().forEach(wireSlider);

    const soundBtn = byId("soundToggle");
    if (soundBtn) soundBtn.addEventListener("click", () => {
      const on = Sound.toggle();
      soundBtn.classList.toggle("off", !on);
      soundBtn.lastChild.textContent = on ? "Sound on" : "Sound off";
    });

    // colour each slider thumb accent live-ish (static: leave default blue)
    function readAnswers() {
      const U = {}; DIMS.forEach(d => U[d] = 0);
      PORDER.forEach(p => { const v = +byId("subj_" + p).value; U[p] += ((v - 50) / 50); });
      STATEMENTS.forEach((s, i) => {
        const v = +byId("disp_" + i).value; const f = (v - 50) / 50;
        for (const d in s.w) { U[d] += f * s.w[d]; }
      });
      return U;
    }
    function anyMoved() {
      let moved = false;
      PORDER.forEach(p => { if (+byId("subj_" + p).value !== 50) moved = true; });
      STATEMENTS.forEach((s, i) => { if (+byId("disp_" + i).value !== 50) moved = true; });
      return moved;
    }
    function resetSliders() {
      PORDER.forEach(p => byId("subj_" + p).value = 50);
      STATEMENTS.forEach((s, i) => byId("disp_" + i).value = 50);
      allQuizSliders().forEach(styleSlider);
    }
    byId("resetQuiz").addEventListener("click", resetSliders);
    byId("retake").addEventListener("click", () => { resetSliders(); showView("discover"); });

    /* ============ RECOMMENDER ============ */
    function dot(a, b) { let s = 0; DIMS.forEach(d => s += a[d] * (b[d] || 0)); return s; }
    function compute(U) {
      const Uplus = {}; DIMS.forEach(d => Uplus[d] = Math.max(0, U[d]));
      const mag = Math.sqrt(DIMS.reduce((s, d) => s + U[d] * U[d], 0));
      const thin = mag < 0.15;   // roughly: nothing moved, or moved by only a few points anywhere
      const scored = FIELDS.map(f => {
        const hat = fieldVecs[f.id].hat;
        const score = dot(U, hat);
        const posAff = dot(Uplus, hat);
        return { f, score, posAff, gap: posAff - score, hat };
      });
      scored.sort((a, b) => b.score - a.score);
      // only genuinely positive-scoring fields count as a "match": a narrow signal (say, one
      // rarely-used subject nudged slightly) should surface fewer cards, not get padded out to
      // 5 with an arbitrary zero-score field left over from array order.
      const positive = scored.filter(x => x.score > 0.01);
      const wheel = (positive.length ? positive : scored).slice(0, 5);
      const wheelIds = new Set(wheel.map(x => x.f.id));
      // stretch: not in wheel, ordered by positive affinity, where a disliked dim drags it
      const rest = scored.filter(x => !wheelIds.has(x.f.id) && x.posAff > 0.01).sort((a, b) => b.posAff - a.posAff);
      const strong = rest.filter(x => x.gap > 0.05);
      const stretch = (strong.length >= 3 ? strong : rest).slice(0, 3);
      return { wheel, stretch, U, Uplus, mag, thin };
    }
    function topMatchDims(hat, Uplus, n) {
      return DIMS.map(d => ({ d, v: hat[d] * Uplus[d] })).filter(x => x.v > 0.001)
        .sort((a, b) => b.v - a.v).slice(0, n).map(x => DIMLABEL[x.d]);
    }
    function culpritDim(f, U) {
      const raw = fieldVecs[f.id].raw;
      let best = null, bv = 0;
      DIMS.forEach(d => { if (U[d] < 0 && raw[d] > 0) { const v = raw[d] * (-U[d]); if (v > bv) { bv = v; best = d; } } });
      return best ? DIMLABEL[best] : null;
    }
    function topPositiveConnect(hat, Uplus) {
      const arr = DIMS.map(d => ({ d, v: hat[d] * Uplus[d] })).filter(x => x.v > 0.001).sort((a, b) => b.v - a.v);
      return arr.length ? DIMLABEL[arr[0].d] : "what you like";
    }

    function renderResults(res) {
      const wc = byId("wheelCards"), sc = byId("stretchCards");
      wc.innerHTML = ""; sc.innerHTML = "";
      byId("zoneThin").style.display = res.thin ? "" : "none";
      byId("zoneWheel").style.display = res.thin ? "none" : "";
      if (res.thin) {
        byId("thinMsg").textContent = "You left the sliders close to the middle, so there wasn't a strong signal to work from, and showing you a \"top match\" from that would have been closer to a coin flip than a real result. That's completely fine, plenty of people haven't figured out their likes yet. Go back and move a few sliders on anything you have even a mild opinion about, one or two is often enough, or start with the future-facing fields below instead.";
        byId("zoneStretch").style.display = "none";
      } else {
        res.wheel.forEach(x => {
          const c = mix(x.f.par);
          const dims = topMatchDims(x.hat, res.Uplus, 3);
          const card = document.createElement("div"); card.className = "rcard";
          card.style.borderLeftColor = rgb(c); card.style.setProperty("--fc", c.join(","));
          card.innerHTML = `<div class="rt"><h4 style="color:${rgb(c)}">${x.f.name}</h4><span class="go">See it on the map →</span></div>
          <p class="rw">${x.f.what}</p>
          ${dims.length ? `<div class="tags">${dims.map(d => `<span class="tag">${d}</span>`).join("")}</div>` : ""}`;
          card.addEventListener("mouseenter", () => Sound.hover(hoverPitch(x.f.id)));
          card.addEventListener("click", () => { showView("atlas"); atlasSelect(x.f.id); });
          wc.appendChild(card);
        });
        if (!res.stretch.length) { byId("zoneStretch").style.display = "none"; }
        else {
          byId("zoneStretch").style.display = "";
          res.stretch.forEach(x => {
            const c = mix(x.f.par);
            const why = stretchWhyText(x, res);
            const card = document.createElement("div"); card.className = "rcard";
            card.style.borderLeftColor = rgb(c); card.style.setProperty("--fc", c.join(","));
            card.innerHTML = `<div class="rt"><h4 style="color:${rgb(c)}">${x.f.name}</h4><span class="go">See it on the map →</span></div>
            <p class="rw">${x.f.what}</p>
            <p class="why">${why}</p>`;
            card.addEventListener("mouseenter", () => Sound.hover(hoverPitch(x.f.id)));
            card.addEventListener("click", () => { showView("atlas"); atlasSelect(x.f.id); });
            sc.appendChild(card);
          });
        }
      }
      renderFutureZone(res.thin);
    }

    function renderFutureZone(thin) {
      byId("futureSub").textContent = thin
        ? "a different way in, not matched to your answers"
        : "a different lens, also not matched to your answers";
      byId("futureIntro").innerHTML = thin
        ? `Since there wasn't much to go on above, here's another way in. These aren't picked for you, they're picked for where the world seems to be heading over the next couple of decades. The framing owes a debt to <a href="https://80000hours.org" target="_blank" rel="noopener">80,000 Hours</a>, which researches this question in far more depth than we can here.`
        : `A different lens on the same set of fields, not matched to what you said, but to broad trends many people expect to matter more over the next couple of decades. Worth weighing alongside your own interests, not instead of them. Framing inspired by <a href="https://80000hours.org" target="_blank" rel="noopener">80,000 Hours</a>, which researches this question in far more depth.`;
      const fc = byId("futureCards"); fc.innerHTML = "";
      FUTURE_IDS.forEach(id => {
        const f = FIELDS.find(x => x.id === id); if (!f) return;
        const c = mix(f.par);
        const card = document.createElement("div"); card.className = "rcard";
        card.style.borderLeftColor = rgb(c); card.style.setProperty("--fc", c.join(","));
        card.innerHTML = `<div class="rt"><h4 style="color:${rgb(c)}">${f.name}</h4><span class="go">See it on the map →</span></div>
        <p class="rw">${f.what}</p>
        <p class="why">${f.future}</p>`;
        card.addEventListener("mouseenter", () => Sound.hover(hoverPitch(f.id)));
        card.addEventListener("click", () => { showView("atlas"); atlasSelect(f.id); });
        fc.appendChild(card);
      });
    }

    /* ---- export a tailored prompt for any LLM ---- */
    function collectRaw() {
      const subj = {}; PORDER.forEach(p => subj[p] = +byId("subj_" + p).value);
      const disp = {}; STATEMENTS.forEach((s, i) => disp[i] = +byId("disp_" + i).value);
      return { subj, disp };
    }
    function stretchWhyText(x, res) {
      const connect = topPositiveConnect(x.hat, res.Uplus);
      const culprit = culpritDim(x.f, res.U);
      return culprit
        ? `People drawn to ${connect} often fall for this. It does lean on ${culprit} more than you rated, which is the only thing keeping it off your main list.`
        : `A little further from what you said, but close enough to ${connect} to be worth a look.`;
    }
    function buildExportPrompt(res, raw) {
      if (res.thin) {
        const futureLines = FUTURE_IDS.map(id => { const f = FIELDS.find(x => x.id === id); return `- ${f.name}: ${f.what} (${f.future})`; }).join("\n");
        return `I'm a high school student, around 15 to 17 years old, trying to get a sense of what I might want to study at university. I used a tool called Prism, which maps ordinary school subjects onto more specialised, interdisciplinary fields, and answered a short slider questionnaire about what I enjoy and how I like to think. I left most of the sliders near the middle, so the tool didn't have enough signal to give me a personalised match, and it was honest about that instead of guessing.

Instead, it showed me some "future-facing" fields, areas that seem likely to matter more over the next couple of decades regardless of my personal taste, not a ranking of which is most important, just things worth knowing exist:
${futureLines}

I'd like your help. Please act as a warm, knowledgeable guide, not someone pushing me toward a decision. I don't need to choose anything yet, I'm just exploring, and I don't actually know my own preferences that well yet.

Here's what would help:

1. Ask me a few open questions to get a sense of what I actually enjoy, since I haven't figured that out myself. Things like what I like doing in my free time, which school subjects don't feel like a chore, or what kind of problems I find myself curious about. Then connect what I tell you back to fields from the list above, or others you think fit better.

2. Once we've narrowed things down a bit, point me toward specific, real YouTube videos or channels that explore 2 or 3 relevant fields in an engaging, understandable way. I like things like a day in the life of a working scientist or engineer, clear explainer videos, or talks aimed at a general audience, rather than dry recorded lectures. If you're able to search or browse, please look these up and give me real, specific titles or links. If you can't browse, please don't invent specific video titles or links, since a made-up recommendation is worse than none here. Instead, name real, well-known channels or creators who cover this kind of content, and give me good search terms I can try on YouTube myself, and tell me that's what you're doing.

3. Keep the tone encouraging and low-pressure. This came from a self-guided tool I used for fun, not a formal assessment, so hold all of it loosely.`;
      }
      const wheelLines = res.wheel.map(x => `- ${x.f.name}: ${x.f.what}`).join("\n");
      const stretchLines = res.stretch.map(x => `- ${x.f.name}: ${x.f.what} (${stretchWhyText(x, res)})`).join("\n");
      const stretchBlock = res.stretch.length
        ? `\nFIELDS ONE STEP OUTSIDE MY WHEELHOUSE (a bit further out, but the kind of thing people like me are often pleasantly surprised by):\n${stretchLines}\n`
        : "";

      const lovedSubj = PORDER.filter(p => raw.subj[p] >= 70).map(p => PRIMS[p].name);
      const dislikedSubj = PORDER.filter(p => raw.subj[p] <= 30).map(p => PRIMS[p].name);
      const trueStmts = STATEMENTS.filter((s, i) => raw.disp[i] >= 70).map(s => s.t);
      const falseStmts = STATEMENTS.filter((s, i) => raw.disp[i] <= 30).map(s => s.t);
      let selfLines = "";
      if (lovedSubj.length) selfLines += `Subjects I enjoy: ${lovedSubj.join(", ")}\n`;
      if (dislikedSubj.length) selfLines += `Subjects I'm not drawn to: ${dislikedSubj.join(", ")}\n`;
      if (trueStmts.length) selfLines += `Feels true for me: ${trueStmts.join(" / ")}\n`;
      if (falseStmts.length) selfLines += `Doesn't feel like me: ${falseStmts.join(" / ")}\n`;
      if (!selfLines) selfLines = "I kept most sliders near the middle, so I don't have strong stated likes or dislikes yet.\n";

      return `I'm a high school student, around 15 to 17 years old, trying to get a sense of what I might want to study at university. I used a tool called Prism, which maps ordinary school subjects onto more specialised, interdisciplinary fields, and I answered a short slider questionnaire about what I enjoy and how I like to think.

I'd like your help exploring what it found. Please act as a warm, knowledgeable guide, not someone pushing me toward a decision. I don't need to choose anything yet, I'm just exploring.

FIELDS IN MY WHEELHOUSE (closely match what I said):
${wheelLines}
${stretchBlock}
A BIT ABOUT ME, FROM THE QUESTIONNAIRE:
${selfLines}
Here's what would help:

1. Pick 2 or 3 of the fields above that seem most worth a closer look, or ask me which ones I want to dig into first, then give me a short, honest sense of what studying and working in it is actually like, beyond the one-line summary above.

2. Point me toward specific, real YouTube videos or channels that explore these fields in an engaging, understandable way. I like things like a day in the life of a working scientist or engineer, clear explainer videos, or talks aimed at a general audience, rather than dry recorded lectures. If you're able to search or browse, please look these up and give me real, specific titles or links. If you can't browse, please don't invent specific video titles or links, since a made-up recommendation is worse than none here. Instead, name real, well-known channels or creators who cover this kind of content, and give me good search terms I can try on YouTube myself, and tell me that's what you're doing.

3. Feel free to ask me questions to narrow things down rather than covering everything at once, for example which fields sound most interesting just from the name and the one-line description.

4. Keep the tone encouraging and low-pressure. This came from a self-guided tool I used for fun, not a formal assessment, so hold it loosely.`;
    }

    let lastRes = null, lastRaw = null;
    byId("seeResults").addEventListener("click", () => {
      lastRaw = collectRaw();
      lastRes = compute(readAnswers());
      renderResults(lastRes);
      showView("results");
    });

    /* ---- prompt modal wiring ---- */
    const promptModal = byId("promptModal");
    function openPromptModal() {
      if (!lastRes) return;
      byId("promptText").value = buildExportPrompt(lastRes, lastRaw);
      promptModal.classList.add("open");
    }
    function closePromptModal() { promptModal.classList.remove("open"); }
    byId("exportPromptBtn").addEventListener("click", () => { Sound.press(); openPromptModal(); });
    byId("promptClose").addEventListener("click", closePromptModal);
    promptModal.addEventListener("click", e => { if (e.target === promptModal) closePromptModal(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && promptModal.classList.contains("open")) closePromptModal(); });
    byId("copyPromptBtn").addEventListener("click", async () => {
      const ta = byId("promptText"); let ok = false;
      try { await navigator.clipboard.writeText(ta.value); ok = true; } catch (e) { }
      if (!ok) { try { ta.focus(); ta.select(); ok = document.execCommand("copy"); } catch (e) { } }
      const msg = byId("copyMsg");
      msg.textContent = ok ? "Copied ✓" : "Select the text and copy manually";
      msg.classList.add("show");
      clearTimeout(msg._t); msg._t = setTimeout(() => msg.classList.remove("show"), 2200);
    });

    /* ============ ATLAS ============ */
    const CENTER = { x: 500, y: 360 }, RP = 295, FMAX = 300;
    const primPos = {};
    PORDER.forEach((p, i) => {
      const a = -Math.PI / 2 + i / PORDER.length * 2 * Math.PI;
      primPos[p] = { x: CENTER.x + RP * Math.cos(a), y: CENTER.y + RP * Math.sin(a) };
    });
    let seed = 42; function rnd() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
    const anodes = FIELDS.map(f => {
      const cx = f.par.reduce((s, p) => s + primPos[p].x, 0) / f.par.length;
      const cy = f.par.reduce((s, p) => s + primPos[p].y, 0) / f.par.length;
      return Object.assign({}, f, { x: cx + (rnd() - 0.5) * 40, y: cy + (rnd() - 0.5) * 40, tx: cx, ty: cy });
    });
    (function relax() {
      const iters = 520, REP = 30000, RR = 250, REPP = 55000, RRP = 170, KS = 0.05;
      for (let it = 0; it < iters; it++) {
        const step = 28 * (1 - it / iters) + 2;
        for (const n of anodes) {
          let fx = 0, fy = 0;
          for (const m of anodes) {
            if (m === n) continue; let dx = n.x - m.x, dy = n.y - m.y, d = Math.hypot(dx, dy) || 0.01;
            if (d < RR) { const f = REP / (d * d); fx += dx / d * f; fy += dy / d * f; }
          }
          for (const p of PORDER) {
            const pp = primPos[p]; let dx = n.x - pp.x, dy = n.y - pp.y, d = Math.hypot(dx, dy) || 0.01;
            if (d < RRP) { const f = REPP / (d * d); fx += dx / d * f; fy += dy / d * f; }
          }
          fx += KS * (n.tx - n.x); fy += KS * (n.ty - n.y);
          let mag = Math.hypot(fx, fy) || 0.0001; if (mag > step) { fx = fx / mag * step; fy = fy / mag * step; }
          n.x += fx; n.y += fy;
          const rdx = n.x - CENTER.x, rdy = n.y - CENTER.y, rd = Math.hypot(rdx, rdy);
          if (rd > FMAX) { n.x = CENTER.x + rdx / rd * FMAX; n.y = CENTER.y + rdy / rd * FMAX; }
        }
      }
    })();

    const svg = byId("svg");
    const defs = el("defs", {});
    defs.innerHTML = '<filter id="glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
    svg.appendChild(defs);
    
    const viewport = byId("viewport");
    const gEdges = el("g", {}); viewport.appendChild(gEdges);
    const gNodes = el("g", {}); viewport.appendChild(gNodes);
    const edgeEls = [];
    anodes.forEach(n => n.par.forEach(p => {
      const pp = primPos[p];
      const e = el("line", { x1: n.x, y1: n.y, x2: pp.x, y2: pp.y, class: "edge", stroke: rgb(PRIMS[p].rgb) });
      gEdges.appendChild(e); edgeEls.push({ el: e, field: n.id, prim: p });
    }));
    const nodeEls = {};
    PORDER.forEach(p => {
      const pp = primPos[p], c = PRIMS[p].rgb;
      const gWrap = el("g", { class: "node-wrap" });
      const g = el("g", { class: "node prim show", "data-id": p });
      const halo = el("circle", { cx: pp.x, cy: pp.y, r: 23, fill: rgba(c, 0.16), class: "n-halo", filter: "url(#glow)" });
      const circ = el("circle", { cx: pp.x, cy: pp.y, r: 15, fill: rgb(c), stroke: "rgba(255,255,255,.85)", "stroke-width": 1.4 });
      const lab = el("text", { x: pp.x, y: pp.y + 34, class: "label prim" }); lab.textContent = PRIMS[p].name;
      g.appendChild(halo); g.appendChild(circ); g.appendChild(lab);
      gWrap.appendChild(g);
      gNodes.appendChild(gWrap);
      nodeEls[p] = { g, gWrap, isPrim: true };
    });
    anodes.forEach(n => {
      const c = mix(n.par);
      const gWrap = el("g", { class: "node-wrap" });
      const g = el("g", { class: "node", "data-id": n.id });
      const halo = el("circle", { cx: n.x, cy: n.y, r: 12, fill: rgba(c, 0.14), class: "n-halo", filter: "url(#glow)" });
      const circ = el("circle", { cx: n.x, cy: n.y, r: 8, fill: rgb(c), stroke: "rgba(255,255,255,.28)", "stroke-width": 1 });
      const lab = el("text", { x: n.x, y: n.y - 15, class: "label" }); lab.textContent = n.name;
      g.appendChild(halo); g.appendChild(circ); g.appendChild(lab);
      gWrap.appendChild(g);
      gNodes.appendChild(gWrap);
      nodeEls[n.id] = { g, gWrap, isPrim: false };
    });

    const panel = byId("panel"), panelIn = byId("panelIn"), resetBtn = byId("reset"), legend = byId("legend");
    let focusPrim = null, focusField = null;
    
    // ViewBox zoom variables
    let targetVBox = { x: 0, y: 0, w: 1000, h: 720 };
    let currentVBox = { x: 0, y: 0, w: 1000, h: 720 };

    let physicsRunning = false;
    function activatePhysics() {
      if (!physicsRunning) {
        physicsRunning = true;
        requestAnimationFrame(updateGraphPhysics);
      }
    }

    function zoomToActiveNodes(activeIds) {
      if (!activeIds || activeIds.length === 0) {
        targetVBox = { x: 0, y: 0, w: 1000, h: 720 };
        return;
      }

      const isField = (focusField !== null);
      let targetX, targetY;
      let w, h;
      const targetAspect = 1000 / 720;

      if (isField) {
        // Centering on field node and average of its parents to focus on the selected region
        const selectedNode = anodes.find(item => item.id === focusField);
        if (selectedNode) {
          let avgX = selectedNode.x, avgY = selectedNode.y;
          let count = 1;
          selectedNode.par.forEach(pid => {
            if (primPos[pid]) {
              avgX += primPos[pid].x;
              avgY += primPos[pid].y;
              count++;
            }
          });
          targetX = avgX / count;
          targetY = avgY / count;
          
          w = 640;
          h = 640 / targetAspect;
        }
      }

      if (targetX === undefined) {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        activeIds.forEach(id => {
          let x, y;
          if (primPos[id]) {
            x = primPos[id].x;
            y = primPos[id].y;
          } else {
            const n = anodes.find(item => item.id === id);
            if (n) { x = n.x; y = n.y; }
          }
          if (x !== undefined && y !== undefined) {
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
          }
        });

        // Bounding box padding
        const pad = 95;
        minX -= pad; maxX += pad;
        minY -= pad; maxY += pad;

        w = maxX - minX;
        h = maxY - minY;

        if (w / h > targetAspect) {
          const targetH = w / targetAspect;
          const diffH = targetH - h;
          minY -= diffH / 2;
          h = targetH;
        } else {
          const targetW = h * targetAspect;
          const diffW = targetW - w;
          minX -= diffW / 2;
          w = targetW;
        }

        // Constrain zoom range (min width 500)
        if (w < 500) {
          const diff = 500 - w;
          minX -= diff / 2;
          w = 500;
          h = 500 / targetAspect;
        }
        
        // Constrain zoom range (max width 1000)
        if (w > 1000) {
          minX = 0;
          w = 1000;
          h = 720;
        }

        targetX = minX + w / 2;
        targetY = minY + h / 2;
      }

      // Calculate final minX, minY based on target center and zoom dimensions
      let minX = targetX - w / 2;
      let minY = targetY - h / 2;

      // Offset the viewBox center dynamically to clear side/bottom panels
      const isPortrait = window.innerHeight > window.innerWidth || window.innerWidth <= 640;
      if (isPortrait) {
        // Shift Y down (moves nodes up) to clear bottom sheet
        minY += h * 0.18;
      } else {
        // Shift X right (moves nodes left) to clear right side panel
        minX += w * 0.16;
      }

      targetVBox = { x: minX, y: minY, w: w, h: h };
      activatePhysics();
    }

    function clearHi() {
      focusField = null;
      targetVBox = { x: 0, y: 0, w: 1000, h: 720 };
      activatePhysics();
      edgeEls.forEach(e => { e.el.classList.remove("hot"); e.el.classList.remove("dim-edge"); });
      Object.keys(nodeEls).forEach(id => { const o = nodeEls[id]; o.g.classList.remove("dim"); if (!o.isPrim) o.g.classList.remove("show"); });
      [...legend.children].forEach(ch => { ch.classList.remove("on"); ch.style.background = ""; ch.style.borderColor = ""; ch.style.color = ""; });
    }
    function hoverPitch(id) {
      const pi = PORDER.indexOf(id);
      if (pi >= 0) return PROOT * Math.pow(2, PENTA[pi % PENTA.length] / 12) * 2;      // subjects, one octave up
      const fi = FIELDS.findIndex(f => f.id === id);
      const note = PENTA[((fi % PENTA.length) + PENTA.length) % PENTA.length];
      return PROOT * Math.pow(2, note / 12) * 4;                                  // fields, sparklier
    }
    function focusOnPrim(p) {
      Sound.press();
      focusPrim = p; clearHi();
      const activeIds = [p, ...anodes.filter(n => n.par.indexOf(p) >= 0).map(n => n.id)];
      zoomToActiveNodes(activeIds);
      anodes.forEach(n => { const on = n.par.indexOf(p) >= 0; nodeEls[n.id].g.classList.toggle("dim", !on); nodeEls[n.id].g.classList.toggle("show", on); });
      PORDER.forEach(q => nodeEls[q].g.classList.toggle("dim", q !== p));
      edgeEls.forEach(e => { if (e.prim === p) e.el.classList.add("hot"); else e.el.classList.add("dim-edge"); });
      [...legend.children].forEach(ch => { if (ch.dataset.p === p) { ch.classList.add("on"); ch.style.background = rgba(PRIMS[p].rgb, 0.9); ch.style.borderColor = "transparent"; ch.style.color = "#08101f"; } });
      resetBtn.classList.add("show");
      const count = anodes.filter(n => n.par.indexOf(p) >= 0).length;
      panelIn.innerHTML = `<p class="p-kicker">School subject &middot; a foundation</p>
      <h2 class="p-title" style="color:${rgb(PRIMS[p].rgb)}">${PRIMS[p].name}</h2>
      <p class="p-what">${PRIMS[p].blurb}</p>
      <div class="p-hook"><span class="lab">On the map</span>${count} field${count === 1 ? "" : "s"} are built partly from ${PRIMS[p].name}. They're lit now, the rest are dimmed. Tap any of them to see what it becomes.</div>`;
      panel.classList.add("open");
      panel.parentElement.classList.add("panel-open");
    }
    function clearFocus() { focusPrim = null; clearHi(); resetBtn.classList.remove("show"); panel.classList.remove("open"); panel.parentElement.classList.remove("panel-open"); }
    function hoverNode(id, on) {
      if (focusPrim) return;
      if (focusField) {
        const o = nodeEls[id];
        if (!o.isPrim && id !== focusField) {
          o.g.classList.toggle("show", on);
        }
        edgeEls.forEach(e => {
          if (e.field === focusField) {
            e.el.classList.add("hot");
          } else if (e.field === id) {
            e.el.classList.toggle("hot", on);
          }
        });
        return;
      }
      const o = nodeEls[id]; if (!o.isPrim) o.g.classList.toggle("show", on);
      edgeEls.forEach(e => { if (e.field === id) e.el.classList.toggle("hot", on); });
    }
    function selectField(id) {
      Sound.press();
      focusPrim = null; clearHi();
      focusField = id;
      const n = anodes.find(x => x.id === id);
      const activeIds = [id, ...n.par];
      zoomToActiveNodes(activeIds);
      anodes.forEach(m => nodeEls[m.id].g.classList.toggle("dim", m.id !== id));
      nodeEls[id].g.classList.remove("dim"); nodeEls[id].g.classList.add("show");
      PORDER.forEach(p => nodeEls[p].g.classList.toggle("dim", n.par.indexOf(p) < 0));
      edgeEls.forEach(e => { if (e.field === id) e.el.classList.add("hot"); else e.el.classList.add("dim-edge"); });
      resetBtn.classList.add("show");
      const c = mix(n.par);
      const chips = n.par.map(p => `<span class="m" data-p="${p}"><span class="sw" style="background:${rgb(PRIMS[p].rgb)}"></span>${PRIMS[p].name}</span>`).join("");
      const bar = n.par.map(p => `<span style="flex:1;background:${rgb(PRIMS[p].rgb)}"></span>`).join("");
      panelIn.innerHTML = `<p class="p-kicker">Field of study</p>
      <h2 class="p-title" style="color:${rgb(c)}">${n.name}</h2>
      <p class="p-what">${n.what}</p>
      <div class="p-row"><p class="p-lab">What it's obsessed with</p><p class="p-txt">${n.obsessed}</p></div>
      <div class="p-row"><p class="p-lab">On an ordinary Tuesday</p><p class="p-txt">${n.tuesday}</p></div>
      <div class="p-row"><p class="p-lab">Built from</p><div class="mix">${chips}</div>
        <div class="mixline">its colour<div class="mixbar">${bar}</div></div></div>
      <div class="p-hook"><span class="lab">Did you know</span>${n.hook}</div>`;
      panelIn.querySelectorAll(".mix .m").forEach(m => m.addEventListener("click", () => focusOnPrim(m.dataset.p)));
      panel.classList.add("open");
      panel.parentElement.classList.add("panel-open");
    }
    // expose for results -> atlas
    window.atlasSelect = selectField;

    Object.keys(nodeEls).forEach(id => {
      const o = nodeEls[id];
      o.g.addEventListener("mouseenter", () => { hoverNode(id, true); Sound.hover(hoverPitch(id)); });
      o.g.addEventListener("mouseleave", () => hoverNode(id, false));
      o.g.addEventListener("click", e => { e.stopPropagation(); o.isPrim ? focusOnPrim(id) : selectField(id); });
    });
    PORDER.forEach(p => {
      const b = document.createElement("button"); b.className = "chip"; b.dataset.p = p;
      b.innerHTML = `<span class="dot" style="background:${rgb(PRIMS[p].rgb)}"></span>${PRIMS[p].name}`;
      b.addEventListener("click", () => { focusPrim === p ? clearFocus() : focusOnPrim(p); }); legend.appendChild(b);
    });
    byId("close").addEventListener("click", clearFocus);
    resetBtn.addEventListener("click", clearFocus);
    svg.addEventListener("click", e => { if (e.target === svg && focusPrim) clearFocus(); });

    // entrance animation for atlas nodes (runs once; harmless while hidden)
    if (!window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
      Object.values(nodeEls).forEach((o, i) => {
        o.g.style.opacity = 0; o.g.style.transformBox = "fill-box";
        o.g.style.transformOrigin = "center"; o.g.style.transform = "scale(.6)";
        o.g.style.transition = "opacity .5s ease, transform .5s cubic-bezier(.2,.8,.2,1)";
        setTimeout(() => { o.g.style.opacity = 1; o.g.style.transform = "scale(1)"; }, 120 + i * 12);
      });
      gEdges.style.opacity = 0; gEdges.style.transition = "opacity 1s ease";
      setTimeout(() => gEdges.style.opacity = 1, 500);
    }

    document.addEventListener("pointerdown", () => Sound.wake());

    // ============ CUSTOM GLOWING POINTER ============
    const customCursor = byId("custom-cursor");
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let vx = 0;
    let vy = 0;
    let currentAngle = 0; // persistent angle state to avoid snapping to 0
    let cursorInitialized = false;
    let hoveredElement = null; // track currently hovered interactive element

    // Helper to extract background/accent color of hovered elements
    function getHoveredElementColor(el) {
      if (!el) return null;
      if (el.matches("input[type=range]")) {
        return getComputedStyle(el).getPropertyValue('--thumb').trim();
      }
      if (el.classList.contains("node")) {
        const circle = el.querySelector("circle");
        if (circle) return circle.getAttribute("fill");
      }
      if (el.classList.contains("rcard")) {
        return el.style.borderLeftColor || null;
      }
      if (el.classList.contains("chip")) {
        const dot = el.querySelector(".dot");
        if (dot) return getComputedStyle(dot).backgroundColor;
      }
      if (el.classList.contains("m")) {
        const sw = el.querySelector(".sw");
        if (sw) return sw.style.background || sw.style.backgroundColor || getComputedStyle(sw).backgroundColor;
      }
      return null;
    }

    window.addEventListener("pointermove", (e) => {
      if (!customCursor) return;
      
      // Hide on touch events (mobile/tablets) to avoid finger occlusion
      if (e.pointerType !== "mouse") {
        customCursor.style.display = "none";
        return;
      }
      
      customCursor.style.display = "block";
      targetX = e.clientX;
      targetY = e.clientY;

      if (!cursorInitialized) {
        currentX = targetX;
        currentY = targetY;
        vx = 0;
        vy = 0;
        cursorInitialized = true;
      }

      // Check if hovering over clickable or interactive items
      const target = e.target;
      hoveredElement = target.closest("button, a, input[type=range], .node, .rcard, .chip, .m, .reset, .close");
      
      if (hoveredElement) {
        customCursor.classList.add("hovering");
      } else {
        customCursor.classList.remove("hovering");
      }
    });

    window.addEventListener("pointerleave", () => {
      if (customCursor) {
        customCursor.style.display = "none";
        cursorInitialized = false;
        hoveredElement = null;
      }
    });

    window.addEventListener("pointerdown", (e) => {
      if (customCursor && e.pointerType === "mouse") {
        customCursor.classList.add("clicking");
        if (e.target.closest("input[type=range]")) {
          customCursor.classList.add("grabbing");
        }
      }
    });

    window.addEventListener("pointerup", (e) => {
      if (customCursor && e.pointerType === "mouse") {
        customCursor.classList.remove("clicking");
        customCursor.classList.remove("grabbing");
        // Update hover target state upon release
        const target = e.target;
        hoveredElement = target.closest("button, a, input[type=range], .node, .rcard, .chip, .m, .reset, .close");
      }
    });

    // Spring physics and liquid blob animation loop
    function updateCustomCursor() {
      if (cursorInitialized && customCursor && customCursor.style.display !== "none") {
        // Physics variables for spring simulation (responsive yet with inertia)
        const springTension = 0.08; // slower spring response for heavy dynamic feel
        const friction = 0.82;      // higher friction keeps momentum glide longer

        // Acceleration
        const ax = (targetX - currentX) * springTension;
        const ay = (targetY - currentY) * springTension;

        // Velocity updates
        vx = (vx + ax) * friction;
        vy = (vy + ay) * friction;

        // Position updates
        currentX += vx;
        currentY += vy;

        // Liquid elongation based on speed/velocity vector
        const speed = Math.sqrt(vx * vx + vy * vy);
        
        // Smoothly interpolate the rotation angle to prevent direction snapping
        if (speed > 0.15) {
          const targetAngle = Math.atan2(vy, vx);
          let diff = targetAngle - currentAngle;
          // Wrap difference within [-PI, PI] to rotate the shortest path
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          currentAngle += diff * 0.12; // smooth angle transition
        }

        // Elongate on X (direction of motion), squash on Y (staying bloby and liquid)
        const maxStretch = 1.32; // capped lower so it remains a roundish liquid blob
        const minSquash = 0.76;  // doesn't flatten too thin
        const stretchFactor = 0.038; // gradual stretch
        const scaleX = Math.min(maxStretch, 1 + speed * stretchFactor);
        const scaleY = Math.max(minSquash, 1 - speed * (stretchFactor * 0.5));

        // State-based sizing/scaling
        let baseScale = 1.0;
        const isClicking = customCursor.classList.contains("clicking");
        const isGrabbing = customCursor.classList.contains("grabbing");
        const isHovering = customCursor.classList.contains("hovering");

        if (isClicking) {
          baseScale = 0.7;
        } else if (isGrabbing) {
          baseScale = 1.15 + Math.sin(Date.now() * 0.012) * 0.12; // dynamic pulse glow
        }

        const finalScaleX = baseScale * scaleX;
        const finalScaleY = baseScale * scaleY;

        customCursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${currentAngle}rad) scale(${finalScaleX}, ${finalScaleY})`;

        // Determine dynamic color adoption
        let cursorColor = "rgb(34, 211, 238)"; // default light blue
        let isGlowCustom = false;

        if (hoveredElement && hoveredElement.classList.contains("primary")) {
          // Dynamic rainbow cycle for the primary colorful landing button
          const hue = (Date.now() / 20) % 360;
          cursorColor = `hsl(${hue}, 85%, 60%)`;
          isGlowCustom = true;
        } else if (hoveredElement) {
          // Extract specific color of the hovered item if it exists
          const extracted = getHoveredElementColor(hoveredElement);
          if (extracted) {
            cursorColor = extracted;
            isGlowCustom = true;
          }
        }

        // Apply background and box shadow styling dynamically
        if (isGrabbing || (isClicking && hoveredElement && hoveredElement.matches("input[type=range]"))) {
          customCursor.style.backgroundColor = cursorColor;
          customCursor.style.boxShadow = `0 0 30px ${cursorColor}, 0 0 60px ${cursorColor}, 0 0 90px ${cursorColor}`;
        } else if (isHovering) {
          customCursor.style.backgroundColor = cursorColor;
          customCursor.style.boxShadow = `0 0 16px ${cursorColor}, 0 0 32px ${cursorColor}, 0 0 48px ${cursorColor}`;
        } else {
          customCursor.style.backgroundColor = "#ffffff";
          customCursor.style.boxShadow = `0 0 12px rgba(59, 130, 246, 0.8), 0 0 24px rgba(139, 92, 246, 0.6), 0 0 36px rgba(34, 211, 238, 0.4)`;
        }
      }
      requestAnimationFrame(updateCustomCursor);
    }
    requestAnimationFrame(updateCustomCursor);

    // ============ DYNAMIC NODE REPULSION PHYSICS ============
    const graphNodes = [];
    
    // Primary subject nodes
    PORDER.forEach(p => {
      const pp = primPos[p];
      graphNodes.push({
        id: p,
        gWrap: nodeEls[p].gWrap,
        baseX: pp.x,
        baseY: pp.y,
        currentX: pp.x,
        currentY: pp.y,
        targetX: pp.x,
        targetY: pp.y
      });
    });
    
    // Field nodes
    anodes.forEach(n => {
      graphNodes.push({
        id: n.id,
        gWrap: nodeEls[n.id].gWrap,
        baseX: n.x,
        baseY: n.y,
        currentX: n.x,
        currentY: n.y,
        targetX: n.x,
        targetY: n.y
      });
    });

    // Pre-link graph nodes to edge elements for O(1) loop lookup speedup
    edgeEls.forEach(edge => {
      edge.fieldNode = graphNodes.find(n => n.id === edge.field);
      edge.primNode = graphNodes.find(n => n.id === edge.prim);
    });

    let mouseInSvg = false;
    let localMouseX = 0;
    let localMouseY = 0;

    svg.addEventListener("pointermove", (e) => {
      mouseInSvg = true;
      const rect = svg.getBoundingClientRect();
      // Translate screen pointer coordinates to local viewBox (1000 x 720) coordinates
      const svgMouseX = ((e.clientX - rect.left) / rect.width) * 1000;
      const svgMouseY = ((e.clientY - rect.top) / rect.height) * 720;
      
      // Map to transformed viewport space
      const s = 1000 / currentVBox.w;
      const tx = -currentVBox.x * s;
      const ty = -currentVBox.y * s;
      
      localMouseX = (svgMouseX - tx) / s;
      localMouseY = (svgMouseY - ty) / s;
      
      activatePhysics();
    });

    svg.addEventListener("pointerleave", () => {
      mouseInSvg = false;
    });

    window.addEventListener("resize", () => {
      if (focusField !== null) {
        const n = anodes.find(x => x.id === focusField);
        if (n) zoomToActiveNodes([focusField, ...n.par]);
      } else if (focusPrim !== null) {
        const activeIds = [focusPrim, ...anodes.filter(n => n.par.indexOf(focusPrim) >= 0).map(n => n.id)];
        zoomToActiveNodes(activeIds);
      }
    });

    function updateGraphPhysics() {
      let isGraphActive = false;

      graphNodes.forEach(node => {
        if (mouseInSvg) {
          const dx = node.baseX - localMouseX;
          const dy = node.baseY - localMouseY;
          const distSq = dx * dx + dy * dy;
          const repelRadius = 80;
          const repelRadiusSq = repelRadius * repelRadius; // 6400
          const maxRepel = 15;
          
          if (distSq < repelRadiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            let force = (repelRadius - dist) / repelRadius;
            if (dist < 40) force *= (dist / 40);
            node.targetX = node.baseX + (dx / dist) * force * maxRepel;
            node.targetY = node.baseY + (dy / dist) * force * maxRepel;
          } else {
            node.targetX = node.baseX;
            node.targetY = node.baseY;
          }
        } else {
          node.targetX = node.baseX;
          node.targetY = node.baseY;
        }

        const diffX = node.targetX - node.currentX;
        const diffY = node.targetY - node.currentY;
        const distFromBaseSq = (node.currentX - node.baseX) ** 2 + (node.currentY - node.baseY) ** 2;

        if (Math.abs(diffX) > 0.05 || Math.abs(diffY) > 0.05 || distFromBaseSq > 0.0025) { // 0.05^2 = 0.0025
          isGraphActive = true;
          node.currentX += diffX * 0.12;
          node.currentY += diffY * 0.12;
          const ox = node.currentX - node.baseX;
          const oy = node.currentY - node.baseY;
          node.gWrap.style.transform = `translate(${ox}px, ${oy}px)`;
        } else {
          node.currentX = node.targetX;
          node.currentY = node.targetY;
        }
      });

      // Update edges if any node was active/moving
      if (isGraphActive) {
        edgeEls.forEach(edge => {
          if (edge.fieldNode && edge.primNode) {
            edge.el.setAttribute("x1", edge.fieldNode.currentX);
            edge.el.setAttribute("y1", edge.fieldNode.currentY);
            edge.el.setAttribute("x2", edge.primNode.currentX);
            edge.el.setAttribute("y2", edge.primNode.currentY);
          }
        });
      }

      // Update viewBox smoothly (physics zoom/pan) only if animating
      const dVBoxX = targetVBox.x - currentVBox.x;
      const dVBoxY = targetVBox.y - currentVBox.y;
      const dVBoxW = targetVBox.w - currentVBox.w;
      const dVBoxH = targetVBox.h - currentVBox.h;

      let isVBoxActive = false;
      
      const applyViewportTransform = () => {
        const s = 1000 / currentVBox.w;
        const tx = -currentVBox.x * s;
        const ty = -currentVBox.y * s;
        viewport.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
      };

      if (Math.abs(dVBoxX) > 0.05 || Math.abs(dVBoxY) > 0.05 || Math.abs(dVBoxW) > 0.05 || Math.abs(dVBoxH) > 0.05) {
        isVBoxActive = true;
        currentVBox.x += dVBoxX * 0.085;
        currentVBox.y += dVBoxY * 0.085;
        currentVBox.w += dVBoxW * 0.085;
        currentVBox.h += dVBoxH * 0.085;
        applyViewportTransform();
      } else if (currentVBox.x !== targetVBox.x || currentVBox.y !== targetVBox.y || currentVBox.w !== targetVBox.w || currentVBox.h !== targetVBox.h) {
        currentVBox.x = targetVBox.x;
        currentVBox.y = targetVBox.y;
        currentVBox.w = targetVBox.w;
        currentVBox.h = targetVBox.h;
        applyViewportTransform();
      }

      if (isVBoxActive) {
        svg.classList.add("animating");
      } else {
        svg.classList.remove("animating");
      }

      if (isGraphActive || isVBoxActive || mouseInSvg) {
        requestAnimationFrame(updateGraphPhysics);
      } else {
        physicsRunning = false;
      }
    }
    
    activatePhysics();

    showView("home");
  })();
