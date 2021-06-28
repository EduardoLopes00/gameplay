import React, { ReactNode, useState, useEffect } from 'react'
import { Fontisto } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { BorderlessButton } from 'react-native-gesture-handler'
import * as Linking from 'expo-linking'

import { 
    FlatList, 
    View, 
    ImageBackground, 
    Text, 
    Alert,
    Share,
    Platform 
} from 'react-native'


import { theme } from '../../global/styles/theme'
import { styles } from './styles'

import { Header } from '../../components/Header'
import { ListHeader } from '../../components/ListHeader'
import { Background } from '../../components/Background'
import { ButtonIcon } from '../../components/ButtonIcon'
import { ListDivider } from '../../components/ListDivider'
import { AppointmentProps } from '../../components/Appointment'
import { MemberProps, Members } from '../../components/Member'

import BannerImg from '../../assets/banner.png'

import { API } from '../../services/api'
import { Load } from '../../components/Load'

export type props = {
    children: ReactNode;
}

type Params = {
    guildSelected: AppointmentProps
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[]
    presence_count: number;
}

export function AppointmentDetails(){
  
  const navigation = useNavigation();
  
  const [ widget, setWidget ] = useState<GuildWidget>({} as GuildWidget)
  const [ loading, setLoading ] = useState(true)

  const route = useRoute()
  const { guildSelected } = route.params as Params

  async function handleNavigateHome() {
      navigation.navigate('Home');
  }
  
  async function fetchGuildWidget() {
    try {
        const response = await API.get (`/guilds/${guildSelected.guild.id}/widget.json`)
        setWidget(response.data);
    } catch {
        Alert.alert('Erro!', 'Verifique as configurações do servidor. Parece que o widget do mesmo não está habilitado!', [
            {
                text: 'Retornar para home',
                style: 'cancel',
                onPress:  () => handleNavigateHome()
            }
        ]
        )

    } finally {
        setLoading(false)
    }
  }

  function handleShareInvitation() {
      console.log(widget)
    
      const message = Platform.OS === 'ios'
      ? `Junte-se a ${guildSelected.guild.name}`
      : widget.instant_invite;

      Share.share({
          message,
          url: widget.instant_invite
      })
  }
  
  function handleOpenGuild() {
      Linking.openURL(widget.instant_invite)
  }

  function handleExistWidget() : boolean {    
    return !(JSON.stringify(widget) == '{}');
  }

  useEffect(() => {
      fetchGuildWidget();
  }, [])

  return (
    <Background>
        <Header 
            title="Detalhes"
            action={
                guildSelected.guild.owner &&
                <BorderlessButton onPress={handleShareInvitation}>
                    
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
                    { guildSelected.guild.name }
                </Text>
                
                <Text style={styles.subtitle}>
                    { guildSelected.description }
                </Text>
            </View>
        
        </ImageBackground>

        {
            loading ? 
            <Load /> :             
            handleExistWidget() ?                         
            <>                
                <ListHeader 
                    title="Jogadores"
                    subtitle={`Total ${widget.members.length}`}
                />

                <FlatList
                    data={widget.members}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <Members data = {item}/>
                    )} 
                    ItemSeparatorComponent={() => <ListDivider isCentered/>}
                    style = {styles.members}
                    
                />
        

            
                <View style={styles.footer}>
                    <ButtonIcon 
                        title="Entrar na partida"
                        onPress = {handleOpenGuild}
                    
                    />
                </View>
            </>    
            :
            <></>
        }
    </Background>
  )
}