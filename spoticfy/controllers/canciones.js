const conn = require("../db");

const getCanciones = (_, res) => {
    // Completar con la consulta que devuelve todas las canciones
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            ...
        ]
    */
   const myInstruction = "SELECT * FROM canciones";
   conn.query(myInstruction, (err, rows) => {
    if (err) {
        // console.error("Error consultando: " + err);
    }
    res.json(rows);
});
};

const getCancion = (req, res) => {
    // Completar con la consulta que devuelve una canción
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id de la canción",
            "nombre": "Nombre de la canción",
            "nombre_artista": "Id del artista",
            "nombre_album": "Id del album",
            "duracion": "Duración de la canción",
            "reproducciones": "Reproducciones de la canción"
        }
    */
        let id = req.params.id;
        const myInstruction = "SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones FROM albumes JOIN artistas JOIN canciones WHERE albumes.id = ?";
        conn.query(myInstruction, [id], (err, rows) => {
                if (err) {
                    console.error("Error consultando: " + err);
                    return;
                }
                res.json(rows[0]);
        });
};

const createCancion = (req, res) => {
    // Completar con la consulta que crea una canción
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones se inicializa en 0)
    const {nombre, album, duracion} = req.body;
    const query = "INSERT INTO canciones (nombre,album,duracion) VALUES (?,?,?)";

    conn.query(query,[nombre, album, duracion],(err, rows) =>{
        if (err) {
            console.error("Error consultando: " + err);
            return;
        }
        res.sendStatus(200);
    });
};

const updateCancion = (req, res) => {
    // Completar con la consulta que actualiza una canción
    // Recordar que los parámetros de una consulta PUT se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones no se puede modificar con esta consulta)

    const id = req.params.id;
    const {nombre, album, duracion} = req.body;
    const query = "UPDATE canciones SET nombre=?, album=?, duracion=? WHERE id=?";

    conn.query(query,[nombre, album, duracion, id],(err, rows) =>{
        if (err) {
            console.error("Error consultando: " + err);
            return;
        }
        res.sendStatus(200);
    });
};

const deleteCancion = (req, res) => {
    // Completar con la consulta que elimina una canción
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    const id = req.params.id;
    const query = "DELETE FROM canciones WHERE id=?";

    conn.query(query,[id],(err, rows) =>{
        if (err) {
            console.error("Error consultando: " + err);
            return;
        }
        res.sendStatus(200);
    });
};

const reproducirCancion = (req, res) => {
    // Completar con la consulta que aumenta las reproducciones de una canción
    // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params
    const id = req.params.id;
    const query = "UPDATE canciones SET reproducciones= reproducciones + 1 WHERE id=?";

    conn.query(query,[id],(err, rows) =>{
        if (err) {
            console.error("Error consultando: " + err);
            return;
        }
        res.sendStatus(200);
    });
};

module.exports = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};
