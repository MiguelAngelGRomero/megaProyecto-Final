Use Hub;

GO

CREATE TABLE Contenidos (
    Id INT PRIMARY KEY,
    Tipo NVARCHAR(50),
    Titulo NVARCHAR(255),
    Imagen NVARCHAR(255)
);
GO


INSERT INTO Contenidos (Id, Tipo, Titulo, Imagen) VALUES
(1, 'Serie', 'Cyberpunk: Edgerunners', '/img/images.jpeg'),
(2, 'Serie', 'Stranger Things', '/img/Stranger.png'),
(3, 'Serie', 'Breaking Bad', '/img/brakinBad.jpeg'),
(4, 'Serie', 'La casa de papel', '/img/laCasa.jpeg'),
(5, 'Serie', 'El juego del calamar', '/img/juegos.jpg'),
(6, 'Serie', 'Dark', '/img/dark.jpg'),
(7, 'Serie', 'Narcos', '/img/narcos.jpeg'),
(8, 'Serie', 'El marginal', '/img/elMarginal.jpg'),
(9, 'Serie', 'The Witcher', '/img/theWitcher.jpeg'),
(10, 'Pel�cula', 'Mi vecino Totoro', '/img/miVecino.jpg'),
(11, 'Pel�cula', 'El viaje de Chihiro', '/img/elViaje.jpeg'),
(12, 'Serie', 'Titanes', '/img/titanes.jpg'),
(13, 'Serie', 'One Piece', '/img/onePiece.jpg'),
(14, 'Serie', 'Ataque de los titanes', '/img/atack.jpeg'),
(15, 'Pel�cula', 'El caballero oscuro', '/img/batman.jpg'),
(16, 'Pel�cula', 'Avengers: Endgame', '/img/avengersEnd.jpeg'),
(17, 'Pel�cula', 'Forrest Gump', '/img/forest.jpeg'),
(18, 'Pel�cula', 'Par�sitos', '/img/parsitos.jpeg'),
(19, 'Pel�cula', 'Interstellar', '/img/inter.jpeg'),
(20, 'Pel�cula', 'Amor y monstruos', '/img/amorYmons.jpg');
GO

CREATE TABLE Usuarios (
    Id INT PRIMARY KEY,
    Correo NVARCHAR(50),
    Contra NVARCHAR(50)
);
GO

INSERT INTO Usuarios (Id, Correo, Contra) VALUES
(1, 'admin@gmail.com', '123456')
Go