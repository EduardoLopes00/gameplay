import React from 'react';
import { Text, 
         View,         
         Image,
         StatusBar
        } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import illustrationImg from '../../assets/illustration.png'         
import { styles } from './styles';
import { ButtonIcon } from '../../components/ButtonIcon'
import { Background } from '../../components/Background'

import { useAuth } from '../../hooks/auth'

export function SignIn() {
  const navigation = useNavigation();
  const { user } = useAuth();

    function handleSignIn() {
      navigation.navigate('Home')
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

          <ButtonIcon 
            title="Entrar com discord"
            onPress={handleSignIn}
            />
        </View>
      </View>
    </Background>
  );
}