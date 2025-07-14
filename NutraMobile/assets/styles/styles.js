import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  // GENERAL
  container: {
    flex: 1,
    backgroundColor: '#FCF9F2',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },


  // BOTÓN ATRÁS
  botonAtras: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },


  // ENCABEZADO CON TÍTULO
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
  },


  tituloProducto: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    fontFamily: 'Inter',
  },


  // IMAGEN DE PRODUCTO
  imagenProducto: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
  },


  // DESCRIPCIÓN DEL PRODUCTO
  descripcion: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },


  precio: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2ecc71',
  },


  botonAñadir: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#2ecc71',
    borderRadius: 5,
    alignItems: 'center',
  },


  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },


  // TARJETA DE PRODUCTO
  cardProducto: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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


  // PERFIL USUARIO
  fotoPerfil: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginLeft: 15,
  },


  user: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },


  nombre: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },


  edad: {
    fontFamily: 'Inter',
    fontSize: 16,
    opacity: 0.6,
    marginVertical: 5,
  },


  barrio: {
    flexDirection: 'row',
  },


  // CATEGORÍAS Y TAGS
  categoria: {
    paddingHorizontal: 20,
  },


  subtitulo: {
    fontFamily: 'Inter',
    fontSize: 16,
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
    fontSize: 12,
    color: '#4C5B33',
    fontFamily: 'Inter',
    fontWeight: 'bold',
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
    fontSize: 12,
    color: '#5E0B00',
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },


  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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


  fotoBotones: {
    width: 300,
  },


  // TARJETA DETALLE
  tarjeta: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  precio: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#1F1F1F',
},
imagenProductoGrande: {
  width: "100%",
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
},
});


export default styles;


   

