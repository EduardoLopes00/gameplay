import React, { ReactNode } from 'react'
import { FlatList, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Fontisto } from '@expo/vector-icons'
import { theme } from '../../global/styles/theme'
import { styles } from './styles'

import { Guild, GuildProps } from '../../components/Guild'
import { ListDivider } from '../../components/ListDivider'

export type Props = {
    handleGuildSelect: (guild: GuildProps) => void; //Recebe uma função como parâmetro
}

export function Guilds({handleGuildSelect}: Props){
  const guilds = [
    {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true
    },
    {
        id: '2',
        name: 'Los trouxas',
        icon: null,
        owner: true
    }
  ]

  return (
    <View style={styles.container}>
        <FlatList
          data={guilds}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Guild data = {item} 
              onPress = {() => handleGuildSelect(item)}
            />
          )} 
          contentContainerStyle={{paddingBottom: 69}}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListDivider  isCentered/>}
          ListHeaderComponent={() => <ListDivider isCentered/>}
          style = {styles.guilds}
          
          />
    </View>
  )
}