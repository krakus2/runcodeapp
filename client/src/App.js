import React, { Component } from "react";
import "./App.css";
import { ContextProvider } from "./context/ContextProvider";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import teal from "@material-ui/core/colors/teal";
import Header from "./components/layout/Header";
//import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

const theme = createMuiTheme({
    palette: {
        primary: { main: teal[500] },
        secondary: { main: blue[500] }
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
            <ContextProvider>
                <Router>
                    <React.Fragment>
                        <MuiThemeProvider theme={theme}>
                            <Header />
                            <Route exact path="/" component={Landing} />
                            {/*<Footer />*/}
                        </MuiThemeProvider>
                    </React.Fragment>
                </Router>
            </ContextProvider>
        );
    }
}

export default App;
