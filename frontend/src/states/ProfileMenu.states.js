import create from 'zustand'

export const useProfileMenuStore = create(set => ({
    isOpen: false,
    targetEl: {},
    setOpen: () => set({ isOpen: true }),
    setClosed: () => set({ isOpen: false }),
    setTarget: (target) => set({ targetEl: target })
}))