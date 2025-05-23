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
    }
})

export default styles