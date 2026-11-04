import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Loader2, Mail, Lock, User, ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const FIELD = 'h-12 w-full rounded-xl border border-border bg-background px-4 pl-11 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-primary transition focus:ring-2 focus:border-primary/50';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  function update(field) { return (e) => setForm((p) => ({ ...p, [field]: e.target.value })); }

  async function onSubmit(e) {
    e.preventDefault();
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters.'); return; }
    if (form.password !== form.confirm) { toast.error('Passwords do not match.'); return; }
    setLoading(true);
    try {
      await signup(form.email.trim(), form.password, { name: form.name.trim() });
      toast.success('Account created — welcome to BassNotes!');
      navigate('/account');
    } catch (err) {
      toast.error(err?.message || 'Could not create account.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-muted/30 px-6 pt-32">
      <Helmet>
        <title>Create Account — BassNotes Bookstore</title>
        <meta name="description" content="Create a BassNotes account to shop books, track orders, and access your digital library." />
      </Helmet>
      <Seo title="Create Account — BassNotes" description="Create a BassNotes account." siteName="BassNotes" />
      <Reveal className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-[0_30px_60px_-30px_rgba(10,61,98,0.3)]">
          <h1 className="font-display text-2xl font-semibold text-primary">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Shop books, track orders, and access your digital library.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input className={FIELD} placeholder="Full name" value={form.name} onChange={update('name')} required autoComplete="name" />
            </div>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="email" className={FIELD} placeholder="Email" value={form.email} onChange={update('email')} required autoComplete="email" />
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="password" className={FIELD} placeholder="Password (min 8 characters)" value={form.password} onChange={update('password')} required autoComplete="new-password" />
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="password" className={FIELD} placeholder="Confirm password" value={form.confirm} onChange={update('confirm')} required autoComplete="new-password" />
            </div>
            <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition hover:brightness-110 disabled:opacity-60">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Create Account <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-semibold text-primary underline-offset-4 hover:underline">Sign in</Link>
          </p>
        </div>
      </Reveal>
    </main>
  );
}
