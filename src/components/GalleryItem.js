import './GalleryItem.css';
function RarityConverter(n) {
    switch(n){
        case 0: return "Common"; 
        case 1: return "Uncommon"; 
        case 2: return "Rare";
        case 3: return "Very Rare";
        case 4: return  "Legendary"; 
        default: return "???";
    }
}
export default function Item(props) {
    return (
        <div className="block">
            <div className="image">
            <img src={props.item.image} alt={props.item.name}/>
            </div>
            <div className="info">
                <div>
                    <h3>{props.item.name}</h3>
                    Rarity: {RarityConverter(props.item.rarity)}<br/>
                    Properties: {props.item.properties.join(", ")} <br/>
                    Cost: {props.item.cost} gp<br/>
                    {props.item.description}
                </div>
                {props.addButton(props.item)}
            </div>
        </div>
    );
}