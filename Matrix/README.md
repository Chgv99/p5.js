# Matrix

Matrix es un programa de [p5.js](https://p5js.org/es/) que muestra una rejilla de cubos a lo largo, ancho y profundo del espacio. Combina conocimientos previos vistos para [Processing](https://processing.org/) en la asignatura CIU.

<p align="center">
  Para visualizar la composición entra <a href="https://editor.p5js.org/christiangv99/full/XJFPKfNqI">aquí</a>.
</p>
<p align="center">
Christian García Viguera. <a href="https://www2.ulpgc.es/">Universidad de Las Palmas de Gran Canaria</a>.
</p>
<p align="center">
  <img src="https://i.imgur.com/4rkH7Jn.png">
</p>

# Índice
* [Desglose]()
* [Color]()
* [Técnicas para el rendimiento]()

# Desglose

Como se ha mencionado anteriormente, el programa está constituido por una serie de cubos repartidos por la escena. Estos se crean de la siguiente manera:
- Primero se crea una matriz bidimensional de cubos de tamaño *s*.
  - A cada cubo se le da una posición adecuada en relación al tamaño de la matriz *s* y el espaciado *sp*. Esto consigue que la matriz de cubos esté centrada, y que no tenga su esquina superior izquierda en el centro de la pantalla.
  - Además, se calcula la posición del cubo de la iteración actual módulo *s* para posicionarlos por filas.
```p5.js
function setup(){
  createCanvas(650,650,WEBGL)
  for(let i=0;i<s;i++){boxes[i]=[]
    for(let j=0;j<s;j++){
      boxes[i][j] = new Box(-(s/2)*sp+sp*(j%s)+sp/2,-(s/2)*sp+sp*(i%s)+sp/2,0,0)
    }
  }
  colorMode(HSL,360);
}
```
- A continuación, estos cubos se dibujan en la profundidad de la escena, repitiendo la matriz y llamando a la función *cube()*.
- A partir de ahora, el código se dedica a dar movimiento a la escena, comenzando por desplazar los cubos verticalmente hacia abajo 1.5 unidades por frame y rotarlos en X.
- El resto del movimiento solo consiste en una rotación en Z de todo lo anterior.

# Color

Para el color se ha utilizado la siguiente función:
```p5.js
waveColor(){
  this.h = map(sin(radians((sp*s/2)-this.y)/6),-1,1,0,360);
  this.b = map(abs(this.y),0,(s/2)*sp+sp/2,300,0);
}
```
Esta función tiñe de un color cada cubo dependiendo de su posición en la escena. En concreto, su altura, tomando como referencia la altura del punto más bajo de la matriz de cubos *(sp * s / 2)* a la cual se le restará la altura actual del cubo *this.y*. Esto, junto con un seno y el ajuste para colores HSL, dota a los cubos de un color distinto según la Y que vayan tomando, haciendo que a su vez tomen el mismo color siempre que pasen por delante de la cámara (en este caso un color rojo). Esto es así ya que me pareció curioso que el color fuese "siguiendo" a la cámara en lugar de ser un cambio de color aleatorio.

# Técnicas para el rendimiento

Pintar demasiados cubos resultaba una tarea difícil, por lo menos para la implementación aquí presentada. Al principio se podían ver los límites de la matriz de cubos debido a cómo se distribuyen los cubos en la escena. Hecho que quedaba bastante mal y por el cual se utilizaron las siguientes técnicas:
- Ya que la matriz bidimensional se copia a lo profundo, se puede llevar la cuenta de cuán lejos están estas filas de matrices. Aprovechando este hecho, se aplica a cada fila matricial una *brightness* en función de su posición. Esto se puede ver en el código presentado en la sección [color]().
