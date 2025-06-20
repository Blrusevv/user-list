import React, { useEffect } from 'react';
import { User } from '../types/User';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { userSchema } from '../utils';
import { UserField } from '.';

interface UserDetailsGridProps {
  user: User;
  onSave: (data: any) => Promise<void> | void;
  isUpdating?: boolean;
}

const fields = [
  { label: 'Username', name: 'username', required: true },
  { label: 'Email', name: 'email', required: true },
  { label: 'Street', name: 'address.street', required: true },
  { label: 'Suite', name: 'address.suite', required: true },
  { label: 'City', name: 'address.city', required: true },
  { label: 'Phone', name: 'phone' },
  { label: 'Website', name: 'website' },
  { label: 'Company', name: 'company.name' },
];

const UserDetailsGrid: React.FC<UserDetailsGridProps> = ({ user, onSave, isUpdating = false }) => {
  const methods = useForm<any>({
    defaultValues: user,
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });
  const { handleSubmit, formState, reset, watch } = methods;

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  const watchedValues = watch();
  const isChanged = JSON.stringify(watchedValues) !== JSON.stringify(user);

  const handleSave = async (data: any) => {
    await onSave(data);
    reset(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="user-details-grid" onSubmit={handleSubmit(handleSave)}>
        {fields.map((field) => (
          <UserField
            key={field.name}
            label={field.label}
            name={field.name}
          />
        ))}
        <div className="user-details-actions">
          <Button variant="secondary" type="button" onClick={() => { reset(user); }} disabled={!isChanged || isUpdating}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={!isChanged || !formState.isValid || isUpdating}>
            {isUpdating ? (
              <Spinner animation="border" className="button-spinner" />
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserDetailsGrid; 