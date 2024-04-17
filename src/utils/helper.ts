import { Conditions } from './types';

export const STATE_KEY = 'state';

export const persistState = () => {
  const state = localStorage.getItem(STATE_KEY);
  let result: Conditions = {} as Conditions;
  if (state) {
    result = JSON.parse(state);
  }
  return result;
};

export const passwordStrength = (password: string) => {
  const figure = /[0-9]/.test(password);
  const uppercase = /[A-Z]/.test(password);
  const lowercase = /[a-z]/.test(password);
  const specaial = /[!@#$%^&*()]/.test(password);
  let count = 0;
  if (figure && uppercase && lowercase && specaial && password.length > 10) {
    count = 3;
  } else if (uppercase && lowercase && specaial) {
    count = 2;
  } else {
    count = 1;
  }
  return count;
};

export const isPasswordValid = (password: string, condition: Conditions) => {
  let valid = false;
  const criteria: any[] = [];

  Object.keys(condition).forEach((key) => {
    const value = condition[key as keyof Conditions];

    if (value && key === 'figure') {
      criteria.push((pass: string) => /[0-9]/.test(pass));
    } else if (value && key === 'uppercase') {
      criteria.push((pass: string) => /[A-Z]/.test(pass));
    } else if (value && key === 'lowercase') {
      criteria.push((pass: string) => /[a-z]/.test(pass));
    } else if (value && key === 'characters') {
      criteria.push((pass: string) => pass.length >= 8);
    } else if (value && key === 'special') {
      criteria.push((pass: string) => /[!@#$%^&*()]/.test(pass));
    }
  });
  valid = criteria.every((item) => item(password));
  return valid;
};

export const isEmailValid = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
