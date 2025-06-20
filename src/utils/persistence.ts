import { User } from '../types/User';
import { Post } from '../types/Post';

export const getStoredUsers = (): User[] | null => {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : null;
};

export const setStoredUsers = (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users));
};

export const getStoredPosts = (): Post[] | null => {
    const stored = localStorage.getItem('posts');
    return stored ? JSON.parse(stored) : null;
};

export const setStoredPosts = (posts: Post[]) => {
    localStorage.setItem('posts', JSON.stringify(posts));
};

export const clearStoredData = () => {
    localStorage.removeItem('users');
    localStorage.removeItem('posts');
    localStorage.removeItem('tasks');
}; 