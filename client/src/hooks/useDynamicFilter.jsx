import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isFilterVisibleState } from '../atoms';

const useDynamicFilter = (enabled) => {
    const setFilterEnabled = useSetRecoilState(isFilterVisibleState);

    useEffect(() => {
        setFilterEnabled(enabled);
        return () => {
            setFilterEnabled(enabled);
        };
    }, [enabled, setFilterEnabled]);
};

export default useDynamicFilter;