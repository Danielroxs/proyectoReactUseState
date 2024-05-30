import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Ganador: " + winner;
  } else {
    status = "Siguiente Jugador: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Ir al movimiento #" + move;
    } else {
      description = "Ir al inicio del juego";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/* import { useState } from "react";

function Cuadro({ valor, alHacerClic }) {
  return (
    <button className="cuadro" onClick={alHacerClic}>
      {valor}
    </button>
  );
}

function Tablero({ xEsSiguiente, cuadros, alJugar }) {
  function manejarClic(i) {
    // Si el cuadro ya tiene un valor o hay un ganador, no hacer nada
    if (cuadros[i] || calcularGanador(cuadros)) {
      return;
    }
    // Crear una copia del arreglo de cuadros
    const siguientesCuadros = cuadros.slice();
    // Asignar "X" o "O" al cuadro seleccionado
    if (xEsSiguiente) {
      siguientesCuadros[i] = "X";
    } else {
      siguientesCuadros[i] = "O";
    }
    // Llamar a la función alJugar con el nuevo estado del tablero
    alJugar(siguientesCuadros);
  }

  // Calcular si hay un ganador
  const ganador = calcularGanador(cuadros);
  let estado;
  if (ganador) {
    estado = "Ganador: " + ganador;
  } else {
    estado = "Siguiente Jugador: " + (xEsSiguiente ? "X" : "O");
  }

  return (
    <>
      <div className="estado">{estado}</div>
      <div className="fila-tablero">
        <Cuadro valor={cuadros[0]} alHacerClic={() => manejarClic(0)} />
        <Cuadro valor={cuadros[1]} alHacerClic={() => manejarClic(1)} />
        <Cuadro valor={cuadros[2]} alHacerClic={() => manejarClic(2)} />
      </div>
      <div className="fila-tablero">
        <Cuadro valor={cuadros[3]} alHacerClic={() => manejarClic(3)} />
        <Cuadro valor={cuadros[4]} alHacerClic={() => manejarClic(4)} />
        <Cuadro valor={cuadros[5]} alHacerClic={() => manejarClic(5)} />
      </div>
      <div className="fila-tablero">
        <Cuadro valor={cuadros[6]} alHacerClic={() => manejarClic(6)} />
        <Cuadro valor={cuadros[7]} alHacerClic={() => manejarClic(7)} />
        <Cuadro valor={cuadros[8]} alHacerClic={() => manejarClic(8)} />
      </div>
    </>
  );
}

export default function Juego() {
  // Estado para guardar el historial de movimientos
  const [historial, establecerHistorial] = useState([Array(9).fill(null)]);
  // Estado para guardar el movimiento actual
  const [movimientoActual, establecerMovimientoActual] = useState(0);
  // Determinar si el siguiente turno es de "X"
  const xEsSiguiente = movimientoActual % 2 === 0;
  // Obtener el estado actual del tablero
  const cuadrosActuales = historial[movimientoActual];

  // Función para manejar un nuevo movimiento
  function manejarJugada(siguientesCuadros) {
    // Crear un nuevo historial con el movimiento actual
    const siguienteHistorial = [...historial.slice(0, movimientoActual + 1), siguientesCuadros];
    establecerHistorial(siguienteHistorial);
    establecerMovimientoActual(siguienteHistorial.length - 1);
  }

  // Función para saltar a un movimiento específico en el historial
  function saltarA(movimientoSiguiente) {
    establecerMovimientoActual(movimientoSiguiente);
  }

  // Crear una lista de movimientos para mostrar en la interfaz
  const movimientos = historial.map((cuadros, movimiento) => {
    let descripcion;
    if (movimiento > 0) {
      descripcion = "Ir al movimiento #" + movimiento;
    } else {
      descripcion = "Ir al inicio del juego";
    }
    return (
      <li key={movimiento}>
        <button onClick={() => saltarA(movimiento)}>{descripcion}</button>
      </li>
    );
  });

  return (
    <div className="juego">
      <div className="tablero-juego">
        <Tablero xEsSiguiente={xEsSiguiente} cuadros={cuadrosActuales} alJugar={manejarJugada} />
      </div>
      <div className="info-juego">
        <ol>{movimientos}</ol>
      </div>
    </div>
  );
}

// Función para calcular el ganador del juego
function calcularGanador(cuadros) {
  const lineas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lineas.length; i++) {
    const [a, b, c] = lineas[i];
    if (cuadros[a] && cuadros[a] === cuadros[b] && cuadros[a] === cuadros[c]) {
      return cuadros[a];
    }
  }
  return null;
}

Explicación Detallada del Componente Juego
Estados:

historial: Guarda un historial de todos los estados del tablero a lo largo del juego.
movimientoActual: Guarda el índice del movimiento actual dentro del historial.
xEsSiguiente: Calcula si el siguiente turno es de "X" basado en el índice del movimiento actual.
cuadrosActuales: Obtiene el estado del tablero correspondiente al movimiento actual desde el historial.
Funciones:

manejarJugada: Actualiza el historial con un nuevo estado del tablero después de un movimiento. También actualiza movimientoActual para reflejar este nuevo estado.
saltarA: Actualiza movimientoActual para retroceder o avanzar a un movimiento específico en el historial.
calcularGanador: Determina si hay un ganador basándose en las combinaciones ganadoras posibles.
Interacción entre Componentes:

Juego pasa xEsSiguiente, cuadrosActuales y manejarJugada como props a Tablero.
Tablero pasa el valor y la función alHacerClic como props a cada Cuadro.
Cuando un Cuadro es clicado, llama a alHacerClic, que a su vez llama a manejarClic en Tablero.
manejarClic actualiza el estado del tablero y llama a alJugar (que es manejarJugada en Juego), actualizando el estado global del juego.
Juego también muestra un historial de movimientos, permitiendo a los usuarios retroceder a movimientos anteriores.

 */
