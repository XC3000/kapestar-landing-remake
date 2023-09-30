import { create } from "zustand";

type SidebarStore = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const useSidebarStore = create<SidebarStore>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export default useSidebarStore;
