import { useState, createContext, useContext } from "react";
import axios from 'axios'

const authContext = createContext();

function useAuth() {
  const [authentication, setauthentication] = useState(false)
  const [token, setToken] = useState()

  const saveToken = (userToken) => {
    setToken(userToken)
    localStorage.setItem('token', JSON.stringify(userToken))
  }

  const authAxios = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      Authorization: `Bearer ${token}`
  }
  })

  const loginAxios = axios.create({
    baseURL: 'http://localhost:4000'
  })

  return {
    authentication,
    setToken: saveToken,
    token,
    authAxios,
    loginAxios,
    login(token) {
      return new Promise((res) => {
        setauthentication(true);
        saveToken(token)
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setauthentication(false);
        localStorage.clear()
        setToken('')
        res();
      });
    }
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(authContext);
}
