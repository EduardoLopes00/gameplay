import React from 'react';
import { Text, 
         View,         
         Image,
         StatusBar,
         Alert,
         ActivityIndicator 
        } from 'react-native';

import illustrationImg from '../../assets/illustration.png'         
import { styles } from './styles';
import { ButtonIcon } from '../../components/ButtonIcon'
import { Background } from '../../components/Background'

import { useAuth } from '../../hooks/auth'
import { theme } from '../../global/styles/theme';

export function SignIn() {
  const { loading, user, signIn } = useAuth();

    async function handleSignIn() {
      try {
        await signIn()
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <Background>
      <View style={styles.container}> 
      
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Image 
        source={illustrationImg} 
        style={styles.Image}
        resizeMode="stretch"
        />

        <View style = {styles.content}>
          <Text style={styles.title}>
            conecte-se {'\n'}
            e organize suas {'\n'}
            jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie um grupo para jogar seus games {`\n`}
            favoritos com seus amigos
          </Text>

          {
          loading ? <ActivityIndicator color = {theme.colors.primary}/> : 
          <ButtonIcon 
            title="Entrar com discord"
            onPress={handleSignIn}
            />
          }
        </View>
      </View>
    </Background>
  );
}