import React, { useState } from "react";
import type { KeyboardEvent } from "react";

interface ChipInputProps {
  label: string;
  placeholder: string;
  chips: string[];
  onChipsChange: (chips: string[]) => void;
}

export const ChipInput: React.FC<ChipInputProps> = ({
  label,
  placeholder,
  chips,
  onChipsChange,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!chips.includes(inputValue.trim())) {
        onChipsChange([...chips, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeChip = (chipToRemove: string) => {
    onChipsChange(chips.filter((chip) => chip !== chipToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
        <div className="flex flex-wrap gap-2 mb-2">
          {chips.map((chip) => (
            <div
              key={chip}
              className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              <span>{chip}</span>
              <button
                type="button"
                onClick={() => removeChip(chip)}
                className="hover:bg-blue-200 rounded-full p-0.5 transition"
                aria-label={`Remove ${chip}`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full outline-none"
        />
      </div>
    </div>
  );
};
