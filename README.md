# E-Commerce Inventory Management System

Este es un sistema de E-Commerce desarrollado con **React** y **Vite** que permite a los usuarios gestionar inventarios de productos de manera eficiente. La aplicación ofrece una interfaz intuitiva para agregar, actualizar, y organizar productos dentro de categorías que se generan dinámicamente. Además, el sistema presenta productos aleatoriamente en la página principal, creando una experiencia atractiva y fácil de navegar.

## Características Principales

- **Gestión de Inventarios**: Permite rastrear la disponibilidad de productos y actualizar los niveles de stock. Los productos pueden ser creados y asignados a categorías, lo que facilita su organización.
  
- **Gestión Automática de Categorías**: Las categorías se crean automáticamente al agregar productos, y cada categoría se añade dinámicamente al menú de navegación. Esto permite una gestión flexible y sin complicaciones.

- **Asignación Dinámica de Productos**: Los productos se organizan automáticamente bajo sus respectivas categorías al momento de ser creados. Además, la página de inicio muestra productos de manera aleatoria desde diferentes categorías, mejorando la visibilidad de los productos.

- **Carrito de Compras**: Los usuarios pueden agregar y eliminar productos del carrito de manera sencilla, permitiendo gestionar su selección antes de la compra.

- **Páginas de Categorías de Productos**: Diferentes páginas están dedicadas a categorías como Deportes, Herramientas, Hogar, y Tecnología, lo que permite a los usuarios navegar fácilmente por los productos disponibles.

## Estructura del Proyecto

El proyecto sigue una estructura organizada y modular para facilitar la escalabilidad y mantenimiento del código. Los componentes clave del sistema están distribuidos de la siguiente manera:

```plaintext
📁 src
   ├── 📁 assets         # Archivos estáticos como imágenes, íconos, y otros recursos multimedia.
   ├── 📁 components     # Componentes reutilizables de React (botones, formularios, menús, etc.).
   ├── 📁 context        # Context API de React para la gestión global del estado de la aplicación.
   ├── 📁 pages          # Páginas principales de la aplicación como las páginas de categorías, carrito, y detalles del producto.
   ├── 📁 styles         # Archivos de estilo (CSS/SASS) globales y específicos por componente.
   ├── 📁 utils          # Funciones y utilidades compartidas como formateadores y funciones auxiliares.
   ├── App.jsx           # Componente principal que gestiona la estructura y navegación de la aplicación.
   └── main.jsx          # Punto de entrada de la aplicación, donde se monta el componente principal en el DOM.
```

## Tecnologías Utilizadas

El sistema se basa en un conjunto de tecnologías modernas que permiten el desarrollo rápido y eficiente de aplicaciones web.

- **React**: Biblioteca de JavaScript para la construcción de interfaces de usuario basadas en componentes.
- **Vite**: Herramienta de construcción rápida que ofrece una excelente experiencia de desarrollo con recarga en caliente (HMR).
- **React Router**: Manejo de rutas para navegar entre las distintas páginas de la aplicación.
- **Context API**: Gestión global del estado de la aplicación, permitiendo compartir datos entre componentes sin necesidad de pasar props manualmente.
- **JavaScript (ES6+)**: Usado para la lógica y la manipulación de datos dentro de los componentes.
- **CSS/SASS**: Para la gestión de estilos y diseño de la interfaz de usuario.

## Funcionalidades Detalladas

### 1. **Página Principal**

La página principal muestra un conjunto de productos tomados de forma aleatoria de las diferentes categorías creadas. Esto asegura que los usuarios siempre ven productos variados cada vez que visitan el sitio.

### 2. **Creación Automática de Categorías**

Cuando se añade un nuevo producto con una categoría que aún no existe, el sistema automáticamente crea la nueva categoría y la añade al menú de navegación. De esta forma, el proceso de gestión de inventario es dinámico y sin fricciones.

### 3. **Asignación Dinámica de Productos**

Los productos se asignan automáticamente a las categorías correspondientes al ser creados. Cada vez que se visualiza una categoría, los productos relacionados se listan de manera organizada.

### 4. **Menú Dinámico**

El menú de navegación se actualiza automáticamente cada vez que se añade una nueva categoría, permitiendo a los usuarios acceder a las nuevas categorías y productos de manera instantánea.

### 5. **Carrito de Compras**

Los usuarios pueden gestionar su selección de productos fácilmente desde el carrito de compras. Se pueden agregar y eliminar productos antes de proceder a la compra, lo que proporciona una experiencia completa de e-commerce.

### 6. **Páginas de Categorías**

Cada categoría tiene su propia página dedicada, con una lista completa de los productos asignados a esa categoría. Esto permite una navegación más específica según las necesidades de los usuarios, con categorías como Deportes, Tecnología, Hogar, y Herramientas.

## Instalación y Ejecución

Sigue estos pasos para poner en marcha el proyecto en tu entorno local:

1. **Clonar el Repositorio**:

   ```bash
   git clone https://gitlab.com/McKitsune/eCommerce.git

2. **Instalar Dependencias**:

bash
Copiar código
npm install
Iniciar el Servidor de Desarrollo:

bash
Copiar código
npm run dev
Abre tu navegador y ve a http://localhost:3000 para ver la aplicación en funcionamiento.

##Contribuciones
Este proyecto está abierto a contribuciones. Si deseas colaborar, por favor sigue los siguientes pasos:

Fork del Repositorio.
Crea una rama con la nueva funcionalidad o corrección: git checkout -b nueva-funcionalidad.
Haz los cambios y confirma los commits: git commit -m "Agrega nueva funcionalidad".
Sube los cambios: git push origin nueva-funcionalidad.
<<<<<<< HEAD
Abre un Pull Request para revisar los cambios.
=======
Abre un Pull Request para revisar los cambios.
>>>>>>> 58e15c839048065d2f34ea5ee51cf76e97331307
