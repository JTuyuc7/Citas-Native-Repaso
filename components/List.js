import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Dimensions, ScrollView, SafeAreaView } from 'react-native';

const { width, height} = Dimensions.get('screen')

const List = ({ cita, delteItem }) => {

    const dialogoEliminar = (id) => {
        delteItem(id)
    }

    return (  
        <>
            <SafeAreaView style={{ flex: 1 }}>
                
                    <View style={styles.citas}>
                        <View>
                            <Text style={styles.label}>Paciente</Text>
                            <Text style={styles.texto}>{ cita.paciente }</Text>
                        </View>

                        <View>
                            <Text style={styles.label}>Propietario:</Text>
                            <Text style={styles.texto}> { cita.propietario}</Text>
                        </View>

                        <View>
                            <Text style={styles.label}>Sintomas:</Text>
                            <Text style={styles.texto}>{ cita.sintomas}</Text>
                        </View>

                        <View style={ styles.buttonContainer }>
                            <TouchableHighlight 
                                style={ styles.buttonDelete}
                                onPress={ () => dialogoEliminar(cita.id)}
                                >
                                <Text style={styles.textDelete}>Eliminar</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    citas: {
        paddingHorizontal: 30,
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1.5,
        backgroundColor: '#fff',
        paddingVertical: 20,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingVertical: 5
    },
    texto: {
        fontSize: 16
    },
    buttonContainer: {
        marginTop: 10,
    },
    buttonDelete: {
        backgroundColor: 'purple',
        borderRadius: 20,
        height: height * 0.055,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    textDelete: {
        color: "#fff",
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold'
    }
})

export default List;