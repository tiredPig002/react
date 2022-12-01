export default function CheckBox(props) {
    return (
        <div>
            <input 
                type="checkbox" 
                id={props.value} 
                name={props.form} 
                onChange={()=>props.toFilter(props.value)}
            />
            <label for={props.value}> {props.value} </label><br/>
        </div>
    );
}