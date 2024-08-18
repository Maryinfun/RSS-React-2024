import * as yup from 'yup';
import { FormValues } from '../components/formTable';

export const validationSchema: yup.ObjectSchema<FormValues> = yup.object().shape({
    name: yup
      .string()
      .required('Name is required')
      .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
    age: yup
      .string()
      .required('Age is required')
      .test('is-positive', 'Age must be a positive number', (value) => {
        const numericValue = Number(value);
        return !isNaN(numericValue) && numericValue > 0;
      }),
    email: yup
      .string()
      .required('Email is required')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/, 'Email must be a valid email address in the format a@a.a'),
    password: yup
      .string()
      .required('Password is required')
      .matches(/(?=.*[0-9])/, 'Password must contain at least one number')
      .matches(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
      .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
      .matches(/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/, 'Password must contain at least one special character')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'),
    gender: yup.string().required('Gender is required'),
    terms: yup
      .bool()
      .oneOf([true], 'The terms and conditions must be accepted')
      .required('Terms must be accepted')
      .default(false),
      country: yup.string().required('Country is required'),
  });
  