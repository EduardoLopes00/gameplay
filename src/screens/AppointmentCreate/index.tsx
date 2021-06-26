import React, { ReactNode, useState } from 'react'
import { ScrollView, KeyboardAvoidingView, View, Platform, Text, Modal } from 'react-native'

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { Background} from '../../components/Background'
import { GuildIcon} from '../../components/GuildIcon'
import { styles } from './styles'
import { Header } from '../../components/Header'
import { CategorySelect } from '../../components/CategorySelect'
import { Smallinput } from '../../components/Smallinput'
import { TextArea } from '../../components/TextArea'
import { ModalView } from '../../components/ModalView'
import { theme } from '../../global/styles/theme'
import { Button } from '../../components/Button';
import { Guilds } from '../Guilds'
import { GuildProps } from '../../components/Guild';

export type props = {
    children: ReactNode;
}

export function AppointmentCreate(){
  const [category, setCategory] = useState('');
  const [openGuildModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps); //Dizendo que o useState é do tipo GuildProps mas inicia com um objeto vazio do tipo guildProps

  function handleOpenGuilds(){
      setOpenGuildsModal(true);
  }
  function handleCloseGuilds(){
      setOpenGuildsModal(false);
  }
  
  function handleGuildSelect(guildSelect: GuildProps){
      setGuild(guildSelect);
      setOpenGuildsModal(false);
  }

  function handleCategorySelect(categoryId: string): void {
    setCategory(categoryId)
  }

  return (
    <KeyboardAvoidingView  //Ambos os componentes, keyboardavoidingview e o scrollview, juntos, impedem que o teclado tampe a interface
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style = {styles.container}
    >
        <Background>
            <ScrollView>             
                <Header 
                    title="Agendar partida"
                />

                <Text style={[styles.label, 
                    {marginLeft: 24, marginTop: 36, marginBottom: 18}]}
                > 
                Categoria
                </Text>

                <CategorySelect 
                hasCheckBox
                setCategory={handleCategorySelect}
                categorySelected={category}
                />

                <View style={styles.form}>
                    <RectButton onPress={handleOpenGuilds}>
                        
                        <View style={styles.select}>
                            {
                                guild.icon ? <View style={styles.image}/> : <GuildIcon />
                            }

                            <View style={styles.selectBody}>
                                <Text style={styles.label}>
                                    { guild.name ? guild.name : 'Selecione um servidor' }
                                </Text>
                            </View>

                            <Feather
                                name="chevron-right"
                                color={theme.colors.heading}
                                size={18}
                            />    
                        </View>
                    </RectButton>

                    <View style={styles.field}>
                        <View>
                            <Text style={[styles.label, {marginBottom: 8}]}>
                                Dia e mês
                            </Text>
                            
                            <View style = {styles.column}>
                                <Smallinput maxLength={2}/>
                                <Text style= {styles.divider}>
                                    /
                                </Text>
                                <Smallinput maxLength={2}/>
                            </View>
                        </View>

                        <View>
                            <Text style={[styles.label, {marginBottom: 8}]}>
                                Hora e minuto
                            </Text>
                            
                            <View style = {styles.column}>
                                <Smallinput maxLength={2}/>
                                <Text style= {styles.divider}>
                                    :
                                </Text>
                                <Smallinput maxLength={2}/>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.field, { marginBottom: 12 }]}>
                        <Text style ={styles.label}>
                            Descrição
                        </Text>

                        <Text style = {styles.caracteresLimit}>
                            Max 100 caracteres
                        </Text>
                    </View>

                    <TextArea 
                        multiline
                        maxLength={100}
                        numberOfLines={5}
                        autoCorrect={false}
                    />

                    <View style = {styles.footer}>
                        <Button title="Agendar" /> 
                    </View>
                </View>          

                <ModalView 
                    visible = {openGuildModal}
                    closeModal = {handleCloseGuilds}            
                >
                    <Guilds handleGuildSelect={handleGuildSelect}/>              
                </ModalView>  
            </ScrollView>
        </Background> 
    </KeyboardAvoidingView>
  )
}