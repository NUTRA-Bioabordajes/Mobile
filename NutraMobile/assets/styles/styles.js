import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF9F2',
    alignItems: 'center',
    paddingHorizontal: 20, 
    paddingTop: 40,
  },
  titulo: {
    fontFamily: 'Inter',
    fontSize: 22, // 24 - 2
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 15,
    alignSelf: 'center'
  },
  fotoPerfil: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginLeft: 15
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  nombre: {
    fontFamily: 'Inter',
    fontSize: 18, // 20 - 2
    fontWeight: 'bold',
    marginBottom: 4,
  },
  edad: {
    fontFamily: 'Inter',
    fontSize: 16, // 18 - 2
    opacity: '0.6',
    margin: '5px'
  },
  barrio: {
    flexDirection: 'row',
  },
  categoria: {
    paddingHorizontal: 20, 
  },
  subtitulo: {
    fontFamily: 'Inter',
    fontSize: 16, // 18 - 2
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  tagVerde: {
    backgroundColor: '#E7E6DC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  textDiagnostico: {
    fontSize: 12, // 14 - 2
    color: '#4C5B33',
    fontFamily: 'Inter',
    fontWeight: 'bold'
  },
  tagRojo: {
    backgroundColor: '#E0CAC7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  textIntolerancia: {
    fontSize: 12, // 14 - 2
    color: '#5E0B00',
    fontFamily: 'Inter',
    fontWeight: 'bold'
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  fichaMedica: {
    alignSelf: 'flex-start',
    width: '100%',
    marginTop: 10,
  }
});

export default styles;
