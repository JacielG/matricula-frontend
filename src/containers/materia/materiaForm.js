import React, { useState } from 'react';

import { PrimaryButton, ProgressIndicator, TextField } from '@fluentui/react';
import { restClient } from '../../services/restClient';

export const MateriaForm = ({ fetchMaterias, materiaSeleccionada, accion, onDismiss }) => {
    const [materia, setMateria] = useState({
        id: accion === 'Edit' ? materiaSeleccionada.id : 0,
        nombre: accion === 'Edit' ? materiaSeleccionada.nombre : '',
        cursoId: accion === 'Edit' ? materiaSeleccionada.cursoId : ''
    });

    const [mensajeValidacion, setMensajeValidacion] = useState('');
    const [errorCampo, setErrorCampo] = useState({
        nombre: '',
        cursoId: ''
    });

    const [showSpinner, setShowSpinner] = useState(false);

    const handleTextFieldChange = prop => (event, value) => {
        setMateria({ ...materia, [prop]: value })
    }

    const validandoCampos = () => {
        let mensaje = {};

        if (!materia.nombre) {
            mensaje = { ...mensaje, nombre: 'Ingrese nombre' };
        }

        if (!materia.cursoId) {
            mensaje = { ...mensaje, nombre: 'Ingrese el ID del curso' };
        }

        setErrorCampo(mensaje);

        return Object.keys(mensaje).length;
    }

    const handleGuardarClick = async () => {
        if (validandoCampos()) {
            return;
        }

        setShowSpinner(true);

        const response = await restClient.httpPost('/materia', materia);

        if (typeof response === 'string') {
            setMensajeValidacion(response);
        }

        if (typeof response == "object") {
            setMensajeValidacion('Saved');

            fetchMaterias();
        }

        setShowSpinner(false);
        onDismiss();
    }

    const handleEditarClick = async () => {
        if (validandoCampos()) {
            return;
        }

        setShowSpinner(true);

        const url = `/Materia/${materiaSeleccionada.id}`;

        const response = await restClient.httpPut(url, materia);

        if (response === 'success') {
            setMensajeValidacion('Saved');

            fetchMaterias();
        } else {
            setMensajeValidacion(response);
        }

        setShowSpinner(false);
        onDismiss();
    }

    return (
        <div>

            {showSpinner && <ProgressIndicator label="Guardando..." />}

            <TextField label="Nombre"
                value={materia.nombre}
                onChange={handleTextFieldChange('nombre')}
                errorMessage={errorCampo.nombre}
            />

            <TextField label="CursoId"
                value={materia.cursoId}
                onChange={handleTextFieldChange('cursoId')}
                errorMessage={errorCampo.cursoId}
            />

            <br />

            <PrimaryButton text="Guardar" onClick={accion === 'New' ? handleGuardarClick : handleEditarClick} />

            <br />

            <span style={{ color: mensajeValidacion === 'Saved' ? 'green' : 'red' }}>{mensajeValidacion}</span>
        </div>
    )
}