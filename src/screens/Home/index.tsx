import React, { useCallback, useState } from 'react'
import { View, FlatList, Text } from 'react-native'

import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CategorySelect'
import { Profile } from '../../components/Profile'
import { ListHeader } from '../../components/ListHeader'
import { ListDivider } from '../../components/ListDivider'
import { Load } from '../../components/Load'

import { Background } from '../../components/Background'


import { styles } from './styles'
import { Appointment, AppointmentProps } from '../../components/Appointment'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useAuth } from '../../hooks/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLLECTION_APPOINTMENTS } from '../../configs/database'

export function Home() {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointements] = useState<AppointmentProps[]>([]);

  const navigation = useNavigation();

  function handleCategorySelect(categoryId: string) {    
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps){
    navigation.navigate('AppointmentDetails', { guildSelected: guildSelected })
  }

  function handleAppointmentCreate(){
    navigation.navigate('AppointmentCreate')
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : []    

    if (category) {
      setAppointements(storage.filter(item => item.category === category))
    }else {
      setAppointements(storage)      
    } 
  
    setLoading(false)
  }

  useFocusEffect(useCallback(() => {
    loadAppointments();
  }, [category]))

  return (

    <Background>
      <View style = {styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate}/>
      </View>  


      <CategorySelect 
        categorySelected={category}
        setCategory= {handleCategorySelect}
      />
    
      {
        loading ? <Load /> :
        <>
          <ListHeader 
            title="Partidas agendadas"
            subtitle={`Total ${appointments.length}`}
          />

          <FlatList //Lista mais performática que o scroolView
            data={appointments}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
            <Appointment data ={item}
                onPress={() => handleAppointmentDetails(item)}
            />
            )}
            style={styles.matches}      
            contentContainerStyle={{paddingBottom: 69}}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <ListDivider />
            }
          />
        </>
      }
    </Background>
  )
}