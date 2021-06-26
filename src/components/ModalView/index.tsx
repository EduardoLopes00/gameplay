import React, { ReactNode } from 'react'
import { View, ModalProps, Modal, TouchableWithoutFeedback } from 'react-native'

import { styles } from './styles'

import { Background } from '../Background'

type Props = ModalProps & {
    children: ReactNode; //Diz que virá um componente react native
    closeModal: () => void;
}

export function ModalView({
    children,
    closeModal,
    ...rest}: Props){
   
    return (
        <Modal
            transparent
            animationType="slide"
            statusBarTranslucent //Ação na parte de cima do celular (Quando fora do modo noturno)
            {...rest}
        >            
            {/* O touchable abaixo identifica um toque em qualqeur parte da tela, possibilitando o fechamento do modal sem ter que selecionar uma opção. */}
            <TouchableWithoutFeedback onPress={closeModal}> 
                <View style={styles.overlay}>
                    <View style = {styles.container}>
                        <Background>
                            <View style = {styles.bar} />
                            {children}
                        </Background>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </Modal>
    );
}