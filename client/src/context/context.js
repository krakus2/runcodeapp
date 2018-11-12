import React, { Component } from "react";

// first we will make a new context
const MyContext = React.createContext();

// Then create a provider Component
export class MyProvider extends Component {
    state = {
        imieINazwisko: ""
    };

    handleTextInputChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        return (
            <MyContext.Provider
                value={{
                    state: this.state,
                    handleTextInputChange: this.handleTextInputChange
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

// This function takes a component...
export function withContext(Component) {
    // ...and returns another component...
    return function ContextComponent(props) {
        // ... and renders the wrapped component with the context theme!
        // Notice that we pass through any additional props as well
        return (
            <MyContext.Consumer>
                {context => <Component {...props} context={context} />}
            </MyContext.Consumer>
        );
    };
}
