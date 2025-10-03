export type Quote = {
  text: string;
  attribution?: string;
  context?: string;
  link?: string;
};

export type TimelineEvent = {
  id: string;
  year: string;
  title: string;
  description: string;
  quote: Quote;
  icon: string;
  theme: "renaissance" | "enlightenment" | "industrial" | "electric" | "digital" | "ai" | "future";
};

export type PhilosophyContent = {
  id: string;
  title: string;
  summary: string;
  description: string;
  metaphor: string;
  historicalReference: string;
  quote: Quote;
};

export type VisionPillar = {
  id: string;
  title: string;
  subtitle: string;
  futureState: string;
  presentState: string;
  metrics: string[];
  quote: Quote;
};

export type DisruptionDomain = {
  id: string;
  domain: string;
  summary: string;
  historicalParallel: string;
  futureImagination: string;
  quote: Quote;
};

export type EducationPrinciple = {
  id: string;
  title: string;
  essence: string;
  problem: string;
  solution: string;
  example: string;
  quote: Quote;
};

export const missionStatement =
  "The Inevitable exists to cultivate disruptors devoted to the evolutionary leap of humanity—igniting minds, hearts, and systems alike.";

export const heroQuotes: Quote[] = [
  {
    text: "We are not here to fit into the future. We are here to build it.",
    attribution: "The Inevitable Manifesto",
  },
  {
    text: "Stagnation is decay and disruption is life.",
    attribution: "The Inevitable Manifesto",
  },
  {
    text: "Like the printing press liberated knowledge from the cathedral, we liberate human potential from obsolete systems.",
    attribution: "The Inevitable Manifesto",
  },
];

export const philosophyQuotes: Record<string, Quote> = {
  "disruption-as-renewal": {
    text: "Disruption is devotion to evolution, not violence against what came before.",
    attribution: "The Inevitable Manifesto",
  },
  "education-as-transformation": {
    text: "Education is not content delivery; it is the unlocking of human potential.",
    attribution: "The Inevitable Manifesto",
  },
  "continuous-improvisation": {
    text: "Future builders improvise like jazz—listening deeply, responding courageously, evolving endlessly.",
    attribution: "The Inevitable Manifesto",
  },
  "holistic-knowledge": {
    text: "Knowledge is a living constellation—science, philosophy, art, and spirit in sacred dialogue.",
    attribution: "The Inevitable Manifesto",
  },
  "existential-responsibility": {
    text: "We are custodians of tomorrow. Our choices ripple across generations yet unborn.",
    attribution: "The Inevitable Manifesto",
  },
};

export const visionQuotes: Quote[] = [
  {
    text: "The future is not a timeline; it is a canvas awaiting the devotion of its creators.",
    attribution: "The Inevitable Manifesto",
  },
  {
    text: "When education becomes a pilgrimage, humanity remembers its sacred purpose.",
    attribution: "The Inevitable Manifesto",
  },
];

export const disruptionQuotes: Quote[] = [
  {
    text: "Every age of transformation began with a minority audacious enough to imagine a better world.",
    attribution: "The Inevitable Manifesto",
  },
  {
    text: "Gutenberg shattered the monopoly on knowledge. We dissolve the walls around human evolution.",
    attribution: "The Inevitable Manifesto",
  },
];

export const educationQuotes: Quote[] = [
  {
    text: "When curiosity becomes disciplined devotion, genius emerges like a sunrise.",
    attribution: "The Inevitable Manifesto",
  },
  {
    text: "Learning beyond walls is not rebellion—it is a return to how Leonardo, Curie, and Ramanujan learned.",
    attribution: "The Inevitable Manifesto",
  },
];

export const closingQuotes: Quote[] = [
  {
    text: "This is not a project. It is a vow to the generations yet to awaken.",
    attribution: "The Inevitable Manifesto",
  },
  {
    text: "Those who are inevitable do not wait for permission. They consecrate their lives to transformation.",
    attribution: "The Inevitable Manifesto",
  },
];

