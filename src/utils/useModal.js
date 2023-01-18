import { useRef, useState } from 'react';

export default () => {
    const initialState = {
        visible: false,
        message: '',
        type: '',
        buttonTexts: [],
        image: '',
    };
    const [modalProps, setModalProps] = useState(initialState);
    const resolveRef = useRef();

    const showModal = ({
        message = '',
        type = 'alert',
        async = false,
        buttonTexts = ['확인'],
        image,
    }) => {
        setModalProps({
            visible: true,
            message,
            type,
            buttonTexts,
            image,
        });
        if (async) {
            return new Promise((resolve) => {
                resolveRef.current = resolve;
            });
        }
    };

    const hideModal = (flag) => {
        // resolve return: left button false, right button true
        setModalProps(initialState);
        if (resolveRef.current) {
            resolveRef.current(flag);
        }
    };

    return { modalProps, showModal, hideModal };
};
