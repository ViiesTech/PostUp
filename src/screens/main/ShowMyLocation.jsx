/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AppHeader from '../../components/AppHeader';
import AppColors from '../../utils/AppColors';
import AppText from '../../components/AppTextComps/AppText';
import LineBreak from '../../components/LineBreak';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import {
  getCurrentLocation,
  requestLocationPermission,
} from '../../config/Location';
import {ShowToast} from '../../utils/Hooks';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

const ShowMyLocation = () => {
  const mapRef = useRef(null);

  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState('');
  const [addressLoading, setAddressLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);

  useEffect(() => {
    handleGetMyLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAddress = async (lat, lng) => {
    setAddressLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&zoom=14`,
        {
          headers: {
            'User-Agent': 'PostUpApp/1.0 (contact@postup.com)',
            Accept: 'application/json',
            'Accept-Language': 'en',
          },
        },
      );
      const data = await response.json();
      if (data?.address) {
        const {road, suburb, city, town, village, state, country} =
          data.address;
        const area = road || suburb || '';
        const place = city || town || village || state || '';
        const parts = [area, place, country].filter(Boolean);
        setAddress(parts.join(', ') || data.display_name);
      }
    } catch (err) {
      console.log('[ShowMyLocation] Reverse geocode error:', err);
    } finally {
      setAddressLoading(false);
    }
  };

  const handleGetMyLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      ShowToast('Location permission denied');
      setLocationLoading(false);
      return;
    }
    setLocationLoading(true);
    try {
      const loc = await getCurrentLocation();
      if (loc?.lat && loc?.long) {
        const newRegion = {
          latitude: loc.lat,
          longitude: loc.long,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 600);
        fetchAddress(loc.lat, loc.long);
      }
    } catch (err) {
      ShowToast('Could not fetch location');
    } finally {
      setLocationLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader
        heading="My Location"
        goBack
        isCenteredHead
        textFontWeight
        // isCenteredHeadWidth={68}
      />

      {/* Map */}
      <View style={styles.mapContainer}>
        {locationLoading || !region ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={AppColors.BTNCOLOURS} />
            <LineBreak space={2} />
            <AppText
              title={'Fetching your location...'}
              textColor={AppColors.GRAY}
              textSize={1.7}
              textAlignment={'center'}
            />
          </View>
        ) : (
          <MapView
          userInterfaceStyle="light"
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={StyleSheet.absoluteFillObject}
            region={region}
            showsUserLocation
            showsMyLocationButton={false}>
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              pinColor={AppColors.BTNCOLOURS}
            />
          </MapView>
        )}

        {/* Refresh GPS button */}
        {!locationLoading && (
          <TouchableOpacity
            style={styles.gpsButton}
            onPress={handleGetMyLocation}>
            <MaterialCommunityIcons
              name="crosshairs-gps"
              size={responsiveFontSize(3)}
              color={AppColors.BTNCOLOURS}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Address card */}
      <View style={styles.bottomCard}>
        <View style={styles.addressRow}>
          <Octicons
            name="location"
            size={responsiveFontSize(2.5)}
            color={AppColors.BTNCOLOURS}
          />
          <View style={{flex: 1}}>
            <AppText
              title={'Your Current Location'}
              textColor={AppColors.GRAY}
              textSize={1.5}
            />
            <LineBreak space={0.5} />
            {addressLoading ? (
              <ActivityIndicator size="small" color={AppColors.GRAY} />
            ) : (
              <AppText
                title={address || 'Locating...'}
                textColor={AppColors.BLACK}
                textSize={1.7}
                textFontWeight
                numberOfLines={2}
              />
            )}
          </View>
        </View>
        <LineBreak space={2} />
      </View>
    </View>
  );
};

export default ShowMyLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
  },
  mapContainer: {
    flex: 1,
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.WHITE,
  },
  gpsButton: {
    position: 'absolute',
    bottom: responsiveHeight(2),
    right: responsiveWidth(4),
    backgroundColor: AppColors.WHITE,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bottomCard: {
    backgroundColor: AppColors.WHITE,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
});
