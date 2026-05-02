export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 w-full max-w-md text-center">
        <div className="text-5xl mb-4">📧</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h1>
        <p className="text-gray-500 mb-6">
          A magic sign-in link has been sent to your email address.
          Click the link to complete your sign in.
        </p>
        <p className="text-sm text-gray-400">
          (In development, check the server console for the magic link.)
        </p>
      </div>
    </div>
  );
}
