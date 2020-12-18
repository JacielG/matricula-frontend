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
                        url: '/estudiantes',
                        icon: 'UserFollowed',
                        key: 'estudiantesNav',
                    },
                    {
                        name: 'Profesores',
                        url: '/profesores',
                        icon: 'Telemarketer',
                        key: 'profesoresNav',
                    },
                    {
                        name: 'Cursos',
                        url: '/cursos',
                        icon: 'News',
                        key: 'cursosNav',
                    },
                    {
                        name: 'Paises',
                        url: '/paises',
                        icon: 'World',
                        key: 'paisesNav',
                    },
                    {
                        name: 'Materias',
                        url: '/materias',
                        icon: 'ReadingMode',
                        key: 'materiasNav',
                    }]
                }]}
            />
            <Router>
                <Switch>
                    <Route exact path="/estudiantes" component={Estudiante} />
                    <Route exact path="/cursos" component={Curso} />
                    <Route exact path="/paises" component={Pais} />
                    <Route exact path="/materias" component={Materia} />
                    <Route exact path="/profesores" component={Profesor} />
                </Switch>
            </Router>
        </div>
    )
}