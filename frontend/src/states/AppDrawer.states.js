import create from 'zustand'

export const useAppDrawerStore = create(set => ({
    open: false,
    setOpen: () => set({ open: true }),
    setClosed: () => set({ open: false })
}))