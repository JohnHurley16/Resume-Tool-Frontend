import create from 'zustand'

export const useSignUpStore = create(set => ({
    open: false,
    setOpen: () => set({ open: true }),
    setClosed: () => set({ open: false })
}))