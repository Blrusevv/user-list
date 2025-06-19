import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import UserField from './UserField';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { userSchema } from '../utils';

interface UserDetailsGridProps {
  user: User;
  onSave: (data: any) => Promise<void> | void;
  onCancel?: () => void;
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

const UserDetailsGrid: React.FC<UserDetailsGridProps> = ({ user, onSave, onCancel }) => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      await onSave(data);
      reset(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="user-details-grid" onSubmit={handleSubmit(handleSave)}>
        {loading ? (
          <div className="spinner-center" style={{ gridColumn: '1 / span 2' }}>
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            {fields.map((field) => (
              <UserField
                key={field.name}
                label={field.label}
                name={field.name}
              />
            ))}
            <div className="user-details-actions">
              <Button variant="secondary" type="button" onClick={onCancel} disabled={loading}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={!isChanged || !formState.isValid || loading}>
                Save
              </Button>
            </div>
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default UserDetailsGrid; 