import type { LucideIcon } from 'lucide-react';
import {
  Boxes,
  BrainCircuit,
  Gauge,
  Globe2,
  Megaphone,
  MonitorSmartphone,
  Network,
  Palette,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
} from 'lucide-react';

export type Service = {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: LucideIcon;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type WorkItem = {
  label: 'Internal Prototype' | 'Product Concept' | 'Research & Development';
  title: string;
  category: string;
  handle: string;
  image: string;
  icon: LucideIcon;
  challenge: string;
  solution: string;
  technology: string;
  result: string;
};

export type Audience = {
  title: string;
  pain: string;
  outcome: string;
};

export type Insight = {
  label: string;
  title: string;
  summary: string;
};

export const brand = {
  name: 'R-REX Solutions',
  tagline: 'Ideas to Implementation',
  statement: 'Transforming Ideas into Intelligent Solutions',
  founder: 'Amrutha Ramisetty',
  cofounder: 'Rangu Reddy Dheeraj',
  phone: '+91 78930 79391',
  phoneHref: 'tel:+917893079391',
  email: 'amrutharamisetty248@gmail.com',
  whatsapp:
    'https://wa.me/917893079391?text=Hello%20R-REX%20Solutions%2C%20I%20would%20like%20to%20discuss%20a%20project.',
};

export const socialLinks = [
  {
    label: 'Company LinkedIn Page',
    href: 'https://www.linkedin.com/company/135853990/',
    icon: Globe2,
  },
  {
    label: 'Founder LinkedIn profile',
    href: 'https://www.linkedin.com/in/amrutha-ramisetty/',
    icon: Globe2,
  },
];

export const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

export const capabilities = [
  'Strategy',
  'UI & UX',
  'Web Development',
  'Application Development',
  'AI Integration',
  'Automation',
  'APIs',
  'Dashboards',
  'Testing',
  'Deployment',
  'Support',
];

export const manifestoStatements = [
  { text: 'An idea is only the beginning.', image: '/assets/manifesto/01-idea.png' },
  { text: 'Clarity turns it into a plan.', image: '/assets/manifesto/02-plan.png' },
  { text: 'Engineering turns it into a product.', image: '/assets/manifesto/03-product.png' },
  { text: 'R-REX turns it into implementation.', image: '/assets/manifesto/04-implementation.png' },
];

export const services: Service[] = [
  {
    number: '01',
    title: 'Web Development',
    description:
      'Responsive, accessible and conversion-focused websites, portals and browser-based platforms.',
    deliverables: ['Company sites', 'Web portals', 'Browser platforms'],
    icon: MonitorSmartphone,
  },
  {
    number: '02',
    title: 'Mobile App Development',
    description:
      'User-centred mobile experiences with dependable authentication, data and notification flows.',
    deliverables: ['Mobile flows', 'Authentication', 'Notification systems'],
    icon: Smartphone,
  },
  {
    number: '03',
    title: 'AI & Automation',
    description:
      'AI assistants, classification, recommendations, workflow automation and intelligent business tools.',
    deliverables: ['AI assistants', 'Workflow automation', 'Classification tools'],
    icon: BrainCircuit,
  },
  {
    number: '04',
    title: 'UI/UX Design',
    description:
      'Research-informed flows, wireframes, design systems, prototypes and polished responsive interfaces.',
    deliverables: ['Wireframes', 'Design systems', 'Responsive prototypes'],
    icon: Palette,
  },
  {
    number: '05',
    title: 'Branding & Digital Presence',
    description:
      'Brand systems, social assets, portfolio experiences and cohesive digital communication.',
    deliverables: ['Brand systems', 'Social assets', 'Portfolio experiences'],
    icon: Megaphone,
  },
  {
    number: '06',
    title: 'Backend / API / Cloud Solutions',
    description:
      'Secure services, databases, integrations, deployments and scalable application foundations.',
    deliverables: ['APIs', 'Databases', 'Cloud deployments'],
    icon: Network,
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the problem, users and desired outcome.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Design the right experience, architecture and delivery plan.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Build with discipline in visible, reviewable milestones.',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Release with quality checks, performance polish and dependable handoff.',
  },
  {
    number: '05',
    title: 'Support',
    description: 'Improve with evidence after release through support, monitoring and iteration.',
  },
];

export const workItems: WorkItem[] = [
  {
    label: 'Internal Prototype',
    title: 'AI Operations Console',
    category: 'Product Design',
    handle: '@rrex-labs',
    image: '/assets/showcase/ai-operations-console.jpg',
    icon: BrainCircuit,
    challenge: 'Teams need one place to review requests, knowledge and automated actions.',
    solution: 'A modular assistant surface with queues, approval states and auditable activity.',
    technology: 'React, API orchestration, AI workflow design',
    result: 'Demonstrates how governed AI support can fit real operating workflows.',
  },
  {
    label: 'Product Concept',
    title: 'Founder Launch Dashboard',
    category: 'Digital Products',
    handle: '@rrex-product',
    image: '/assets/showcase/mobile-logistics.jpg',
    icon: Smartphone,
    challenge: 'Early teams often lose clarity between requirements, build tasks and release readiness.',
    solution: 'A blueprint-to-launch workspace for scope, milestones, risks and handoff notes.',
    technology: 'TypeScript, dashboards, role-aware UX',
    result: 'Shows a clear path from idea notes to implementation checkpoints.',
  },
  {
    label: 'Research & Development',
    title: 'Document Intelligence Pipeline',
    category: 'AI Integration',
    handle: '@rrex-ai',
    image: '/assets/showcase/modular-ai-icons.jpg',
    icon: Boxes,
    challenge: 'Institutions handle repetitive documents that need reliable classification and review.',
    solution: 'A secure processing flow for extraction, summarization and human validation.',
    technology: 'AI integration, automation, validation UI',
    result: 'Explores safer ways to use AI in document-heavy operations.',
  },
  {
    label: 'Product Concept',
    title: 'Adaptive Learning Circuit',
    category: 'Gamified Experiences',
    handle: '@rrex-play',
    image: '/assets/showcase/gamified-experience.jpg',
    icon: Sparkles,
    challenge: 'Learning products need feedback loops that feel motivating rather than mechanical.',
    solution: 'A playful progression system built around exploration, rewards and visible mastery.',
    technology: '3D interaction, motion systems, product UX',
    result: 'Shows how game mechanics can make complex learning journeys easier to enter and sustain.',
  },
  {
    label: 'Research & Development',
    title: 'Precision Automation Cell',
    category: 'Industrial & Manufacturing',
    handle: '@rrex-systems',
    image: '/assets/showcase/industrial-automation.jpg',
    icon: Workflow,
    challenge: 'Operators need clear supervision across precise, repeatable automated processes.',
    solution: 'A visual control concept connecting machine state, quality signals and human review.',
    technology: 'Automation, monitoring, operational UX',
    result: 'Demonstrates a calmer interface model for high-confidence industrial workflows.',
  },
  {
    label: 'Internal Prototype',
    title: 'Reflective Identity System',
    category: 'Brand & Marketing',
    handle: '@rrex-studio',
    image: '/assets/showcase/brand-glass-system.jpg',
    icon: Palette,
    challenge: 'Technology brands need visual systems that feel distinctive without becoming noisy.',
    solution: 'A modular identity language using glass, reflection and tightly controlled motion.',
    technology: '3D art direction, identity design, motion',
    result: 'Explores a premium visual vocabulary for launches, campaigns and digital products.',
  },
  {
    label: 'Product Concept',
    title: 'Living Symbol Study',
    category: '3D Logos',
    handle: '@rrex-motion',
    image: '/assets/showcase/sculptural-3d-logo.jpg',
    icon: Rocket,
    challenge: 'Static marks often lose their presence when a brand moves into interactive environments.',
    solution: 'A dimensional symbol system designed for motion, light and responsive digital surfaces.',
    technology: '3D design, motion language, real-time rendering',
    result: 'Demonstrates how a visual identity can remain recognizable while becoming spatial and animated.',
  },
  {
    label: 'Internal Prototype',
    title: 'Spatial Analytics Workspace',
    category: 'Dashboards',
    handle: '@rrex-data',
    image: '/assets/showcase/spatial-analytics-dashboard.jpg',
    icon: MonitorSmartphone,
    challenge: 'Dense operational data needs hierarchy that supports both quick scanning and deeper investigation.',
    solution: 'A responsive analytics workspace combining spatial models, trends and operational status.',
    technology: 'Data visualization, dashboard UX, responsive systems',
    result: 'Shows how complex monitoring can remain legible across desktop and tablet contexts.',
  },
];

export const values = [
  { title: 'Innovation', icon: Sparkles },
  { title: 'Precision', icon: Gauge },
  { title: 'Transparency', icon: Boxes },
  { title: 'Scalability', icon: Workflow },
  { title: 'Quality', icon: ShieldCheck },
  { title: 'Reliable Delivery', icon: Rocket },
];

export const audiences: Audience[] = [
  {
    title: 'Startup founders',
    pain: 'A strong idea needs a clear MVP path.',
    outcome: 'Turn early requirements into a focused launch plan.',
  },
  {
    title: 'Small and medium businesses',
    pain: 'Manual workflows slow teams down.',
    outcome: 'Replace scattered processes with dependable digital systems.',
  },
  {
    title: 'Professionals and creators',
    pain: 'Expertise needs a credible digital presence.',
    outcome: 'Build polished experiences that explain, convert and scale.',
  },
  {
    title: 'Institutions and teams',
    pain: 'Internal work needs structure and visibility.',
    outcome: 'Create dashboards, portals and tools people can actually use.',
  },
  {
    title: 'Existing product owners',
    pain: 'Products need refinement, stability or new capabilities.',
    outcome: 'Improve usability, architecture and delivery confidence.',
  },
];

export const insights: Insight[] = [
  {
    label: 'Discovery',
    title: 'Before code, make the requirement visible.',
    summary: 'A better brief reduces rework and helps every milestone become easier to review.',
  },
  {
    label: 'Product',
    title: 'A polished interface is part of the engineering.',
    summary: 'Good UX makes workflows clearer, support lighter and adoption more natural.',
  },
  {
    label: 'AI & Automation',
    title: 'Automate decisions carefully, not blindly.',
    summary: 'Reliable systems keep humans in the loop where judgment, approval or risk matters.',
  },
];
