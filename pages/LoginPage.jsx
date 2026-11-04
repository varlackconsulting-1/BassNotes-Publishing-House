import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import { useAuth } from '@/contexts/AuthContext';
import pb from '@/lib/pocketbaseClient';
import { toast } from 'sonner';

const FIELD = 'h-12 w-full rounded-xl border border-border bg-background px-4 pl-11 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-primary transition focus:ring-2 focus:border-primary/50';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);

  const redirectTo = new URLSearchParams(location.search).get('redirect') || '/account';

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email.trim(), password);
      toast.success('Welcome back!');
      navigate(redirectTo);
    } catch (err) {
      toast.error(err?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  }

  async function onReset(e) {
    e.preventDefault();
    if (!email.trim()) { toast.error('Enter your email first.'); return; }
    setResetting(true);
    try {
      await pb.collection('users').requestPasswordReset(email.trim());
      toast.success('If that email exists, a reset link is on its way.');
    } catch {
      toast.error('Could not send reset email.');
    } finally {
      setResetting(false);
    }
  }

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-muted/30 px-6 pt-32">
      <Helmet>
        <title>Sign In — BassNotes Bookstore</title>
        <meta name="description" content="Sign in to your BassNotes account to access orders, downloads, and your library." />
      </Helmet>
      <Seo title="Sign In — BassNotes" description="Sign in to your BassNotes account." siteName="BassNotes" />
      <Reveal className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-[0_30px_60px_-30px_rgba(10,61,98,0.3)]">
          <h1 className="font-display text-2xl font-semibold text-primary">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your BassNotes account.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="email" className={FIELD} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="password" className={FIELD} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
            </div>
            <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition hover:brightness-110 disabled:opacity-60">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign In <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
          <button onClick={onReset} disabled={resetting} className="mt-4 text-xs text-muted-foreground hover:text-primary">
            {resetting ? 'Sending…' : 'Forgot your password? Reset it'}
          </button>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to BassNotes? <Link to="/signup" className="font-semibold text-primary underline-offset-4 hover:underline">Create an account</Link>
          </p>
        </div>
      </Reveal>
    </main>
  );
}
