import { create } from 'zustand'
import type { IDataStore } from '../interfaces'

const useDataStore = create<IDataStore>((set) => ({
    //состояние
    userEmail: "",
    setUserEmail: (email) => set({ userEmail: email }),

    fetchExamples: async () => {
    }
}))


export default useDataStore 