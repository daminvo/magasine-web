'use client'
import { useContext, createContext, useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

type AuthContextType = {
  attemptLogin: (data: any) => Promise<void>,
  logOut: () => void;
  token: string | null,
  setToken: any,
  isLoading: boolean
}

type AuthProviderType = {
  children: React.ReactNode
}
export const AuthContext = createContext({} as AuthContextType);

const AuthProvider = ({ children }: AuthProviderType) => {

  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const storedToken = localStorage.getItem("site");
    if (storedToken) {
      setToken(storedToken);
    }
    
    setIsLoading(false);
  }, []);

  const attemptLogin =async (data: any) => {
    try {
      const requestHeader = {
        method:'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": data.username,
            "password": data.password
        })
      }
      const res = await fetch('https://fakestoreapi.com/auth/login', requestHeader).then(res=>res.json());
      if (res && res.token != null) {
        setToken(res.token);
        localStorage.setItem('site', res.token);
        router.push('/')
      }
      else {
        throw new Error(res.message);
      }
    } catch (e) {
      console.log(e);
      
    }
  }

  const logOut = () => {
    setToken(null);
    localStorage.removeItem("site");
    router.push("/login");
  };
  return (
    <AuthContext.Provider value={{attemptLogin, logOut, token, setToken, isLoading}}>
      {children}
    </AuthContext.Provider>
    )
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};