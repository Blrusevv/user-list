import React, { useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchUsers, updateUser } from '../store/slices/userSlice';
import { User } from '../types/User';
import UserDetailsGrid from '../components/UserDetailsGrid';

const UsersPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector((state) => state.users);

    useEffect(() => {
      dispatch(fetchUsers());
    }, [dispatch]);

    const handleSave = async (userId: number, data: any) => {
      await dispatch(updateUser({ id: userId, data }));
    };

    return (
      <div className="container py-4">
        <h2 className="mb-4">User List</h2>
        {loading && (
          <div className="spinner-center">
            <Spinner animation="border" />
          </div>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        {!loading && (
          <Accordion alwaysOpen>
            {users.map((user: User, idx: number) => (
              <Accordion.Item eventKey={String(idx)} key={user.id}>
                <Accordion.Header>
                  {user.name} <span className="ms-2 text-muted">({user.username})</span>
                </Accordion.Header>
                <Accordion.Body>
                  <UserDetailsGrid
                    user={user}
                    onSave={(data) => handleSave(user.id, data)}
                  />
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </div>
    );
};

export default UsersPage; 