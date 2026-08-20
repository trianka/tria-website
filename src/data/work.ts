export interface WorkEntry {
  org: string;
  focus: string;
  summary: string;
  tags: string[];
}

export const work: WorkEntry[] = [
  {
    org: 'Esko',
    focus: 'Packaging software, product strategy',
    summary:
      'Worked inside the architecture of enterprise packaging software, translating between engineering, design, and clients including Unilever, Nestlé, Mercedes, and Apple. Pitched ideas to leadership, secured engineering buy-in, and carried features from first concept through to shipped product, repeatedly.',
    tags: ['Product architecture', 'Enterprise clients', 'Concept to ship'],
  },
  {
    org: 'Avalon Labs',
    focus: 'Blockchain products',
    summary:
      'Built blockchain products from the ground up in roughly six months — working at the edge of an unfamiliar domain, learning fast, and turning that learning directly into shipped product decisions.',
    tags: ['Blockchain', 'Zero-to-one', 'Fast learning'],
  },
  {
    org: 'Noora Health',
    focus: 'Community health systems',
    summary:
      'Designed community health interventions across nine Indian states — reading on-the-ground behaviour, running experiments, and making hard calls about what to build and what to let go, in service of frontline health workers and the people they reach.',
    tags: ['Public health', 'Behaviour design', 'Nine states'],
  },
];
