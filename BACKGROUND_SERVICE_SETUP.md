# Background Location & Notification Setup

## Overview
This implementation sets up:
1. **FCM Token** - Passed during login/signup for push notifications
2. **Background Location Service** - Hits API every 2 minutes with user's location
3. **Notifee Notifications** - Displays notifications from API responses
4. **Works in all states** - Active, Background, and Closed app states

## Files Modified/Created

### 1. **src/services/LocationService.js** (NEW)
- Background fetch configuration
- Location tracking service
- Notifee notification handling
- API call to notify nearby places

### 2. **src/screens/auth/Login.jsx**
- Gets FCM token and includes in login request
- Initializes background service on successful login
- Sets up notifications

### 3. **src/screens/auth/SignUp.jsx**
- Gets FCM token and includes in signup request
- Token is sent to backend with key: `FCMToken`

### 4. **index.js**
- Registers headless task for background fetch (Android)

### 5. **android/app/src/main/AndroidManifest.xml**
- Added required permissions for background location and fetch

## Packages Added
```json
{
  "react-native-background-fetch": "^4.3.0",
  "axios": "^1.13.5"
}
```

## Existing Packages Used
- `@notifee/react-native` - For notifications
- `react-native-geolocation-service` - For location
- `@react-native-async-storage/async-storage` - For token storage
- `@react-native-firebase/messaging` - For FCM token

## How It Works

### 1. **Login/Signup Flow**
```javascript
// Gets FCM token
const fcmToken = await getFcmToken();

// Sends with login/signup data
const data = {
  email: username,
  password: password,
  FCMToken: fcmToken  // Key name as requested
};
```

### 2. **Background Service Initialization**
On successful login:
```javascript
await setupNotifications();  // Setup Notifee
await initBackgroundFetch(); // Start background location service
```

### 3. **Location Tracking (Every 2 Minutes)**
- Gets current GPS coordinates
- Retrieves auth token from AsyncStorage
- Sends POST request to API:
  ```
  POST https://postup.apiforapp.link/api/notifications/notifyUserForNearbyPlaces
  Headers:
    - Authorization: Bearer {token}
    - Content-Type: application/json
  Body:
    {
      "longitude": -122.084,
      "latitude": 37.467
    }
  ```

### 4. **Notification Handling**
- Listens for API response
- If notifications exist in response, displays them using Notifee
- Works in all app states (foreground, background, closed)

## Testing

### Test the Implementation:
1. **Login/Signup** - Check console for FCM token
2. **Location Permission** - Grant location access
3. **Background Permission** - Grant background location access (Android)
4. **Check Logs** - Every 2 minutes you should see:
   ```
   [BackgroundFetch] Task started
   Location update sent: {response data}
   ```
5. **Notifications** - Should appear when API returns nearby places

## iOS Additional Steps (Future)
For iOS, you'll need to:
1. Enable Background Modes in Xcode:
   - Background fetch
   - Location updates
2. Update Info.plist with location usage descriptions
3. Request "Always" location permission

## Important Notes

1. **Token Storage**: The auth token must be stored in AsyncStorage with key `'authToken'` after successful login
   ```javascript
   await AsyncStorage.setItem('authToken', response.token);
   ```

2. **Battery Optimization**: Users may need to disable battery optimization for the app on Android to ensure consistent background execution

3. **Location Permission**: Request "Allow all the time" permission for background location on Android 11+

4. **Testing**: Background tasks may not run immediately in debug mode. Test on release build for accurate results.

5. **API Response Format**: The service expects notifications in this format:
   ```javascript
   {
     notifications: [
       {
         title: "Notification Title",
         message: "Notification Body" // or body
       }
     ]
   }
   ```

## Stopping Background Service

To stop the background service (e.g., on logout):
```javascript
import {stopBackgroundFetch} from './src/services/LocationService';

// On logout
stopBackgroundFetch();
```

## Troubleshooting

1. **Background not working**: Check battery optimization settings
2. **No notifications**: Check if API returns proper notification format
3. **Location errors**: Ensure location permissions are granted
4. **Token missing**: Verify token is stored after login
