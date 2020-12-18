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
import { PaisForm } from './paisForm';
import './pais.css';

export const Pais = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAlert, setIsOpenAlert] = useState(true);
    const [paises, setPaises] = useState(undefined);
    const [filtro, setFiltro] = useState([]);
    const [pais, setPais] = useState();
    const [accion, setAccion] = useState('New');

    useEffect(() => {
        fetchPaises();
    }, []);

    const fetchPaises = async () => {
        const response = await restClient.httpGet('/pais');

        if (!response.length) {
            return;
        }

        setPaises(response.map(item => ({ ...item })));
    }

    const handleRefreshClick = () => {
        setPaises(undefined);

        fetchPaises();
    }

    const handleDismissClick = () => {
        setIsOpen(!isOpen);
    }

    const handleNuevoPaisClick = () => {
        setAccion('New');
        setIsOpen(true);
    }

    const handleRemovePaisClick = () => {
        setIsOpenAlert(false);
    }

    const seleccion = new Selection({
        onSelectionChanged: () => {
            const itemSeleccionado = seleccion.getSelection();

            setPais(itemSeleccionado.length ? itemSeleccionado[0] : null);
        },
    });

    const handleSearchPais = value => {

        if (!value) {
            setPaises(undefined);
            setFiltro([]);
            fetchPaises();

            return;
        }

        const dataFilter = paises && paises.filter(item => item.nombre.toUpperCase().includes(value.toUpperCase()));

        setFiltro(dataFilter);
    }

    const handleDismissAlertClick = () => {
        setIsOpenAlert(true);
    }

    const handleEditPaisClick = () => {
        if (!pais) return 'Selecione un pais';

        setAccion('Edit');
        setIsOpen(true);
    }

    const handleRemoverPaisClick = async () => {
        if (!pais) return;

        const response = await restClient.httpDelete('/pais', pais.id);

        if (response === 'success') {
            handleDismissAlertClick();
            setPaises(undefined);
            fetchPaises();
        }
    }

    const handleNoRemoverPaisClick = () => {
        handleDismissAlertClick();
    }

    const onRenderEdit = (row) => <IconButton iconProps={{ iconName: 'Edit' }} onClick={handleEditPaisClick} />
    const onRenderDelete = (row) => <IconButton iconProps={{ iconName: 'Delete' }} onClick={handleRemovePaisClick} />

    const columns = [
        { key: 'onRenderEdit', name: '', fieldName: '', minWidth: 30, maxWidth: 30, isResizable: true, onRender: onRenderEdit },
        { key: 'onRenderDelete', name: '', fieldName: '', minWidth: 30, maxWidth: 30, isResizable: true, onRender: onRenderDelete },
        { key: 'column1', name: 'Id', fieldName: 'id', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column2', name: 'Nombre del pais', fieldName: 'nombre', minWidth: 100, maxWidth: 200, isResizable: true },
    ]

    const isDisableButton = pais ? false : true;

    return (
        <div className="pais">

            <CommandBar
                items={[{
                    key: 'refresh',
                    text: 'Refresh',
                    iconProps: { iconName: 'Refresh' },
                    onClick: handleRefreshClick,
                }, {
                    key: 'newPais',
                    text: 'Nuevo',
                    iconProps: { iconName: 'Add' },
                    onClick: handleNuevoPaisClick,
                },
                {
                    key: 'removerPais',
                    text: 'Eliminar',
                    iconProps: { iconName: 'Delete' },
                    onClick: handleRemovePaisClick,
                    disabled: isDisableButton
                }, {
                    key: 'editarPais',
                    text: 'Editar Pais',
                    iconProps: { iconName: 'Edit' },
                    onClick: handleEditPaisClick,
                    disabled: isDisableButton
                }]}
            />

            <SearchBox
                styles={{ root: { width: '300px' } }} placeholder="Buscar..." onSearch={handleSearchPais} />

            <div className="contenedorLista">
                <ShimmeredDetailsList
                    items={filtro.length ? filtro : paises}
                    columns={columns}
                    layoutMode={DetailsListLayoutMode.justified}
                    selection={seleccion}
                    selectionPreservedOnEmptyClick={true}
                    selectionMode={SelectionMode.single}
                    enableShimmer={!paises}
                />
            </div>

            <Panel
                headerText={accion === 'New' ? "Nuevo País" : "Editar País"}
                isOpen={isOpen}
                onDismiss={handleDismissClick}
                customWidth="700px"
            >
                <PaisForm
                    fetchPaises={fetchPaises}
                    paisSeleccionado={pais || {}}
                    accion={accion}
                    onDismiss={handleDismissClick}
                />
            </Panel>

            <Dialog
                hidden={isOpenAlert}
                onDismiss={handleDismissAlertClick}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Eliminar País',
                    closeButtonAriaLabel: 'Close',
                    subText: '¿Eliminar País?',
                }}
                modalProps={{
                    titleAriaId: '',
                    subtitleAriaId: '',
                    isBlocking: false,
                    styles: { main: { maxWidth: 450 } },
                }}
            >

                <DialogFooter>
                    <PrimaryButton onClick={handleRemoverPaisClick} text="Si" />
                    <DefaultButton onClick={handleNoRemoverPaisClick} text="No" />
                </DialogFooter>
            </Dialog>
        </div>
    )
}
