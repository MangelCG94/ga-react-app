export default function Tarea({tarea, handleEditItem, toggleTarea}) {
    function handleEdit() {
        handleEditItem(tarea.id);
    }

    function handleTarea(){
        toggleTarea(tarea.id);
    }


    return (
        <div>
            <label>
                <input type="checkbox" value={tarea.isCompleted} onChange={handleTarea} />
                {tarea.name}
            </label>
            <button onClick={handleEdit}>Editar</button>
        </div>
    )
}