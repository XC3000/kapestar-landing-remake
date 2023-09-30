import { create } from "zustand";

type Register = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  state: string;
  city: string;
  password: string;
  confirmPassword: string;
  referral: string;
};

type ScreenType =
  | "email"
  | "verify-email"
  | "phone"
  | "verify-phone"
  | "register";
type UpdateValuesType = Partial<Register>;
type RegisterStore = {
  values: Register;
  screen: ScreenType;
  updateScreen: (_payload: ScreenType) => void;
  updateValues: (_payload: UpdateValuesType) => void;
};

const useRegisterStore = create<RegisterStore>((set) => ({
  values: {
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    state: "",
    city: "",
    password: "",
    confirmPassword: "",
    referral: "",
  },
  screen: "email",
  updateScreen: (payload: ScreenType) => set(() => ({ screen: payload })),
  updateValues: (payload: UpdateValuesType) =>
    set((state) => ({
      ...state,
      values: { ...state.values, ...payload },
    })),
}));

export default useRegisterStore;
