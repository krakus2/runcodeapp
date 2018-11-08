import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MySlider from "./form/MySlider";
import Argumenty from "./form/Argumenty";
import TypZwracany from "./form/TypZwracany";
import SubmitButton from "./form/SubmitButton";
import StrukturaFunkcji from "./form/StrukturaFunkcji";
import Editor from "./form/Editor";
import Testy from "./form/Testy";
import Rekurencja from "./form/Rekurencja";
import BladLubKomunikat from "./form/BladLubKomunikat";
import { styles, FormWrapper, Wrapper } from "../../styles/layout/Landing";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imieINazwisko: "",
            nazwaFunkcji: "",
            zlaNazwaFunkcji: false,
            tytulZadania: "",
            opisZadania: "",
            strukturaFunkcji: "",
            iloscArg: 1, //ile parametrów ma funkcja
            iloscWynikow: 1, //ile zestawów wartości do przeprowadzenia testu wysłał uzytkownik
            args: [...Array(2)], //typy parametrów funkcji np. string
            returnArgs: [...Array(2)], //typ zwracany przez funkcje np. string
            wyniki: [...Array(2)], //wartości, które posłużą do przeprowadzenia testu np. a = 2, b = 3 i wartość zwracana 6
            czyRekurencja: false, //czy w funkcji zachodzi rekurencja
            loading: false,
            error: {},
            postSuccess: false,
            indeksyTablic: [],
            code: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onEditorChange = (newValue, e) => {
        this.setState({ code: newValue });
        //console.log("onChange", newValue, e);
    };

    isEmpty = array => {
        let result = false;
        array.forEach(elem => {
            if (elem === undefined || elem === "" || elem === null) result = true;
        });
        return result;
    };

    deleteSpaces = text => {
        let newText = Array.from(text);
        if (typeof text === "string") {
            Array.from(text).forEach((elem, i) => {
                if (elem === " " && text[i + 1] === " ") {
                    newText[i] = "";
                } else {
                    newText[i] = elem;
                }
            });
        }
        return newText.join("");
    };

    async onSubmit(e) {
        e.preventDefault();
        const online = navigator.onLine;
        const {
            imieINazwisko,
            nazwaFunkcji,
            tytulZadania,
            opisZadania,
            iloscArg,
            iloscWynikow,
            args,
            returnArgs,
            wyniki,
            czyRekurencja,
            code
        } = this.state;

        //const pureCode = code.replace(/[^\S ]/gi, ''); //wymazuje wszystkie biale znaki oprócz spacji z kodu
        const pureCode = this.deleteSpaces(code);
        const values = {
            imieINazwisko,
            nazwaFunkcji,
            tytulZadania,
            opisZadania,
            iloscArg,
            iloscWynikow,
            args,
            returnArgs,
            wyniki,
            czyRekurencja,
            code
        };

        console.log("submit", values);
        if (online) {
            try {
                const res = await axios.post("/api/tasks", values);
                this.setState(
                    {
                        nazwaFunkcji: "",
                        imieINazwisko: "",
                        tytulZadania: "",
                        opisZadania: "",
                        iloscArg: 1,
                        iloscWynikow: 1,
                        args: [...Array(2)],
                        returnArgs: [...Array(2)],
                        wyniki: [...Array(2)],
                        czyRekurencja: false,
                        loading: false,
                        error: {},
                        postSuccess: true,
                        code: ""
                    },
                    () =>
                        setTimeout(() => {
                            this.setState({ postSuccess: false });
                        }, 5000)
                );
                console.log("Submit succesed", res);
            } catch (err) {
                let error = {};
                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                    if (typeof err.response.data === "string") {
                        error.messages = [err.response.data];
                    } else {
                        error.messages = [...Object.values(err.response.data)];
                        error.types = [...Object.keys(err.response.data)];
                    }
                    error.type = "response";
                    //console.log("types i messages", types, messages);
                } else if (err.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(err.request);
                    error.messages = [...Object.values(err.request)];
                    error.type = "request";
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", err.message);
                    error.messages = [err.message];
                    error.type = "other";
                }
                this.setState({ loading: false, error });
            }
        } else {
            const error = {
                messages: ["There's no internet connection"]
            };
            this.setState({ loading: false, error });
        }
    }

    handleTextInputChange = name => event => {
        if (name === "nazwaFunkcji") {
            const regex = /^[a-z]/gi;
            const regex2 = /[^a-z0-9]+/gi;
            if (event.target.value.length === 0) {
                return this.setState({
                    [name]: event.target.value,
                    zlaNazwaFunkcji: false
                });
            } else if (event.target.value.length === 1) {
                if (!regex.test(event.target.value)) {
                    return this.setState({
                        [name]: event.target.value,
                        zlaNazwaFunkcji: true
                    });
                } else {
                    return this.setState({
                        [name]: event.target.value,
                        zlaNazwaFunkcji: false
                    });
                }
            } else {
                if (regex2.test(event.target.value) || !regex.test(event.target.value)) {
                    return this.setState({
                        [name]: event.target.value,
                        zlaNazwaFunkcji: true
                    });
                } else {
                    return this.setState({
                        [name]: event.target.value,
                        zlaNazwaFunkcji: false
                    });
                }
            }
        } else {
            this.setState({ [name]: event.target.value });
        }
    };

    handleSliderChange = value => {
        let args = [...this.state.args];
        const { iloscWynikow } = this.state;
        const x = (value + 1) * iloscWynikow;
        if (args.length === 0) {
            args = [...Array(value * 2)];
        }
        if (args.length < value * 2) {
            args = [...args, ...Array(value * 2 - args.length)];
        }
        this.setState(
            {
                iloscArg: value,
                args,
                wyniki: [...Array.from(Array(x))]
            },
            () => {
                const indeksyTablic = this.wyliczIndeksyTablic();
                this.setState({ indeksyTablic });
            }
        );
    };

    handleSwitchChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleArgTypeChange = i => j => arrayName => event => {
        let args = [...this.state[arrayName]];
        args[i * 2 + j] = event.target.value;

        this.setState({ [arrayName]: args }, () => {
            const indeksyTablic = this.wyliczIndeksyTablic();
            this.setState({ indeksyTablic });
        });
    };

    wyliczIndeksyTablic = () => {
        let args = [...this.state.args];
        let returnArgs = [...this.state.returnArgs];
        const { iloscArg, iloscWynikow } = this.state;
        const indeksyTablic = [];

        args.forEach((elem, i) => {
            if (elem === "Tablica []") indeksyTablic.push(i / 2);
        });
        for (let i = 0; i < iloscWynikow - 1; i++) {
            indeksyTablic.forEach((elem, j) => {
                indeksyTablic.push(elem + iloscArg + 1);
            });
        }

        if (returnArgs[0] === "Tablica []") {
            for (let i = 0; i < iloscWynikow; i++) {
                indeksyTablic.push((i + 1) * (iloscArg + 1) - 1);
            }
        }

        return indeksyTablic;
    };

    handleWynikiChange = i => e => {
        const wyniki = [...this.state.wyniki];
        wyniki[i] = e.target.value; //.replace(/\s/, '');
        this.setState({ wyniki });
    };

    zmienIloscWynikow = znak => () => {
        const { iloscWynikow, iloscArg } = this.state;
        const wyniki = [...this.state.wyniki];
        if (znak === "+") {
            this.setState(
                {
                    iloscWynikow: iloscWynikow + 1,
                    wyniki: [...wyniki, ...Array.from(Array(iloscArg + 1))]
                },
                () => {
                    const indeksyTablic = this.wyliczIndeksyTablic();
                    this.setState({ indeksyTablic });
                }
            );
        } else if (znak === "-" && iloscWynikow !== 1) {
            const ucieteWyniki = [];
            for (let i = 0; i < (iloscArg + 1) * (iloscWynikow - 1); i++) {
                ucieteWyniki.push(wyniki[i]);
            }
            this.setState({ iloscWynikow: iloscWynikow - 1, wyniki: ucieteWyniki }, () => {
                const indeksyTablic = this.wyliczIndeksyTablic();
                this.setState({ indeksyTablic });
            });
        }
    };

    wygenerujStruktureFunkcji = () => {
        const { nazwaFunkcji, args, returnArgs } = this.state;
        const args2 = [];
        for (let i = 0; i < args.length; i = i + 2) {
            if (args[i] === "Tablica []") {
                args2.push(`${args[i + 1]}[] Arg${i / 2 + 1}`);
            } else {
                args2.push(`${args[i + 1]} arg${i / 2 + 1}`);
            }
        }
        let returnArgs2 =
            returnArgs[0] === "Tablica []"
                ? `${returnArgs[1]}[] ${nazwaFunkcji}`
                : `${returnArgs[1]} ${nazwaFunkcji}`;

        return `${returnArgs2}(${args2.join(", ")})`;
    };

    onSubmitClick = () => {
        this.setState({ loading: true, error: {} });
    };

    render() {
        const { classes } = this.props;
        const {
            imieINazwisko,
            nazwaFunkcji,
            zlaNazwaFunkcji,
            tytulZadania,
            opisZadania,
            iloscArg,
            iloscWynikow,
            args,
            returnArgs,
            wyniki,
            czyRekurencja,
            loading,
            error,
            postSuccess,
            indeksyTablic,
            code
        } = this.state;
        const argsCheck = this.isEmpty(args) || this.isEmpty(returnArgs) || this.isEmpty(wyniki);
        const isInvalid =
            opisZadania === "" ||
            tytulZadania === "" ||
            nazwaFunkcji === "" ||
            code === "" ||
            argsCheck ||
            zlaNazwaFunkcji;
        return (
            <Wrapper>
                <Paper classes={{ root: classes.paper }} elevation={1}>
                    <FormWrapper onSubmit={this.onSubmit}>
                        <TextField
                            label="Imię i Nazwisko"
                            error={
                                error.types && error.types.some(elem => elem === "imieINazwisko")
                            }
                            helperText="Podaj imię i nazwisko - autorzy najciekawszych zadań otrzymają punkty bonusowe
                            zwiększające ocenę końcową z przedmiotu Wstęp do programowania."
                            className={classes.textField}
                            InputProps={{ classes: { input: classes.TheInput } }}
                            FormHelperTextProps={{
                                classes: { root: classes.TheHelper }
                            }}
                            InputLabelProps={{ classes: { root: classes.TheLabel } }}
                            value={imieINazwisko}
                            onChange={this.handleTextInputChange("imieINazwisko")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Tytuł zadania"
                            error={error.types && error.types.some(elem => elem === "tytulZadania")}
                            helperText="Nadaj zadaniu odpowiedni tytuł"
                            placeholder="Wyszukiwanie liczb"
                            className={classes.textField}
                            FormHelperTextProps={{
                                classes: { root: classes.TheHelper }
                            }}
                            InputProps={{ classes: { input: classes.TheInput } }}
                            InputLabelProps={{ classes: { root: classes.TheLabel } }}
                            value={tytulZadania}
                            onChange={this.handleTextInputChange("tytulZadania")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Nazwa funkcji"
                            error={
                                (error.types &&
                                    error.types.some(elem => elem === "nazwaFunkcji")) ||
                                zlaNazwaFunkcji
                            }
                            className={classes.textField}
                            helperText="Podaj nazwę funkcji, która ma zostać stworzona,
                            np. ZnajdzLiczbe lub SzukajWTablicy. Uwaga: Nazwa nie może zawierać spacji,
                            znaków specjalnych oraz zaczynać się od cyfry."
                            FormHelperTextProps={{
                                classes: { root: classes.TheHelper }
                            }}
                            InputProps={{ classes: { input: classes.TheInput } }}
                            InputLabelProps={{ classes: { root: classes.TheLabel } }}
                            value={nazwaFunkcji}
                            onChange={this.handleTextInputChange("nazwaFunkcji")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Opis zadania"
                            error={error.types && error.types.some(elem => elem === "opisZadania")}
                            helperText="Tu wpisz treść zadania, podając co najmniej nazwę funkcji do utworzenia,
                            określając jej parametry i definiując jej wymagania np.: Stwórz funkcję int
                            ZwrocPodwojona(int a). Funkcja zwraca podwojoną wartość liczby a."
                            className={classes.textField}
                            InputProps={{
                                multiline: true,
                                classes: { input: classes.textArea }
                            }}
                            FormHelperTextProps={{
                                classes: { root: classes.TheHelper }
                            }}
                            InputLabelProps={{ classes: { root: classes.TheLabel } }}
                            value={opisZadania}
                            onChange={this.handleTextInputChange("opisZadania")}
                            margin="normal"
                            variant="outlined"
                        />
                        <MySlider
                            handleSliderChange={this.handleSliderChange}
                            iloscArg={iloscArg}
                            max={5}
                        />
                        <Argumenty
                            iloscArg={iloscArg}
                            handleArgTypeChange={this.handleArgTypeChange}
                            args={args}
                        />
                        <TypZwracany
                            handleArgTypeChange={this.handleArgTypeChange}
                            returnArgs={returnArgs}
                        />
                        <StrukturaFunkcji
                            nazwaFunkcji={nazwaFunkcji}
                            returnArgs={returnArgs}
                            isEmpty={this.isEmpty}
                            wygenerujStruktureFunkcji={this.wygenerujStruktureFunkcji}
                            args={args}
                        />
                        <Editor code={code} onEditorChange={this.onEditorChange} />
                        <Testy
                            handleWynikiChange={this.handleWynikiChange}
                            iloscWynikow={iloscWynikow}
                            iloscArg={iloscArg}
                            wyniki={wyniki}
                            indeksyTablic={indeksyTablic}
                            zmienIloscWynikow={this.zmienIloscWynikow}
                        />
                        <Rekurencja
                            czyRekurencja={czyRekurencja}
                            handleSwitchChange={this.handleSwitchChange}
                        />
                        <SubmitButton
                            isInvalid={isInvalid}
                            loading={loading}
                            onSubmitClick={this.onSubmitClick}
                        />
                    </FormWrapper>
                    <BladLubKomunikat error={error} postSuccess={postSuccess} />
                </Paper>
            </Wrapper>
        );
    }
}

Landing.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
