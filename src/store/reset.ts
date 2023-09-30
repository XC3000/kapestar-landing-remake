import { create } from "zustand";

type Reset = {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
};
type UpdateValuesType = Partial<Reset>;
type ScreenType = "email" | "verify-otp" | "create-password";
type ResetStore = {
  values: Reset;
  screen: ScreenType;
  updateScreen: (_payload: ScreenType) => void;
  updateValues: (_payload: UpdateValuesType) => void;
};

const useResetStore = create<ResetStore>((set) => ({
  values: {
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  },
  screen: "email",
  updateScreen: (payload: ScreenType) => set(() => ({ screen: payload })),
  updateValues: (payload: UpdateValuesType) =>
    set((state) => ({
      ...state,
      values: { ...state.values, ...payload },
    })),
}));

export default useResetStore;
