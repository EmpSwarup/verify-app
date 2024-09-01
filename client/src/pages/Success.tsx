import React from 'react';

const SuccessPage: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center justify-center border-2 border-white">
      <h1 className="text-2xl mb-4">Verification Successful!</h1>
      <p className="mb-4">Your code has been successfully verified.</p>
      <a href="/" className="mt-4 text-blue-400 hover:underline">Go back to Home</a>
    </div>
  );
};

export default SuccessPage;
