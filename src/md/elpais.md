# Problemas con Grid y Sticky

El planteamiento de la página es relativamente sencillo: Un Header con una imagen de fondo tras un Gradient, lo que sigue es la barra Nav para llevar el menú, luego la parte central de la página en Main que contiene un Section para los textos. A su lado va un Aside, para presentar los últimos  artículos y algunas herramientas, y finalmente el footer al final. Es esqueleto es el siguiente:

```html
<body>
	<header></header>
	<nav></nav>
	<main>
		<article></article>
	</main>  
	<aside></aside>
	<footer></footer>
</body>
```

Lo que hice fue instalar el Grid dentro del Body de la siguiente manera:

```css
body {
	display: grid;
	grid-template-rows: 1fr 1fr 5fr 1fr; (!)
	grid-template-columns: 4fr 1fr;
	grid-template-areas: "header header"
                     	 "nav nav"
					 	 "main aside"
					 	 "footer footer";
	height: 100vh; (!)
}
```
El problema se presentó cuando definí el Nav como elemento Sticky con "top: 0". Este Nav se mantenía adherido a la posición nombrada pero en un momento "se lo llevaba" la página en la medida que avanzaba verticalmente.  

Lo que pensé fue: "Tendré que sacar el Grid del Body y meterlo en el Main, antes de eso meter en un Section o Article lo que se encuentra ahora en la página definido en Body respecto del Grid."

Bueno, por suerte no tendré que hacer nada de esto. Lo que tuve que hacer fue definir los rows de otra manera y eliminar el height de 100vh:

```css
body {
	display: grid;
	grid-template-rows: auto auto 1fr auto; (!)
	grid-template-columns: 4fr 1fr;
	grid-template-areas: "header header"
                     	 "nav nav"
					 	 "main aside"
					 	 "footer footer";
}
```

Ahora funciona perfectamente, la barra del menú se mantiene en "top: 0" hasta llegar al footer de la página. Aparentemente, la definición de las rows del Grid con las medidas "fr" producen un efecto que aún no comprendo del todo, y todo se obscurece más con la definición de "100vh". Si tengo una página de un largo de, por ejemplo, 3000 pixel y no aplico 100vh, la página se estira en cada una sus secciones hasta cumplir con las proporciones definidas con "fr". Si aplico los "100vh", todo vuelve temporalmente a la normalidad, con excepción de la barra de navegación que se desprende precisamente en el momento, en que la línea de los primeros 100vh es cruzada. ¿A qué se debe esto? No lo sé con precisión, debo verlo con más tranquilidad y hacer unos tests aparte además. Sin duda alguna tiene que ver también con la definición del Grid dentro del Body de la página.


# Nadie quería conquistar el grial, eso es cosa de Spielberg

EL PERIODISTA LLEGA como Belinant de las Islas, caballero al servicio de
Galahot, defensor del puente de Norgales, prisionero de Galván y miembro de la
redonda mesnada de Arturo, a casa de la hermosa y enigmática Dama del Grial, que
le recibe cortésmente. Es imposible no entrar en el universo caballeresco, en un
sueño de magia, espada y armadura, cuando visitas a Victoria Cirlot (Barcelona,
1955), catedrática de Filología Románica en la Universidad Pompeu Fabra y gran
especialista en literatura artúrica. Cirlot acaba de publicar Luces del grial
(Alpha Decay), su última aproximación, de momento, a las leyendas medievales en
torno al mítico objeto que han perseguido desde Perceval y Galaad hasta Indiana
Jones, pasando por Dan Brown y el recordado Peter Berling. Muy amablemente, la
estudiosa, hija del poeta, crítico de arte y compositor Juan Eduardo Cirlot
(Barcelona, 1916-1973), que fuera una de las mentes más refinadas de su tiempo,
conduce hacia el salón, donde la mirada del visitante, tras conseguir apenas
despegarse del rostro de la anfitriona, en el que brillan engastados unos iris
de un hechizador azul turquesa, se clava en la espada de hierro que pende en la
pared. Viene a la cabeza irremediablemente el famoso retrato de Juan Eduardo
Cirlot bajo las siete hojas que le hizo Francesc Català-Roca en 1954 y a la vez
aquellos versos de su poema Bronwyn “Yo busco una flor de cristal inaccesible /
dámela con tus ojos desde el lago / donde blanca apareces”. “No es una de
aquellas de mi padre, la espada”, dice Victoria Cirlot sacando al visitante del
ensimismamiento. “Aquellas eran del siglo XVI, de lazo; se las vendió para
comprar otras medievales”. Medieval es esta de la pared, que se yergue colgada
vertical como si la levantara la mano feérica de la Dama del Lago. La escritora,
que pasa los dedos sobre la hoja revelando un anillo verde de jade, muestra
otras sobre un escritorio, y dos hachas carolingias y unos bellos pomos. ¡Menudo
torneo se podría montar aquí! Una de las espadas está rota y remite precisamente
al último capítulo de Luces del grial, en el que Victoria Cirlot analiza ese
poderoso simbolismo de la espada partida.

```html
<body>
	<h1>Primer título</h1>
	<p>Un párrafo simple.</p>
</body>
```

Hay otras luces que compiten con la del grial mismo. En el cortejo del grial hay
un conflicto de luces, la luz de los candelabros, que es la de la razón, y la
sobrenatural, la que procede del propio grial. Es una expresión del debate sobre
la manera en que conocemos: ¿por influencia divina o por la potencialidad del
intelecto? Es en esencia el conflicto entre Pedro Abelardo (la fe limitada por
principios racionales) y san Bernardo (la mística).

¡Nos responde! La novela artúrica no es solo literatura y evasión, es didáctica
y un arte de vivir. La queste del Saint Graal parte del ciclo conocido como el
Lancelot-Graal, una summa del universo artúrico; se ha leído como un manual de
vida cristiana, pero si se observa con atención, como hacen Foucault y
Sloterdijk, aparece como un ejercicio de cuidado de uno mismo, cura sui,
técnicas para afrontar la vida, antropotécnicas, un verdadero training de
transformación, procedimientos de ejercitación físicos y mentales para
enfrentarse a la vida y a la muerte. Esos ejercicios destinados a la superación
y la mejora se muestran en el tema del encuentro del caballero y el ermitaño. En
la figura del ermitaño, el caballero encuentra la ayuda necesaria para cuidar de
sí mismo y transformarse.
