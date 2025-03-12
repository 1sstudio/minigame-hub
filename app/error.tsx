'use client';

// app/error.tsx
export default function GlobalError({ error, reset }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{display: 'flex', placeContent: 'center', flexWrap:'wrap', height: '100vh', width: '95vw', marginLeft: '2.5vw'}}>
      <div id={'error-container'} style={{ textAlign: 'center' }}>
        <h1>
          Something went wrong on our end. Please try again later.
        </h1>
        <p>
          VIPs should email <a
            href="mailto:support@1s.studio"
          >support@1s.studio</a> to reset their passwords. Please include "PASSWORD RESET" and your username in the subject line.
        </p>
      </div>
    </div>
  );
}