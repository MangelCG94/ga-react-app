export default function Edit({id, handleEditItem, editNameRef}) {

    function editItem(e) {
        
        handleEditItem(e);
    }



    return (
        <div>
            <label>
                <input ref={editNameRef} type="text" onClick={editItem}/>
                <button onClick={handleEditItem}>Enviar</button>
            </label>
        </div>
    )
}