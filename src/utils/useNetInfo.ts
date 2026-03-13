import {useEffect, useState} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

export const useNetInfo = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    // Initial fetch
    NetInfo.fetch().then((state: NetInfoState) => {
      setIsConnected(
        state.isConnected === true && state.isInternetReachable !== false,
      );
    });

    // Subscribe to changes
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(
        state.isConnected === true && state.isInternetReachable !== false,
      );
    });

    return unsubscribe;
  }, []);

  return {isConnected};
};
