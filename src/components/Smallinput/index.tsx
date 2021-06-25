import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native'

import { Avatar } from '../Avatar';
import { styles } from './styles';

export function Smallinput ({...rest}: TextInputProps) {
    return (
        <TextInput 
            style = {styles.container}
            keyboardType="numeric" //Especifica que só aceita nmr
            {...rest}
        / >
            
       
    )
}