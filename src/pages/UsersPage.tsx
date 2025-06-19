import React, { useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchUsers, updateUser } from '../store/slices/userSlice';
import { User } from '../types/User';
import { Link } from 'react-router-dom';
import { UserDetailsGrid } from '../components';

const UsersPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users, loading, error, updateLoading } = useAppSelector((state) => state.users);

    useEffect(() => {
      dispatch(fetchUsers());
    }, [dispatch]);

    const handleSave = async (userId: number, data: User) => {
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
                  <div className="user-header-row">
                    <span>
                      {user.name} <span className="ms-2 text-muted">({user.username})</span>
                    </span>
                    <Link
                      to={`/users/${user.id}`}
                      className="ms-2"
                    >
                      See posts
                    </Link>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <UserDetailsGrid
                    user={user}
                    onSave={(data) => handleSave(user.id, data)}
                    isUpdating={updateLoading}
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