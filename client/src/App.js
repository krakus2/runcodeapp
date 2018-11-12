import React, { Component } from "react";
import "./App.css";
//import MyProvider from "./context/MyProvider";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import green from "@material-ui/core/colors/green";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

const theme = createMuiTheme({
    palette: {
        primary: { main: indigo[500] },
        secondary: { main: green[800] }
    },
    spacing: {
        tooltipSize: 12
    },
    typography: {
        useNextVariants: true
    }
});

class App extends Component {
    render() {
        return (
            //<MyProvider>
            <Router>
                <React.Fragment>
                    <MuiThemeProvider theme={theme}>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Footer />
                    </MuiThemeProvider>
                </React.Fragment>
            </Router>
            //</MyProvider>
        );
    }
}

export default App;
