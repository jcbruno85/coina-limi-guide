# Coina Escapes

Actúa como un desarrollador Frontend Senior experto en React (Vite), Tailwind CSS y Progressive Web Apps (PWAs). Quiero que crees el Producto Mínimo Viable (MVP) de una Web App Turística para el pueblo de Coina (La Libertad, Perú), diseñada bajo un modelo de negocio de ecoturismo y comercio de lima dulce. 

La aplicación debe ser responsiva (optimizada para móviles), funcionar completamente en entornos con baja o nula conectividad (Modo Offline) y contar con un asistente virtual interactivo llamado "Limi".

## 1. ESPECIFICACIONES TÉCNICAS Y DE ARQUITECTURA

- **Framework:** React con Vite y TypeScript (o Tailwind HTML/JS nativo si es para prototipo simple).

- **Estilos:** Tailwind CSS para un diseño limpio, moderno y rústico-andino.

- **Navegación:** Single Page Application (SPA) estructurada en una barra de pestañas (Tabs Navigation) inferior persistente para móviles.

- **Iconos:** Lucide-React.

- **Capacidad Offline (PWA):**

  - Implementar Service Workers para almacenar en caché las pantallas, rutas turísticas, leyendas y menús.

  - Diseñar un indicador visual en la cabecera ("Modo Sin Conexión" / "Modo Online") basado en el estado `navigator.onLine`.

  - Crear una cola de sincronización en localStorage o IndexedDB para guardar reservas y compras hechas offline, procesándolas cuando retorne la conexión.

## 2. SISTEMA DE DISEÑO VISUAL

- **Paleta de Colores:**

  - Primario (Verde Limón): `#4CAF50` (Éxito, botones principales CTA, badges de disponibilidad).

  - Secundario (Amarillo Cítrico): `#FDD835` (Acentos de sol/clima, estrellas de valoración, eventos).

  - Acento (Azul Cielo): `#1565C0` (Atractivos naturales de agua/cielo, transporte, salud).

  - Fondo: `#FAFAFA` (Limpio) y `#F5F5DC` (Detalles rústicos cálidos).

- **Tipografía:** Montserrat (títulos) e Inter / Open Sans (cuerpos).

## 3. SECCIONES DE NAVEGACIÓN (TABS)

Crea una interfaz SPA fluida con las siguientes 6 pestañas funcionales:

1. **Home (Inicio):** 

   - Banner de bienvenida hero: "¡Respira de nuevo en el Paraíso del Alto Chicama!".

   - Tarjeta interactiva de clima en tiempo real destacando sus beneficios para la salud respiratoria (clima seco y soleado a 1942 msnm).

   - "Manual del Viajero": Tarjetas informativas de cómo llegar desde Trujillo u Otuzco (mencionando empresas como Latino Express, Huaca Express o la combi del Sr. José Ponce los lunes, miércoles y viernes a las 11:00 AM) y sugerencia de vestir en capas.

2. **Explora (Rutas):**

   - Mapa interactivo simulado (SVG o Leaflet interactivo) con pines de puntos de interés: "Machu Picchu Coinino", "El Mirador de Coina", "Río Alto Chicama (Río Grande)" y centros campestres como "Luna Park", "La Casa Blanca" y "La Hostería".

   - Al hacer clic en un pin, abrir un modal con descripción, dificultad (baja-media) y accesibilidad.

3. **Servicios (Directorio):**

   - Sub-pestañas: [🛌 Dormir] | [🍲 Comer] | [🚌 Viajar].

   - Alojamientos destacados: "Hospedaje La Huaca" (S/ 45.00/noche) y "Hotel Rossy". Incluye un botón interactivo "Reservar Ahora" que abre un formulario.

   - Restaurantes: "Recreo Doña Mili" (Cuy frito, chancho crocante) y "Pizzería Delicia".

4. **Mercado (Tienda de Lima Dulce):**

   - Catálogo interactivo de mermelada de lima dulce (S/ 10.00), cajas de limas frescas (S/ 25.00) y vino artesanal (S/ 28.00).

   - Carrito de compras funcional que permita sumar/restar productos y simular el pago con código QR de Yape/Plin o tarjeta de crédito.

5. **Cultura y Leyendas:**

   - Sección de lectura inmersiva con acordeones interactivos para las leyendas locales: "Las Aves de la Fundición", "La Laguna Encantadora de Inea" y la curiosa historia del tallado de "San Miguel Arcángel y el diablo con cola de trapo".

6. **Limi (Asistente Virtual):**

   - Pantalla de chat con el avatar de "Limi" (una simpática lima con mochila).

   - Debe simular respuestas automáticas rápidas y contar con botones de preguntas frecuentes prefijadas (ej: "Sugerir itinerario de 1 día", "¿Cómo llego desde Otuzco?", "¿Por qué Coina es saludable?").

   - **Lógica Offline en el Chat:** Si el sistema detecta que está offline, Limi debe responder con datos pre-cargados localmente usando un buscador por palabras clave, desactivar la API externa y activar un botón simulado de "Escuchar Audio-Guía" usando el sintetizador de voz nativo de la API de Web Speech del celular.

## 4. MODELOS DE DATOS MOCK (JSON)

Carga datos iniciales en el frontend simulando respuestas de API para:

- Atractivos Turísticos (con id, nombre, sector, altitud, descripción, coordenadas).

- Hospedajes (con id, nombre, precio, amenidades, contacto de WhatsApp directo).

- Productos (con id, nombre, productor, precio, beneficios de salud de la lima dulce).

Por favor, genera un código modular, limpio, completamente estructurado y visualmente espectacular. Prioriza los estados de transición agradables para el usuario (loadings, estados activos de botones y transiciones suaves de pestañas).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/46857cc0-aa17-4e27-bfba-15224afb59fa).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
