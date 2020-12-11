import React, { useEffect, useState } from 'react';
import { CommandBar, DefaultButton, DetailsListLayoutMode, Dialog, DialogFooter, DialogType, IconButton, Panel, PrimaryButton, SearchBox, Selection, SelectionMode, ShimmeredDetailsList } from '@fluentui/react';
import { restClient } from '../../services/restClient';
import { EstudianteForm } from './estudianteForm';
import './estudiante.css'

export const Estudiante = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAlert, setIsOpenAlert] = useState(true);
    const [estudiantes, setEstudiantes] = useState(undefined);
    const [filtro, setFiltro] = useState([]);
    const [estudiante, setEstudiante] = useState();
    const [acccion, setAccion] = useState('New');

    useEffect(() => {
        fetchEstudiantes();
    }, []);

    const fetchEstudiantes = async () => {
        const response = await restClient.httpGet('/estudiante');

        if (!response.length) {
            return;
        }

        setEstudiantes(response.map(item => ({ ...item, nombreCurso: item.curso.nombre })));
    }

    const handleRefreshClick = () => {
        setEstudiantes(undefined);

        fetchEstudiantes();
    }

    const handleDismissClick = () => {
        setIsOpen(!isOpen);
    }

    const handleNuevoEstudianteClick = () => {
        setAccion('New');
        setIsOpen(true);
    }

    const handleRemoveEstudianteClick = () => {
        setIsOpenAlert(false);
    }

    const seleccion = new Selection({
        onSelectionChanged: () => {
            const itemSeleccionado = seleccion.getSelection();

            setEstudiante(itemSeleccionado.length ? itemSeleccionado[0] : null);

        },
    });

    const handleSearchEstudiante = value => {

        if (!value) {
            setEstudiantes(undefined);
            setFiltro([]);
            fetchEstudiantes();

            return;
        }

        const dataFilter = estudiantes && estudiantes.filter(item => item.nombre.toUpperCase().includes(value.toUpperCase()));

        setFiltro(dataFilter);
    }

    const handleDismissAlertClick = () => {
        setIsOpenAlert(true);
    }

    const handleEditEstudianteClick = () => {
        if (!estudiante) return 'Selecione un estudiante';

        setAccion('Edit');
        setIsOpen(true);
    }

    const handleRemoverEstudianteClick = async () => {
        if (!estudiante) return;

        const response = await restClient.httpDelete('/estudiante', estudiante.id);

        if (response === 'success') {
            handleDismissAlertClick();
            setEstudiantes(undefined);
            fetchEstudiantes();
        }
    }

    const handleNoRemoverEstudianteClick = () => {

        handleDismissAlertClick();
    }

    const onRenderEdit = (row) => <IconButton iconProps={{ iconName: 'Edit' }} onClick={handleEditEstudianteClick} />
    const onRenderDelete = (row) => <IconButton iconProps={{ iconName: 'Delete' }} onClick={handleRemoveEstudianteClick} />

    const columns = [
        { key: 'onRenderEdit', name: '', fieldName: '', minWidth: 30, maxWidth: 30, isResizable: true, onRender: onRenderEdit },
        { key: 'onRenderDelete', name: '', fieldName: '', minWidth: 30, maxWidth: 30, isResizable: true, onRender: onRenderDelete },
        { key: 'column1', name: 'Id', fieldName: 'id', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column2', name: 'Estudiante', fieldName: 'nombre', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column3', name: 'Edad', fieldName: 'edad', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column4', name: 'Sexo', fieldName: 'sexo', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column5', name: 'CursoId', fieldName: 'cursoId', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column6', name: 'Nombre del curso', fieldName: 'nombreCurso', minWidth: 100, maxWidth: 200, isResizable: true },
    ]

    const isDisableButton = estudiante ? false : true;

    return (
        <div className="estudiante">

            <CommandBar
                items={[{
                    key: 'refresh',
                    text: 'Refresh',
                    iconProps: { iconName: 'Refresh' },
                    onClick: handleRefreshClick,
                }, {
                    key: 'newStudent',
                    text: 'New',
                    iconProps: { iconName: 'Add' },
                    onClick: handleNuevoEstudianteClick,
                },
                {
                    key: 'removeStudent',
                    text: 'Remove',
                    iconProps: { iconName: 'Delete' },
                    onClick: handleRemoveEstudianteClick,
                    disabled: isDisableButton
                }, {
                    key: 'editarEstudiante',
                    text: 'Editar Estudiante',
                    iconProps: { iconName: 'Edit' },
                    onClick: handleEditEstudianteClick,
                    disabled: isDisableButton
                }]}
            />

            <SearchBox
                styles={{ root: { width: '300px' } }} placeholder="Buscar..." onSearch={handleSearchEstudiante} />

            <div className="contenedorLista">
                <ShimmeredDetailsList
                    items={filtro.length ? filtro : estudiantes}
                    columns={columns}
                    layoutMode={DetailsListLayoutMode.justified}
                    selection={seleccion}
                    selectionPreservedOnEmptyClick={true}
                    selectionMode={SelectionMode.single}
                    enableShimmer={!estudiantes}
                />
            </div>

            <Panel
                headerText={acccion === 'New' ? "Nuevo Estudiante" : "Editar Estudiante"}
                isOpen={isOpen}
                onDismiss={handleDismissClick}
                customWidth="700px"
            >
                <EstudianteForm
                    fetchEstudiantes={fetchEstudiantes}
                    estudianteSeleccionado={estudiante || {}}
                    acccion={acccion}
                    onDismiss={handleDismissClick}
                />
            </Panel>

            <Dialog
                hidden={isOpenAlert}
                onDismiss={handleDismissAlertClick}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Remove Student',
                    closeButtonAriaLabel: 'Close',
                    subText: 'Remove Estudiante?',
                }}
                modalProps={{
                    titleAriaId: '',
                    subtitleAriaId: '',
                    isBlocking: false,
                    styles: { main: { maxWidth: 450 } },
                }}
            >
                <DialogFooter>
                    <PrimaryButton onClick={handleRemoverEstudianteClick} text="Si" />
                    <DefaultButton onClick={handleNoRemoverEstudianteClick} text="No" />
                </DialogFooter>
            </Dialog>
        </div>
    )
}