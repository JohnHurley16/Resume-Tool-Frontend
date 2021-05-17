import create from 'zustand'

export const useSignUpStore = create(set => ({
    open: false,
    upOrIn: 'in',
    setOpen: () => set({ open: true }),
    setClosed: () => set({ open: false }),
    setSignIn: () => set({ upOrIn: 'in' }),
    setSignUp: () => set({ upOrIn: 'up' }),
}))