export const historicalFigures = [
  "Johannes Gutenberg",
  "Isaac Newton",
  "Nikola Tesla",
  "Albert Einstein",
  "Mahatma Gandhi",
  "Nelson Mandela",
  "Amelia Earhart",
];

export const historicalEvents: TimelineEvent[] = [
  {
    id: "printing-press",
    year: "1440",
    title: "Printing Press Revolution",
    description: "Gutenberg's printing press democratized knowledge, liberating learning from the monastery walls and cathedral towers. This single invention shattered the monopoly of information, igniting literacy, reform, and human progress. The press whispered to humanity: think for yourself. Knowledge became a birthright, not a privilege.",
    quote: {
      text: "The printing press democratized knowledge. The internet democratized information. We now democratize transformation itself.",
      attribution: "The Inevitable Manifesto",
    },
    icon: "scroll",
    theme: "renaissance",
  },
  {
    id: "enlightenment",
    year: "1700s",
    title: "Age of Enlightenment",
    description: "Philosophers and scientists illuminated reason, daring humanity to question every inherited truth. Voltaire challenged authority, Newton revealed natural laws, and Locke redefined governance. Ideas became rebellion; rebellion became new orders of possibility. The human mind awakened from medieval slumber to scientific rigor and rational thought.",
    quote: {
      text: "Disruption is not destruction. It is rebirth. It is the inevitable cycle of renewal through which humanity advances.",
      attribution: "The Inevitable Manifesto",
    },
    icon: "lightbulb",
    theme: "enlightenment",
  },
  {
    id: "industrial-revolution",
    year: "1760",
    title: "Industrial Revolution",
    description: "Steam engines and mechanization reshaped labor, accelerating production and altering the fabric of society. The factory became humanity's new classroom in efficiency and scale. Industry taught us velocity and mass production, transforming agrarian societies into industrial powerhouses and creating modern civilization.",
    quote: {
      text: "Industry taught us velocity. Now consciousness must teach us direction.",
      attribution: "The Inevitable Manifesto",
    },
    icon: "cog",
    theme: "industrial",
  },
  {
    id: "electric-age",
    year: "1880",
    title: "Electric Age",
    description: "Tesla and Edison electrified the planet, birthing a luminous night and new economies. Electricity conquered darkness, extended productive hours, and connected distant places. Power grids became the nervous system of modern civilization, enabling unprecedented communication, transportation, and industrial growth.",
    quote: {
      text: "Electricity turned darkness into canvas. We now paint constellations of minds.",
      attribution: "The Inevitable Manifesto",
    },
    icon: "zap",
    theme: "electric",
  },
  {
    id: "digital-revolution",
    year: "1990",
    title: "Digital Revolution",
    description: "The internet dissolved geographic boundaries, creating a global nervous system of information exchange. Digital technologies transformed communication, commerce, and culture. Personal computers democratized computational power, while the World Wide Web connected humanity in an unprecedented network of knowledge and collaboration.",
    quote: {
      text: "The internet rewired human connection. Now we must rewire human consciousness.",
      attribution: "The Inevitable Manifesto",
    },
    icon: "wifi",
    theme: "digital",
  },
  {
    id: "ai-revolution",
    year: "2020",
    title: "AI Revolution",
    description: "Artificial Intelligence emerges as humanity's cognitive amplifier, augmenting human intelligence and automating complex tasks. Machine learning, neural networks, and generative AI transform every industry from healthcare to creativity. We stand at the threshold of artificial general intelligence, redefining the nature of work, learning, and human potential.",
    quote: {
      text: "AI is not replacement but expansion—amplifying human wisdom, not diminishing human worth.",
      attribution: "The Inevitable Manifesto",
    },
    icon: "brain-circuit",
    theme: "ai",
  },
  {
    id: "inevitable-emergence",
    year: "2040",
    title: "The Inevitable Emergence",
    description: "A new paradigm dawns where education becomes seamless, holistic, and purpose-driven. The Inevitable represents the conscious evolution of disruption—guided not by profit or power, but by devotion to human flourishing. We transcend traditional boundaries, creating systems that nurture both genius and character, preparing humanity for cosmic citizenship.",
    quote: {
      text: "The Inevitable is not just an organization; it is a philosophy—that progress, disruption, and evolution are unstoppable. Our role is to guide them with purpose.",
      attribution: "The Inevitable Manifesto",
    },
    icon: "infinity",
    theme: "future",
  },
];

