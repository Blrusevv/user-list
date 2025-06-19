import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { UserDetailsGrid, PostForm, DeleteConfirmationModal } from '../components';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchUserById, updateUser } from '../store/slices/userSlice';
import { updatePost, deletePost, fetchUserPosts } from '../store/slices/postSlice';
import { User } from '../types/User';
import { Post } from '../types/Post';
import Button from 'react-bootstrap/Button';

const UserDetailsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useAppDispatch();
  const { users, loading: userLoading, error: userError, updateLoading } = useAppSelector((state) => state.users);
  const { posts, loading: postsLoading, error: postsError } = useAppSelector((state) => state.posts);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  const user = users.find((user: User) => user.id === Number(userId));

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(Number(userId)));
      dispatch(fetchUserPosts(Number(userId)));
    }
  }, [dispatch, userId]);

  const handleUserSave = async (data: any) => {
    if (!user) return;
    await dispatch(updateUser({ id: user.id, data }));
  };

  const handleEditPost = (postId: number) => setEditingPostId(postId);
  const handleCancelEditPost = () => setEditingPostId(null);

  const handleSavePost = (postId: number, data: { title: string; body: string }) => {
    dispatch(updatePost({ id: postId, data }));
    setEditingPostId(null);
  };

  const handleDeletePost = (post: Post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      dispatch(deletePost(postToDelete.id));
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  if (userLoading || postsLoading) {
    return <div className="spinner-center"><Spinner animation="border" /></div>;
  }
  if (userError || postsError || !user) {
    return <Alert variant="danger">{userError || postsError || 'User not found'}</Alert>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">User Details</h2>
      <UserDetailsGrid user={user} onSave={handleUserSave} isUpdating={updateLoading} />
      <h3 className="mt-5 mb-3">Posts</h3>
      {posts.length === 0 && <div>No posts found.</div>}
      <div className="user-posts-list">
        {posts.map((post) => (
          <div key={post.id} className="card mb-3">
            <div className="card-body">
              {editingPostId === post.id ? (
                <PostForm
                  post={post}
                  onSubmit={(data) => handleSavePost(post.id, data)}
                  onCancel={handleCancelEditPost}
                />
              ) : (
                <>
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.body}</p>
                  <div className="d-flex gap-2 justify-content-end">
                    <Button size="sm" variant="outline-primary" onClick={() => handleEditPost(post.id)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDeletePost(post)}>
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <DeleteConfirmationModal
        show={showDeleteModal}
        onHide={cancelDelete}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete the post "${postToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default UserDetailsPage; 