import { createContext } from "react";
const Context = createContext();
const LoginProvider = Context.Provider;
const LoginConsumer = Context.Consumer;

export { LoginConsumer, Context, LoginProvider };
