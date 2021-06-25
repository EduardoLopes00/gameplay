import React from "react";

import { Text, View, Image } from "react-native"; 
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import DiscordImg from '../../assets/discord.png';
import { styles } from "./styles";

type Props = RectButtonProps & { //É possível usar as props do botão através desta sintaxe
    title: string;    
}

export function ButtonIcon({ title, ...rest }: Props){
    return (
        <RectButton
            style={styles.container}
            {...rest} //Vai pegar o valor do resto das propriedades que eu passar na hora de chamar o componente
        >
            <View style={styles.iconWrapper}>
                <Image source={DiscordImg} style={styles.icon} />
            </View>

            <Text style={styles.title}>
                {title}
            </Text>
        </RectButton>
    )
}