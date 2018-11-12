import React from "react";
import TextField from "@material-ui/core/TextField";
//import { compose } from "recompose";
//import withContext from "../../../context/Context_HOC";

const PolaTekstowe = ({
    classes,
    error,
    handleTextInputChange,
    imieINazwisko,
    tytulZadania,
    nazwaFunkcji,
    opisZadania,
    zlaNazwaFunkcji
    //context
}) => {
    return (
        <>
            <TextField
                label="Imię i Nazwisko"
                error={error.types && error.types.some(elem => elem === "imieINazwisko")}
                helperText="Podaj imię i nazwisko - autorzy najciekawszych zadań otrzymają punkty bonusowe
                zwiększające ocenę końcową z przedmiotu Wstęp do programowania."
                className={classes.textField}
                InputProps={{ classes: { input: classes.TheInput } }}
                FormHelperTextProps={{
                    classes: { root: classes.TheHelper }
                }}
                InputLabelProps={{ classes: { root: classes.TheLabel } }}
                value={imieINazwisko}
                onChange={handleTextInputChange("imieINazwisko")}
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
                onChange={handleTextInputChange("tytulZadania")}
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Nazwa funkcji"
                error={
                    (error.types && error.types.some(elem => elem === "nazwaFunkcji")) ||
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
                onChange={handleTextInputChange("nazwaFunkcji")}
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
                onChange={handleTextInputChange("opisZadania")}
                margin="normal"
                variant="outlined"
            />
        </>
    );
};

export default PolaTekstowe;
