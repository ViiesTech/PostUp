import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import MapView, {Marker, Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import {useLazyGetNearByBusinessesQuery} from '../../redux/services';
import {BASE_URL} from '../../redux/constant';
import {
  getCurrentLocation,
  requestLocationPermission,
} from '../../config/Location';
import AppColors from '../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ShowToast} from '../../utils/Hooks';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.15;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = ({route}) => {
  const mapRef = useRef(null);
  const isMountedRef = useRef(true);
  const [getNearByBusinesses, {data: nearByBusinessesData}] =
    useLazyGetNearByBusinessesQuery();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  // If navigating from business card directions, use those coordinates
  const targetLocation = route?.params;

  const initializeMap = useCallback(async () => {
    try {
      if (!isMountedRef.current) {
        return;
      }
      setLoading(true);
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        const location = await getCurrentLocation();
        if (!isMountedRef.current) {
          return;
        }

        if (location && location.lat && location.long) {
          const coords = {
            latitude: location.lat,
            longitude: location.long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          if (!isMountedRef.current) {
            return;
          }
          setCurrentLocation(coords);

          // Fetch nearby businesses
          try {
            await getNearByBusinesses({
              latitude: location.lat,
              longitude: location.long,
            }).unwrap();
          } catch (apiError) {
            console.log('API Error:', apiError);
          }

          // If there's a target location (from directions), focus on it
          if (targetLocation?.latitude && targetLocation?.longitude) {
            setTimeout(() => {
              if (isMountedRef.current && mapRef.current) {
                mapRef.current.animateToRegion(
                  {
                    latitude: targetLocation.latitude,
                    longitude: targetLocation.longitude,
                    latitudeDelta: LATITUDE_DELTA / 2,
                    longitudeDelta: LONGITUDE_DELTA / 2,
                  },
                  1000,
                );
              }
            }, 500);
          }
        }
      } else {
        if (isMountedRef.current) {
          ShowToast('Location permission denied');
        }
      }
    } catch (error) {
      console.log('Error initializing map:', error);
      if (isMountedRef.current) {
        ShowToast('Failed to load map');
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [getNearByBusinesses, targetLocation]);

  useEffect(() => {
    isMountedRef.current = true;
    initializeMap();

    return () => {
      isMountedRef.current = false;
    };
  }, [initializeMap]);

  const handleRecenterMap = () => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateToRegion(currentLocation, 1000);
    }
  };

  const handleMarkerPress = useCallback(business => {
    if (!business) {
      return;
    }
    setSelectedBusiness(business);
    if (mapRef.current && business.latitude && business.longitude) {
      mapRef.current.animateToRegion(
        {
          latitude: business.latitude,
          longitude: business.longitude,
          latitudeDelta: LATITUDE_DELTA / 2,
          longitudeDelta: LONGITUDE_DELTA / 2,
        },
        500,
      );
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.BTNCOLOURS} />
        <Text style={styles.loadingText}>Loading Map...</Text>
      </View>
    );
  }

  if (!currentLocation) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons
          name="location-outline"
          size={60}
          color={AppColors.LIGHTGRAY}
        />
        <Text style={styles.errorText}>Unable to get your location</Text>
        <TouchableOpacity style={styles.retryButton} onPress={initializeMap}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        userInterfaceStyle="light"
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={currentLocation}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={true}
        // loadingEnabled={true}
      >
        {/* User's current location circle */}
        <Circle
          center={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          radius={100}
          fillColor="rgba(66, 133, 244, 0.2)"
          strokeColor="rgba(66, 133, 244, 0.8)"
          strokeWidth={2}
        />

        {/* Nearby businesses markers */}
        {nearByBusinessesData?.data?.map((business, index) => {
          if (!business.latitude || !business.longitude) {
            return null;
          }

          const isSelected = selectedBusiness?._id === business._id;

          return (
            <Marker
              key={business._id || index}
              coordinate={{
                latitude: business.latitude,
                longitude: business.longitude,
              }}
              onPress={() => handleMarkerPress(business)}>
              <View style={styles.markerContainer}>
                <View
                  style={[
                    styles.markerCircle,
                    isSelected && styles.selectedMarkerCircle,
                  ]}>
                  <MaterialCommunityIcons
                    name="store"
                    size={isSelected ? 24 : 20}
                    color={AppColors.WHITE}
                  />
                </View>
              </View>
            </Marker>
          );
        })}
      </MapView>

      {/* Recenter button */}
      <TouchableOpacity
        style={styles.recenterButton}
        onPress={handleRecenterMap}
        activeOpacity={0.8}>
        <Ionicons name="locate" size={24} color={AppColors.BTNCOLOURS} />
      </TouchableOpacity>

      {/* Business count badge */}
      {nearByBusinessesData?.data?.length > 0 && (
        <View style={styles.countBadge}>
          <MaterialCommunityIcons
            name="store"
            size={16}
            color={AppColors.WHITE}
          />
          <Text style={styles.countText}>
            {nearByBusinessesData.data.length} nearby
          </Text>
        </View>
      )}

      {/* Selected business info */}
      {selectedBusiness && (
        <View style={styles.businessInfoCard}>
          <View style={styles.businessInfoHeader}>
            {selectedBusiness.images &&
              selectedBusiness.images.length > 0 &&
              selectedBusiness.images[0] && (
                <Image
                  source={{uri: `${BASE_URL}${selectedBusiness.images[0]}`}}
                  style={styles.businessImage}
                  resizeMode="cover"
                  onError={e =>
                    console.log('Image load error:', e.nativeEvent.error)
                  }
                />
              )}
            <View style={styles.businessInfoContent}>
              <Text style={styles.businessInfoName}>
                {selectedBusiness.businessName || 'Business'}
              </Text>
              {selectedBusiness.locationName && (
                <Text style={styles.businessInfoLocation} numberOfLines={1}>
                  {selectedBusiness.locationName}
                </Text>
              )}
              {selectedBusiness.distance !== undefined && (
                <Text style={styles.businessInfoDistance}>
                  {selectedBusiness.distance < 1000
                    ? `${Math.round(selectedBusiness.distance)}m away`
                    : `${(selectedBusiness.distance / 1000).toFixed(1)}km away`}
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedBusiness(null)}>
              <Ionicons name="close" size={20} color={AppColors.GRAY} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.WHITE,
  },
  loadingText: {
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(1.8),
    color: AppColors.GRAY,
  },
  errorText: {
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(1.8),
    color: AppColors.GRAY,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(8),
    paddingVertical: responsiveHeight(1.5),
    backgroundColor: AppColors.BTNCOLOURS,
    borderRadius: 8,
  },
  retryText: {
    color: AppColors.WHITE,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.BTNCOLOURS,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: AppColors.WHITE,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedMarkerCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F44336',
  },
  recenterButton: {
    position: 'absolute',
    bottom: responsiveHeight(12),
    right: responsiveWidth(5),
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: AppColors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  countBadge: {
    position: 'absolute',
    top: responsiveHeight(6),
    left: responsiveWidth(5),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.BTNCOLOURS,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1),
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 6,
  },
  countText: {
    color: AppColors.WHITE,
    fontSize: responsiveFontSize(1.4),
    fontWeight: '600',
  },
  businessInfoCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: AppColors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 10,
  },
  businessInfoHeader: {
    flexDirection: 'row',
    padding: responsiveWidth(5),
    paddingBottom: responsiveHeight(3),
  },
  businessImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: responsiveWidth(3),
    backgroundColor: AppColors.LIGHTGRAY,
  },
  businessInfoContent: {
    flex: 1,
  },
  businessInfoName: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    color: AppColors.BLACK,
    marginBottom: 4,
  },
  businessInfoLocation: {
    fontSize: responsiveFontSize(1.4),
    color: AppColors.GRAY,
    marginBottom: 2,
  },
  businessInfoDistance: {
    fontSize: responsiveFontSize(1.3),
    color: AppColors.BTNCOLOURS,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
});

export default Map;
