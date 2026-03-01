import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    const stored = await AsyncStorage.getItem("token");
    if (stored) setToken(stored);
  };

  const login = async (jwt: string) => {
    await AsyncStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
