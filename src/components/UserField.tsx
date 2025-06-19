import React from 'react';
import Form from 'react-bootstrap/Form';
import { useFormContext } from 'react-hook-form';

interface UserFieldProps {
  label: string;
  name: string;
  type?: string;
}

const UserField: React.FC<UserFieldProps> = ({ label, name, type = 'text' }) => {
  const { register, formState: { errors } } = useFormContext();
  const getError = (name: string): string | undefined => {
    return name.split('.').reduce((acc: any, part) => acc?.[part], errors)?.message;
  };

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} {...register(name)} isInvalid={!!getError(name)} autoComplete="off" />
      <Form.Control.Feedback type="invalid">
        {getError(name)}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default UserField; 