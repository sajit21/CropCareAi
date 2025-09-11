import { create } from 'zustand';
import axios from '../lib/axios';

const useOverviewStore = create((set) => ({
  overview: null,
  isOverviewLoading: false,
  isOverviewError: false,
  isOverviewFetched: false,
  fetchOverview: async () => {
    set({ isOverviewLoading: true, isOverviewError: false });
    try {
      const res = await axios.get('/overview');
      set({
        overview: res.data,
        isOverviewLoading: false,
        isOverviewFetched: true,
        isOverviewError: false,
      });
    } catch (error) {
      set({
        isOverviewLoading: false,
        isOverviewError: true,
        isOverviewFetched: false,
      });
    }
  },
}));

export default useOverviewStore;
