import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setSent(false);
    setError('');

    try {
      // Simulated email reset (replace with real API call)
      if (!email.includes('@')) {
        throw new Error('Invalid email address');
      }

      // await resetPassword(email); // ← real backend call here
      setSent(true);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="max-w-md w-full bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>

        {sent && (
          <Alert className="mb-4">
            <AlertDescription>
              A reset link has been sent to <strong>{email}</strong>.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-4" variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleReset}>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        </form>

        <button
          onClick={() => navigate('/login')}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
