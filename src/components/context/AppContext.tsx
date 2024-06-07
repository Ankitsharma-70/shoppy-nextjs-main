import { ReactNode, createContext, useState } from "react";

export interface AppContextType {
  couponCodeInput: string;
  setCouponCodeInput: React.Dispatch<React.SetStateAction<string>>;
  validCoupon: CouponCode | undefined;
  setValidCoupon: React.Dispatch<React.SetStateAction<CouponCode | undefined>>;
  isAdminMenuOpen: boolean;
  setIsAdminMenuOpen: (arg: boolean) => void;
  isUserSideMenuOpen: boolean;
  setIsUserSideMenuOpen: (arg: boolean) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [isUserSideMenuOpen, setIsUserSideMenuOpen] = useState(false);

  const [couponCodeInput, setCouponCodeInput] = useState<string>("");
  const [validCoupon, setValidCoupon] = useState<CouponCode | undefined>(
    undefined
  );

  return (
    <AppContext.Provider
      value={{
        couponCodeInput,
        setCouponCodeInput,
        validCoupon,
        setValidCoupon,
        isAdminMenuOpen,
        setIsAdminMenuOpen,
        isUserSideMenuOpen,
        setIsUserSideMenuOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