export const corePhilosophies: PhilosophyContent[] = [
  {
    id: "disruption-as-renewal",
    title: "Disruption as Renewal",
    summary: "Disruption is a sacred responsibility to evolve what has calcified.",
    description:
      "Like the phoenix rising from deliberate flames, we dismantle stagnation so that craftsmanship, courage, and compassion can re-emerge renewed.",
    metaphor: "Phoenix rebirth",
    historicalReference: "Gutenberg's press shattered the monopoly on scripture, renewing faith through access.",
    quote: philosophyQuotes["disruption-as-renewal"],
  },
  {
    id: "education-as-transformation",
    title: "Education as Transformation",
    summary: "Learning is an alchemical journey from potential to purpose.",
    description:
      "From Da Vinci's apprenticeships to Gandhi's ashrams, true education has always merged rigor with revelation.",
    metaphor: "Alchemy of human potential",
    historicalReference: "Rabindranath Tagore founded Shantiniketan as a sanctuary for liberated learning.",
    quote: philosophyQuotes["education-as-transformation"],
  },
  {
    id: "continuous-improvisation",
    title: "Continuous Improvisation",
    summary: "We orchestrate the future like jazz—disciplined, responsive, alive.",
    description:
      "Improvisation is not chaos; it is mastery listening to the present and composing the next inevitable move.",
    metaphor: "Jazz ensemble in perpetual motion",
    historicalReference: "Charlie Parker's improvisations redefined music by trusting instinct guided by mastery.",
    quote: philosophyQuotes["continuous-improvisation"],
  },
  {
    id: "holistic-knowledge",
    title: "Holistic Knowledge",
    summary: "Wisdom emerges when science, philosophy, art, and spirit converse.",
    description:
      "Einstein conversed with philosophers, poets, and musicians. So must the builders of the next civilization.",
    metaphor: "Sacred constellation of disciplines",
    historicalReference: "The Renaissance thrived because polymaths refused to silo their curiosity.",
    quote: philosophyQuotes["holistic-knowledge"],
  },
  {
    id: "existential-responsibility",
    title: "Existential Responsibility",
    summary: "To shape the future is to accept stewardship of existence itself.",
    description:
      "From Mandela to Malala, those who chose responsibility over comfort altered destiny for millions.",
    metaphor: "Constellation keeper",
    historicalReference: "The Upanishads teach that the universe becomes what the bold imagine with discipline.",
    quote: philosophyQuotes["existential-responsibility"],
  },
];

