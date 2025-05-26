import StyleSheet from 'react-native';


const styles = ({
    container: {
      flex: 1,
      backgroundColor: '#FCF9F2',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titulo:{
      //flex: 3,
      fontFamily: 'Inter',
      fontSize: 24,
      margin: 50,
      fontWeight: 'bold'
    },
    fotoPerfil:{
      flex: 1,
      justifyContent: 'center',
      width: '140px',
      height: '140px',
      flexDirection: 'row'
    },
    user:{
      flexDirection: 'row',
     
  
    },
    nombre:{
      fontFamily: 'Inter',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: '20px',
      margin: '5px'
    },
    edad:{
      fontFamily: 'Inter',
      fontSize: 18,
      //opacity: '0.6',
      margin: '5px'
  
    },
    barrio:{
      flexDirection: 'row',
    },
    subtitulo:{
      fontFamily: 'Inter',
      fontSize: 20,
      margin: 50,
      fontWeight: 'bold',
      textAlign: 'left'
    },
    tagVerde: {
      backgroundColor: '#E7E6DC',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 15,
      marginRight: 8,
      marginBottom: 8,
    },
    textDiagnostico: {
      fontSize: 14,
      color: '#4C5B33',
      fontFamily: 'Inter',
      fontWeight: 'bold'
    },
    tagRojo: {
      backgroundColor: '#E0CAC7',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 15,
      marginRight: 8,
      marginBottom: 8,
    },
    textIntolerancia: {
      fontSize: 14,
      color: '#5E0B00',
      fontFamily: 'Inter',
      fontWeight: 'bold'
    },
    tagContainer:{
      flexDirection: 'row'
    }
})

export default styles