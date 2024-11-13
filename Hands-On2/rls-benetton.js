const readline = require('readline');

class RegresionLineal {
  constructor(publicidad, ventas) {
    this.publicidad = publicidad;
    this.ventas = ventas;
    this.pendiente = 0;
    this.interseccion = 0;
    this.calcularRegresion();
  }

  // Metodo para calcular la regresion lineal con las fórmulas explícitas de suma
calcularRegresion() {
    // acc es el acumulador de valores
    const n = this.publicidad.length; // Tamanio del arreglo
    const sumX = this.publicidad.reduce((acc, x) => acc + x, 0); // Suma valores x (publicidad)
    const sumY = this.ventas.reduce((acc, y) => acc + y, 0); // Suma valores y (ventas)
    const sumXY = this.publicidad.reduce((acc, x, i) => acc + x * this.ventas[i], 0); // Resultado suma multiplicacion x1 * y1 x2 * y2 ....
    const sumX2 = this.publicidad.reduce((acc, x) => acc + x ** 2, 0); // Suma de  los valores de x al cuadrado

    // Calculo de la pendiente (beta1)
    this.pendiente = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);

    // Calculo de la interseccion (beta0)
    this.interseccion = (sumY * sumX2 - sumX * sumXY) / (n * sumX2 - sumX ** 2);
  }

  // Metodo para mostrar la ecuacion de la regresion lineal
  obtenerEcuacion() {
    // Ventas = pendiente * publicidad + interseccion
    //pendiente = 2, interseccion = 0
    return `ventas = ${this.pendiente.toFixed(2)} * publicidad + ${this.interseccion.toFixed(2)}`;
  }

  // Metodo para predecir ventas en funcion del gasto en publicidad
  predecirVentas(gastoPublicidad) {
    return this.pendiente * gastoPublicidad + this.interseccion;
  }
}

// Datos benetton
//const publicidad = [23, 26, 30, 34, 43, 48, 52, 57, 58,]; //x
const publicidad = [1,2,3,4,5,6,7,8,9,];
//const ventas = [651, 762, 856, 1063, 1190, 1298, 1421, 1440, 1518,]; //y
const ventas = [2,4,6,8,10,12,14,16,18,];

// Crear una instancia de la clase RegresionLineal
const modelo = new RegresionLineal(publicidad, ventas);

// Mostrar la ecuacion de la regresion lineal
console.log('\n');
console.log(`La ecuación de la regresión lineal es: ${modelo.obtenerEcuacion()}`);

// Se configuro el readline para leer el gasto en publicidad del usuario
const obtenerGastoPublicidad = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n');
obtenerGastoPublicidad.question('Ingrese el gasto en publicidad (en millones de Euros): ', (input) => {
  const gastoPublicidad = parseFloat(input);

  if (!isNaN(gastoPublicidad)) {
    const ventasEstimadas = modelo.predecirVentas(gastoPublicidad);
    console.log('=================================================================================================================================================');
    console.log(`Si el gasto en publicidad es de ${gastoPublicidad} millones de Euros, se espera que las ventas sean de aproximadamente ${ventasEstimadas.toFixed(2)} millones de Euros.`); // Reduce a 2 decimales
    console.log('=================================================================================================================================================');

  } else {
    console.log('Ingresa un número válido.');
  }

  obtenerGastoPublicidad.close();
});