export const visionPillars: VisionPillar[] = [
  {
    id: "reimagined-education",
    title: "Reimagined Education",
    subtitle: "From rote memorization to pilgrimages of mastery",
    presentState: "Systems obsessed with compliance and standardized answers.",
    futureState: "Studios where curiosity, research, and responsibility are the curriculum.",
    metrics: ["Learners publishing original research by age 16", "Global mentorship networks spanning every continent"],
    quote: {
      text: "Education becomes a sacred expedition rather than an assembly line.",
      attribution: "The Inevitable Manifesto",
    },
  },
  {
    id: "holistic-development",
    title: "Holistic Human Development",
    subtitle: "Mind, body, spirit, community as one symphony",
    presentState: "Fragmented growth that isolates intellect from empathy and craft.",
    futureState: "Integrated studios where engineering, meditation, martial arts, and art coexist.",
    metrics: ["Emotional resilience indicators up 60%", "Communal projects built across disciplines"],
    quote: {
      text: "Human evolution accelerates when intellect dances with integrity.",
      attribution: "The Inevitable Manifesto",
    },
  },
  {
    id: "global-transformation",
    title: "Global Transformation",
    subtitle: "Seeds of change carried by planetary networks",
    presentState: "Innovation hoarded by elites within walled cities of privilege.",
    futureState: "Distributed studios across continents sharing breakthroughs in real time.",
    metrics: ["100+ disruption labs across Global South", "Open-source solutions adopted by millions"],
    quote: {
      text: "When knowledge flows like light, the planet awakens in unison.",
      attribution: "The Inevitable Manifesto",
    },
  },
  {
    id: "free-knowledge",
    title: "Free and Accessible Knowledge",
    subtitle: "From paywalled scarcity to luminous abundance",
    presentState: "Gatekeepers selling access to the collective genius of humanity.",
    futureState: "Knowledge sanctuaries offering radical accessibility in every language and medium.",
    metrics: ["Zero-cost access to advanced labs", "Fully translated curriculum in 30+ languages"],
    quote: {
      text: "Like sunlight, knowledge becomes a birthright, not a product.",
      attribution: "The Inevitable Manifesto",
    },
  },
  {
    id: "evolutionary-purpose",
    title: "Evolutionary Purpose",
    subtitle: "Devotion to the long arc of human destiny",
    presentState: "Short-term gains eclipsing civilizational responsibility.",
    futureState: "Movements choosing the next millennium over the next quarter.",
    metrics: ["Life-long fellowships pledged to planetary stewardship", "Cross-generational councils guiding vision"],
    quote: {
      text: "Purpose is not a slogan; it is a vow to time itself.",
      attribution: "The Inevitable Manifesto",
    },
  },
];

export const disruptionDomains: DisruptionDomain[] = [
  {
    id: "education",
    domain: "Education",
    summary: "Replacing obedience factories with research sanctuaries.",
    historicalParallel: "Gutenberg's press democratized scripture; our studios democratize mastery.",
    futureImagination: "Learners co-create breakthroughs with mentors from every continent.",
    quote: disruptionQuotes[0],
  },
  {
    id: "knowledge",
    domain: "Knowledge",
    summary: "Liberating wisdom from paywalls into constellations of open access.",
    historicalParallel: "Library of Alexandria reborn as a quantum network of open laboratories.",
    futureImagination: "Every discovery shared as a luminous commons instantly.",
    quote: disruptionQuotes[1],
  },
  {
    id: "social",
    domain: "Social Systems",
    summary: "From hierarchical control to cooperative constellations of care.",
    historicalParallel: "Gandhi's satyagraha proved love can reorganize power.",
    futureImagination: "Communities weaving micro-governance fueled by compassion and data.",
    quote: {
      text: "Justice is a choreography where dignity leads every step.",
      attribution: "The Inevitable Manifesto",
    },
  },
  {
    id: "consciousness",
    domain: "Consciousness",
    summary: "Fusing contemplative rigor with scientific insight.",
    historicalParallel: "The Upanishads met cognitive science in meditation labs across the globe.",
    futureImagination: "Neurophenomenology becomes daily practice for decision-making.",
    quote: {
      text: "Stillness is the forge of revolutionary clarity.",
      attribution: "The Inevitable Manifesto",
    },
  },
  {
    id: "economic",
    domain: "Economics",
    summary: "From extraction to regenerative reciprocity.",
    historicalParallel: "Muhammad Yunus proved economies can be designed for dignity.",
    futureImagination: "Value flows mapped as ecosystems, nurturing resilience over profit.",
    quote: {
      text: "When wealth circulates like water, scarcity dissolves.",
      attribution: "The Inevitable Manifesto",
    },
  },
  {
    id: "planetary",
    domain: "Planetary",
    summary: "Civilization graduating from planetary adolescence to cosmic stewardship.",
    historicalParallel: "Apollo reminded humanity the Earth is a fragile tapestry.",
    futureImagination: "Multi-planetary classrooms devoted to thriving biospheres.",
    quote: {
      text: "We do not escape Earth; we learn to listen so deeply that Earth evolves with us.",
      attribution: "The Inevitable Manifesto",
    },
  },
];

