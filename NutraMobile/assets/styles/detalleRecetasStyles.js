import { StyleSheet } from "react-native";

const detalleRecetaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9EDE5', // fondo beige rosado
  },

  contenedorDetalle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  detalleTexto: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#4A4A4A',
  },

  imagenProducto: {
    width: 200,
    height: 200,
    borderRadius: 100,       // círculo
    alignSelf: 'center',
    marginTop: -30,          // sube la imagen para que invada el semicírculo
    borderWidth: 4,
    borderColor: '#fff',
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
  },

  descripcionTitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 25,
    marginTop: 20,
    marginBottom: 8,
    color: '#4A4A4A',
  },

  descripcionTexto: {
    fontSize: 14,
    color: '#7D7D7D',
    marginHorizontal: 25,
    textAlign: 'center',
    lineHeight: 20,
  },

  vitaminasContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },

  vitaminaChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },

  vitaminaTexto: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4A4A4A',
  },

  ingredientesTitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 25,
    marginVertical: 10,
    color: '#4A4A4A',
  },

  ingredientesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    marginBottom: 20,
  },

  ingredienteCard: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },

  ingredienteImg: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },

  botonContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },

  botonPreparar: {
    width: '70%',
    backgroundColor: '#D8BFB4',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },

  botonTexto: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default detalleRecetaStyles;
