# Ecommerce backend
## Primer entrega 


Este proyecto es un ecommerce trabajado especialmente desde el backend

## Conceptos
- Utiliza api resful 
- motores de plantilla
- web Socket



Dependencias y librerias

```sh
npm init -y => Node.js
npm install -g nodemon => Nodemon 
npm install express => Express 
npm init -y && npm install express socket.io => Proyecto con node, express y sockets
npm install dotenv --save  => cargar las variables de entorno

```
## Framework
-  [Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/) is a powerful, feature-packed frontend toolkit. Build anything—from prototype to production—in minutes.

## Endpoints
- El router base '/api/productos'
- '/api/carrito'

## Funcionalidad
- public :  - js/main funcionalidad socket, render tabla de products hbs , funcion agregar item a la lista de productos
            - index.html , style para estilado y views para renderizar tabla con hbs
- src : index.js => server, express static, subrutas, socket
  

## Server 
- [Server ](http://localhost:8080) src/index.js
