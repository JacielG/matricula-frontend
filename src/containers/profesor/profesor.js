import React, { useEffect, useState } from 'react';
import {
    CommandBar,
    DefaultButton,
    DetailsListLayoutMode,
    Dialog,
    DialogFooter,
    DialogType,
    IconButton,
    Panel,
    PrimaryButton,
    SearchBox,
    Selection,
    SelectionMode,
    ShimmeredDetailsList
} from '@fluentui/react';

import { restClient } from '../../services/restClient';
import { ProfesorForm } from './profesorForm';
import './profesor.css';

export const Profesor = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAlert, setIsOpenAlert] = useState(true);
    const [profesores, setProfesores] = useState(undefined); //data.map(item => ({ ...item, nombreCurso: item.curso.nombre }))
    const [filtro, setFiltro] = useState([]);
    const [profesor, setProfesor] = useState();
    const [acccion, setAccion] = useState('New');

    useEffect(() => {
        fetchProfesores();
    }, []);

    const fetchProfesores = async () => {
        const response = await restClient.httpGet('/profesor');

        if (!response.length) {
            return;
        }

        setProfesores(response.map(item => ({ ...item, nombreMateria: item.materia.nombre, nombrePais: item.pais.nombre })));
    }

    const handleRefreshClick = () => {
        setProfesores(undefined);

        fetchProfesores();
    }

    const handleDismissClick = () => {
        setIsOpen(!isOpen);
    }

    const handleNuevoProfesorClick = () => {
        setAccion('New');
        setIsOpen(true);
    }

    const handleRemoveProfesorClick = () => {
        setIsOpenAlert(false);
    }

    const seleccion = new Selection({
        onSelectionChanged: () => {
            const itemSeleccionado = seleccion.getSelection();

            setProfesor(itemSeleccionado.length ? itemSeleccionado[0] : null);

        },
    });

    const handleSearchProfesor = value => {

        if (!value) {
            setProfesores(undefined);
            setFiltro([]);
            fetchProfesores();

            return;
        }

        const dataFilter = profesores && profesores.filter(item => item.nombre.toUpperCase().includes(value.toUpperCase()));

        setFiltro(dataFilter);
    }

    const handleDismissAlertClick = () => {
        setIsOpenAlert(true);
    }

    const handleEditProfesorClick = () => {
        if (!profesor) return 'Selecione un profesor';

        setAccion('Edit');
        setIsOpen(true);
    }

    const handleRemoverProfesorClick = async () => {
        if (!profesor) return;

        const response = await restClient.httpDelete('/profesor', profesor.id);

        if (response === 'success') {
            handleDismissAlertClick();
            setProfesores(undefined);
            fetchProfesores();
        }
    }

    const handleNoRemoverProfesorClick = () => {
        handleDismissAlertClick();
    }

    const onRenderEdit = (row) => <IconButton iconProps={{ iconName: 'Edit' }} onClick={handleEditProfesorClick} />
    const onRenderDelete = (row) => <IconButton iconProps={{ iconName: 'Delete' }} onClick={handleRemoveProfesorClick} />

    const columns = [
        { key: 'onRenderEdit', name: '', fieldName: '', minWidth: 30, maxWidth: 30, isResizable: true, onRender: onRenderEdit },
        { key: 'onRenderDelete', name: '', fieldName: '', minWidth: 30, maxWidth: 30, isResizable: true, onRender: onRenderDelete },
        { key: 'column1', name: 'Id', fieldName: 'id', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column2', name: 'Profesor', fieldName: 'nombre', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column3', name: 'Edad', fieldName: 'edad', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column4', name: 'Sexo', fieldName: 'sexo', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column5', name: 'Telefono', fieldName: 'telefono', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column5', name: 'Direccion', fieldName: 'direccion', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column5', name: 'Correo', fieldName: 'correo', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column6', name: 'PaisId', fieldName: 'paisId', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column7', name: 'Nombre Pais', fieldName: 'nombrePais', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column8', name: 'MateriaId', fieldName: 'materiaId', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column9', name: 'Nombre Materia', fieldName: 'nombreMateria', minWidth: 100, maxWidth: 200, isResizable: true },
    ]

    const isDisableButton = profesor ? false : true;

    return (
        <div className="profesor">

            <CommandBar
                items={[{
                    key: 'refresh',
                    text: 'Refresh',
                    iconProps: { iconName: 'Refresh' },
                    onClick: handleRefreshClick,
                }, {
                    key: 'nuevoProfesor',
                    text: 'New',
                    iconProps: { iconName: 'Add' },
                    onClick: handleNuevoProfesorClick,
                },
                {
                    key: 'removerProfesor',
                    text: 'Remove',
                    iconProps: { iconName: 'Delete' },
                    onClick: handleRemoveProfesorClick,
                    disabled: isDisableButton
                }, {
                    key: 'editarProfesor',
                    text: 'Editar Profesor',
                    iconProps: { iconName: 'Edit' },
                    onClick: handleEditProfesorClick,
                    disabled: isDisableButton
                }]}
            />

            <SearchBox
                styles={{ root: { width: '300px' } }} placeholder="Buscar..." onSearch={handleSearchProfesor} />

            <div className="contenedorLista">
                <ShimmeredDetailsList
                    items={filtro.length ? filtro : profesores}
                    columns={columns}
                    layoutMode={DetailsListLayoutMode.justified}
                    selection={seleccion}
                    selectionPreservedOnEmptyClick={true}
                    selectionMode={SelectionMode.single}
                    enableShimmer={!profesores}
                />
            </div>

            <Panel
                headerText={acccion === 'New' ? "Nuevo Profesor" : "Editar Profesor"}
                isOpen={isOpen}
                onDismiss={handleDismissClick}
                customWidth="700px"
            >
                <ProfesorForm
                    fetchProfesores={fetchProfesores}
                    profesorSeleccionado={profesor || {}}
                    acccion={acccion}
                    onDismiss={handleDismissClick}
                />
            </Panel>

            <Dialog
                hidden={isOpenAlert}
                onDismiss={handleDismissAlertClick}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Remove Profesor',
                    closeButtonAriaLabel: 'Close',
                    subText: 'Remove Profesor?',
                }}
                modalProps={{
                    titleAriaId: '',
                    subtitleAriaId: '',
                    isBlocking: false,
                    styles: { main: { maxWidth: 450 } },
                }}
            >

                <DialogFooter>
                    <PrimaryButton onClick={handleRemoverProfesorClick} text="Si" />
                    <DefaultButton onClick={handleNoRemoverProfesorClick} text="No" />
                </DialogFooter>
            </Dialog>
        </div>
    )
}