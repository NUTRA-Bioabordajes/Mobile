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
  },
  contenedorProductos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  cardProducto: {
    width:'48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // para Android
  },
  imagenProducto: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  nombreProducto: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    fontFamily: 'Inter',
  },
  marcaProducto: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'Inter',
  },
  precioProducto: {
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'Inter',
  },
  favBtnProducto: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

});

export default styles;
