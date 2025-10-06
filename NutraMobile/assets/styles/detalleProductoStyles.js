import { StyleSheet } from 'react-native';

const detalleProductoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5EF', // fondo gris muy claro
  },

  botonAtras: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 2,
    backgroundColor: '#ffffffaa',
    padding: 8,
    borderRadius: 10,
  },

  imagenProducto: {
    width: '100%',
    height: 320,
    resizeMode: 'cover',
  },

  // Tarjeta blanca inferior
  tarjetaInfo: {
    backgroundColor: '#FCF9F2',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,        // superponer a la imagen
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },

  // Encabezado: nombre y precio
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },

  precio: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  // Sección detalles con iconos
  detallesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  detalleItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  detalleTexto: {
    fontSize: 14,
    color: '#444',
    marginLeft: 6,
  },

  // Descripción
  descripcionTitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
  },

  descripcionTexto: {
    fontSize: 14,
    color: '#6b6b6b',
    lineHeight: 20,
  },

  // Botón inferior
  botonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: '#5A6B3C',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
  },

  precioBoton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  botonTexto: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },

  iconoCarrito: {
    marginHorizontal: 10,
  },
});

export default detalleProductoStyles;
