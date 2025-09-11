import {create} from 'zustand';
import axios from '../lib/axios';
import {toast} from 'react-hot-toast'
import { isCancel } from 'axios';

export const useCatalogStore=create((set,get)=>({
    catalog:[],
    setCatalog:(catalog)=>set({catalog}),
    isCatalogAdding:false,
    isCatalogLoading:false,
    isCatalogDeleting:false,
    isCatalogUpdating:false,
    isCatalogEditing:false,
    getUpdateCatalog:{},

    setUpdateCatalog:(catalog)=>{set({getUpdateCatalog:catalog,isCatalogEditing:true})},


    addCatalog: async(catalog) => {
        set({ isCatalogAdding: true });
        try {
            const response = await axios.post('/catalog/add', catalog);
            set({ catalog: [...get().catalog, response.data.data] , isCatalogAdding: false });
            if (response.status === 201) {
                return response
}
        } catch (error) {
            console.error("Failed to add catalog:", error);
            toast.error(error.response?.data?.message || "Failed to add catalog");
            set({ isCatalogAdding: false });
            return error;
        }
    },
    getCatalog: async () => {
        set({ isCatalogLoading: true });
        try {
            const response = await axios.get('/catalog/retrive');
            set({ catalog: response.data.data, isCatalogLoading: false });
        } catch (error) {
            console.error("Failed to fetch catalog:", error);
            toast.error(error.response?.data?.message || "Failed to fetch catalog");
            set({ isCatalogLoading: false });
        }
    },
    deleteCatalog:async(id)=>{
      set({ isCatalogDeleting: true });
        try {
             await axios.delete(`/catalog/delete/${id}`);
             const updatedCatalog=get().catalog.filter(item => item._id !== id);
            set({ catalog: updatedCatalog, isCatalogDeleting: false });
            toast.success("Catalog deleted successfully");
        } catch (error) {
            console.error("Failed to delete catalog:", error);
            toast.error(error.response?.data?.message || "Failed to delete catalog");
            set({ isCatalogDeleting: false });
        }

    },
    editCatalog: async (id, updatedCatalog) => {
        set({ isCatalogUpdating: true });
        try {
            const response = await axios.put(`/catalog/edit/${id}`, updatedCatalog);
            const updatedCatalogList = get().catalog.map(item =>
                item._id === id ? response.data.data : item
            );
            set({ catalog: updatedCatalogList, isCatalogUpdating: false });
            toast.success("Catalog updated successfully");
            return response
        } catch (error) {
            console.error("Failed to update catalog:", error);
            toast.error(error.response?.data?.message || "Failed to update catalog");
            set({ isCatalogUpdating: false });
        }
    }
}));