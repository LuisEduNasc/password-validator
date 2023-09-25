import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import PasswordValidator, { Requirements } from './password-validator';

describe('PasswordValidator', () => {
  const mockOnChange = jest.fn();

  afterEach(() => {
    mockOnChange.mockClear();  // Clear the mock call history
  });

  const setup = ({ reqs, onChange }: { reqs: Requirements[], onChange: jest.MockableFunction}) => {
    const PasswordComponent = render(<PasswordValidator disabled={false} passwordReqs={reqs} onChange={onChange} />);
    const input: HTMLInputElement = screen.getByTestId('password-input');

    return {
      inputComponent: input,
      PasswordComponent
    }
  }

  it('Should have 4 valid items for all 4 validations available', async () => {
    const requirements: Requirements[] = ['noConsecutiveLetters', 'number', 'specialCharacters', 'uppercase'];
    const finalValue = 'A1!bcde';

    const { inputComponent, PasswordComponent } = setup({ reqs: requirements, onChange: mockOnChange })

    expect(inputComponent.value).toBe('');

    act(() => {
      userEvent.type(inputComponent, finalValue);
    });

    expect(inputComponent.value).toBe(finalValue);
    expect(PasswordComponent.container.getElementsByClassName('valid-item').length).toBe(4);
  });

  it('Should return 2 invalid items for noConsecutiveLetters and uppercase', async () => {
    const requirements: Requirements[] = ['noConsecutiveLetters', 'number', 'specialCharacters', 'uppercase'];
    const finalValue = 'A';

    const { inputComponent, PasswordComponent } = setup({ reqs: requirements, onChange: mockOnChange })

    expect(inputComponent.value).toBe('');

    act(() => {
      userEvent.type(inputComponent, finalValue);
    });

    expect(inputComponent.value).toBe(finalValue);
    expect(PasswordComponent.container.querySelectorAll(`.${requirements[0]}, .${requirements[3]}, .valid-item`).length).toBe(2);
  });

  it('Should return invalid for noConsecutiveLetters', async () => {
    const requirements: Requirements[] = ['noConsecutiveLetters', 'number', 'specialCharacters', 'uppercase'];
    const finalValue = 'AA';

    const { inputComponent, PasswordComponent } = setup({ reqs: requirements, onChange: mockOnChange })

    expect(inputComponent.value).toBe('');

    act(() => {
      userEvent.type(inputComponent, finalValue);
    });

    expect(inputComponent.value).toBe(finalValue);
    expect(PasswordComponent.container.querySelectorAll(`.${requirements[0]}, invalid-item`).length).toBe(1);
  });

  it('Should return valid for the uppercase only validation', async () => {
    const requirements: Requirements[] = ['uppercase'];
    const finalValue = 'AA';

    const { inputComponent, PasswordComponent } = setup({ reqs: requirements, onChange: mockOnChange })

    expect(inputComponent.value).toBe('');

    act(() => {
      userEvent.type(inputComponent, finalValue);
    });

    expect(inputComponent.value).toBe(finalValue);
    expect(PasswordComponent.container.querySelectorAll(`.requirement`).length).toBe(1);
    expect(PasswordComponent.container.querySelectorAll(`.${requirements[0]}, valid-item`).length).toBe(1);
  });
});
