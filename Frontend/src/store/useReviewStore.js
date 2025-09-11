import {create} from 'zustand';

import axios from '../lib/axios';
import toast from 'react-hot-toast';
import { useUserStore } from './useUserStore';

export const useReviewStore = create((set, get) => ({
  reviews: [],
  isReviewFetching: false,
  isReviewUploading: false,
  isReviewAddedSuccess:false,
  isReviewDeleting: false,
  resetReviewAddedSuccess: () => set({ isReviewAddedSuccess: false }),
  fetchReviews: async () => {
    set({ isReviewFetching: true });
    try {
      const response = await axios.get('/review/getallreview');
      set({ reviews: response.data.data });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to fetch reviews. Please try again later.', {
  toastId: 'fetch-error',
});
    } finally {
      set({ isReviewFetching: false });
    }
  },
  addReview: async ({selectedPlant:PlantName, selectedDisease:DiseaseName, accuracy:Accuracy, improvement:Suggestion, actionTook:ActionTook}) => {
    set({ isReviewUploading: true, isReviewAddedSuccess:false });   
    try {
      const response = await axios.post('/review/add', {PlantName,DiseaseName,Accuracy,Suggestion,ActionTook});
      const newReview=[...get().reviews, { ...response.data.data, UserId:{Photo:useUserStore.getState().user.Photo, Fullname:useUserStore.getState().user.Fullname} }];
      set({ reviews: newReview, isReviewUploading: false, isReviewAddedSuccess: true });
        toast.success('Review added successfully');

    } catch (error) {
      console.error('Error adding review:', error);
      set({ isReviewUploading: false });
    }
  },
  getReviewByFilter: async (plantName) => {
    set({ isReviewFetching: true });
    try {
      const response = await axios.get(`/review/filter?PlantName=${plantName}`);
      set({ reviews: response.data.data });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to fetch reviews. Please try again later.', {
  toastId: 'fetch-error', 
});
    } finally {
      set({ isReviewFetching: false });
    }
  },
  getReviewByName:async(username)=>{
    set({ isReviewFetching: true });
    try {
      const response = await axios.get(`/review/${username}`);
      set({ reviews: response.data.data});
    } catch (error) {
      console.error('Error fetching reviews:', error);
//       toast.error(error?.response?.data?.message || 'Failed to fetch reviews. Please try again later.', {
//   toastId: 'fetch-error',
// });
    } finally {
      set({ isReviewFetching: false });
    }
  },
  deleteReview: async (reviewId) => {
    console.log(reviewId);
    set({ isReviewDeleting: true });
    try {
      await axios.delete(`/review/delete/${reviewId}`);
      const updatedReviews = get().reviews.filter(review => review._id !== reviewId);
      set({ reviews: updatedReviews, isReviewDeleting: false });
      toast.success('Review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error);
      set({ isReviewDeleting: false });
      toast.error('Failed to fetch reviews. Please try again later.', {
  toastId: 'fetch-error', 
});
    }
  },
}));