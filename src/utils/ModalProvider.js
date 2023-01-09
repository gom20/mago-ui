import React, { createContext } from 'react';
import CustomModal from '../components/CustomModal';
import { Provider } from './ModalContext';
import useModal from './useModal';

let ModalProvider = ({ children }) => {
    let { modalProps, showModal, hideModal } = useModal();
    return (
        <Provider value={{ modalProps, showModal, hideModal }}>
            <CustomModal />
            {children}
        </Provider>
    );
};

export { ModalProvider };
