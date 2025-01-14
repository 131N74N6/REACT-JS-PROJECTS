import gameInfo from "../Data/gameStatus";

export default function GameOver({ gameStatus }) {
    switch(gameStatus) {
        case gameInfo.playerXWins:
            return <div className="game-over">Player X Win</div>
        case gameInfo.playerOWins:
            return <div className="game-over">Player O Win</div>
        case gameInfo.draw:
            return <div className="game-over">Draw!</div>
        case gameInfo.inProgress:
            return <></>
        default:
            return <></>
    }
}
