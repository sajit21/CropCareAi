import {create} from 'zustand';
import axios from '../lib/axios';
import toast from 'react-hot-toast';

export const useHistoryStore= create((set)=>({
  history: [],
  isHistoryLoading:false,
  isHistoryError:null,
  isHistoryDeleting:false,

    getHistory:async()=>{
        set({ isHistoryLoading: true, isHistoryError: null });
        try{
            const response=await axios.get('/history/getHistory');
            set({ history: response.data.data, isHistoryLoading: false, isHistoryError: null });
        }catch(error){
            set({ isHistoryError: error, isHistoryLoading: false });
            console.error("Failed to fetch history:", error);
        }
    },
    deleteHistory: async (id) => {
        set({ isHistoryDeleting: true });
        try {
            await axios.delete(`/history/delete/${id}`);
            const filteredHistory= useHistoryStore.getState().history.filter(item => item._id !== id);
            set({ history: filteredHistory, isHistoryDeleting: false });
            toast.success("History deleted successfully");
        } catch (error) {
            set({ isHistoryDeleting: false });
            toast.error("Failed to delete history");
            console.error("Failed to delete history:", error);
        }
    }
}))