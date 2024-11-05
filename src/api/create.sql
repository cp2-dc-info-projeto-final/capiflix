CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT 0 
);

CREATE TABLE IF NOT EXISTS genero (
    id_genero INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL  
);

CREATE TABLE IF NOT EXISTS filme (
    id_filme INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT,
    ano INTEGER,
    id_genero INTEGER  ,
    classificacao INTEGER,
    FOREIGN KEY(id_genero) REFERENCES genero(id_genero)
);

CREATE TABLE IF NOT EXISTS favorito (
    id_usuario usuario,
    id_filme filme
);