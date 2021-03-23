const express = require("express");
const app = express();

const notes = [
  {
    userId: 1,
    id: 1,
    title: " Cambie el titulo :D",
    body:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body:
      "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
];

// a create server se le pasa un callback
// que se ejecuta cada vez que le llega un request
// response tiene diferentes metodos para regresar la información
// const app = http.createServer((request, response) => {
// es el tipo de dato que regrasamos
// response.writeHead(200, { "Content-type": "application/json" });
// response.end(JSON.stringify(notes));
// });

// response tiene diferentes metodos para regresar la información
app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/notes", (request, response) => {
  // express al ser un framewrok nos deja siponible metodos
  // un metodo es .json que sabe que la json
  // no hay necesidad de aclararlo
  // response.writeHead(200, { "Content-type": "application/json" });
  // response.end(JSON.stringify(notes));
  // ya no hay necesidad colocarlo
  response.json(notes);
});

// el puerto que tiene que escuchar por defecto
// http por defecto siempre entra al puerto 80
// https por defecto entra al puerto 443 SSL
const PORT = 3001;

// como se inicia el servidor en express es asincrono
// se pasa un callback que se dispara cuando el servidor termina de levantarse
app.listen(PORT, () => {
  console.log(`Server is running now on port ${PORT}`);
});
