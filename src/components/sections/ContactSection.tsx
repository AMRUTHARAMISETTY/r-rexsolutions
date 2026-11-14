import { useState } from 'react';
import type { FormEvent } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import { brand } from '../../data/siteContent';

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  whatsappPreference: string;
  projectType: string;
  budget: string;
  targetLaunchDate: string;
  description: string;
  consent: boolean;
  attachmentName: string;
};

const initialForm: ContactForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  whatsappPreference: 'Email first',
  projectType: 'Website or digital experience',
  budget: 'To be discussed',
  targetLaunchDate: '',
  description: '',
  consent: false,
  attachmentName: '',
};

export function ContactSection() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validate = () => {
    const nextErrors: Partial<Record<keyof ContactForm, string>> = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email.';
    if (!form.description.trim()) nextErrors.description = 'Describe what you want to build.';
    if (!form.consent) nextErrors.consent = 'Consent is required before sending.';
    return nextErrors;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setState('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('No configured email provider.');
      setState('success');
      setForm(initialForm);
    } catch {
      setState('error');
    }
  };

  const updateField = <Field extends keyof ContactForm>(field: Field, value: ContactForm[Field]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-copy">
        <span className="section-kicker">CONTACT / START A PROJECT</span>
        <h2>Tell us what you want to build.</h2>
        <p>
          No email-service secret is stored in the frontend. If a secure server route is not configured yet, use the
          direct email or WhatsApp fallback below.
        </p>
        <div className="contact-methods">
          <a href={`mailto:${brand.email}`}>
            <Mail size={18} /> {brand.email}
          </a>
          <a href={brand.phoneHref}>
            <Phone size={18} /> {brand.phone}
          </a>
          <span>Location: India</span>
          <span>Availability: Projects and collaborations</span>
        </div>
      </div>
      <form className="contact-form" onSubmit={submit} noValidate>
        <div className="form-grid">
          <label>
            Name
            <input value={form.name} onChange={(event) => updateField('name', event.target.value)} />
            {errors.name && <small>{errors.name}</small>}
          </label>
          <label>
            Company / Organization
            <input value={form.company} onChange={(event) => updateField('company', event.target.value)} />
          </label>
          <label>
            Email
            <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} />
            {errors.email && <small>{errors.email}</small>}
          </label>
          <label>
            Phone
            <input type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
          </label>
          <label>
            Phone / WhatsApp preference
            <select
              value={form.whatsappPreference}
              onChange={(event) => updateField('whatsappPreference', event.target.value)}
            >
              <option>Email first</option>
              <option>WhatsApp preferred</option>
              <option>Phone call preferred</option>
            </select>
          </label>
          <label>
            Project type
            <select value={form.projectType} onChange={(event) => updateField('projectType', event.target.value)}>
              <option>Website or digital experience</option>
              <option>Web application</option>
              <option>Mobile application</option>
              <option>AI-powered solution</option>
              <option>Automation system</option>
              <option>UI/UX design</option>
              <option>Backend, APIs or cloud</option>
              <option>QA, maintenance or support</option>
              <option>Digital presence or branding</option>
              <option>Product consulting</option>
            </select>
          </label>
          <label>
            Budget range
            <select value={form.budget} onChange={(event) => updateField('budget', event.target.value)}>
              <option>To be discussed</option>
              <option>Under INR 50,000</option>
              <option>INR 50,000 - INR 1,50,000</option>
              <option>INR 1,50,000 - INR 5,00,000</option>
              <option>INR 5,00,000+</option>
            </select>
          </label>
          <label>
            Target launch date
            <input
              type="date"
              value={form.targetLaunchDate}
              onChange={(event) => updateField('targetLaunchDate', event.target.value)}
            />
          </label>
          <label>
            Optional file attachment
            <input
              type="file"
              onChange={(event) => updateField('attachmentName', event.target.files?.[0]?.name ?? '')}
            />
          </label>
        </div>
        <label>
          Project summary
          <textarea
            rows={5}
            value={form.description}
            onChange={(event) => updateField('description', event.target.value)}
          />
          {errors.description && <small>{errors.description}</small>}
        </label>
        {form.attachmentName && <p className="form-note">Selected file: {form.attachmentName}</p>}
        <label className="consent-row">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(event) => updateField('consent', event.target.checked)}
          />
          I agree to be contacted about this project request.
        </label>
        {errors.consent && <small>{errors.consent}</small>}
        {state === 'success' && <p className="form-status success">Request sent successfully.</p>}
        {state === 'error' && (
          <p className="form-status error">
            Secure email delivery is not configured yet. Please use email or WhatsApp and include your project details.
          </p>
        )}
        <button className="btn btn-primary" type="submit" disabled={state === 'loading'}>
          {state === 'loading' ? 'Sending...' : 'Submit project request'} <Send size={17} />
        </button>
      </form>
    </section>
  );
}
