import React, { ReactNode, useState } from 'react'
import { FlatList, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Fontisto } from '@expo/vector-icons'
import { theme } from '../../global/styles/theme'
import { styles } from './styles'

import { Guild, GuildProps } from '../../components/Guild'
import { Load } from '../../components/Load'
import { ListDivider } from '../../components/ListDivider'
import { API } from '../../services/api'
import { useEffect } from 'react'

export type Props = {
    handleGuildSelect: (guild: GuildProps) => void; //Recebe uma função como parâmetro
}

export function Guilds({handleGuildSelect}: Props){
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState (true);

  async function fetchGuilds() {
    const response = await API.get('/users/@me/guilds')

    setGuilds(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <View style={styles.container}>
        
        { loading ? <Load /> : 
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
        }
    </View>
  )
}