import { useEffect, useState, useCallback } from 'react';
import { screenSize } from 'settings/constants/screenSize';

const useResize = () => {
    const [screen, setScreen] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        mobile: window.innerWidth <= screenSize.mobile,
        mobileSmall: window.innerWidth <= screenSize.mobileSmall,
    });

    const handleResize = useCallback(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const mobile = width <= screenSize.mobile;
        const mobileSmall = width <= screenSize.mobileSmall;

        setScreen({ width, height, mobile, mobileSmall });
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []); // eslint-disable-line

    return { screen };
};

export default useResize;
