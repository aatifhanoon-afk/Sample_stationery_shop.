import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/store/AuthContext';
import { BookOpen, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(email, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brass-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-navy-700/30 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-brass-500 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-navy-900" />
            </div>
          </div>
          <h1 className="font-serif text-2xl font-bold text-cream-50">Paper &amp; Parchment</h1>
          <p className="text-sm text-cream-400 mt-1">Inventory Management System</p>
        </div>

        <div className="bg-navy-900 rounded-2xl border border-navy-700 p-8 shadow-2xl">
          <h2 className="font-serif text-xl font-bold text-cream-50 mb-2">Admin Sign In</h2>
          <p className="text-sm text-cream-400 mb-6">Enter your credentials to access the dashboard.</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-red-300">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-cream-400 block mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@paperparchment.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-navy-800 border border-navy-700 text-cream-50 text-sm placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-brass-400 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-cream-400 block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-navy-800 border border-navy-700 text-cream-50 text-sm placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-brass-400 transition-all"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-brass-500 text-navy-900 font-semibold hover:bg-brass-400 transition-all shadow-lg flex items-center justify-center gap-2 group"
            >
              Sign In to Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 p-3 rounded-lg bg-navy-800/50 border border-navy-700">
            <p className="text-xs text-cream-400 text-center">
              Demo credentials: <span className="text-brass-400 font-mono">admin@paperparchment.com</span> / <span className="text-brass-400 font-mono">adminpassword123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
