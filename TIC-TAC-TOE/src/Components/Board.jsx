import Tile from "./Tile";
import Strike from "./Strike";

export default function Board({ tile, tileClick, turn, strike }) {
    return (
        <div className="main-board">
            <Tile 
                value={tile[0]} 
                tileClick={() => tileClick(0)}
                turn={turn}
            />
            <Tile 
                value={tile[1]} 
                tileClick={() => tileClick(1)}
                turn={turn}
            />
            <Tile 
                value={tile[2]} 
                tileClick={() => tileClick(2)}
                turn={turn}
            />
            <Tile 
                value={tile[3]} 
                tileClick={() => tileClick(3)}
                turn={turn}
            />
            <Tile 
                value={tile[4]} 
                tileClick={() => tileClick(4)}
                turn={turn}
            />
            <Tile 
                value={tile[5]} 
                tileClick={() => tileClick(5)}
                turn={turn}
            />
            <Tile 
                value={tile[6]} 
                tileClick={() => tileClick(6)}
                turn={turn}
            />
            <Tile 
                value={tile[7]} 
                tileClick={() => tileClick(7)}
                turn={turn}
            />
            <Tile 
                value={tile[8]} 
                tileClick={() => tileClick(8)}
                turn={turn}
            />
            <Strike strike={strike}/>
        </div>
    )
}
