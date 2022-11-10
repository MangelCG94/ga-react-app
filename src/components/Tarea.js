import React from 'react';

export default function Tarea({tarea, toggleTarea}) {
    function handleTarea() {
        toggleTarea(tarea.id);
    }
    return (
        <div>
            <label>
                <input type="checkbox" value={tarea.isCompleted} onChange={handleTarea}/>
                {tarea.name}
                <button onClick={handleAddItem}>Editar</button>
            </label>
        </div>
    )
}