import { useNavigation } from '@react-navigation/native';

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