export const educationPrinciples: EducationPrinciple[] = [
  {
    id: "moral-awareness",
    title: "Early Moral Awareness",
    essence: "Character is cultivated before curriculum begins.",
    problem: "Ethics is treated as elective rather than foundation.",
    solution: "Daily rituals of reflection, service, and community councils.",
    example: "Mahatma Gandhi's formative vows of truth and non-violence.",
    quote: educationQuotes[0],
  },
  {
    id: "beyond-walls",
    title: "Education Beyond Walls",
    essence: "Learning everywhere, guided by curiosity and responsibility.",
    problem: "Classrooms confine inquiry to fluorescent boxes.",
    solution: "Studios in forests, foundries, observatories, and neighborhoods.",
    example: "Leonardo da Vinci apprenticed with nature as his first studio.",
    quote: educationQuotes[1],
  },
  {
    id: "depth-over-breadth",
    title: "Depth over Breadth",
    essence: "Mastery emerges from disciplined immersion.",
    problem: "Students skim oceans of information without diving.",
    solution: "Long-form research quests, personal legends, seasonal showcases.",
    example: "Isaac Newton isolating himself during the plague to decode gravity.",
    quote: {
      text: "Depth is the devotion of attention over time.",
      attribution: "The Inevitable Manifesto",
    },
  },
  {
    id: "universal-access",
    title: "Universal Access",
    essence: "Knowledge is a birthright, not a privilege.",
    problem: "Paywalls fracture opportunity along economic lines.",
    solution: "Open licences, micro-grants, translation guilds, distributed infrastructure.",
    example: "The printing press flooding Europe with affordable books.",
    quote: {
      text: "Access is the first revolution; mastery is the second.",
      attribution: "The Inevitable Manifesto",
    },
  },
  {
    id: "research-orientation",
    title: "Research Orientation",
    essence: "Every learner becomes a discoverer.",
    problem: "Questions are memorized instead of created.",
    solution: "Studios treat young minds as principal investigators with mentorship.",
    example: "Srinivasa Ramanujan composing theorems in the margins of possibility.",
    quote: {
      text: "Curiosity with rigor births discovery.",
      attribution: "The Inevitable Manifesto",
    },
  },
  {
    id: "discipline-sacrifice",
    title: "Discipline & Sacrifice",
    essence: "Greatness is devotional endurance.",
    problem: "Convenience culture erodes commitment to long arcs of learning.",
    solution: "Pilgrimage projects, resilience training, reflective journaling.",
    example: "Nelson Mandela studying law from a prison cell, preparing for freedom.",
    quote: {
      text: "Devotion is discipline made luminous.",
      attribution: "The Inevitable Manifesto",
    },
  },
];

export const metaphors = {
  phoenix: "Burning the obsolete to birth the luminous",
  jazz: "Improvisation guided by mastery and listening",
  cosmos: "Orbiting ideas, sacred geometry, infinite horizons",
  spiral: "Evolution unfolds in expanding circles of complexity",
  compass: "Ethics as true north for innovation",
  constellation: "Interconnected nodes of community and knowledge",
};

export const visualDescriptions = {
  hero: "Liquid light flows across sacred geometry while phoenix hues pulsate with life.",
  philosophy: "Five celestial forms orbit a luminous core with energy lines weaving constellations.",
  timeline: "Horizontal nebula with parallax layers connecting eras via luminous threads.",
  vision: "Golden spiral arcs through cosmic dusk while pillars radiate holographic halos.",
  disruptions: "Organic panels shifting between past, present, future with particle transitions.",
  education: "Morphing illustrations reveal apprentices becoming innovators across epochs.",
};

export const manifestoContent = {
  missionStatement,
  heroQuotes,
  philosophyQuotes,
  visionQuotes,
  disruptionQuotes,
  educationQuotes,
  closingQuotes,
  historicalFigures,
  historicalEvents,
  corePhilosophies,
  visionPillars,
  disruptionDomains,
  educationPrinciples,
  metaphors,
  visualDescriptions,
};
