import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableHighlight, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Form from './components/Form';
import List from './components/List';

const { height, width } = Dimensions.get('window')

const App = () => {

  // Hide and show the button to add a new appoitment
  const [ isActive, setIsActive ] = useState(false);

  // State of appointments
  const [ citas, setCitas ] = useState([]);

  console.log(citas)

  // Function to delete a cita
  const delteItem = (id) => {

    const listaFiltrada = citas.filter( (cita) => cita.id !== id )

    setCitas( listaFiltrada )
    almacenaCitas(JSON.stringify(listaFiltrada))
  }

  const almacenaCitas = async ( objCitas ) => {
    try {
      await AsyncStorage.setItem('@citas', objCitas )
    } catch (error) {
      console.log(error, 'Unable to save items')
    }
  }

  // Cargar las citas de storage
  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    try {
      const data = await AsyncStorage.getItem('@citas');
      if( data ){
        setCitas( JSON.parse(data) )
      }
    } catch (error) {
      console.log(error, 'Unable to get data from local storage')
    }
  }

  return (  
    <>
      <SafeAreaView style={ styles.container }>
          <View style={ styles.Scontainer }>
            <Text style={styles.text}>Administrador de Citas</Text>

            <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingVertical: 20}}>
                <TouchableHighlight
                  onPress={ () => {console.log('Pressing'), setIsActive(!isActive)}}
                  style={{ backgroundColor: 'purple', borderWidth: 1, width: width * 0.5 , borderColor: 'black', borderRadius: 10, height: 40, flexDirection: 'column', justifyContent: 'center'}}>
                  <Text style={styles.text}>{ isActive ? 'Cancelar' : 'Agrega una Cita'}</Text>
                </TouchableHighlight>
            </View>        
          </View>
        
          <View>
            
              { isActive ? (
                  <Form 
                    citas={citas}
                    setCitas={setCitas}
                    setIsActive={setIsActive}
                    almacenaCitas={almacenaCitas}
                  />
              ): (
                <View style={ {paddingBottom: height * 0.2}}>

                  <Text style={ [styles.textNoCita, { marginTop: citas.length > 0 ? 0 : 10}] }>{citas.length <= 0 ? 'Aun no hay citas' : null}</Text>
                  <FlatList
                    data={citas}
                    renderItem={ ({item}) => <List cita={item} delteItem={delteItem}  /> }
                    keyExtractor={cita => cita.id}
                  />
                </View>
              )}
            
            </View>
      </SafeAreaView>
    </>
  );
}


// crear variables para los estilos
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#aa076b'
  },
  Scontainer:{
    paddingTop: 55,
  },
  text:{
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  },
  infoContainer: {
    flex: 1,
    paddingVertical: 20
  },
  textNoCita: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }

})

export default App;


/*
  <View>
              { isActive ? (
                <Form />
              ): (
                <View>
                  { citas.map( (cita) => {
                    return (
                      <List  
                        cita={ cita }
                        key={ cita.id }
                      />
                    )
                  })}
                </View>
              )}
            </View>


            
    { id: 1, paciente: 'Tony 0', propietario: 'User 1', sintomas: 'Le duele la panza' },
    { id: 2, paciente: 'Tony 1', propietario: 'User 2', sintomas: 'Le duele la panza' },
    { id: 3, paciente: 'Tony 2', propietario: 'User 3', sintomas: 'Le duele la panza' },
    { id: 4, paciente: 'Tony 3', propietario: 'User 4', sintomas: 'Le duele la panza' },
    { id: 5, paciente: 'Tony 4', propietario: 'User 5', sintomas: 'Le duele la panza' }
*/