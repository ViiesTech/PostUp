import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'

export const useCustomNavigation = () => {
  const navigation = useNavigation();

  const navigateToRoute = (routeName: any, params: object) => {
    navigation.navigate(routeName, params);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return {
    navigateToRoute,
    goBack,
    navigation,
  };
};


export const ShowToast = (message: string) => {
  return Toast.show({
    type: 'success',
    text1: message
  })
}

export const isValidDate = (day: number, month: number, year: number) => {
  const d = parseInt(day, 10);
  const m = parseInt(month, 10) - 1;
  const y = parseInt(year, 10);

  const date = new Date(y, m, d);
  return (
    date.getFullYear() === y &&
    date.getMonth() === m &&
    date.getDate() === d
  );
};

