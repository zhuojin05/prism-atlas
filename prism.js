(function () {
    "use strict";

    /* ============ I18N & LANGUAGE SUPPORT ============ */
    let currentLang = (function() {
      try {
        const saved = localStorage.getItem("prism_lang");
        if (saved === "sk" || saved === "en") return saved;
      } catch (e) {}
      return "en";
    })();

    const I18N_STATIC = {
      en: {
        nav_discover: "Discover",
        nav_atlas: "Atlas",
        home_hero_title: "School shows you ten subjects. It hides a <em>thousand fields</em>.",
        home_hero_sub: "A prism splits plain white light into a whole spectrum. Prism does the same to the subjects you already take, and turns them into a map of what you could actually study.",
        home_cta_discover: "Find fields for me",
        home_cta_atlas: "Explore the atlas",
        home_note: "Nothing here is a test or a verdict. It's a set of doorways to be curious about. You can change your mind as many times as you like.",
        home_card1_title: "Answer a few sliders",
        home_card1_desc: "Say what you enjoy and how you like to think. Middle means no strong feeling. Two minutes, no wrong answers.",
        home_card2_title: "Get two kinds of fields",
        home_card2_desc: "The ones squarely in your wheelhouse, and the ones just outside it that tend to surprise people like you.",
        home_card3_title: "See them on the map",
        home_card3_desc: "Every field is built from school subjects, and coloured by the mix. Follow the lines to see where anything comes from.",
        disc_title: "A few questions.",
        disc_desc: 'Move each slider. The middle means "no strong feeling either way", and it counts for nothing, so only move the ones you have an opinion on. There are no right answers.',
        disc_part1_lead: "Part one",
        disc_part1_desc: "How much do you enjoy these, just as you know them from school?",
        disc_part2_lead: "Part two",
        disc_part2_desc: "How true does each of these feel about you?",
        disc_btn_results: "Show me some fields",
        disc_btn_reset: "Reset sliders",
        res_title: "Fields to be curious about.",
        res_desc: "These are starting points, not answers. Tap any one to see what it's made of and what a person in it actually does.",
        res_thin_title: "Not much to go on yet",
        res_thin_btn: "Go back and move a few sliders",
        res_wheel_title: "In your wheelhouse",
        res_wheel_sub: "close to what you told me you like",
        res_stretch_title: "One step outside",
        res_stretch_sub: "held back by one thing you said, but worth a look",
        res_future_title: "Future-facing fields",
        res_disclaimer: "This is a rough compass, built by hand, not a scientific test. It knows nothing about you beyond the sliders you moved. The point is to widen the field of view, so treat a surprising result as an invitation to go read about it, not as a judgement.",
        res_btn_ai: "Continue this with an AI",
        res_btn_atlas: "Open the full atlas",
        res_btn_retake: "Retake",
        atlas_title: "The Atlas",
        atlas_desc: "Subjects on the ring. Fields inside. Tap a subject to see everything it touches.",
        atlas_reset: "Clear focus",
        modal_title: "Take this further with an AI",
        modal_desc: "Copy this and paste it into ChatGPT, Claude, Gemini, or any AI assistant you already use. It carries what you told Prism, so you won't have to explain it again, and it steers the AI away from making up video links it can't actually verify.",
        modal_copy: "Copy prompt",
        sound_on: "Sound on",
        sound_off: "Sound off"
      },
      sk: {
        nav_discover: "Objavuj",
        nav_atlas: "Atlas",
        home_hero_title: "Škola vám ukáže desať predmetov. Skrýva však <em>tisíc odborov</em>.",
        home_hero_sub: "Hranol rozkladá biele svetlo na celé spektrum. Prism robí to isté s predmetmi, ktoré už študujete, a premieňa ich na mapu toho, čo by ste mohli naozaj študovať.",
        home_cta_discover: "Nájsť odbory pre mňa",
        home_cta_atlas: "Preskúmať atlas",
        home_note: "Nič tu nie je test ani verdikt. Je to súbor dverí na podnietenie zvedavosti. Svoj názor môžete zmeniť koľkokrát chcete.",
        home_card1_title: "Odpovedzte na pár posuvníkov",
        home_card1_desc: "Povedzte, čo vás baví a ako radi premýšľate. Stred znamená bez vyhraneného názoru. Dve minúty, žiadne zlé odpovede.",
        home_card2_title: "Získajte dva druhy odborov",
        home_card2_desc: "Tie, ktoré presne sedia k vašim záujmom, a tie tesne vedľa, ktoré ľuďom ako vy zvyknú vyraziť dych.",
        home_card3_title: "Pozrite si ich na mape",
        home_card3_desc: "Každý odbor je postavený zo školských predmetov a sfarbený ich kombináciou. Sledujte čiary a zistite, odkiaľ čo pochádza.",
        disc_title: "Pár otázok.",
        disc_desc: "Posuňte každý posuvník. Stred znamená „nemám vyhranený názor“ a nepočíta sa, takže posúvajte len tie, na ktoré máte názor. Žiadne odpovede nie sú nesprávne.",
        disc_part1_lead: "Prvá časť",
        disc_part1_desc: "Ako veľmi vás baví toto, tak ako to poznáte zo školy?",
        disc_part2_lead: "Druhá časť",
        disc_part2_desc: "Ako veľmi to vystihuje práve vás?",
        disc_btn_results: "Ukáž mi odbory",
        disc_btn_reset: "Reštartovať posuvníky",
        res_title: "Odbory, ktoré stoja za zvedavosť.",
        res_desc: "Toto sú odrazové mostíky, nie konečné odpovede. Ťuknite na ktorýkoľvek a zistite, z čoho pozostáva a čo človek v ňom naozaj robí.",
        res_thin_title: "Zatiaľ málo informácií",
        res_thin_btn: "Vráťte sa a posuňte niekoľko posuvníkov",
        res_wheel_title: "Vaša parketa",
        res_wheel_sub: "blízko toho, čo ste označili ako obľúbené",
        res_stretch_title: "Krok vedľa",
        res_stretch_sub: "brzdené jednou vašou odpoveďou, ale stojí za pozretie",
        res_future_title: "Odbory budúcnosti",
        res_disclaimer: "Toto je orientačný kompas vytvorený ručne, nie vedecký test. Nevie o vás nič okrem posuvníkov, ktoré ste posunuli. Cieľom je rozšíriť si obzory, preto berte prekvapivý výsledok ako pozvánku na čítanie, nie ako rozsudok.",
        res_btn_ai: "Pokračovať s AI",
        res_btn_atlas: "Otvoriť celý atlas",
        res_btn_retake: "Skúsiť znova",
        atlas_title: "Atlas",
        atlas_desc: "Predmety na obvode. Odbory vo vnútri. Ťuknite na predmet a uvidíte všetko, čoho sa dotýka.",
        atlas_reset: "Vymazať výber",
        modal_title: "Rozviňte to ďalej s AI",
        modal_desc: "Skopírujte toto a vložte to do ChatGPT, Claude, Gemini alebo akéhokoľvek AI asistenta, ktorého používate. Obsahuje vaše odpovede z Prismu, takže mu to nemusíte vysvetľovať znova, a navedie AI bez toho, aby si vymýšľala nefunkčné odkazy.",
        modal_copy: "Kopírovať výzvu",
        sound_on: "Zvuk zapnutý",
        sound_off: "Zvuk vypnutý"
      }
    };

    const PRIMS_I18N = {
      en: {
        math: { name: "Mathematics", blurb: "The language everything else is written in. Pattern, structure, and proof." },
        phys: { name: "Physics", blurb: "The rules the universe runs on, from atoms to galaxies." },
        chem: { name: "Chemistry", blurb: "What everything is made of, and how it rearranges." },
        bio: { name: "Biology", blurb: "How living things work, from single molecules to whole ecosystems." },
        earth: { name: "Earth Science", blurb: "The planet itself. Rocks, oceans, atmosphere, and deep time." },
        cs: { name: "Computer Science", blurb: "How to compute, store, and reason with information." },
        psych: { name: "Psychology", blurb: "How individuals think, feel, perceive, and behave." },
        historyculture: { name: "History & Culture", blurb: "The human past, and how cultures and societies actually lived and left their mark." },
        econpol: { name: "Economics & Politics", blurb: "How markets, institutions, and governments make decisions, and who that affects." },
        art: { name: "Art & Design", blurb: "Making things that communicate, move people, or get used." }
      },
      sk: {
        math: { name: "Matematika", blurb: "Jazyk, v ktorom je napísané všetko ostatné. Vzory, štruktúra a dôkazy." },
        phys: { name: "Fyzika", blurb: "Pravidlá, ktorými sa riadi vesmír, od atómov až po galaxie." },
        chem: { name: "Chémia", blurb: "Z čoho pozostáva všetko okolo nás a ako sa to premieňa." },
        bio: { name: "Biológia", blurb: "Ako fungujú živé organizmy, od jedinej molekuly po celé ekosystémy." },
        earth: { name: "Vedy o Zemi", blurb: "Planéta samotná. Horniny, oceány, atmosféra a hlboký čas." },
        cs: { name: "Počítačové vedy", blurb: "Ako spracovávať, uchovávať a logicky vyhodnocovať informácie." },
        psych: { name: "Psychológia", blurb: "Ako jednotlivci myslia, cítia, vnímajú a konajú." },
        historyculture: { name: "História a kultúra", blurb: "Ľudská minulosť a to, ako kultúry a spoločnosti žili a zanechali svoju stopu." },
        econpol: { name: "Ekonómia a politika", blurb: "Ako trhy, inštitúcie a vlády robia rozhodnutia a koho tým ovplyvňujú." },
        art: { name: "Umenie a dizajn", blurb: "Tvorba vecí, ktoré komunikujú, hýbu ľuďmi alebo nachádzajú využitie." }
      }
    };

    const DIMLABEL_I18N = {
      en: {
        math: "maths", phys: "physics", chem: "chemistry", bio: "biology", earth: "the planet",
        cs: "computing", psych: "psychology", historyculture: "history and culture", econpol: "economics and politics", art: "art & design", build: "making things", theory: "understanding why",
        small: "the very small", large: "the very big", people: "helping people", hands: "hands-on work"
      },
      sk: {
        math: "matematiku", phys: "fyziku", chem: "chémiu", bio: "biológiu", earth: "našu planétu",
        cs: "informatiku", psych: "psychológiu", historyculture: "históriu a kultúru", econpol: "ekonómiu a politiku", art: "umenie a dizajn", build: "tvorbu vecí", theory: "chápanie podstaty",
        small: "mikrosvet", large: "makrosvet", people: "pomoc ľuďom", hands: "praktickú prácu"
      }
    };

    const STATEMENTS_I18N = {
      en: [
        "I am drawn to systems that are messy, living, and unpredictable over things that follow strict mathematical rules.",
        "I care more about understanding the deepest fundamental truths of the universe than inventing a physical product.",
        "I like the idea of writing rules, algorithms, or code to find hidden patterns or automate a process so I don't have to do it by hand.",
        "I enjoy the idea of carefully mixing, purifying, or testing physical substances in a lab setting to see exactly how they react.",
        "I want to work on solving massive global bottlenecks (like climate or disease), even if I never directly meet the people I help.",
        "I am fascinated by how microscopic things—like a single cell, a molecule, or a microchip—can completely control the world.",
        "I am highly motivated by directly understanding, interacting with, and improving the daily lives of individuals.",
        "I love analyzing how power, culture, language, and human behavior shape history, rather than focusing purely on science.",
        "I want to physically make things—prototypes, circuits, or structures—where I can touch the result and see it work.",
        "When I look at a product, system, or building, I constantly think about how its design could be more beautiful or intuitive for the user.",
        "I enjoy getting lost in complex puzzles and pure logic, even if they don't have an immediate real-world use."
      ],
      sk: [
        "Lákajú ma skôr živé, nepredvídateľné a komplexné systémy než veci riadiace sa prísnymi matematickými pravidlami.",
        "Viac mi záleží na pochopení najhlbších základných právd vesmíru než na vynájdení fyzického produktu.",
        "Páči sa mi myšlienka písania pravidiel, algoritmov alebo kódu na odhalenie skrytých vzorov alebo automatizáciu procesov.",
        "Baví ma myšlienka presného miešania, čistenia a testovania fyzických látok v laboratóriu, aby som videl, ako reagujú.",
        "Chcem pracovať na riešení masívnych globálnych výziev (ako klíma či choroby), aj keď sa s ľuďmi, ktorým pomáham, nikdy osobne nestretnem.",
        "Fascinuje ma, ako mikroskopické veci — ako jediná bunka, molekula alebo mikročip — dokážu plne ovládať svet.",
        "Mám silnú motiváciu priamo chápať ľudí, komunikovať s nimi a zlepšovať ich každodenný život.",
        "Rád analyzujem, ako moc, kultúra, jazyk a ľudské správanie utvárajú históriu, namiesto zamerania sa čisto na prírodné vedy.",
        "Chcem fyzicky tvoriť veci — prototypy, obvody alebo konštrukcie — kde sa môžem výsledku dotknúť a vidieť ho fungovať.",
        "Keď sa pozriem na produkt, systém alebo budovu, neustále premýšľam nad tým, ako by mohol byť jeho dizajn krajší alebo intuitívnejší.",
        "Rád sa strácam v zložitejších hlavolamoch a čistej logike, aj keď nemajú okamžité reálne využitie."
      ]
    };

    const FIELDS_I18N = {
      sk: {
        materials: {
          name: "Materiálové vedy",
          what: "Prečo sa látky správajú tak, ako sa správajú, a ako vynájsť materiály s lepšími vlastnosťami.",
          obsessed: "Čo robí materiál pevným, ohybným, priehľadným alebo schopným vydržať štart rakety.",
          tuesday: "Naťahovanie novej zliatiny alebo plastu v stroji, kým nepraskne, a meranie kedy a prečo sa to stalo.",
          hook: "Pavúčie hodváb je na svoju hmotnosť pevnejšie ako oceľ. Veľká časť odboru sa snaží napodobniť materiály, ktoré príroda dávno vyvinula.",
          future: "Batérie, solárne články a nízkouhlíkové stavby narážajú na hranice súčasných materiálov."
        },
        compchem: {
          name: "Počítačová a teoretická chémia",
          what: "Predpovedanie správania a reakcií molekúl pomocou fyziky a matematiky predtým alebo namiesto testovania v laboratóriu.",
          obsessed: "Čo sa vlastne deje s elektrónmi a atómami počas reakcie v časoch a mierkach príliš rýchlych a malých na priame pozorovanie.",
          tuesday: "Spustenie simulácie štruktúry a energie molekuly a porovnanie predpovede s reálnym meraním.",
          hook: "Nobelova cena za chémiu za rok 2013 bola udelená za metódy simulácie chemických reakcií na počítači."
        },
        biophys: {
          name: "Biofyzika",
          what: "Využitie nástrojov fyziky na skúmanie toho, ako si život udržiava svoju štruktúru.",
          obsessed: "Sily, energia a pohyb vo vnútri jedinej živej bunky.",
          tuesday: "Použitie laserového lúča na uchopenie jednej molekuly a meranie sily, ktorou ťahá.",
          hook: "Bunka nie je len vrecko s polievkou. Zoskupuje sa do kvapiek ako olej vo vode, čo sa ukazuje ako fyzikálny problém."
        },
        geophys: {
          name: "Geofyzika",
          what: "Fyzika zameraná na celú planétu.",
          obsessed: "Čo sa deje v Zemi tisíce kilometrov pod našimi nohami.",
          tuesday: "Čítanie signálov zemetrasení na mapovanie vnútra planéty, podobne ako ultrazvuk mapuje telo.",
          hook: "Nikdy sme nevŕtali ani zďaleka do stredu Zeme. Skoro všetko vieme vďaka počúvaniu jej otrasov."
        },
        astro: {
          name: "Astrofyzika",
          what: "Fyzika všetkého vo vesmíre mimo Zeme.",
          obsessed: "Ako v skutočnosti fungujú hviezdy, galaxie a čierne diery.",
          tuesday: "Písanie kódu na simuláciu zanikajúcej hviezdy alebo prechádzanie údajov z teleskopu.",
          hook: "Zlato v prsteni vzniklo pri zrážke dvoch neutrónových hviezd dlho predtým, než vzniklo Slnko."
        },
        aero: {
          name: "Letecké a kozmické inžinierstvo",
          what: "Konštruovanie vecí, ktoré lietajú a nespadnú z oblohy.",
          obsessed: "Ako prúdi vzduch okolo krídla a ako zvládnuť vysoké rýchlosti.",
          tuesday: "Testovanie tvaru krídla v simulovanom veternom tuneli na zníženie odporu.",
          hook: "Krídlo nie je vysávané nahor. Ohýba vzduch nadol a vzduch tlačí naspäť podľa Newtonových zákonov."
        },
        civil: {
          name: "Stavebné inžinierstvo a statika",
          what: "Navrhovanie stavieb tak, aby zostali bezpečne stáť.",
          obsessed: "Koľko toho most, veža alebo tunel znesie, kým nezlyhá.",
          tuesday: "Výpočet nosnosti nosníka a preverenie, čo by s ním spravilo zemetrasenie.",
          hook: "Každá konštrukcia je navrhnutá tak, aby sa trochu ohýbala. Mrakodrap, ktorý by sa vo vetre nepohol, by praskol."
        },
        ml: {
          name: "Strojové učenie a AI",
          what: "Budovanie systémov, ktoré sa učia vzory z príkladov namiesto prísneho určovania pravidiel.",
          obsessed: "Ako prinútiť stroj zlepšovať sa v činnosti s pribúdajúcimi dátami.",
          tuesday: "Trénovanie modelu na príkladoch, sledovanie neúspechov a úprava parametrov.",
          hook: "Jazykovému modelu nikto nedal učebnicu gramatiky. Naučil sa ju čítaním ako malé dieťa, len rýchlejšie.",
          future: "AI sa integruje do takmer každého odboru rýchlejšie, než inštitúcie stíhajú školiť odborníkov."
        },
        robotics: {
          name: "Robotika",
          what: "Dávanie tela strojom a ich učenie, ako ho používať.",
          obsessed: "Ako stroj vníma svet a pohybuje sa v ňom bez toho, aby niečo rozbil.",
          tuesday: "Ladenie, prečo rameno robota opakovane míňa objekt o dva centimetre.",
          hook: "Chôdza je jedna z najťažších vecí na naučenie robota. Vy to robíte bez rozmýšľania, robot musí riešiť fyziku pri každom kroku."
        },
        neuro: {
          name: "Neuroveda",
          what: "Zisťovanie, ako hromada tkaniva vytvára myšlienky, pamäť a vaše „ja“.",
          obsessed: "Ako sa signály pohybujú mozgom a menia sa na zážitky.",
          tuesday: "Nahrávanie elektrickej aktivity neurónov počas rozhodovania.",
          hook: "Váš mozog spotrebuje približne toľko energie ako slabá žiarovka na činnosti, ktoré nezvládne ani superpočítač."
        },
        sciillus: {
          name: "Vedecká ilustrácia a vizualizácia",
          what: "Kreslenie a návrh vizuálov, ktoré robia vedu a živé organizmy okamžite pochopiteľnými.",
          obsessed: "Ako zobraziť presné biologické skutočnosti tak, aby boli zároveň krásne.",
          tuesday: "Skicovanie orgánu podľa podkladov a zdokonaľovanie kresby pre laickú verejnosť.",
          hook: "Pred vznikom fotografie boli ilustrátori jediným spôsobom, ako vidieť vnútro bunky či anatomické detaily."
        },
        cogsci: {
          name: "Kognitívna veda",
          what: "Reverzné inžinierstvo mysle spájaním poznatkov z viacerých vedných odborov.",
          obsessed: "Čím myslenie v skutočnosti je — u ľudí aj u strojov.",
          tuesday: "Navrhovanie experimentu na zachytenie predvídateľnej chyby ľudskej mysle.",
          hook: "Rovnaké ilúzie, ktoré oklamú vaše oči, dokážu oklamať aj systémy umelej inteligencie."
        },
        complling: {
          name: "Počítačová lingvistika",
          what: "Učenie strojov pracovať s ľudským jazykom a využívanie strojov na jeho pochopenie.",
          obsessed: "Ako vzniká význam zo zvukov, slov a jazykovej štruktúry.",
          tuesday: "Tvorba modelu, ktorý dokáže rozlíšiť, či dve vety znamenajú to isté.",
          hook: "Každý jazyk na Zemi sa riadi hlbokými pravidlami, ktoré sami hovoriaci nevedia vysvetliť."
        },
        envsci: {
          name: "Environmentálna veda",
          what: "Ako sa navzájom ovplyvňujú živé organizmy a ich životné prostredie.",
          obsessed: "Interakcia znečistenia, klímy a ekosystémov a možnosti nápravy škôd.",
          tuesday: "Testovanie chemického zloženia vody v rieke na odhalenie zdroja znečistenia.",
          hook: "Jediná čajová lyžička zdravej pôdy obsahuje viac živých organizmov než je ľudí na Zemi.",
          future: "Ekosystémy pod tlakom znečistenia a využívania krajiny potrebujú odborníkov na meranie a znižovanie škôd."
        },
        ocean: {
          name: "Oceánografia",
          what: "Oceán ako obrovský, pohybujúci sa a živý systém.",
          obsessed: "Ako prúdy, chémia a morský život utvárajú celú planétu.",
          tuesday: "Spúšťanie prístrojov kilometre hlboko a čítanie odoslaných dát.",
          hook: "Oceán produkuje viac ako polovicu kyslíka, ktorý dýchate, najmä vďaka mikroskopickým rastlinám."
        },
        climate: {
          name: "Klimatológia",
          what: "Atmosféra a oceán ako jeden obrovský fyzikálny problém.",
          obsessed: "Ako sa energia pohybuje vzduchom a vodou planéty a kam smeruje.",
          tuesday: "Spustenie simulácie klímy a jej porovnanie so storočím reálnych meraní.",
          hook: "Modelom predpovedajúcim budúce storočie sa dôveruje vďaka tomu, že dokážu presne „predpovedať“ minulosť.",
          future: "Vlády, mestá a firmy budú stále potrebovať odborníkov na modelovanie a predpovedanie zmeny klímy."
        },
        biosecurity: {
          name: "Syntetická biológia a biobezpečnosť",
          what: "Pohľad na živé bunky ako na preprogramovateľné stroje a budovanie obrany proti patogénom.",
          obsessed: "Prepisovanie DNA na tvorbu užitočných funkcií a predpovedanie rizík úniku.",
          tuesday: "Návrh úseku genetického kódu pre nový materiál alebo modelovanie šírenia patogénu.",
          hook: "Rovnaká technológia na výrobu inzulínu by teoreticky mohla byť použitá na vytvorenie pandémie.",
          future: "Ako sa biotechnológia stáva dostupnejšou, ľudstvo potrebuje odborníkov na budovanie globálnej ochrany pred biorizikami."
        },
        cheminfo: {
          name: "Cheminformatika a vývoj liekov",
          what: "Vyhľadávanie, porovnávanie a predpovedanie správania molekúl pomocou počítačov.",
          obsessed: "Ktorá z miliónov molekúl stojí za čas a náklady na reálnu syntézu a testovanie.",
          tuesday: "Virtuálny skríning tisícov zlúčenín voči cieľovému proteínu a výber najlepších kandidátov.",
          hook: "Väčšina nových kandidátov na lieky sa dnes najskôr testuje v počítači."
        },
        nano: {
          name: "Nanotechnológia",
          what: "Inžinierstvo na úrovni jednotlivých molekúl.",
          obsessed: "Ako sa menia vlastnosti materiálov pri extrémne malých rozmeroch.",
          tuesday: "Usporiadanie atómov do štruktúry a jej zobrazenie špeciálnym mikroskopom.",
          hook: "Zlato má zlatú farbu len vo veľkom množstve; pri zmenšení na nanočastice sčervenie alebo sfialovie."
        },
        designeng: {
          name: "Dizajnové inžinierstvo",
          what: "Spojenie funkčnosti vecí s vytváraním produktov, ktoré ľudia radi používajú.",
          obsessed: "Premena reálneho ľudského problému na fungujúci objekt alebo systém.",
          tuesday: "Skicovanie produktu, stavba prototypu a testovanie na reálnych užívateľoch.",
          hook: "Dobrý dizajn je neviditeľný. Kľučku, ktorá funguje intuitívne, si nikdy nevšimnete."
        },
        arch: {
          name: "Architektúra",
          what: "Navrhovanie priestorov, v ktorých ľudia žijú, pracujú a stretávajú sa.",
          obsessed: "Ako budova utvára pocity a správanie ľudí vo svojom vnútri.",
          tuesday: "Vyvažovanie estetického nápadu s gravitáciou, rozpočtom a normami.",
          hook: "Rozloženie chodieb v nemocnici dokáže merateľne ovplyvniť rýchlosť zotavenia pacientov."
        },
        quantum: {
          name: "Kvantové počítače",
          what: "Stavba počítačov fungujúcich na podivných pravidlách mikrosveta.",
          obsessed: "Využitie kvantových javov na riešenie problémov, ktoré bežné počítače nezvládnu.",
          tuesday: "Boj o udržanie krehkého kvantového stavu na niekoľko mikrosekúnd.",
          hook: "Kvantový bit môže byť 0 a 1 zároveň; prepojením viacerých sa umožnia nemožné výpočty."
        },
        epi: {
          name: "Epidemiológia",
          what: "Veda o šírení chorôb v populácii.",
          obsessed: "Prečo niektoré ohniská zaniknú a iné sa nekontrolovateľne rozšíria.",
          tuesday: "Tvorba modelu šírenia nákazy na predpoveď jej ďalšieho postupu.",
          hook: "Všetky grafy „sploštenia krivky“ počas pandémií pochádzajú z tohto odboru.",
          future: "Šírenie nákaz je opakujúca sa udalosť a svet potrebuje odborníkov na sledovanie a modelovanie epidémií."
        },
        biomed: {
          name: "Biomedicínske inžinierstvo",
          what: "Inžinierstvo zamerané priamo na ľudské telo.",
          obsessed: "Vývoj prístrojov, ktoré opravujú, nahrádzajú alebo monitorujú telo.",
          tuesday: "Testovanie, či umelý kĺb alebo snímač vydrží reálne používanie.",
          hook: "Niektoré protézy sú dnes prepojené s nervami, takže ich človek ovláda myšlienkami.",
          future: "Starnutie populácie zvyšuje dopyt po lepších zdravotníckych pomôckach a diagnostike."
        },
        sysbio: {
          name: "Systémová biológia",
          what: "Štúdium života ako siete namiesto skúmania jednotlivých častí oddelene.",
          obsessed: "Ako tisíce molekúl spolupracujú pri udržaní fungovania bunky.",
          tuesday: "Modelovanie siete génov na predpovedanie následkov vypnutia jedného z nich.",
          hook: "Poznať každú časť bunky nestačí, rovnako ako poznať každé slovo neprezradí dej knihy."
        },
        datasci: {
          name: "Dátová veda",
          what: "Získavanie reálnych odpovedí z nespracovaných kôp dát.",
          obsessed: "Užitočný signál ukrytý v šume.",
          tuesday: "Čistenie dát a vyhľadanie jedného vzoru, na ktorom naozaj záleží.",
          hook: "Najťažšou časťou takmer nikdy nie je matematika, ale zistenie, že dáta klamú.",
          future: "Zdravotníctvo, klimatická politika aj trhy generujú viac dát, než človek dokáže ručne spracovať."
        },
        econ: {
          name: "Kvantitatívna ekonómia",
          what: "Skúmanie správania ľudí, peňazí a volieb pomocou presných čísel.",
          obsessed: "Prečo trhy, stimuly a rozhodnutia fungujú tak, ako fungujú.",
          tuesday: "Testovanie hypotéz o ľudskom správaní na miliónoch reálnych transakcií.",
          hook: "Veľká časť modernej ekonómie má bližšie k fyzike než k podnikaniu."
        },
        geol: {
          name: "Zemské systémy a geológia",
          what: "Čítanie histórie a mechanizmov planéty priamo z hornín.",
          obsessed: "Ako sa Zem zformovala a ako sa neustále mení.",
          tuesday: "Príprava tenkého rezu horniny a skúmanie jej príbehu pod mikroskopom.",
          hook: "Na Zemi existujú horniny staršie ako 4 miliardy rokov, vytvorené pred vznikom kyslíka."
        },
        geoinfo: {
          name: "Geoinformatika a diaľkový prieskum Zeme",
          what: "Premena satelitných snímok na mapy zmien povrchu planéty.",
          obsessed: "Zmeny lesov, pobreží či miest merané z obežnej dráhy.",
          tuesday: "Spracovanie údajov o odlesňovaní alebo úbytku ľadu zo satelitov.",
          hook: "Väčšina poznatkov o topení ľadovcov pochádza zo satelitných meraní z vesmíru."
        },
        acoustics: {
          name: "Akustika a hudobné technológie",
          what: "Veda a inžinierstvo zvuku.",
          obsessed: "Ako zvuk vzniká, tvaruje sa a vníma.",
          tuesday: "Ladenie akustiky miestnosti alebo vývoj softvéru na spracovanie zvuku.",
          hook: "Koncertná sála sa navrhuje rovnako dôkladne ako most; posunutím steny sa zmení zvuk."
        },
        gendesign: {
          name: "Počítačový a generatívny dizajn",
          what: "Využitie matematických pravidiel a algoritmov na generovanie tvarov a vzorov.",
          obsessed: "Čo sa stane, keď dizajn popíšete rovnicou a necháte počítač preskúmať možnosti.",
          tuesday: "Písanie programu na generovanie stoviek variácií vzoru a výber najlepších.",
          hook: "Niektoré moderné budovy neboli nakreslené ručne, ale vyrástli z matematického pravidla."
        },
        gamedesign: {
          name: "Herný dizajn",
          what: "Tvorba interaktívnych svetov a pravidiel, ktoré ich robia zábavnými.",
          obsessed: "Čo robí systém výzvou, férovým a zábavným pre hráčov.",
          tuesday: "Úprava pravidla a sledovanie hráčov, či sa zábavnosť zvýšila.",
          hook: "Zábava je dizajnový problém, ktorý sa dá reálne študovať."
        },
        polisci: {
          name: "Politológia a politická psychológia",
          what: "Skúmanie fungovania moci, jej držiteľov a dôvodov správania voličov.",
          obsessed: "Rozdiel medzi teoretickým fungovaním inštitúcií a ich reálnym správaním.",
          tuesday: "Tvorba modelu správania voličov z prieskumov alebo analýza zlyhania politiky.",
          hook: "Aj malé zmeny v úprave hlasovacieho lístka dokážu posunúť výsledok volieb."
        },
        compsocsci: {
          name: "Počítačové spoločenské vedy",
          what: "Využitie dát a sietí na skúmanie šírenia názorov a správania v populácii.",
          obsessed: "Prečo sa niektoré myšlienky šíria lavínovo a iné zaniknú.",
          tuesday: "Mapovanie sociálnej siete z príspevkov a modelovanie šírenia informácie.",
          hook: "Šírenie dezinformácií sa analyzuje podobne ako šírenie epidémií."
        },
        aialignment: {
          name: "Bezpečnosť a správa AI",
          what: "Výzva zabezpečiť, aby pokročilé systémy AI konali v súlade s cieľmi ľudstva.",
          obsessed: "Matematická garancia, že inteligentný systém nenájde nebezpečné medzery.",
          tuesday: "Testovanie modelov na nebezpečné správanie alebo návrh medzinárodných zmlúv.",
          hook: "Spoľahlivá kontrola superinteligentného systému je kľúčový nevyriešený problém.",
          future: "Existuje celosvetový nedostatok odborníkov na technickú bezpečnosť a správu AI."
        },
        bioanthro: {
          name: "Biologická a evolučná antropológia",
          what: "Štúdium ľudskej evolúcie prostredníctvom kostí, génov a biológie.",
          obsessed: "Čo dokáže dokázať jediný fragment fosílie či kosti.",
          tuesday: "Meranie fosílnej lebky alebo porovnávanie starovekej DNA.",
          hook: "Väčšina ľudí nosí v sebe malé percento neandertálskej DNA."
        },
        digitalhum: {
          name: "Digitálne humanitné vedy",
          what: "Využitie počítačových nástrojov na skúmanie histórie a kultúry vo veľkom rozsahu.",
          obsessed: "Skryté vzorce v tisíckach dokumentov neviditeľné pri čítaní po jednom.",
          tuesday: "Textová analýza novín za celé storočie na sledovanie zmeny významu slov.",
          hook: "Softvér dokáže určiť autora anonymného historického dokumentu podľa rytmu viet."
        },
        behavioralecon: {
          name: "Behaviorálna ekonómia",
          what: "Skúmanie, prečo sa ľudia a trhy nesprávajú podľa čisto teoretických modelov.",
          obsessed: "Opakovateľné odchýlky ľudského rozhodovania od čistej racionality.",
          tuesday: "Experiment na overenie, či zmena predvolenej možnosti ovplyvní voľbu ľudí.",
          hook: "Automatické zapojenie do dôchodkového sporenia zásadne zvyšuje účasť."
        },
        energysys: {
          name: "Energetické systémy",
          what: "Inžinierstvo a prechod na nízkouhlíkovú sieť, solárne a veterné zdroje.",
          obsessed: "Udržanie stability elektrickej siete pri kolísavých zdrojoch.",
          tuesday: "Modelovanie kapacity batériových úložísk pre obdobie bez vetra a slnka.",
          hook: "Elektrická sieť musí vyrovnávať ponuku a dopyt v zlomkoch sekundy."
        },
        climatepolicy: {
          name: "Klimatická politika a environmentálna ekonómia",
          what: "Inštitucionálna a ekonomická stránka zmeny klímy, trhy s uhlíkom a regulácie.",
          obsessed: "Spôsoby, ako spoplatniť znečistenie bez poškodenia ekonomiky.",
          tuesday: "Modelovanie dopadu ceny uhlíka na emisie a ekonomické záťaže.",
          hook: "Uhlíková daň je jedným z najviac skúmaných nástrojov ekonómov."
        },
        urbanplanning: {
          name: "Mestské plánovanie a inteligentné mestá",
          what: "Plánovanie a riadenie miest ako prepojených systémov dopravy a bývania.",
          obsessed: "Prečo mesto funguje pre niekoho dobre a pre iného zle.",
          tuesday: "Modelovanie vplyvu novej autobusovej linky na plynulosť dopravy.",
          hook: "Koordinácia semaforov v zelenej vlne výrazne skracuje čas dojazdu."
        },
        culturalheritage: {
          name: "Kultúrne dedičstvo a múzejníctvo",
          what: "Kurátorská práca, ochrana a prezentácia príbehov objektov a kultúr.",
          obsessed: "Ako priblížiť objekt z minulosti človeku dneška.",
          tuesday: "Návrh vystavenia a popisu exponátu pre návštevníkov.",
          hook: "Múzeá ročne vracajú tisíce artefaktov do krajín ich pôvodu."
        },
        cybersec: {
          name: "Kybernetická bezpečnosť a kryptografia",
          what: "Ochrana informácií a matematické dokazovanie bezpečnosti systémov.",
          obsessed: "Nájdenie zraniteľnosti v systéme skôr, než ju zneužije útočník.",
          tuesday: "Testovanie odolnosti vlastného systému alebo dokazovanie nemožnosti útoku.",
          hook: "Mnohé dnešné šifry budú zraniteľné voči kvantovým počítačom."
        },
        astrobio: {
          name: "Astrobiológia",
          what: "Hľadanie života mimo Zeme a skúmanie extrémnych podmienok na Zemi.",
          obsessed: "Čo sa dá považovať za skutočné stopy života vo vesmíre.",
          tuesday: "Analýza dát z marsovského vozidla alebo vzdialeného mesiaca.",
          hook: "Kandidáti na život v slnečnej sústave sú aj v oceánoch pod ľadom mesiacov Jupitera."
        },
        hci: {
          name: "Interakcia človeka s počítačom (UX)",
          what: "Pochopenie, ako ľudia používajú technológie, a návrh rozhraní podľa ľudského vnímania.",
          obsessed: "Rozdiel medzi predpokladaným a reálnym používateľským správaním.",
          tuesday: "Sledovanie používateľov pri plnení úlohy v novom rozhraní a identifikácia problémov.",
          hook: "Kvalitný UX výskum odhalí presnú príčinu frustrácie používateľa."
        },
        compstructbio: {
          name: "Počítačová štrukturálna biológia",
          what: "Mapovanie vlastností a dynamiky biologických molekúl pomocou strojového učenia.",
          obsessed: "Neusporiadané proteíny a ich vplyv na ľudské zdravie.",
          tuesday: "Porovnávanie predpovedí strojového učenia s fyzikálnymi dátami.",
          hook: "Pochopenie fyziky neusporiadaných proteínov je kľúčom k liečbe neurodegeneratívnych ochorení.",
          future: "AI zmenila predpovedanie v biológii, no chýbajú odborníci s presahom do biofyziky."
        },
        hwsec: {
          name: "Bezpečnosť hardvéru a infraštruktúry",
          what: "Hľadanie zraniteľností vo fyzickej a embedded vrstve digitálneho sveta.",
          obsessed: "Ako možno obísť bezpečný softvér pomocou fyzických nástrojov.",
          tuesday: "Analýza fyzických prístupových kariet a rádiofrekvenčných signálov.",
          hook: "Ak útočník fyzicky emuluje kľúč od dverí, softvérový firewall nepomôže.",
          future: "Automatizácia infraštruktúry vyžaduje inžinierov so zameraním na hardvérovú bezpečnosť."
        }
      }
    };

    function getPrim(id) {
      const p = PRIMS[id];
      if (!p) return null;
      const trans = (PRIMS_I18N[currentLang] && PRIMS_I18N[currentLang][id]) || {};
      return {
        name: trans.name || p.name,
        blurb: trans.blurb || p.blurb,
        rgb: p.rgb
      };
    }

    function getDimLabel(d) {
      if (DIMLABEL_I18N[currentLang] && DIMLABEL_I18N[currentLang][d]) {
        return DIMLABEL_I18N[currentLang][d];
      }
      return DIMLABEL[d] || d;
    }

    function getStatement(i) {
      const s = STATEMENTS[i];
      if (!s) return null;
      const t = (STATEMENTS_I18N[currentLang] && STATEMENTS_I18N[currentLang][i]) || s.t;
      return { t, w: s.w };
    }

    function getField(id) {
      const f = FIELDS.find(x => x.id === id);
      if (!f) return null;
      const trans = (FIELDS_I18N[currentLang] && FIELDS_I18N[currentLang][id]) || {};
      return {
        id: f.id,
        par: f.par,
        disp: f.disp,
        name: trans.name || f.name,
        what: trans.what || f.what,
        obsessed: trans.obsessed || f.obsessed,
        tuesday: trans.tuesday || f.tuesday,
        hook: trans.hook || f.hook,
        future: trans.future || f.future
      };
    }

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
        id: "biosecurity", name: "Synthetic Biology & Biosecurity", par: ["bio", "chem", "cs"], disp: { build: .7, small: .6, hands: .4 },
        what: "Treating living cells like machines you can reprogram, while building defenses against engineered pathogens.",
        obsessed: "Rewriting DNA to make cells do useful new things, and predicting what happens if those codes leak or mutate.",
        tuesday: "Designing a stretch of genetic code to produce a novel material, or modeling how quickly a newly sequenced pathogen could spread.",
        hook: "The same technology used to reprogram bacteria to produce life-saving insulin could theoretically be used to engineer a pandemic.",
        future: "As biotechnology gets cheaper and more accessible, humanity desperately needs people who can engineer solutions while simultaneously building a robust global immune system against biorisks."
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
        id: "aialignment", name: "AI Alignment & Governance", par: ["cs", "econpol", "psych"], disp: { theory: .8, people: .6, large: .7 },
        what: "The technical and political challenge of ensuring highly advanced AI systems actually do what humanity wants them to do.",
        obsessed: "How to mathematically guarantee that a system smarter than its creator won't find dangerous loopholes to achieve its goals.",
        tuesday: "Designing an evaluation to intentionally trick a language model into dangerous behavior to find its failure points, or drafting treaties for international compute sharing.",
        hook: "Nobody actually knows how to reliably control a superintelligent system yet. It is arguably the most urgent unsolved technical problem in the world.",
        future: "There is a massive global shortage of people who possess both the deep technical understanding of machine learning and the policy acumen to govern it globally."
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
      },
      {
        id: "compstructbio", name: "Computational Structural Biology", par: ["bio", "cs", "phys"], disp: { theory: .8, small: .9, build: .4 },
        what: "Mapping the ensemble properties and physical dynamics of complex biological molecules using machine learning.",
        obsessed: "Intrinsically disordered proteins, and how their constantly shifting shapes dictate human health.",
        tuesday: "Running machine learning predictions against experimental physical data, like NMR, to evaluate structural hallucinations and see how a protein actually folds.",
        hook: "The extreme difficulty of treating many neurodegenerative diseases is a consequence of these complex, disordered proteins—understanding their physics is the motivation for the entire field.",
        future: "AI has fundamentally changed how we predict biology, but the bottleneck is a lack of people who understand both the computational models and the underlying biological physics."
      },
      {
        id: "hwsec", name: "Hardware & Infrastructure Security", par: ["cs", "phys"], disp: { hands: .8, build: .7, small: .4 },
        what: "Finding vulnerabilities in the physical and embedded layer of our digital world, from access controls to power grids.",
        obsessed: "How systems that look completely secure on paper can be bypassed in the real world using physical tools and radio frequencies.",
        tuesday: "Scanning physical campus card readers to extract MIFARE Classic keys, or analyzing frequencies to emulate RFID and NFC credentials.",
        hook: "Most cybersecurity focuses on software firewalls. But if someone can physically emulate a key to walk through a door or intercept a hardware signal, the software doesn't matter.",
        future: "As the world automates its physical infrastructure, the most neglected security threats involve the physical hardware layer, requiring engineers who think like attackers."
      }
    ];

    // quiz statements -> dim weights (positive or negative)
    const STATEMENTS = [
      // 1. The Systems vs. Rules split (Separating messy bio/earth from strict math/cs)
      { t: "I am drawn to systems that are messy, living, and unpredictable over things that follow strict mathematical rules.", w: { bio: .8, earth: .5, psych: .4, math: -.4 } },

      // 2. The Abstraction vs. Application split (Theory vs Build)
      { t: "I care more about understanding the deepest fundamental truths of the universe than inventing a physical product.", w: { theory: .9, phys: .6, build: -.6, hands: -.4 } },

      // 3. The Computation & Automation split (CS / Data)
      { t: "I like the idea of writing rules, algorithms, or code to find hidden patterns or automate a process so I don't have to do it by hand.", w: { cs: .9, math: .5, theory: .4 } },

      // 4. The Wet-Lab / Chemistry split (Separating computational approaches from hands-on lab work)
      { t: "I enjoy the idea of carefully mixing, purifying, or testing physical substances in a lab setting to see exactly how they react.", w: { chem: .9, hands: .8, bio: .4 } },

      // 5. The Scale of Impact split (80k hours inspired: Large vs Local)
      { t: "I want to work on solving massive global bottlenecks (like climate or disease), even if I never directly meet the people I help.", w: { large: .9, earth: .6, people: .4 } },

      // 6. The Micro vs Macro split
      { t: "I am fascinated by how microscopic things—like a single cell, a molecule, or a microchip—can completely control the world.", w: { small: .9, bio: .5, chem: .5, phys: .3 } },

      // 7. The Direct Empathy split (Psych / Social)
      { t: "I am highly motivated by directly understanding, interacting with, and improving the daily lives of individuals.", w: { people: .9, psych: .8, econpol: .3 } },

      // 8. The Humanities & Systems of Power split
      { t: "I love analyzing how power, culture, language, and human behavior shape history, rather than focusing purely on science.", w: { historyculture: .9, econpol: .8, psych: .5, theory: .3 } },

      // 9. The Engineering & Tinkering split
      { t: "I want to physically make things—prototypes, circuits, or structures—where I can touch the result and see it work.", w: { build: .9, hands: .8, art: .3, theory: -.3 } },

      // 10. The Aesthetics & Design split
      { t: "When I look at a product, system, or building, I constantly think about how its design could be more beautiful or intuitive for the user.", w: { art: .9, psych: .5, build: .4 } },

      // 11. The Pure Logic split
      { t: "I enjoy getting lost in complex puzzles and pure logic, even if they don't have an immediate real-world use.", w: { math: .9, theory: .7 } }
    ];

    // fields worth surfacing regardless of personal fit, because of where the world seems to be heading.
    // deliberately a small, mixed-domain subset, not a ranking of every field's "importance".
    const FUTURE_IDS = ["aialignment", "compstructbio", "climate", "biosecurity", "materials", "hwsec", "epi"];

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
      document.body.style.overflow = "hidden";

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
          window.scrollTo(0, 0);
        }

        if (p < 1) {
          animId = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(animId);
          window.removeEventListener("resize", resizeCanvas);
          canvas.style.display = "none";
          document.body.style.overflow = "auto";
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
    function buildQuizSliders() {
      subjWrap.innerHTML = ""; dispWrap.innerHTML = "";
      const labelDislike = currentLang === "sk" ? "Nepáči sa mi" : "Dislike";
      const labelLove = currentLang === "sk" ? "Páči sa mi" : "Love";
      const labelNotMe = currentLang === "sk" ? "To nie som ja" : "Not me";
      const labelVeryMe = currentLang === "sk" ? "To som úplne ja" : "Very me";
      PORDER.forEach(p => subjWrap.appendChild(sliderRow("subj_" + p, getPrim(p).name, labelDislike, labelLove)));
      STATEMENTS.forEach((s, i) => dispWrap.appendChild(sliderRow("disp_" + i, getStatement(i).t, labelNotMe, labelVeryMe)));
    }
    buildQuizSliders();
    function refreshQuizSliders() {
      const values = {};
      allQuizSliders().forEach(s => values[s.id] = s.value);
      buildQuizSliders();
      allQuizSliders().forEach(s => {
        if (values[s.id] !== undefined) s.value = values[s.id];
        wireSlider(s);
        styleSlider(s);
      });
    }

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
    const soundTxt = byId("soundToggleTxt");
    if (soundBtn) soundBtn.addEventListener("click", () => {
      const on = Sound.toggle();
      soundBtn.classList.toggle("off", !on);
      const txt = on ? (I18N_STATIC[currentLang].sound_on || "Sound on") : (I18N_STATIC[currentLang].sound_off || "Sound off");
      if (soundTxt) soundTxt.textContent = txt;
      else soundBtn.lastChild.textContent = txt;
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
        .sort((a, b) => b.v - a.v).slice(0, n).map(x => getDimLabel(x.d));
    }
    function culpritDim(f, U) {
      const raw = fieldVecs[f.id].raw;
      let best = null, bv = 0;
      DIMS.forEach(d => { if (U[d] < 0 && raw[d] > 0) { const v = raw[d] * (-U[d]); if (v > bv) { bv = v; best = d; } } });
      return best ? getDimLabel(best) : null;
    }
    function topPositiveConnect(hat, Uplus) {
      const arr = DIMS.map(d => ({ d, v: hat[d] * Uplus[d] })).filter(x => x.v > 0.001).sort((a, b) => b.v - a.v);
      return arr.length ? getDimLabel(arr[0].d) : (currentLang === "sk" ? "to, čo vás baví" : "what you like");
    }

    function renderResults(res) {
      const wc = byId("wheelCards"), sc = byId("stretchCards");
      wc.innerHTML = ""; sc.innerHTML = "";
      byId("zoneThin").style.display = res.thin ? "" : "none";
      byId("zoneWheel").style.display = res.thin ? "none" : "";
      const seeMapText = currentLang === "sk" ? "Zobraziť na mape →" : "See it on the map →";
      if (res.thin) {
        byId("thinMsg").textContent = currentLang === "sk"
          ? "Posuvníky ste nechali blízko stredu, takže sme nezískali silný signál a zobrazenie „najlepšej zhody“ by bolo skôr hodom mincou než skutočným výsledkom. To je úplne v poriadku, mnohí ľudia zatiaľ nemajú vyhranené preferencie. Vráťte sa a posuňte niekoľko posuvníkov na čokoľvek, na čo máte aspoň mierny názor (jeden alebo dva často stačia), alebo začnite s odbormi budúcnosti nižšie."
          : "You left the sliders close to the middle, so there wasn't a strong signal to work from, and showing you a \"top match\" from that would have been closer to a coin flip than a real result. That's completely fine, plenty of people haven't figured out their likes yet. Go back and move a few sliders on anything you have even a mild opinion about, one or two is often enough, or start with the future-facing fields below instead.";
        byId("zoneStretch").style.display = "none";
      } else {
        res.wheel.forEach(x => {
          const fLoc = getField(x.f.id);
          const c = mix(x.f.par);
          const dims = topMatchDims(x.hat, res.Uplus, 3);
          const card = document.createElement("div"); card.className = "rcard";
          card.style.borderLeftColor = rgb(c); card.style.setProperty("--fc", c.join(","));
          card.innerHTML = `<div class="rt"><h4 style="color:${rgb(c)}">${fLoc.name}</h4><span class="go">${seeMapText}</span></div>
          <p class="rw">${fLoc.what}</p>
          ${dims.length ? `<div class="tags">${dims.map(d => `<span class="tag">${d}</span>`).join("")}</div>` : ""}`;
          card.addEventListener("mouseenter", () => Sound.hover(hoverPitch(x.f.id)));
          card.addEventListener("click", () => { showView("atlas"); atlasSelect(x.f.id); });
          wc.appendChild(card);
        });
        if (!res.stretch.length) { byId("zoneStretch").style.display = "none"; }
        else {
          byId("zoneStretch").style.display = "";
          res.stretch.forEach(x => {
            const fLoc = getField(x.f.id);
            const c = mix(x.f.par);
            const why = stretchWhyText(x, res);
            const card = document.createElement("div"); card.className = "rcard";
            card.style.borderLeftColor = rgb(c); card.style.setProperty("--fc", c.join(","));
            card.innerHTML = `<div class="rt"><h4 style="color:${rgb(c)}">${fLoc.name}</h4><span class="go">${seeMapText}</span></div>
            <p class="rw">${fLoc.what}</p>
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
      const seeMapText = currentLang === "sk" ? "Zobraziť na mape →" : "See it on the map →";
      byId("futureSub").textContent = thin
        ? (currentLang === "sk" ? "iná cesta, neprispôsobená vašim odpovediam" : "a different way in, not matched to your answers")
        : (currentLang === "sk" ? "iný pohľad, taktiež neprispôsobený vašim odpovediam" : "a different lens, also not matched to your answers");
      byId("futureIntro").innerHTML = thin
        ? (currentLang === "sk"
            ? `Keďže vyššie nebolo veľa informácií, tu je iná cesta. Tieto odbory nie sú vybrané pre vás osobne, ale podľa toho, kam sa svet podľa očakávaní posunie v najbližších desaťročiach. Koncepcia čerpá z projektu <a href="https://80000hours.org" target="_blank" rel="noopener">80,000 Hours</a>, ktorý sa tejto otázke venuje do hĺbky.`
            : `Since there wasn't much to go on above, here's another way in. These aren't picked for you, they're picked for where the world seems to be heading over the next couple of decades. The framing owes a debt to <a href="https://80000hours.org" target="_blank" rel="noopener">80,000 Hours</a>, which researches this question in far more depth than we can here.`)
        : (currentLang === "sk"
            ? `Iný pohľad na rovnaký súbor odborov, neprispôsobený tomu, čo ste uviedli, ale širším trendom, od ktorých sa v nasledujúcich desaťročiach očakáva veľký dopad. Stojí za zváženie popri vlastných záujmoch. Inšpirované projektom <a href="https://80000hours.org" target="_blank" rel="noopener">80,000 Hours</a>.`
            : `A different lens on the same set of fields, not matched to what you said, but to broad trends many people expect to matter more over the next couple of decades. Worth weighing alongside your own interests, not instead of them. Framing inspired by <a href="https://80000hours.org" target="_blank" rel="noopener">80,000 Hours</a>, which researches this question in far more depth.`);
      const fc = byId("futureCards"); fc.innerHTML = "";
      FUTURE_IDS.forEach(id => {
        const fLoc = getField(id); if (!fLoc) return;
        const c = mix(fLoc.par);
        const card = document.createElement("div"); card.className = "rcard";
        card.style.borderLeftColor = rgb(c); card.style.setProperty("--fc", c.join(","));
        card.innerHTML = `<div class="rt"><h4 style="color:${rgb(c)}">${fLoc.name}</h4><span class="go">${seeMapText}</span></div>
        <p class="rw">${fLoc.what}</p>
        <p class="why">${fLoc.future}</p>`;
        card.addEventListener("mouseenter", () => Sound.hover(hoverPitch(fLoc.id)));
        card.addEventListener("click", () => { showView("atlas"); atlasSelect(fLoc.id); });
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
      if (currentLang === "sk") {
        return culprit
          ? `Ľudí, ktorých láka ${connect}, toto často osloví. Vyžaduje však viac ${culprit}, než ako ste hodnotili, čo je jediná vec, pre ktorú nie je vo vašom hlavnom zozname.`
          : `Trochu ďalej od toho, čo ste uviedli, ale dostatočne blízko k ${connect}, aby to stálo za pozretie.`;
      }
      return culprit
        ? `People drawn to ${connect} often fall for this. It does lean on ${culprit} more than you rated, which is the only thing keeping it off your main list.`
        : `A little further from what you said, but close enough to ${connect} to be worth a look.`;
    }
    function buildExportPrompt(res, raw) {
      if (currentLang === "sk") {
        if (res.thin) {
          const futureLines = FUTURE_IDS.map(id => { const f = getField(id); return `- **${f.name}**: ${f.what} (${f.future})`; }).join("\n");
          return `Som študent strednej školy (približne 15 – 17 rokov) a snažím sa zistiť, čo študovať na vysokej škole. Použil som nástroj Prism, ale zatiaľ som nemal dostatočne vyhranené preferencie na to, aby ma priradil k špecifickým kariéram. To je úplne v poriadku!

Namiesto toho mi nástroj ukázal zoznam „Odborov budúcnosti“. Tieto boli vybrané na základe dopadových rámcov (ako 80,000 Hours), pretože riešia masívne, zanedbávané a riešiteľné globálne výzvy v najbližších desaťročiach:

${futureLines}

Rád by som vás požiadal o pomoc. Vystupujte ako milý, vysoko erudovaný kariérny poradca. Zatiaľ si nemusím nič vybrať, iba preskúmavam možnosti.

Taktiež budeme postupovať nasledovne:
1. **Pohovor:** Položte mi 2 alebo 3 zaujímavé, neobvyklé otázky o tom, ako rád trávim čas, ako riešim problémy a v akom prostredí sa mi darí. Cieľom je pomôcť mi objaviť moje „Ikigai“ (prienik toho, čo milujem, v čom som dobrý a čo svet potrebuje).
2. **Prepojenie:** Keď odpoviem, prepojte môj štýl práce s 1 alebo 2 odbormi zo zoznamu vyššie (alebo s iným perspektívnym odborom, ktorý podľa vás sedí lepšie).
3. **Hlbšie preskúmanie:** Navrhnite reálne, známe YouTube kanály alebo konkrétne vyhľadávacie frázy, ktoré si môžem vyhľadať, aby som videl „bežný deň“ človeka pracujúceho v danom odbore. (NEMYLTE SI ani nevymýšľajte konkrétne URL odkazy – uveďte iba presné názvy kanálov alebo vyhľadávacie dopyty).

Začnite prosím tým, že mi položíte otázky!`;
        }

        const wheelLines = res.wheel.map(x => { const f = getField(x.f.id); return `- **${f.name}**: ${f.what}`; }).join("\n");
        const stretchLines = res.stretch.map(x => { const f = getField(x.f.id); return `- **${f.name}**: ${f.what} (*Prečo tento odbor?* ${stretchWhyText(x, res)})`; }).join("\n");
        const stretchBlock = res.stretch.length
          ? `\nODBORY TESNE VEDĽA MOJEJ PARKETY (Odbory, ktoré by ma mohli príjemne prekvapiť):\n${stretchLines}\n`
          : "";

        const lovedSubj = PORDER.filter(p => raw.subj[p] >= 70).map(p => getPrim(p).name);
        const dislikedSubj = PORDER.filter(p => raw.subj[p] <= 30).map(p => getPrim(p).name);
        const trueStmts = STATEMENTS.filter((s, i) => raw.disp[i] >= 70).map((s, i) => `"${getStatement(i).t}"`);
        const falseStmts = STATEMENTS.filter((s, i) => raw.disp[i] <= 30).map((s, i) => `"${getStatement(i).t}"`);

        let selfLines = "";
        if (lovedSubj.length) selfLines += `**Predmety, ktoré ma prirodzene bavia:** ${lovedSubj.join(", ")}\n`;
        if (dislikedSubj.length) selfLines += `**Predmety, ktoré ma neoslovujú:** ${dislikedSubj.join(", ")}\n\n`;

        if (trueStmts.length) selfLines += `**Môj štýl práce a preferencie dopadu (Tvrdenia, s ktorými som rozhodne súhlasil):**\n- ${trueStmts.join("\n- ")}\n\n`;
        if (falseStmts.length) selfLines += `**Čomu sa chcem vyhnúť (Tvrdenia, s ktorými som nesúhlasil):**\n- ${falseStmts.join("\n- ")}\n`;

        if (!selfLines) selfLines = "Väčšinu posuvníkov som nechal blízko stredu, takže zatiaľ nemám silné vyhranené záujmy ani výhrady.\n";

        return `Som študent strednej školy (približne 15 – 17 rokov), ktorý preskúmava vysokoškolské odbory a kariérne možnosti. Použil som nástroj Prism, ktorý mapuje tradičné školské predmety na moderné, vysokodopadové interdisciplinárne odbory.

Na základe mojich odpovedí mi nástroj odporučil nasledujúce odbory:

MOJE HLAVNÉ ODBORY (Najlepšia zhoda s mojím profilom):
${wheelLines}
${stretchBlock}
Taktiež tu je to, čo som uviedol o svojich obľúbených predmetoch a štýle práce:
${selfLines}
Rád by som vás požiadal o pomoc. Vystupujte ako milý, vysoko erudovaný kariérny poradca. Zatiaľ si nemusím nič vybrať, iba preskúmavam možnosti.

Taktiež budeme postupovať nasledovne:
1. **Pohovor:** Položte mi 2 alebo 3 zaujímavé, neobvyklé otázky o tom, ako rád trávim čas, ako riešim problémy a v akom prostredí sa mi darí. Cieľom je pomôcť mi objaviť moje „Ikigai“ (prienik toho, čo milujem, v čom som dobrý a čo svet potrebuje).
2. **Prepojenie:** Keď odpoviem, prepojte môj štýl práce s 1 alebo 2 odbormi zo zoznamu vyššie (alebo s iným perspektívnym odborom, ktorý podľa vás sedí lepšie).
3. **Hlbšie preskúmanie:** Navrhnite reálne, známe YouTube kanály alebo konkrétne vyhľadávacie frázy, ktoré si môžem vyhľadať, aby som videl „bežný deň“ človeka pracujúceho v danom odbore. (NEMYLTE SI ani nevymýšľajte konkrétne URL odkazy – uveďte iba presné názvy kanálov alebo vyhľadávacie dopyty).
4. **Pohovor (Kľúčový krok):** Nezostaňte len pri poskytnutí týchto informácií. Na záver mi polože 1 alebo 2 cielene zamerané otázky, ktoré mi pomôžu lepšie si vybrať medzi týmito odbormi alebo objaviť špecifickú oblasť v rámci nich. Pýtajte sa na moju toleranciu voči frustrácii, ideálne pracovné prostredie alebo konkrétne problémy, ktoré chcem riešiť, aby sme mohli pokračovať v preskúmavaní.`;
      }

      const wheelLines = res.wheel.map(x => { const f = getField(x.f.id); return `- **${f.name}**: ${f.what}`; }).join("\n");
      const stretchLines = res.stretch.map(x => { const f = getField(x.f.id); return `- **${f.name}**: ${f.what} (*Why this?* ${stretchWhyText(x, res)})`; }).join("\n");
      const stretchBlock = res.stretch.length
        ? `\nFIELDS JUST OUTSIDE MY WHEELHOUSE (Fields I might be pleasantly surprised by):\n${stretchLines}\n`
        : "";

      const lovedSubj = PORDER.filter(p => raw.subj[p] >= 70).map(p => getPrim(p).name);
      const dislikedSubj = PORDER.filter(p => raw.subj[p] <= 30).map(p => getPrim(p).name);
      const trueStmts = STATEMENTS.filter((s, i) => raw.disp[i] >= 70).map((s, i) => `"${getStatement(i).t}"`);
      const falseStmts = STATEMENTS.filter((s, i) => raw.disp[i] <= 30).map((s, i) => `"${getStatement(i).t}"`);
      
      let selfLines = "";
      if (lovedSubj.length) selfLines += `**Subjects I naturally enjoy:** ${lovedSubj.join(", ")}\n`;
      if (dislikedSubj.length) selfLines += `**Subjects I am not drawn to:** ${dislikedSubj.join(", ")}\n\n`;
      
      if (trueStmts.length) selfLines += `**My Working Style & Impact Preferences (Statements I strongly agreed with):**\n- ${trueStmts.join("\n- ")}\n\n`;
      if (falseStmts.length) selfLines += `**What I want to avoid (Statements I strongly disagreed with):**\n- ${falseStmts.join("\n- ")}\n`;
      
      if (!selfLines) selfLines = "I kept most sliders near the middle, so I don't have extremely strong stated likes or dislikes yet.\n";

      return `I'm a high school student (around 15-17 years old) exploring university majors and careers. I used a tool called Prism, which maps traditional school subjects to modern, high-impact interdisciplinary fields. 

Please act as a warm, highly knowledgeable career guide. I don't need to choose a career today; I just want to understand my options.

Here is what the tool suggested based on my unique blend of interests:
FIELDS IN MY WHEELHOUSE:
${wheelLines}
${stretchBlock}
Here is the raw data on my working style, daily reality preferences, and academic foundation:
${selfLines}

Based on this profile, please give me a targeted breakdown by following exactly these 4 steps:

1. **The Daily Reality:** Pick the 2 fields from my list that seem like the absolute best fit for my specific working style. For each one, describe the actual day-to-day reality of the job. What does an average Tuesday afternoon look like? (Keep it grounded, not overly romanticized).
2. **The Pathway:** Tell me briefly what I should be focusing on right now in high school, and what a typical university pathway looks like for those 2 fields. 
3. **The Rabbit Hole:** Suggest real, well-known YouTube channels or specific search terms I can look up to learn more (e.g., day-in-the-life vlogs, clear explainers, or documentary channels). Do NOT hallucinate or invent specific URL links—just give me the exact channel names or search queries.
4. **The Interview (Crucial Step):** Do not just give me this information and end the chat. End your response by asking me 1 or 2 targeted, engaging questions to help me narrow down between these fields, or to uncover a specific niche within them. Ask about my tolerances for frustration, my ideal work environment, or specific problems I want to solve, so we can keep exploring together.`;
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
      msg.textContent = ok
        ? (currentLang === "sk" ? "Skopírované ✓" : "Copied ✓")
        : (currentLang === "sk" ? "Označte text a skopírujte ho ručne" : "Select the text and copy manually");
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
      const pLoc = getPrim(p);
      const activeIds = [p, ...anodes.filter(n => n.par.indexOf(p) >= 0).map(n => n.id)];
      zoomToActiveNodes(activeIds);
      anodes.forEach(n => { const on = n.par.indexOf(p) >= 0; nodeEls[n.id].g.classList.toggle("dim", !on); nodeEls[n.id].g.classList.toggle("show", on); });
      PORDER.forEach(q => nodeEls[q].g.classList.toggle("dim", q !== p));
      edgeEls.forEach(e => { if (e.prim === p) e.el.classList.add("hot"); else e.el.classList.add("dim-edge"); });
      [...legend.children].forEach(ch => { if (ch.dataset.p === p) { ch.classList.add("on"); ch.style.background = rgba(PRIMS[p].rgb, 0.9); ch.style.borderColor = "transparent"; ch.style.color = "#08101f"; } });
      resetBtn.classList.add("show");
      const count = anodes.filter(n => n.par.indexOf(p) >= 0).length;
      const kickerText = currentLang === "sk" ? "Školský predmet &middot; základ" : "School subject &middot; a foundation";
      const labMapText = currentLang === "sk" ? "Na mape" : "On the map";
      const fieldCountText = currentLang === "sk"
        ? `${count} ${count === 1 ? "odbor vychádza" : (count >= 2 && count <= 4 ? "odbory vychádzajú" : "odborov vychádza")} čiastočne z predmetu ${pLoc.name}. Teraz sú zvýraznené, ostatné sú stmavené. Ťuknutím na ktorýkoľvek zistíte, čím sa stáva.`
        : `${count} field${count === 1 ? "" : "s"} are built partly from ${pLoc.name}. They're lit now, the rest are dimmed. Tap any of them to see what it becomes.`;
      panelIn.innerHTML = `<p class="p-kicker">${kickerText}</p>
      <h2 class="p-title" style="color:${rgb(PRIMS[p].rgb)}">${pLoc.name}</h2>
      <p class="p-what">${pLoc.blurb}</p>
      <div class="p-hook"><span class="lab">${labMapText}</span>${fieldCountText}</div>`;
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
      const fLoc = getField(id);
      const activeIds = [id, ...n.par];
      zoomToActiveNodes(activeIds);
      anodes.forEach(m => nodeEls[m.id].g.classList.toggle("dim", m.id !== id));
      nodeEls[id].g.classList.remove("dim"); nodeEls[id].g.classList.add("show");
      PORDER.forEach(p => nodeEls[p].g.classList.toggle("dim", n.par.indexOf(p) < 0));
      edgeEls.forEach(e => { if (e.field === id) e.el.classList.add("hot"); else e.el.classList.add("dim-edge"); });
      resetBtn.classList.add("show");
      const c = mix(n.par);
      const kickerText = currentLang === "sk" ? "Odbor štúdia" : "Field of study";
      const labObsessed = currentLang === "sk" ? "Čím je posadnutý" : "What it's obsessed with";
      const labTuesday = currentLang === "sk" ? "Bežný utorok" : "On an ordinary Tuesday";
      const labBuiltFrom = currentLang === "sk" ? "Zložený z" : "Built from";
      const labColour = currentLang === "sk" ? "jeho farba" : "its colour";
      const labDidYouKnow = currentLang === "sk" ? "Vedeli ste" : "Did you know";
      const chips = n.par.map(p => `<span class="m" data-p="${p}"><span class="sw" style="background:${rgb(PRIMS[p].rgb)}"></span>${getPrim(p).name}</span>`).join("");
      const bar = n.par.map(p => `<span style="flex:1;background:${rgb(PRIMS[p].rgb)}"></span>`).join("");
      panelIn.innerHTML = `<p class="p-kicker">${kickerText}</p>
      <h2 class="p-title" style="color:${rgb(c)}">${fLoc.name}</h2>
      <p class="p-what">${fLoc.what}</p>
      <div class="p-row"><p class="p-lab">${labObsessed}</p><p class="p-txt">${fLoc.obsessed}</p></div>
      <div class="p-row"><p class="p-lab">${labTuesday}</p><p class="p-txt">${fLoc.tuesday}</p></div>
      <div class="p-row"><p class="p-lab">${labBuiltFrom}</p><div class="mix">${chips}</div>
        <div class="mixline">${labColour}<div class="mixbar">${bar}</div></div></div>
      <div class="p-hook"><span class="lab">${labDidYouKnow}</span>${fLoc.hook}</div>`;
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

    function refreshLegend() {
      legend.innerHTML = "";
      PORDER.forEach(p => {
        const b = document.createElement("button"); b.className = "chip"; b.dataset.p = p;
        if (focusPrim === p) {
          b.classList.add("on");
          b.style.background = rgba(PRIMS[p].rgb, 0.9);
          b.style.borderColor = "transparent";
          b.style.color = "#08101f";
        }
        b.innerHTML = `<span class="dot" style="background:${rgb(PRIMS[p].rgb)}"></span>${getPrim(p).name}`;
        b.addEventListener("click", () => { focusPrim === p ? clearFocus() : focusOnPrim(p); }); legend.appendChild(b);
      });
    }
    refreshLegend();
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
        let cursorColor = "rgb(203, 182, 255)"; // pastel purple matching <em>thousand fields</em>
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
          customCursor.style.boxShadow = `0 0 12px rgba(203, 182, 255, 0.8), 0 0 24px rgba(139, 92, 246, 0.6), 0 0 36px rgba(203, 182, 255, 0.4)`;
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

    function setLanguage(lang) {
      currentLang = (lang === "sk") ? "sk" : "en";
      try { localStorage.setItem("prism_lang", currentLang); } catch (e) {}

      document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === currentLang);
      });

      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (I18N_STATIC[currentLang] && I18N_STATIC[currentLang][key]) {
          el.innerHTML = I18N_STATIC[currentLang][key];
        }
      });

      refreshQuizSliders();
      refreshLegend();

      if (lastRes) {
        renderResults(lastRes);
      } else {
        renderFutureZone(true);
      }

      if (focusPrim) {
        focusOnPrim(focusPrim);
      } else if (focusField) {
        selectField(focusField);
      }
    }

    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
    });

    setLanguage(currentLang);

    showView("home");
  })();
