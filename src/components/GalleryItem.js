import './GalleryItem.css';
export default function Item(props) {
    return (
        <div className="block">
            <div className="info">
                <h3>{props.item.name}</h3>
                <div>
                    Shape: {props.item.shape} <br/>
                    Color(s): {props.item.color.map(e=>e.toLowerCase()).join(', ')} <br/>
                    Edible: {props.item.edible} <br/>
                    Coolness: {props.item.cost} <br/><br/>
                </div>
                <div>
                    {props.item.description}
                </div>
                {props.addButton(props.item)}
            </div>
        </div>
    );
}