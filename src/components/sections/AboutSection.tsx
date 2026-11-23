import { ExternalLink } from 'lucide-react';
import { ButtonLink } from '../ui/ButtonLink';

export const teamMembers = [
  {
    name: 'Amrutha Ramisetty',
    role: 'Founder',
    image: '/assets/team/amrutha-ramisetty.png',
    linkedin: 'https://www.linkedin.com/in/amrutha-ramisetty/',
    bio: 'Turns ideas into practical digital products, with hands-on work across full-stack development, AI-enabled learning systems and civic-tech platforms.',
  },
  {
    name: 'Dheeraj Rangu',
    role: 'Co-founder & CEO',
    image: '/assets/team/dheeraj-rangu.jpeg',
    linkedin: 'https://www.linkedin.com/in/dheeraj-rangu-a22764322/',
    bio: 'Guides product direction and engineering execution, with project experience spanning civic technology, learning platforms and impact-driven web applications.',
  },
  {
    name: 'Muni Manas Eti',
    role: 'Chief Operating Officer',
    image: '/assets/team/muni-manas-eti.jpeg',
    linkedin: 'https://www.linkedin.com/in/muni-manas-eti/',
    bio: 'Coordinates delivery, team operations and the systems that move client ideas from planning into implementation.',
  },
  {
    name: 'Mehajabeen Shaik',
    role: 'Chief Technology Officer',
    image: '/assets/team/mehajabeen-shaik.jpeg',
    linkedin: 'https://www.linkedin.com/in/mehajabeen-shaik-b87a58325/',
    bio: 'Leads technical architecture and implementation, with collaborative project work across web platforms, databases and AI-enabled learning experiences.',
  },
  {
    name: 'Rohith Kumar Sharabu',
    role: 'Chief Marketing Officer',
    image: '/assets/team/rohith-kumar-sharabu.jpeg',
    linkedin: 'https://www.linkedin.com/in/rohithkumarsharabu/',
    bio: 'Connects brand strategy with technology storytelling, backed by interests in automation, generative AI, cloud and software development.',
  },
  {
    name: 'Bhargav Sunku',
    role: 'Team Leader',
    image: '/assets/team/bhargav-sunku.jpeg',
    linkedin: 'https://www.linkedin.com/in/bhargav-sunku-24754b353/',
    bio: 'Helps organize execution, collaboration and day-to-day delivery across R-REX projects.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="about-copy">
        <span className="section-kicker">05 / ABOUT</span>
        <h2>Creativity, technology and execution in one build partner</h2>
        <p>
          R-REX Solutions combines creative thinking, modern technology and disciplined execution to turn ideas into
          real digital products. We listen before building, shape requirements into visible plans, and stay accountable
          from first concept through launch.
        </p>
      </div>
      <div className="leadership-grid" aria-label="R-REX Solutions leadership team">
        {teamMembers.map((member) => (
          <article className="leader-card" key={member.name}>
            <div className="leader-photo-frame">
              <img
                className={`leader-photo ${member.name === 'Amrutha Ramisetty' ? 'leader-photo-amrutha' : ''}`}
                src={member.image}
                alt={`${member.name}, ${member.role} at R-REX Solutions`}
                width={900}
                height={1000}
                loading="lazy"
              />
            </div>
            <div className="leader-details">
              <span className="leader-role">{member.role}</span>
              <h3>{member.name}</h3>
              <p>{member.bio}</p>
              <ButtonLink href={member.linkedin} variant="secondary" external>
                View LinkedIn <ExternalLink size={15} />
              </ButtonLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
