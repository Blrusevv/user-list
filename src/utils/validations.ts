import * as yup from 'yup';

export const userSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    address: yup.object().shape({
      street: yup.string().required('Street is required'),
      suite: yup.string().required('Suite is required'),
      city: yup.string().required('City is required'),
    }),
  });

  export const postSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    body: yup.string().required('Body is required'),
  });