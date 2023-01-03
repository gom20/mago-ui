import { useRef, useState } from 'react';

export default () => {
    const initialState = {
        visible: false,
        message: '',
        type: '',
        buttonTexts: [],
    };
    const [modalProps, setModalProps] = useState(initialState);
    const resolveRef = useRef();

    const showModal = ({
        message = '',
        type = 'alert',
        async = false,
        buttonTexts = ['확인'],
    }) => {
        setModalProps({
            visible: true,
            message,
            type,
            buttonTexts,
        });
        if (async) {
            return new Promise((resolve) => {
                resolveRef.current = resolve;
            });
        }
    };

    const hideModal = (flag) => {
        // resolve return: left button true, right button false
        setModalProps(initialState);
        if (resolveRef.current) {
            resolveRef.current(flag);
        }
    };

    return { modalProps, showModal, hideModal };
};
