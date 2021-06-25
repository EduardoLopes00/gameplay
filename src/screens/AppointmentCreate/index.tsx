import React, { ReactNode, useState } from 'react'
import { FlatList, View, ImageBackground, Text } from 'react-native'

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';


import { Background} from '../../components/Background'
import { GuildIcon} from '../../components/GuildIcon'
import { styles } from './styles'
import { Header } from '../../components/Header'
import { CategorySelect } from '../../components/CategorySelect'
import { Smallinput } from '../../components/Smallinput'


import { theme } from '../../global/styles/theme'

export type props = {
    children: ReactNode;
}

export function AppointmentCreate(){
  const [category, setCategory] = useState('');

  return (
    <Background>
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
           setCategory={setCategory}
           categorySelected={category}
        />

        <View style={styles.form}>
            <RectButton>
                <View style={styles.select}>
                    {
                        /* <View style={styles.image}/> */
                        <GuildIcon />
                    }

                    <View style={styles.selectBody}>
                        <Text style={styles.label}>
                            Selecione um servidor
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
                    <Text style={styles.label}>
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
                    <Text style={styles.label}>
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
        </View>
    </Background>
  )
}