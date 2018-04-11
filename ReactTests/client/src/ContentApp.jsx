import React, { Component } from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';

import Accueil from './Accueil.jsx';
import HS_Decks from './HS_Decks.jsx';

class ContentApp extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component='Accueil' />
                    <Route exact path='heartstone/deck' component='HS_Decks' />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default ContentApp