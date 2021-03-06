import React, { Component } from "react";

// first we will make a new context
export const AppContext = React.createContext();

// Then create a provider Component
export class ContextProvider extends Component {
    constructor(){
        super();
        this.state = {
            isMobile: false
            /*imieINazwisko: "",
            nazwaFunkcji: "",
            tytulZadania: "",
            opisZadania: "",
            iloscArg: 1, //ile parametrów ma funkcja
            iloscWynikow: 1, //ile zestawów wartości do przeprowadzenia testu wysłał uzytkownik
            args: [...Array(2)], //typy parametrów funkcji np. string
            returnArgs: [...Array(2)], //typ zwracany przez funkcje np. string
            wyniki: [...Array(2)], //wartości, które posłużą do przeprowadzenia testu np. a = 2, b = 3 i wartość zwracana 6
            czyRekurencja: false, //czy w funkcji zachodzi rekurencja
            code: ""*/
        };
    }


    /*handleTextInputChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    onEditorChange = (newValue, e) => {
        this.setState({ code: newValue });
    };*/
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions)
    }

    componentDidUpdate(){
        console.log("update z contextu")
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.isMobile === this.state.isMobile){
            return false;
        }
        return true;
    }

    updateWindowDimensions = () => {
        let isMobile = false;
        if(/iPhone|Android/i.test(navigator.userAgent)){
            isMobile = true;
        }
        this.setState({ isMobile })
    }

    componentWillUnMount() {
        window.removeEventListener("resize", this.updateWindowDimensions)
    }

    render() {
        return (
            <AppContext.Provider
                value={{
                    ...this.state
                    //handleTextInputChange: this.handleTextInputChange,
                    //onEditorChange: this.onEditorChange
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

// This function takes a component...
/*export function withContext(Component) {
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
}*/
