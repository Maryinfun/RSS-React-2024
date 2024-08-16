
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


interface FormValues {
  name: string;
}

const validationSchema: yup.ObjectSchema<FormValues> = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
});

export default function ControlledFormPage() {

  const {
    register,
        handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__line">
        <label htmlFor="name">Name</label>
        {/* <input id="name" /> */}
        <input id="name" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div className="form__line">
        <label htmlFor="age">Age</label>
        <input id="age" type="number" />
        {/* <input id="age" type="number" {...register('age')} /> */}
        {/* {errors.age && <p>{errors.age.message}</p>} */}
      </div>

      <div className="form__line">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" />
        {/* <input id="email" type="email" {...register('email')} /> */}
        {/* {errors.email && <p>{errors.email.message}</p>} */}
      </div>

      <div className="form__line">
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
        {/* <input id="password" type="password" {...register('password')} /> */}
        {/* {errors.password && <p>{errors.password.message}</p>} */}
      </div>

      <div className="form__line">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" />
        {/* <input id="confirmPassword" type="password" {...register('confirmPassword')} /> */}
        {/* {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>} */}
      </div>

      <div className="form__line">
        <label htmlFor="gender">Gender</label>
        <select id="gender">
          {/* <select id="gender" {...register('gender')}> */}
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {/* {errors.gender && <p>{errors.gender.message}</p>} */}
      </div>

      <div className="form__line">
        <label htmlFor="acceptTandC">
          <input id="acceptTandC" type="checkbox" />
          {/* <input id="acceptTandC" type="checkbox" {...register('terms')} /> */}
          Accept Terms and Conditions
        </label>
        {/* {errors.terms && <p>{errors.terms.message}</p>} */}
      </div>

      <div className="form__line">
        <label htmlFor="picture">Upload Picture</label>
        {/* <input id="picture" type="file" accept=".jpg,.jpeg,.png" {...register('picture')} onChange={handlePictureChange} /> */}
      </div>


      <button type="submit">Submit</button>
    </form>
  );
}
