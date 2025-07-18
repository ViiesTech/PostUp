import React from 'react';
import CustomToast, { BaseToast } from 'react-native-toast-message';
import AppColors from '../utils/AppColors';

const Toast = ({ position }) => {

    const toastConfig = {
        success: (props) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: AppColors.BTNCOLOURS, borderLeftWidth: 7 }}
                contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: AppColors.WHITE }}
                text1Style={{
                    fontSize: 15,
                    color: AppColors.BTNCOLOURS,
                    fontWeight: 'bold'
                }}
            />
        ),
    }

    return (
        <CustomToast
            config={toastConfig}
            position={position}
            visibilityTime={3000}
        />
    )

}

export default Toast;