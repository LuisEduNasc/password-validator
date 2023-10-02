import React, { useState, useEffect } from 'react'
import { Check, X } from 'lucide-react';

import { cn } from '../lib/utils';

export type Requirements = 'noConsecutiveLetters' | 'number' | 'specialCharacters' | 'uppercase';

interface Props {
  disabled: boolean;
  passwordReqs: Requirements[];
  className?: string;
  onChange?: (valid: boolean) => void;
};

interface ValidationPattern {
  pattern: string;
  description: string;
};

type ValidationRegexPatterns = {
  [key in 'noConsecutiveLetters' | 'number' | 'specialCharacters' | 'uppercase']: ValidationPattern;
} & { [key: string]: ValidationPattern };

const validationRegexPatterns: ValidationRegexPatterns = {
  noConsecutiveLetters: {
    pattern: '^(?!.*?(.)\\1).+$',
    description: 'Has NO consecutive letters.'
  },
  number:{
    pattern: '(?=.*\\d)',
    description: 'Has a number 0-9'
  },
  specialCharacters: {
    pattern: '(?=.*[!@#$%^&*])',
    description: 'Has a special char: !@#$%^&*'
  },
  uppercase: {
    pattern: '(?=.*[A-Z])',
    description: 'Has uppercase Letter'
  }
};

const validClass = 'bg-green-500';
const invalidClass = 'bg-[#f30000]';

const PasswordValidator: React.FC<Props> = ({ disabled, passwordReqs, className, onChange }) => {
  const [passwordValue, setPasswordValue] = useState<string>('');

  const patternString = passwordReqs.map(req => validationRegexPatterns[req].pattern).join('');
  const validateAllRegex = new RegExp(`^${patternString}.*$`);
  const valid = validateAllRegex.test(passwordValue);
  onChange && onChange(valid);

  const validationItem = (req: string): boolean => {
    const testPattern = new RegExp(`^${validationRegexPatterns[req].pattern}.*$`);
    return testPattern.test(passwordValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordValue(e.target.value);
  };

  return (
    <div className={cn('container flex flex-col items-center justify-center p-4', className)}>
      <h3 className='text-2xl text-black font-bold'>Password Component</h3>

      <div className='m-8 grid grid-cols-2 gap-8 content-center'>
        <div className='flex flex-col justify-center'>
          <input
            type="text"
            name="password-input"
            id="password-input"
            placeholder='Password...'
            className='block w-full h-[40px] px-3 py-2 bg-white border
            border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
            disabled={disabled}
            value={passwordValue}
            pattern={`^${patternString}.*$`}
            onChange={handleInputChange}
            data-testid='password-input'
          />
        </div>

        <div className='w-full'>
          <ul className='grid row-auto gap-2'>
            {
              passwordReqs.map((req) => (
                <li key={req} className={`flex items-center requirement ${req} ${validationItem(req) ? 'valid-item' : 'invalid-item'}`}>
                  <div
                    className={
                      cn("flex items-center justify-center w-[40px] h-[40px] rounded-full text-white font-bold",
                      validationItem(req) ? validClass : invalidClass)
                    }
                  >
                    { validationItem(req) ? <Check /> : <X />}
                  </div>

                  <p className='ml-4 font-medium'>
                    {
                      validationRegexPatterns[req].description
                    }
                  </p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PasswordValidator