const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

let personajes = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

//READ
app.get('/', (req, res) => {
    
    res.send(`
        <h1>Personajes de Street Fighter</h1>
        <h3><ul>${personajes.map(personaje => 
            `<li>Nombre: ${personaje.nombre} | Edad: ${personaje.edad} | Origen: ${personaje.lugarProcedencia} | Link a su página: <a href="/personajes/${personaje.id}">Click</a></li>`
        ).join('')}
        </ul>
        </h3>
        <form action="/personajes" method="post">
        <label for="nombre">Nombre: </label><br>
        <input type="text" id="nombre" name="nombre"><br>
        <label for="edad">Edad: </label><br>
        <input type="number" id="edad" name="edad"><br>
        <label for="origen">Origen: </label><br>
        <input type="text" id="origen" name="origen"><br>
        <button type="submit">Agrega otro personaje</button>
        </form>
        <a href="/personajes">Personajes JSON</a>
        `)
})

app.get('/personajes', (req, res) => {
    res.json(personajes)
})

app.get('/personajes/:id', (req, res) => {
    const indexPersonaje = parseInt(req.params.id);

    const personaje = personajes.find(p => p.id === indexPersonaje)
    if (personaje) {
        res.send(`
        <h1>Página de ${personaje.nombre}</h1>
        <ul>
            <li>Nombre: ${personaje.nombre} </li>
            <li>Edad: ${personaje.edad} </li>
            <li>Origen: ${personaje.lugarProcedencia} </li>
        </ul>
        <a href="/">Home</a>
        `)} else {
            res.send(`
                <h1>Página de personaje no encontrada!</h1>
                <a href="/">Home</a>
                `)
            }
})

//CREATE

app.post('/personajes', (req, res) => {

    if (!req.body.nombre || !req.body.edad || !req.body.origen) {
        res.send('Rellena todos los campos. <a href="/">Home</a>')
        
    }
    const nuevoPersonaje = {
        id: personajes.length +1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.origen
    };
    personajes.push(nuevoPersonaje);
    res.redirect('/');
})

//UPDATE (PUT)

app.put('/personajes/:id', (req, res) => {
    const indexPersonaje = parseInt(req.params.id)

    const personaje = personajes.find(p => p.id === indexPersonaje)

    if (personaje) {
        if (req.body.edad) personaje.edad = req.body.edad;
        if (req.body.origen) personaje.lugarProcedencia = req.body.origen;
        res.send('Personaje actualizado')
    } else {
        res.send('Personaje no encontrado')
    }
})

//DELETE

app.delete('/personajes/:id', (req, res) => {
    const indexURL = parseInt(req.params.id);
    personajes = personajes.filter(p => p.id !== indexURL);
    res.send(`<h3>Personaje eliminado</h3><a href="/">Home</a>`)

})

//ERROR 404
app.use((req, res) => {
    res.status(404).send(`<h2>Página no encontrada</h2><a href="/">Home</a>`)
})

//ABRIR SERVIDOR
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000')
});