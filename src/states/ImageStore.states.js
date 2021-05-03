import create from 'zustand'

export const useImageStore = create(set => ({
    image: null,
    setImage: (new_image) => set({ image: new_image }),
    removeImage: () => set({ image: null })
}))