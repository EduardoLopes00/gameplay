import React, { ReactNode } from 'react'
import { FlatList, View, ImageBackground, Text } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Fontisto } from '@expo/vector-icons'
import { theme } from '../../global/styles/theme'
import { styles } from './styles'

import { Background} from '../../components/Background'
import { Header } from '../../components/Header'
import { ListHeader } from '../../components/ListHeader'
import { ListDivider } from '../../components/ListDivider'
import { ButtonIcon } from '../../components/ButtonIcon'
import { Members } from '../../components/Member'

import BannerImg from '../../assets/banner.png'

export type props = {
    children: ReactNode;
}
export function AppointmentDetails(){
  const members = [
    {
        id: '1',
        username: 'Rodrigo',
        avatar_url: 'https://github.com/EduardoLopes00.png',
        status: 'online'
    },
    {
        id: '2',
        username: 'Rodrigo',
        avatar_url: 'https://github.com/EduardoLopes00.png',
        status: 'offline'
    }
  ]

  return (
    <Background>
        <Header 
            title="Detalhes"
            action={
                <BorderlessButton>
                    <Fontisto 
                        name="share"
                        size={24}
                        color={theme.colors.primary}
                    />
                </BorderlessButton>
            }
        />

        <ImageBackground
            source={BannerImg}
            style={styles.banner}
        >
            <View style={styles.bannerContent}>
                <Text style={styles.title}>
                    Lendários
                </Text>
                
                <Text style={styles.subtitle}>
                    É hoje que vamos chegar ao challenger sem perder nenhuma partida da md10
                </Text>
            </View>
        
        </ImageBackground>

        <ListHeader 
            title="Jogadores"
            subtitle="Total 3"
        />

        <FlatList
            data={members}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <Members data = {item}/>
            )} 
            ItemSeparatorComponent={() => <ListDivider />}
            style = {styles.members}
            
        />

            
        <View style={styles.footer}>
            <ButtonIcon title="Entrar na partida"/>
        </View>
    </Background>
  )
}