export type NodeTier = 'core' | 'philosophy' | 'skill' | 'project';
export type EdgeWeight = 'strong' | 'medium' | 'light';

export interface GraphNode {
  id: string;
  label: string;
  tier: NodeTier;
  /** Degrees, 0 = right, clockwise. Ignored for the core node. */
  angle: number;
  detail: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight: EdgeWeight;
}

export const nodes: GraphNode[] = [
  {
    id: 'core',
    label: 'Design thinking',
    tier: 'core',
    angle: 0,
    detail:
      'Reading why something needs to exist before deciding what to build — then carrying that answer through architecture, communication, and shipped product.',
  },

  // Philosophy ring — the three strengths from the Philosophy section
  {
    id: 'phil-tech',
    label: 'Technology without building it',
    tier: 'philosophy',
    angle: -90,
    detail:
      'Understanding how systems are architected, where technology enables and where it limits, and making product decisions without writing a line of code.',
  },
  {
    id: 'phil-comm',
    label: 'Communication across the whole cycle',
    tier: 'philosophy',
    angle: 30,
    detail:
      'Simplifying for the people who need the big picture, going granular for the people in the detail — the same idea, recalibrated for altitude.',
  },
  {
    id: 'phil-learn',
    label: 'Fast learning, real network',
    tier: 'philosophy',
    angle: 150,
    detail:
      'Working at the edge of what I know by reaching out, asking, learning, and bringing it back into the work — on a deadline, not on a syllabus.',
  },

  // Skill ring — the connective tissue between philosophy and delivered work
  {
    id: 'sys-arch',
    label: 'Systems & product architecture',
    tier: 'skill',
    angle: -130,
    detail:
      'Reads how a system is built end to end — enterprise packaging software architecture at Esko, blockchain protocol design at Avalon Labs — well enough to make build/no-build calls without writing the code.',
  },
  {
    id: 'zero-to-one',
    label: 'Zero-to-one execution',
    tier: 'skill',
    angle: -50,
    detail:
      'Ships under ambiguity with no existing playbook: a blockchain product built from the ground up in roughly six months at Avalon Labs; community health interventions designed from scratch across nine states at Noora Health.',
  },
  {
    id: 'cross-func',
    label: 'Cross-functional translation',
    tier: 'skill',
    angle: -10,
    detail:
      'Sits between engineering, design, and the client in the same conversation — carrying features at Esko from first concept through enterprise clients like Unilever, Nestlé, Mercedes, and Apple to shipped product.',
  },
  {
    id: 'stakeholder-comm',
    label: 'Stakeholder communication at scale',
    tier: 'skill',
    angle: 70,
    detail:
      'Same message, recalibrated for altitude — a frontline health worker in Jharkhand, a country director in a boardroom, an engineering lead, an enterprise procurement team.',
  },
  {
    id: 'rapid-immersion',
    label: 'Rapid domain immersion',
    tier: 'skill',
    angle: 110,
    detail:
      'Builds working fluency in an unfamiliar technical domain fast enough to ship in it — blockchain architecture, packaging software internals, community health behaviour — each picked up by reaching out, asking, and learning in public.',
  },
  {
    id: 'behavior-design',
    label: 'Behavioural design & experimentation',
    tier: 'skill',
    angle: 190,
    detail:
      'Reads real-world behaviour, designs experiments, and iterates on what the data says — the method behind Noora Health’s nine-state rollout, and behind deciding what to keep and cut on Esko’s roadmap.',
  },

  // Project ring — the delivered work, aligned to its dominant philosophy
  {
    id: 'esko',
    label: 'Esko',
    tier: 'project',
    angle: -90,
    detail:
      'Enterprise packaging software. Worked inside the architecture, translating between engineering, design, and clients including Unilever, Nestlé, Mercedes, and Apple — carrying features from concept through to shipped product, repeatedly.',
  },
  {
    id: 'noora',
    label: 'Noora Health',
    tier: 'project',
    angle: 30,
    detail:
      'Community health systems across nine Indian states. Reading on-the-ground behaviour, running experiments, and making hard calls about what to build and what to let go, in service of frontline health workers and the people they reach.',
  },
  {
    id: 'avalon',
    label: 'Avalon Labs',
    tier: 'project',
    angle: 150,
    detail:
      'Blockchain products built from the ground up in roughly six months — working at the edge of an unfamiliar domain, learning fast, and turning that learning directly into shipped product decisions.',
  },
];

export const edges: GraphEdge[] = [
  // core -> philosophy
  { from: 'core', to: 'phil-tech', weight: 'strong' },
  { from: 'core', to: 'phil-comm', weight: 'strong' },
  { from: 'core', to: 'phil-learn', weight: 'strong' },

  // philosophy -> skill
  { from: 'phil-tech', to: 'sys-arch', weight: 'strong' },
  { from: 'phil-tech', to: 'zero-to-one', weight: 'medium' },
  { from: 'phil-tech', to: 'rapid-immersion', weight: 'light' },
  { from: 'phil-comm', to: 'cross-func', weight: 'strong' },
  { from: 'phil-comm', to: 'stakeholder-comm', weight: 'strong' },
  { from: 'phil-comm', to: 'behavior-design', weight: 'light' },
  { from: 'phil-learn', to: 'rapid-immersion', weight: 'strong' },
  { from: 'phil-learn', to: 'behavior-design', weight: 'strong' },
  { from: 'phil-learn', to: 'zero-to-one', weight: 'medium' },

  // skill -> project
  { from: 'sys-arch', to: 'esko', weight: 'strong' },
  { from: 'sys-arch', to: 'avalon', weight: 'medium' },
  { from: 'cross-func', to: 'esko', weight: 'strong' },
  { from: 'cross-func', to: 'noora', weight: 'medium' },
  { from: 'stakeholder-comm', to: 'esko', weight: 'medium' },
  { from: 'stakeholder-comm', to: 'noora', weight: 'strong' },
  { from: 'rapid-immersion', to: 'avalon', weight: 'strong' },
  { from: 'rapid-immersion', to: 'noora', weight: 'medium' },
  { from: 'rapid-immersion', to: 'esko', weight: 'light' },
  { from: 'zero-to-one', to: 'avalon', weight: 'strong' },
  { from: 'zero-to-one', to: 'noora', weight: 'medium' },
  { from: 'behavior-design', to: 'noora', weight: 'strong' },
  { from: 'behavior-design', to: 'esko', weight: 'light' },
];
