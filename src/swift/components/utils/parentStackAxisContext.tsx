import {createContext} from "react";

export const parentStackAxisContext = createContext<'horizontal' | 'vertical' | 'z' | undefined>(undefined);
