import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Nav } from '@fluentui/react';

import { Estudiante } from '../../containers/estudiante/estudiante';
import { Curso } from '../../containers/curso/curso';
import { Pais } from '../../containers/pais/pais';
import { Materia } from '../../containers/materia/materia';
import { Profesor } from '../../containers/profesor/profesor';
import './container.css';


export const Container = () => {
    return (
        <div className="container">
            <Nav
                selectedKey="key3"
                ariaLabel="Nav basic example"
                styles={{
                    root: {
                        width: 210,
                        height: '100%',
                        boxSizing: 'border-box',
                        border: '1px solid #eee',
                        overflowY: 'auto',
                    },
                }}
                groups={[{
                    links: [{
                        name: 'Estudiantes',
                        url: '/containers/estudiantes',
                        icon: 'UserFollowed',
                        key: 'estudiantesNav',
                    },
                    {
                        name: 'Profesores',
                        url: '/containers/profesores',
                        icon: 'Telemarketer',
                        key: 'profesoresNav',
                    },
                    {
                        name: 'Cursos',
                        url: '/containers/cursos',
                        icon: 'News',
                        key: 'cursosNav',
                    },
                    {
                        name: 'Paises',
                        url: '/containers/paises',
                        icon: 'World',
                        key: 'paisesNav',
                    },
                    {
                        name: 'Materias',
                        url: '/containers/materias',
                        icon: 'ReadingMode',
                        key: 'materiasNav',
                    }]
                }]}
            />
            <Router>
                <Switch>
                    <Route exact path="/containers/estudiantes" component={Estudiante} />
                    <Route exact path="/containers/cursos" component={Curso} />
                    <Route exact path="/containers/paises" component={Pais} />
                    <Route exact path="/containers/materias" component={Materia} />
                    <Route exact path="/containers/profesores" component={Profesor} />
                </Switch>
            </Router>
        </div>
    )
}