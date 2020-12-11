import React from 'react';
import './container.css';
import { Nav } from '@fluentui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Estudiante } from '../../containers/estudiante/estudiante';
import { Curso } from '../../containers/curso/curso';

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
                        name: 'Cursos',
                        url: '/cursos',
                        icon: 'News',
                        key: 'cursosNav',
                    },]
                }]}
            />
            <Router>
                <Switch>
                    <Route exact path="/estudiantes" component={Estudiante} />
                    <Route exact path="/cursos" component={Curso} />
                </Switch>
            </Router>
        </div>
    )
}