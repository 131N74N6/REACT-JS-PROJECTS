import { useEffect, useState } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import gameInfo from "../Data/gameStatus";

const playerX = "X";
const playerO = "O";

const winCombination = [
    { combo: [0,1,2], strikePost: "strike-row-1" },
    { combo: [3,4,5], strikePost: "strike-row-2" },
    { combo: [6,7,8], strikePost: "strike-row-3" },
    { combo: [0,3,6], strikePost: "strike-col-1" },
    { combo: [1,4,7], strikePost: "strike-col-2" },
    { combo: [2,5,8], strikePost: "strike-col-3" },
    { combo: [0,4,8], strikePost: "strike-diagonal-1" },
    { combo: [2,4,6], strikePost: "strike-diagonal-2" }
];

export default function TicTacToe() {
    const [tile, setTile] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState(playerX);
    const [strike, setStrike] = useState("");
    const [gameStatus, setGameStatus] = useState(gameInfo.inProgress);

    function tileClick(index) {
        if (tile[index] !== null) {
            return;
        }

        const updateTile = [...tile];
        updateTile[index] = turn;
        setTile(updateTile);

        if (turn === playerX) {
            setTurn(playerO);
        }
        else {
            setTurn(playerX);
        }
    }

    function checkWinner(tile, strikeSetter, gameStatus) {
        for (const { combo, strikePost } of winCombination) {
            const value1 = tile[combo[0]];
            const value2 = tile[combo[1]];
            const value3 = tile[combo[2]];

            if (value1 !== null && value1 === value2 && value1 === value3) {
                strikeSetter(strikePost);
                if (value1 === playerX) {
                    gameStatus(gameInfo.playerXWins);
                }
                else {
                    gameStatus(gameInfo.playerOWins);
                }
                return;
            }
        }

        const filledTiles = tile.every((t) => t !== null);

        if (filledTiles) {
            gameStatus(gameInfo.draw);
        }
    }

    useEffect(() => {
        checkWinner(tile, setStrike, setGameStatus);
    }, [tile]);

    function reset() {
        setStrike("");
        setTile(Array(9).fill(null));
        setGameStatus(gameInfo.inProgress);
    }

    return (
        <div className="tic-tac-toe-body">
            <Board 
                tile={tile} 
                tileClick={tileClick} 
                turn={turn}
                strike={strike}
            />
            <div className="result-control">
                <GameOver gameStatus={gameStatus}/>
                <button onClick={reset} type="button" className="reset">Reset</button>
            </div>
        </div>
    )
}
