import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/formContext';
import { validationSchema } from '../utilities';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

export interface FormValues {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  country: string;
}

export default function ControlledFormPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });
  const { addFormData } = useFormContext();
  const countries = useSelector((state: RootState) => state.form.countries);
  const onSubmit = (data: FormValues) => {
    const processedData = {
      ...data,
      age: Number(data.age),
    };

    navigate('/');
    addFormData(processedData);
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__line">
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} className="line__input" />
      </div>
      {errors.name && <p className="line__error">{errors.name.message}</p>}

      <div className="form__line">
        <label htmlFor="age">Age</label>
        <input id="age" {...register('age')} className="line__input" />
      </div>
      {errors.age && <p className="line__error">{errors.age.message}</p>}

      <div className="form__line">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} className="line__input" />
      </div>
      {errors.email && <p className="line__error">{errors.email.message}</p>}

      <div className="form__line">
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password')} className="line__input" />
      </div>
      {errors.password && <p className="line__error">{errors.password.message}</p>}

      <div className="form__line">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" {...register('confirmPassword')} className="line__input" />
      </div>
      {errors.confirmPassword && <p className="line__error">{errors.confirmPassword.message}</p>}

      <div className="form__line">
        <label htmlFor="gender">Gender</label>
        <select id="gender" {...register('gender')} className="line__select">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      {errors.gender && <p>{errors.gender.message}</p>}

      <div className="form__line">
        <label htmlFor="acceptTandC">Accept Terms and Conditions</label>
        <input id="acceptTandC" type="checkbox" {...register('terms')} className="line__checkbox" />
      </div>
      {errors.terms && <p>{errors.terms.message}</p>}

      <div className="form__line">
        <label htmlFor="country">Country</label>
        <input id="country" list="country-list" {...register('country')} className="line__select" />
        <datalist id="country-list">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && <p>{errors.country.message}</p>}
      </div>
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
