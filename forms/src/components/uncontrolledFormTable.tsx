import { FormValues } from './formTable';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUncontrolledFormData } from '../store/slices';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/formContext';

type FormErrors = {
  [K in keyof FormValues]?: string;
};

type ValidationRule<Field extends keyof FormValues> = {
  field: Field;
  validate: (value: FormValues[Field], formData: FormValues) => string | undefined;
};

export default function UncontrolledFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const { addFormData } = useFormContext();
  const validationRules: ValidationRule<keyof FormValues>[] = [
    {
      field: 'name',
      validate: (value) =>
        typeof value === 'string' && /^[A-Z]/.test(value) ? undefined : 'Name must start with an uppercase letter',
    },
    {
      field: 'age',
      validate: (value) => (typeof value === 'number' && value > 0 ? undefined : 'Age must be a positive number'),
    },
    {
      field: 'email',
      validate: (value) => {
        if (typeof value !== 'string' || value.trim() === '') {
          return 'Email is required';
        }
        return /^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/.test(value)
          ? undefined
          : 'Email must be a valid email address in the format a@a.a';
      },
    },
    {
      field: 'password',
      validate: (value) =>
        typeof value === 'string' &&
        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/.test(value)
          ? undefined
          : 'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character',
    },
    {
      field: 'confirmPassword',
      validate: (value, formData) =>
        typeof value === 'string' && value === formData.password ? undefined : 'Passwords must match',
    },
    {
      field: 'gender',
      validate: (value) => (typeof value === 'string' && value ? undefined : 'Gender is required'),
    },
    {
      field: 'terms',
      validate: (value) => (value === true ? undefined : 'You must accept the terms and conditions'),
    },
  ];
  const validate = (formData: FormValues): FormErrors => {
    const newErrors: FormErrors = {};

    validationRules.forEach(({ field, validate }) => {
      const error = validate(formData[field], formData);
      if (error) {
        newErrors[field] = error;
      }
    });

    return newErrors;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);

      const data: FormValues = {
        name: formData.get('name') as string,
        age: parseInt(formData.get('age') as string, 10),
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
        gender: formData.get('gender') as string,
        terms: formData.get('terms') === 'on',
      };

      const validationErrors = validate(data);

      if (Object.keys(validationErrors).length === 0) {
        dispatch(setUncontrolledFormData(data));
        console.log(data);
        navigate('/');
        addFormData(data);
        setErrors({});
      } else {
        setErrors(validationErrors);
      }
    }
  };

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit}>
      <div className="form__line">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" className="line__input" />
      </div>
      {errors.name && <p className="line__error">{errors.name}</p>}

      <div className="form__line">
        <label htmlFor="age">Age</label>
        <input id="age" name="age" className="line__input" />
      </div>
      {errors.age && <p className="line__error">{errors.age}</p>}

      <div className="form__line">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className="line__input" />
      </div>
      {errors.email && <p className="line__error">{errors.email}</p>}

      <div className="form__line">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" className="line__input" />
      </div>
      {errors.password && <p className="line__error">{errors.password}</p>}

      <div className="form__line">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" name="confirmPassword" type="password" className="line__input" />
      </div>
      {errors.confirmPassword && <p className="line__error">{errors.confirmPassword}</p>}

      <div className="form__line">
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender" className="line__select">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      {errors.gender && <p className="line__error">{errors.gender}</p>}

      <div className="form__line">
        <label htmlFor="acceptTandC">Accept Terms and Conditions</label>
        <input id="acceptTandC" name="terms" type="checkbox" className="line__checkbox" />
      </div>
      {errors.terms && <p className="line__error">{errors.terms}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
