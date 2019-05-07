import React from 'react'
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Reservations from './components/reservations/index';
import CreateReservation from './components/reservations/createReservation';
import Icon from 'react-native-vector-icons/FontAwesome';

const ReservationsStack = createStackNavigator({
    Reservations,
    CreateReservation
},
{
    initialRouteName: 'CreateReservation'
});


const BottomTabStack = createMaterialBottomTabNavigator({
    Reservations: {
        screen: ReservationsStack,
        navigationOptions:{
            tabBarIcon: <Icon name="calendar" size={23} />
        }
    }
},
{
    initialRouteName: 'Reservations'
}
)
const StackContainer = createSwitchNavigator({
    Home: BottomTabStack,
},
{
    initialRouteName: 'Home',
})

export default createAppContainer(StackContainer);