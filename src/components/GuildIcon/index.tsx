import React from 'react';
import { Image, View } from 'react-native'

import { styles } from './styles';
import { theme } from '../../global/styles/theme'; 

export function GuildIcon() {
const uri = 'https://github.com/EduardoLopes00.png'

return (
    <Image
        source= {{ uri }}
        style={styles.image}
        resizeMode="cover"
    />
)
}