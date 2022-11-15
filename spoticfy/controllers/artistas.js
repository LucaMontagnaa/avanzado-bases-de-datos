const conn = require("../db");

const getArtistas = (_, res) => {
    // Completar con la consulta que devuelve todos los artistas
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            ...
        ]
    */
   const myInstruction = "SELECT * FROM artistas"; 
   conn.query(myInstruction, (err, rows) => {
    if (err) {
        console.error("Error consultando: " + err);
    }
    res.json(rows);
    });
};

const getArtista = (req, res) => {
    // Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */
        let id = req.params.id;
        const myInstruction = "SELECT * FROM artistas WHERE artistas.id = ?"; 
        conn.query(myInstruction, [id], (err, rows) => {
                if (err) {
                    console.error("Error consultando: " + err);
                    return;
                }
            
                res.json(rows[0]);
        });
};

const createArtista = (req, res) => {
    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */
 
    let nombre = req.body.nombre;
    const myInstruction = "INSERT INTO artistas (nombre) VALUES (?)";
    conn.query(myInstruction, [nombre], err => {
        if (err) {
            console.error("Error consultando: " + err);
            return;
        }

        res.sendStatus(200);
    });
};

const updateArtista = (req, res) => {
    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */
    let {id} = req.params.id;
    let {nombre, artista} = req.body;
    const myInstruction = "UPDATE artistas SET nombre = ?";

    conn.query(myInstruction, [nombre], err => {
        if (err) {
            console.error("Error consultando: " + err);
            return;
        }

        res.sendStatus(200);
    });
};

const deleteArtista = (req, res) => {
    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    let id = req.params.id;
    const myInstruction = 'DELETE FROM artistas WHERE id = ?';
    conn.query(myInstruction, [id], err => { 
        if (err) {
            console.error("Error consultando: " + err);
            return;
        }

        res.sendStatus(200);
    });
};

const getAlbumesByArtista = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista 
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getAlbumes

    let id = req.params.id;
    const myInstruction = 'SELECT * FROM albumes JOIN artistas ON artistas.id = ?';
    conn.query(myInstruction, [id], (err, rows) => { 
        if (err) {
            console.error("Error consultando: " + err);
            return;
        }
    
        res.json(rows);
    });
};

const getCancionesByArtista = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
    
    let id = req.params.id;
    const myInstruction = 'SELECT * FROM canciones JOIN artistas ON artistas.id = ?';
    conn.query(myInstruction, [id], (err, rows) => { 
        if (err) {
            console.error("Error consultando: " + err);
            return;
        }
    
        res.json(rows);
    });
};

module.exports = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};
