import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast

function App() {
    const [gameId, setGameId] = useState("");
    const [game, setGame] = useState(null);
    const [message, setMessage] = useState("");
    const [darkMode, setDarkMode] = useState(true);
    const [currentPlayer, setCurrentPlayer] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [playerSymbol, setPlayerSymbol] = useState("");
    const [playerColor, setPlayerColor] = useState("");
    const [userId, setUserId] = useState("");
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket("wss://backend-c83f.onrender.com");

        // ws.current.onopen = () => {
        //     toast.success("WebSocket connection established");
        // };

        // ws.current.onclose = () => {
        //     toast.error("WebSocket connection closed");
        // };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Received message: ", data);

            if (data.type === "success") {
                if (data.message === "User registered") {
                    setRegistered(true);
                    setPlayerSymbol(data.userId); // Assuming userId is 'X' or 'O'
                    setPlayerColor(data.userId === "X" ? "red" : "blue");
                    toast.success(data.message);
                } else if (
                    data.message === "Game found" ||
                    data.message === "Game created" ||
                    data.message === "Game joined"
                ) {
                    setGame(data.game);
                    setGameId(data.game.id);
                    setGameStarted(true);
                    setPlayerSymbol(data.playing);
                    toast.success(data.message);
                } else if (data.message === "Game over") {
                    toast(`Player ${data.winner} wins!`);
                    setCurrentPlayer(false);
                } else if (data.message === "Your turn") {
                    toast.info(data.message);
                } else if (data.message === "Waiting for opponent") {
                    toast.info(data.message);
                }
            } else if (data.type === "error") {
                toast.error(data.message);
            } else if (data.type === "current_player") {
                setCurrentPlayer(data.message);
            } else if (data.type === "game_update") {
                setGame(data.game);
                setCurrentPlayer(data.game.currentPlayer === data.userId);
            } else if (data.type === "user_ID") {
                setUserId(data.message);
                toast.success(`Your user ID is: ${data.message}`);
            }
        };

        return () => {
            ws.current.close();
        };
    }, []);

    const handleCreateGame = () => {
        ws.current.send(
            JSON.stringify({
                type: "create_game",
                userId: userId,
            })
        );
    };

    const handleJoinGame = () => {
        console.log(gameId);
        ws.current.send(
            JSON.stringify({
                type: "join_game",
                gameId: gameId,
                userId: userId,
            })
        );
    };

    const handleMakeMove = (row, col) => {
        if (currentPlayer) {
            ws.current.send(
                JSON.stringify({
                    type: "make_move",
                    gameId: gameId,
                    row: row,
                    col: col,
                    userId: userId,
                    symbol: playerSymbol,
                })
            );
        } else {
            toast.error("It's not your turn");
        }
    };

    const handleNewGame = () => {
        // refresh the page
        window.location.reload();
    };

    return (
        <div
            className={`min-h-screen flex flex-col items-center justify-center ${
                darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
        >
            <Toaster /> {/* Add Toaster component for displaying toasts */}
            <header className="text-center">
                <h1 className="text-4xl font-bold mb-4">Connect Four</h1>
                <div className="mb-4 flex items-center justify-center mx-auto">
                    {userId && <p className="text-lg">User ID: {userId}</p>}
                    {registered ? (
                        <p className="text-lg">
                            You are playing:{" "}
                            <span
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    backgroundColor: playerColor,
                                }}
                                className="text-center align-middle flex items-center justify-center mx-auto m-2"
                            >
                                {playerSymbol}
                            </span>
                        </p>
                    ) : (
                        <p className="text-lg"></p>
                    )}
                </div>
                <div className="mb-4">
                    <button
                        onClick={handleCreateGame}
                        className="py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-700"
                    >
                        Create Game
                    </button>
                </div>
                <div className="mb-4">
                    {game && <p className="text-lg">Game ID: {gameId}</p>}
                    {gameStarted ? (
                        <>
                            <p className="text-lg">You are playing:</p>
                            <p
                                style={{
                                    width: "40px",
                                    height: "40px",
                                }}
                                className={`text-center align-middle flex items-center justify-center mx-auto m-2 ${playerSymbol === "X" ? "bg-red-500" : "bg-blue-500"}`}
                            >
                                {playerSymbol}
                            </p>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Enter game ID"
                                value={gameId}
                                onChange={(e) => setGameId(e.target.value)}
                                className="mb-2 py-2 px-4 border rounded text-black"
                            />
                            <button
                                onClick={handleJoinGame}
                                className="ml-2 py-2 px-4 bg-gray-500 text-white rounded hover:bg-yellow-700"
                            >
                                Join Game
                            </button>
                        </>
                    )}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {game &&
                        game.board.map((row, rowIndex) =>
                            row.map((cell, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    onClick={() =>
                                        handleMakeMove(rowIndex, colIndex)
                                    }
                                    className={`w-12 h-12 flex items-center justify-center border ${
                                        cell === "X"
                                            ? "bg-red-500"
                                            : cell === "O"
                                            ? "bg-blue-500"
                                            : "bg-white"
                                    }`}
                                >
                                    {cell}
                                </div>
                            ))
                        )}
                </div>
                <p className="mt-4">{message}</p>
            </header>
            <div className="reset-board">
                <button
                    onClick={handleNewGame}
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    New Game
                </button>
            </div>
        </div>
    );
}

export default App;
