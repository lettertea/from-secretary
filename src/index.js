import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Container, createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";

require('typeface-montserrat');

const theme = createMuiTheme({
    typography: {
        fontSize: 14,
        fontFamily: "Montserrat",
        h2: {
            fontWeight: 800
        }
    },
});


ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Container maxWidth={"md"}>
                <App/>
            </Container>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
