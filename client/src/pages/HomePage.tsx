import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

const HomePage: React.FC = () => {
  const [otp, setOtp] = useState<string>('');
  const [message, setMessage] = useState<string>('Enter code');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'default'>('default');
  const [isValid, setIsValid] = useState<boolean[]>(new Array(6).fill(true));

  const handleOtpChange = (value: string) => {
    setOtp(value);
    validateOtp(value);
  };

  const validateOtp = (value: string) => {
    const newValidity = new Array(6).fill(true);

    if (value === '') {
      setMessage('Enter code');
      setMessageType('default');
      return;
    }

    if (!/^\d+$/.test(value)) {
      setMessage('Invalid characters: code should contain only digits.');
      setMessageType('error');
      return;
    }

    for (let i = 0; i < value.length; i++) {
      if (!/^\d$/.test(value[i])) {
        newValidity[i] = false;
      }
    }

    setIsValid(newValidity);

    if (value.length === 6 && !/^\d+$/.test(value)) {
      setMessage('Invalid characters: code should contain only digits.');
      setMessageType('error');
    } else if (value.length === 6 && /^\d+$/.test(value)) {
      setMessage('');
      setMessageType('default');
    } else {
      setMessage('');
      setMessageType('default');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: otp }),
      });
      const result = await response.json();
      if (response.ok) {
        window.location.href = '/success';
      } else {
        setMessage(result.message || 'Verification failed.');
        setMessageType('error');
      }
    } catch {
      setMessage('Error occurred during verification.');
      setMessageType('error');
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center justify-center border-2 border-white">
      <h1 className="text-2xl mb-4">Verify Your Code</h1>
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        value={otp}
        onChange={handleOtpChange}
        className="mb-4"
      >
        <InputOTPGroup className="flex justify-between w-full pb-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className={`border-2 ${isValid[index] ? 'border-gray-300' : 'border-red-600'}`}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {message && (
        <p className={`mb-4 ${messageType === 'success' ? 'text-green-400' : messageType === 'error' ? 'text-red-400' : 'text-white'}`}>
          {message}
        </p>
      )}
      <Button onClick={handleSubmit} className="mt-4 px-6 py-3 text-lg font-semibold rounded-lg">
        Submit
      </Button>
    </div>
  );
};

export default HomePage;
