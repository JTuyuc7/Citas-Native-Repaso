import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TextInput, Keyboard, TouchableHighlight, Dimensions, Button, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const { height, width } = Dimensions.get('window')

const Form = ({citas, setCitas, setIsActive}) => {

    // State para la fecha y hora
    const [ fecha, setFecha ] = useState('');
    const [ hora, setHora] = useState('');
    const [ paciente, setPaciente] = useState('');
    const [ propietario, setPropietario ] = useState('');
    const [ contacto, setContacto ] = useState('');
    const [ sintomas, setSintomas ] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [ isTimePicker, setTimePicker ] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const options = { year: 'numeric', month: 'long', day: '2-digit'}
        setFecha( date.toLocaleString('es-ES', options) )
        hideDatePicker();
    };

    // Show date Picker

    const showTimePicker = () => {
        setTimePicker( true )
    }

    const hideTimePicker = () => {
        setTimePicker(false)
    }

    const handleTimeConfirm = (time) => {
        const options = { hour: 'numeric', minute: 'numeric'}
        //setHora(time.toLocaleString('en-US', options))
        setHora( time.toLocaleString('en-US', options) )
        hideTimePicker()
    }

    //Add new cita
    const agregarNuevaCita = () => {
        // Validate the fields
        if( paciente.trim() === '' || propietario.trim() === '' || contacto.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            alertError()
            return;
        }

        // Create a new object to add the cita
        const newCita = {
            paciente,
            propietario,
            contacto,
            fecha,
            hora,
            sintomas
        }

        newCita.id = Math.random();

        console.log(newCita, 'Nueva cita')

        // Agregar la nueva cita
        const nuevaCita = [...citas, newCita ];
        setCitas(nuevaCita)

        // Reset the Form
        setIsActive(false)

        // Reset the fields
        setFecha('');
        setHora('');
        setPaciente('');
        setPropietario('');
        setContacto('');
        setSintomas('');
    }

    // Show an error alert
    const alertError = () => {
        Alert.alert(
            'Error',
            'Fields are requiered',
            [{
                text: 'Ok'
            }]
        )
    }

    const closeKeyboard = () => {
        Keyboard.dismiss();
    }


    return (  
        <>
            <SafeAreaView>
                <TouchableHighlight onPress={ () => closeKeyboard()}>
                    <ScrollView>
                        <View style={ styles.mainContainer}>
                                <View>
                                    <Text style={styles.labelStyle}>Paciente</Text>
                                    <TextInput
                                        style={ styles.inputStyle}
                                        keyboardType='default'
                                        onChangeText={ (t) => setPaciente(t)}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.labelStyle}>Propietario</Text>
                                    <TextInput
                                    style={ styles.inputStyle}
                                        keyboardType='default'
                                        onChangeText={ (t) => setPropietario(t)}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.labelStyle}>Contacto</Text>
                                    <TextInput
                                    style={ styles.inputStyle}
                                        keyboardType='numeric'
                                        onChangeText={ (t) => setContacto(t)}
                                    />
                                </View>

                                <View style={{ marginTop: 15 }}>
                                    <Text style={[styles.labelStyle], {marginBottom: 10}}>Fecha: {fecha}</Text>
                                    <Button title="Pick a Date" onPress={showDatePicker} />
                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                    />
                                </View>

                                <View style={{ marginTop: 15 }}>
                                    <Text style={[styles.labelStyle], {marginBottom: 10}}>Hora: {hora}</Text>
                                    <Button title="Pick Time" onPress={showTimePicker} />
                                    <DateTimePickerModal
                                        isVisible={isTimePicker}
                                        mode="time"
                                        onConfirm={handleTimeConfirm}
                                        onCancel={hideTimePicker}
                                        locale='es_ES'
                                    />
                                </View>

                                <View>
                                    <Text style={styles.labelStyle}>Sintomas</Text>
                                    <TextInput
                                        style={ styles.inputStyle}
                                        multiline={true}
                                        numberOfLines={5}
                                        keyboardType='default'
                                        onChangeText={ (t) => setSintomas(t)}
                                        locale='es_ES'
                                    />
                                </View>

                                <View style={ styles.agregarButton }>
                                    <TouchableHighlight 
                                        style={styles.butonAgregar}
                                        onPress={ () => agregarNuevaCita() }
                                        >
                                        <Text style={ styles.textAgregar }>Agregar Cita</Text>
                                    </TouchableHighlight>
                                </View>
                        </View>
                    </ScrollView>
                </TouchableHighlight>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingVertical: 30,
        paddingBottom: 50
    },
    inputStyle: {
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    labelStyle: {
        paddingTop: 20,
        fontWeight: 'bold'
    },
    agregarButton: {
        marginTop: 30,
        paddingBottom: 170
    },
    butonAgregar: {
        backgroundColor: 'purple',
        width: '100%',
        height: width * 0.10,
        borderRadius: 15,
        flexDirection:'column',
        justifyContent: 'center',
        //paddingBottom: height * 0.3
    },
    textAgregar: {
        color: "#fff",
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default Form;