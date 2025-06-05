import { useNavigation } from '@react-navigation/native';

export const useCustomNavigation = () => {
  const navigation = useNavigation();

  const navigateToRoute = (routeName: any) => {
    navigation.navigate(routeName);
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
