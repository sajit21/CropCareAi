import { create } from 'zustand';
import axios from '../lib/axios';

export const useAdminUserStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,

  // 1. Get all users
  fetchAllUsers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get('/user');
      set({ users: res.data, loading: false });
    } catch (err) {
      set({ error: err?.response?.data?.error || 'Failed to fetch users', loading: false });
    }
  },

  // 2. Search users by name or email
  searchUsers: async (q) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/user/search?q=${encodeURIComponent(q)}`);
      set({ users: res.data, loading: false });
    } catch (err) {
      set({ error: err?.response?.data?.error || 'Failed to search users', loading: false });
    }
  },

  // 3. Filter users by role
  filterByRole: async (role) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/user/role/${role}`);
      set({ users: res.data, loading: false });
    } catch (err) {
      set({ error: err?.response?.data?.error || 'Failed to filter users', loading: false });
    }
  },

  // 4. Sort users by join date
  sortByDate: async (order) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/user/sort/${order}`); // order: 'newest' or 'oldest'
      set({ users: res.data, loading: false });
    } catch (err) {
      set({ error: err?.response?.data?.error || 'Failed to sort users', loading: false });
    }
  },

  // 5. Get user by username
  getUserByUsername: async (username) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/user/${username}`);
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({ error: err?.response?.data?.error || 'Failed to fetch user', loading: false });
      return null;
    }
  },

  // 6. Get user diagnoses (history)
  getUserDiagnoses: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/user/${id}/diagnoses`);
      console.log(res)
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({ error: err?.response?.data?.error || 'Failed to fetch diagnoses', loading: false });
      return [];
    }
  },

  // 7. Get user reviews
  getUserReviews: async (id) => {
    console.log(id)
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/user/${id}/reviews`);
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({ error: err?.response?.data?.error || 'Failed to fetch reviews', loading: false });
      return [];
    }
  },

  // 8. Admin: Change user role
  changeUserRole: async (id, role) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put(`/user/${id}/role`, { role });
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({ error: err?.response?.data?.error || 'Failed to change user role', loading: false });
      return null;
    }
  },

  clearError: () => set({ error: null })
}));
