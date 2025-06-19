import React, { useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchUsers } from '../store/slices/userSlice';
import { User } from '../types/User';

const UsersPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector((state) => state.users);
  
    useEffect(() => {
      dispatch(fetchUsers());
    }, [dispatch]);
  
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
                  <div><strong>Email:</strong> {user.email}</div>
                  <div><strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}</div>
                  <div><strong>Phone:</strong> {user.phone}</div>
                  <div><strong>Website:</strong> {user.website}</div>
                  <div><strong>Company:</strong> {user.company?.name}</div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </div>
    );
};

export default UsersPage; 