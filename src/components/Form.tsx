import React, { useMemo, useState } from 'react';
import { Button } from './Button';
import { Form } from '../utils/types';
import {
  isEmailValid,
  isPasswordValid,
  passwordStrength,
  persistState,
} from '../utils/helper';
import { useAppSelector } from '../store/hooks';

export const RegistrationForm = () => {
  const [data, setData] = useState<Form>({} as Form);
  const [error, setErrorMsg] = useState<string>('');
  const [count, setCount] = useState<number>(3);
  const [validate, setValidation] = useState<{
    email: boolean;
    password: boolean;
  }>({ email: false, password: false });

  const state = useAppSelector((state) => state.appSettings);

  const disabled = useMemo(() => {
    let disable = false;
    if (
      !data.email ||
      (data.email && !validate.email) ||
      !data.password ||
      (data.password && !validate.password)
    ) {
      disable = true;
    }

    return disable;
  }, [data, validate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const field = target.name;
    const value = target.value;
    setData({ ...data, [field]: value });
    if (field === 'password') {
      setCount(passwordStrength(value));
      const validPass = isPasswordValid(value, {
        special: state.special,
        characters: state.characters,
        figure: state.figure,
        lowercase: state.lowercase,
        uppercase: state.uppercase,
      });
      validPass
        ? setValidation({ ...validate, password: true })
        : setValidation({ ...validate, password: false });
    } else {
      const validateEmail = isEmailValid(value);
      validateEmail
        ? setValidation({ ...validate, email: true })
        : setValidation({ ...validate, email: false });
    }
    if (error === '') return;
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const disableInput = useMemo(() => {
    let disable = false;
    const state = persistState();
    if (Object.keys(state).length === 0) {
      disable = true;
    }
    return disable;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const renderPasswordStrength = () => {
    const strength = [];
    for (let i = 0; i < count; i++) {
      strength.push(
        <div
          key={i}
          style={{
            height: 1,
            width: 60,
            backgroundColor:
              count === 1 ? 'red' : count === 2 ? 'yellow' : 'green',
          }}
        ></div>
      );
    }
    return strength;
  };

  const showPasswordHint = () => {
    const criteria = {
      special: state.special,
      characters: state.characters,
      figure: state.figure,
      lowercase: state.lowercase,
      uppercase: state.uppercase,
    };
    const values = Object.values(criteria);
    return values.includes(true);
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <p>Registration Form</p>
      {error !== '' ? <span className="error">{error}</span> : null}
      <div className="form-control">
        <label>Email</label>
        <input
          placeholder="Enter your email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          disabled={disableInput}
        />
      </div>
      <div className="form-control">
        <label>Password</label>
        <input
          placeholder="Enter your password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          disabled={disableInput}
        />
        {showPasswordHint() ? (
          <span className="password-hint">
            {`pasword should contain at least ${
              state.uppercase ? '1 uppercase' : ''
            }${state.lowercase ? ', 1 lowercase' : ''}${
              state.figure ? ', 1 figure' : ''
            }${state.special ? ', 1 special character' : ''}${
              state.characters ? ', 8 characters' : ''
            }`}
          </span>
        ) : null}
        {data.password ? (
          <div className="strength">
            {renderPasswordStrength()}
            <span>{`${
              count === 1 ? 'Easy' : count === 2 ? 'Medium' : 'Hard'
            }`}</span>
          </div>
        ) : null}
      </div>
      <div className="form-control">
        <Button className="button submit" disabled={disabled}>
          Submit
        </Button>
      </div>
    </form>
  );
};
