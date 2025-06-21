"use client";

import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  disabled?: boolean;
  showPasswordToggle?: boolean;
  register: UseFormRegisterReturn;
}

export function Input({
  label,
  placeholder,
  type = "text",
  autoComplete,
  error,
  disabled,
  showPasswordToggle = false,
  register,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <input
        {...register}
        type={inputType}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        className={`w-full px-4 py-2 border   rounded-md bg-gray-300 bg-opacity-10 shadow-sm focus:outline-none focus:ring-2 focus:border-transparent ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-violet-600"
        }`}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-white hover:text-gray-400 focus:outline-none"
          tabIndex={-1}
          aria-label={showPassword ? "Skryť heslo" : "Zobraziť heslo"}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.146.217-2.24.607-3.25M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                opacity={0.4}
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3l18 18"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      )}
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
