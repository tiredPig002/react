export default function CheckBox(props) {
    return (
        <div>
            <input 
                type="radio" 
                id={props.key} 
                name={props.form} 
                onChange={()=>props.toSort(props.value)}
                defaultChecked={props.d}
            />
            <label for={props.key}> {props.value} </label><br/>
        </div>
    );
}