import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/formContext';

export interface FormValues {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  //   picture: FileList;
}

const validationSchema: yup.ObjectSchema<FormValues> = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
  age: yup.number().required('Age is required').positive('Age must be a positive number'),
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
  //   picture: yup
  //     .mixed<FileList>()
  //     .test('fileSize', 'File size is too large', (value: FileList | null | undefined) => {
  //       if (!value || value.length === 0) return true;
  //       return value[0].size <= 5000000;
  //     })
  //     .test('fileType', 'Unsupported file format', (value: FileList | null | undefined) => {
  //       if (!value || value.length === 0) return true;
  //       return ['image/jpeg', 'image/png'].includes(value[0].type);
  //     })
  //     .required('Picture is required'),
});

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

  const onSubmit = (data: FormValues) => {
    console.log(data);
    navigate('/');
    addFormData(data);
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

      {/* <div className="form__line">
        <input id="picture" type="file" accept=".jpg,.jpeg,.png" {...register('picture')} className="line__input-file" />
      </div>
 */}
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
