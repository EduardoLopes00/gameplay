import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'


import { Home } from '../screens/Home'
import { theme } from '../global/styles/theme';
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { AppointmentCreate } from '../screens/AppointmentCreate';

const {Navigator, Screen} = createStackNavigator();

export function AppRoutes() {
    return (
        <Navigator
            headerMode="none"
            screenOptions={{
                cardStyle: {
                    backgroundColor: theme.colors.secondary100 //Remove o background do componetne de rodas
                }
            }}
        >
        
            <Screen
                name = "Home"
                component={Home}
            />
            <Screen
                name = "AppointmentDetails"
                component={AppointmentDetails}
            />
            <Screen
                name = "AppointmentCreate"
                component={AppointmentCreate}
            />
        </Navigator>
    )
    
}

