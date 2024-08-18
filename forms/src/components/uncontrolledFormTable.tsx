import { FormValues } from './formTable';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUncontrolledFormData } from '../store/slices';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/formContext';
import * as yup from 'yup';
import { validationSchema } from '../utilities';
import { RootState } from '../store/store';

type FormErrors = {
  [K in keyof FormValues]?: string;
};

const FORM_KEYS: (keyof FormValues)[] = [
  'name',
  'age',
  'email',
  'password',
  'confirmPassword',
  'gender',
  'terms',
  'country',
];

export default function UncontrolledFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const { addFormData } = useFormContext();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);

  const countries = useSelector((state: RootState) => state.form.countries);

  const validateForm = async (formData: FormValues): Promise<FormErrors> => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      return {};
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errorMessages: FormErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            errorMessages[error.path as keyof FormValues] = error.message;
          }
        });
        return errorMessages;
      }
      console.error('Unexpected error during form validation', err);
      return {};
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const data: FormValues = {
      name: (formData.get('name') as string) || '',
      age: (formData.get('age') as string) || '',
      email: (formData.get('email') as string) || '',
      password: (formData.get('password') as string) || '',
      confirmPassword: (formData.get('confirmPassword') as string) || '',
      gender: (formData.get('gender') as string) || '',
      terms: formData.get('terms') === 'on',
      country: (formData.get('country') as string) || '',
    };

    const validationErrors = await validateForm(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const processedData = {
        ...data,
        age: Number(data.age),
      };

      dispatch(setUncontrolledFormData(processedData));
      navigate('/');
      addFormData(processedData);
    }
  };

  const checkIfFormComplete = () => {
    if (!formRef.current) return false;

    const formData = new FormData(formRef.current);
    const allFieldsFilled = FORM_KEYS.every((key) => {
      const value = formData.get(key);
      if (key === 'terms') {
        return formData.get(key) === 'on';
      }
      return value !== null && value !== '';
    });

    setIsFormComplete(allFieldsFilled);
  };

  useEffect(() => {
    checkIfFormComplete();
  }, [errors]);

  return (
    <form ref={formRef} className="form" onSubmit={handleSubmit}>
      <div className="form__line">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" className="line__input" onChange={checkIfFormComplete} />
      </div>
      {errors.name && <p className="line__error">{errors.name}</p>}

      <div className="form__line">
        <label htmlFor="age">Age</label>
        <input id="age" name="age" className="line__input" onChange={checkIfFormComplete} />
      </div>
      {errors.age && <p className="line__error">{errors.age}</p>}

      <div className="form__line">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className="line__input" onChange={checkIfFormComplete} />
      </div>
      {errors.email && <p className="line__error">{errors.email}</p>}

      <div className="form__line">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" className="line__input" onChange={checkIfFormComplete} />
      </div>
      {errors.password && <p className="line__error">{errors.password}</p>}

      <div className="form__line">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className="line__input"
          onChange={checkIfFormComplete}
        />
      </div>
      {errors.confirmPassword && <p className="line__error">{errors.confirmPassword}</p>}

      <div className="form__line">
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender" className="line__select" onChange={checkIfFormComplete}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      {errors.gender && <p className="line__error">{errors.gender}</p>}

      <div className="form__line">
        <label htmlFor="terms">Accept Terms and Conditions</label>
        <input id="terms" name="terms" type="checkbox" className="line__checkbox" onChange={checkIfFormComplete} />
      </div>
      {errors.terms && <p className="line__error">{errors.terms}</p>}

      <div className="form__line">
        <label htmlFor="country">Country</label>
        <select id="country" name="country" className="line__select" onChange={checkIfFormComplete}>
          <option value="">Select Country</option>
          {countries.map((country: string) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      {errors.country && <p className="line__error">{errors.country}</p>}

      <button type="submit" disabled={!isFormComplete}>
        Submit
      </button>
    </form>
  );
}
