import React, { createContext } from 'react';
import CustomModal from '../components/CustomModal';
import useModal from './useModal';

let ModalContext;
let { Provider } = (ModalContext = createContext());

let ModalProvider = ({ children }) => {
    let { modalProps, showModal, hideModal } = useModal();
    return (
        <Provider value={{ modalProps, showModal, hideModal }}>
            <CustomModal />
            {children}
        </Provider>
    );
};

export { ModalContext, ModalProvider };
