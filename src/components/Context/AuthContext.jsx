import React, {
  useReducer,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  image: "",
  name: "",
  email: "",
  password: ""
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        isAuthenticated: true,
        image: action.payload.image,
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password
      };
    }
    case "LOGOUT": {
      return {
        ...initialState
      };
    }
    case "UPDATE_PROFILE": {
      return {
        ...state,
        image: action.payload.image,
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password
      };
    }
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("storedUser", storedUser);
      dispatch({ type: "LOGIN", payload: parsedUser });
    }
    setIsInitialized(true);
  }, []);

  const login = (name, email, password, image) => {
    const userData = { name, email, password, image, isAuthenticated: true };
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    dispatch({ type: "LOGOUT" });
  };

  const updateProfile = (image, name, email, password) => {
    const updatedUser = { image, name, email, password, isAuthenticated: true };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map(user =>
      user.email === state.email ? updatedUser : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    dispatch({ type: "UPDATE_PROFILE", payload: updatedUser });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, updateProfile, isInitialized }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
