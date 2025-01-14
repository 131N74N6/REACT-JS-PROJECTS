export default function Tile({ value, tileClick, turn }) {
    let hoverClass = null;

    if (value == null && turn) {
        hoverClass = `${turn.toLowerCase()}`;
    }
    
    return (
        <div className={`tile ${hoverClass}`} onClick={tileClick}>{value}</div>
    )
}
