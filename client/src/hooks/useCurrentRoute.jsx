// useCurrentRoute.js

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { activeRouteState } from '../atoms';

const useCurrentRoute = (initialRoute = "/") => {
    const setActiveRoute = useSetRecoilState(activeRouteState);

    useEffect(() => {
        setActiveRoute(initialRoute);
        return () => {
            setActiveRoute("/");
        };
    }, [initialRoute, setActiveRoute]);

    return (currentRoute) => {
        setActiveRoute(currentRoute);
    };
};

export default useCurrentRoute;
