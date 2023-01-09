import { createContext } from 'react';

let ModalContext;
let { Provider } = (ModalContext = createContext());

export { ModalContext, Provider };
