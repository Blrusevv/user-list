import React, { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchTasks, updateTaskStatus } from '../store/slices/taskSlice';
import { fetchUsers } from '../store/slices/userSlice';
import { Task } from '../types/Task';
import { User } from '../types/User';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';

const TasksPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error, updatingTaskIds } = useAppSelector((state) => state.tasks);
  const { users } = useAppSelector((state) => state.users);

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [userFilter, setUserFilter] = useState<string>('all');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'completed' && task.completed) ||
        (statusFilter === 'pending' && !task.completed);
      
      const matchesTitle = task.title.toLowerCase().includes(titleFilter.toLowerCase());
      
      const matchesUser = userFilter === 'all' || task.userId.toString() === userFilter;
      
      return matchesStatus && matchesTitle && matchesUser;
    });
  }, [tasks, statusFilter, titleFilter, userFilter]);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredTasks.slice(startIndex, startIndex + pageSize);
  }, [filteredTasks, currentPage]);

  const totalPages = Math.ceil(filteredTasks.length / pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, titleFilter, userFilter]);

  const handleStatusToggle = async (taskId: number, currentStatus: boolean) => {
    await dispatch(updateTaskStatus({ taskId, completed: !currentStatus }));
  };

  const getUserName = (userId: number): string => {
    const user = users.find((u: User) => u.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  const renderPagination = () => {
    const items = [];
    
    items.push(
      <Pagination.Prev
        key="prev"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      />
    );

    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next
        key="next"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      />
    );

    return <Pagination>{items}</Pagination>;
  };

  if (loading) {
    return (
      <div className="container py-4">
        <div className="spinner-center">
          <Spinner animation="border" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Tasks</h2>
      
      <div className="row mb-4">
        <div className="col-md-3">
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-md-3">
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by title..."
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="col-md-3">
          <Form.Group>
            <Form.Label>User</Form.Label>
            <Form.Select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            >
              <option value="all">All Users</option>
              {users.map((user: User) => (
                <option key={user.id} value={user.id.toString()}>
                  {user.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-md-3 d-flex align-items-end">
          <Button
            variant="outline-secondary"
            onClick={() => {
              setStatusFilter('all');
              setTitleFilter('');
              setUserFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="mb-3">
        <small className="text-muted">
          Showing {paginatedTasks.length} of {filteredTasks.length} tasks
        </small>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">User</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTasks.map((task: Task) => {
              const isUpdating = updatingTaskIds.includes(task.id);
              return (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{getUserName(task.userId)}</td>
                  <td>
                    <Badge bg={task.completed ? 'success' : 'warning'}>
                      {task.completed ? 'Completed' : 'Pending'}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant={task.completed ? 'warning' : 'success'}
                      onClick={() => handleStatusToggle(task.id, task.completed)}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <Spinner size="sm" animation="border" className='button-spinner'/>
                      ) : (
                        task.completed ? 'Mark Pending' : 'Mark Complete'
                      )}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          {renderPagination()}
        </div>
      )}
    </div>
  );
};

export default TasksPage; 