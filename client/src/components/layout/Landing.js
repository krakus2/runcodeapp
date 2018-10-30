import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import InlineMessage from '../messages/InlineError';
import Submit from './form/Submit';
import SelectElem from './form/SelectElem';
import MySlider from './form/MySlider';
import ResultRow from './form/ResultRow';
import AddRemoveButtons from './form/AddRemoveButtons';
import { FormWrapper, Wrapper, RowWrapper } from '../../styles/layout/Landing';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: 5,
        marginBottom: 5,
        width: '100%'
    },
    textArea: {
        minHeight: 100
    },
    TheInput: {
        fontSize: 18
    },
    TheLabel: {
        fontSize: 18,
        fontWeight: 400
    },
    TheHelper: {
        fontSize: 11
    },
    paper: {
        margin: '20px 10px',
        padding: '0px 25px 10px 10px',
        width: 550
    }
});

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tytulZadania: '',
            opisZadania: '',
            iloscArg: 1, //ile parametrów ma funkcja
            iloscWynikow: 1, //ile zestawów wartości do przeprowadzenia testu wysłał uzytkownik
            args: [...Array(2)], //typy parametrów funkcji np. string
            returnArgs: [...Array(2)], //typ zwracany przez funkcje np. string
            wyniki: [...Array(2)], //wartości, które posłużą do przeprowadzenia testu np. a = 2, b = 3 i wartość zwracana 6
            czyRekurencja: false, //czy w funkcji zachodzi rekurencja
            loading: false,
            error: {},
            postSuccess: false,
            indeksyTablic: []
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    checkArgs = array => {
        let result = false;
        array.forEach(elem => {
            if (elem === undefined || elem === '' || elem === null) result = true;
        });
        return result;
    };

    async onSubmit(e) {
        e.preventDefault();
        const online = navigator.onLine;
        const {
            tytulZadania,
            opisZadania,
            iloscArg,
            iloscWynikow,
            args,
            returnArgs,
            wyniki,
            czyRekurencja
        } = this.state;
        const argCopy = [];
        for (let i = 0; i < iloscArg * 2; i++) {
            argCopy[i] = args[i];
        }
        const values = {
            tytulZadania,
            opisZadania,
            iloscArg,
            iloscWynikow,
            args,
            returnArgs,
            wyniki,
            czyRekurencja
        };
        console.log('submit', values);
        if (online) {
            try {
                const res = await axios.post('/api/tasks', values);
                this.setState(
                    {
                        tytulZadania: '',
                        opisZadania: '',
                        iloscArg: 1,
                        iloscWynikow: 1,
                        args: [...Array(2)],
                        returnArgs: [...Array(2)],
                        wyniki: [...Array(2)],
                        czyRekurencja: false,
                        loading: false,
                        error: {},
                        postSuccess: true
                    },
                    () =>
                        setTimeout(() => {
                            this.setState({ postSuccess: false });
                        }, 5000)
                );
                console.log('Submit succesed', res);
            } catch (err) {
                let error = {};
                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                    if (typeof err.response.data === 'string') {
                        error.messages = [err.response.data];
                    } else {
                        error.messages = [...Object.values(err.response.data)];
                        error.types = [...Object.keys(err.response.data)];
                    }
                    error.type = 'response';
                    //console.log("types i messages", types, messages);
                } else if (err.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(err.request);
                    error.messages = [...Object.values(err.request)];
                    error.type = 'request';
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                    error.messages = [err.message];
                    error.type = 'other';
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

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
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
            if (elem === 'Tablica []') indeksyTablic.push(i / 2);
        });
        for (let i = 0; i < iloscWynikow - 1; i++) {
            indeksyTablic.forEach((elem, j) => {
                indeksyTablic.push(elem + iloscArg + 1);
            });
        }

        if (returnArgs[0] === 'Tablica []') {
            for (let i = 0; i < iloscWynikow; i++) {
                indeksyTablic.push((i + 1) * (iloscArg + 1) - 1);
            }
        }

        return indeksyTablic;
    };

    /*handleWynikiChange2 = i => j => czyWynik => event => {
      const wyniki = [...this.state.wyniki];
      const { iloscArg } = this.state;

      if (czyWynik === true) {
         wyniki[(i + 1) * (iloscArg + 1) - 1] = event.target.value;
      } else if (czyWynik === false) {
         if (i === 0) {
            wyniki[j * i + j] = event.target.value;
         } else {
            // prettier-ignore
            wyniki[(iloscArg + 1) * i + j] = event.target.value;
         }
      }
   };*/

    handleWynikiChange = i => e => {
        const wyniki = [...this.state.wyniki];
        wyniki[i] = e.target.value; //.replace(/\s/, '');
        this.setState({ wyniki });
    };

    zmienIloscWynikow = znak => () => {
        const { iloscWynikow, iloscArg } = this.state;
        const wyniki = [...this.state.wyniki];
        if (znak === '+') {
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
        } else if (znak === '-' && iloscWynikow !== 1) {
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

    onSubmitClick = () => {
        this.setState({ loading: true, error: {} });
    };

    render() {
        const { classes } = this.props;
        const {
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
            indeksyTablic
        } = this.state;
        const argsCheck =
            this.checkArgs(args) || this.checkArgs(returnArgs) || this.checkArgs(wyniki);
        const isInvalid = opisZadania === '' || tytulZadania === '' || argsCheck;
        return (
            <Wrapper>
                <Paper classes={{ root: classes.paper }} elevation={1}>
                    <FormWrapper onSubmit={this.onSubmit}>
                        <TextField
                            id="tytulZadania"
                            label="Tytuł zadania"
                            placeholder="Zadanie 10"
                            //helperText={"This doesn't look like email adress"}
                            type="text"
                            error={error.types && error.types.some(elem => elem === 'tytulZadania')}
                            className={classes.textField}
                            InputProps={{ classes: { input: classes.TheInput } }}
                            InputLabelProps={{ classes: { root: classes.TheLabel } }}
                            /*FormHelperTextProps={{
                                classes: { root: classes.TheHelper }
                            }}*/
                            value={tytulZadania}
                            onChange={this.handleChange('tytulZadania')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="opis"
                            label="Opis zadania"
                            error={error.types && error.types.some(elem => elem === 'opisZadania')}
                            className={classes.textField}
                            InputProps={{
                                multiline: true,
                                classes: { input: classes.textArea }
                            }}
                            InputLabelProps={{ classes: { root: classes.TheLabel } }}
                            FormHelperTextProps={{
                                classes: { root: classes.TheHelper }
                            }}
                            value={opisZadania}
                            onChange={this.handleChange('opisZadania')}
                            margin="normal"
                            variant="outlined"
                        />
                        <MySlider
                            handleSliderChange={this.handleSliderChange}
                            iloscArg={iloscArg}
                            max={5}
                        />
                        {Array.from(Array(iloscArg)).map((elem, i) => (
                            <React.Fragment key={i}>
                                <RowWrapper>
                                    <SelectElem
                                        i={i}
                                        handleArgTypeChange={this.handleArgTypeChange}
                                        args={args}
                                        argsName={'args'}
                                        secondColumn={false}
                                        values={['Typ prosty', 'Tablica []']}
                                        title={`Typ A argumentu ${i + 1}`}
                                    />
                                    <SelectElem
                                        i={i}
                                        handleArgTypeChange={this.handleArgTypeChange}
                                        args={args}
                                        argsName={'args'}
                                        secondColumn={true}
                                        values={['Int', 'Double', 'Float', 'String', 'Boolean']}
                                        title={`Typ B argumentu ${i + 1}`}
                                    />
                                </RowWrapper>
                            </React.Fragment>
                        ))}
                        <RowWrapper>
                            <Typography variant="h6">Typ zwracany</Typography>
                        </RowWrapper>
                        <RowWrapper>
                            <SelectElem
                                i={0}
                                handleArgTypeChange={this.handleArgTypeChange}
                                args={returnArgs}
                                argsName={'returnArgs'}
                                secondColumn={false}
                                values={['Typ prosty', 'Tablica []']}
                                title={`Typ zwracany A`}
                            />
                            <SelectElem
                                i={0}
                                handleArgTypeChange={this.handleArgTypeChange}
                                args={returnArgs}
                                argsName={'returnArgs'}
                                secondColumn={true}
                                values={['Int', 'Double', 'Float', 'String', 'Boolean']}
                                title={`Typ zwracany B`}
                            />
                        </RowWrapper>
                        <RowWrapper>
                            <Typography variant="h6">Wyniki</Typography>
                        </RowWrapper>
                        <ResultRow
                            handleWynikiChange={this.handleWynikiChange}
                            iloscWynikow={iloscWynikow}
                            iloscArg={iloscArg}
                            wyniki={wyniki}
                            indeksyTablic={indeksyTablic}
                        />
                        <AddRemoveButtons zmienIloscWynikow={this.zmienIloscWynikow} />
                        <RowWrapper>
                            <Typography variant="h6">Czy w funkcji zachodzi rekurencja?</Typography>
                        </RowWrapper>
                        <RowWrapper leftMargin>
                            <FormControlLabel
                                //label="czyRekurencja"
                                control={
                                    <Switch
                                        checked={czyRekurencja}
                                        onChange={this.handleSwitchChange('czyRekurencja')}
                                        value="czyRekurencja"
                                        color="secondary"
                                    />
                                }
                            />
                        </RowWrapper>
                        <Submit
                            isInvalid={isInvalid}
                            loading={loading}
                            onSubmitClick={this.onSubmitClick}
                        />
                    </FormWrapper>
                    {!!Object.keys(error).length && (
                        <InlineMessage
                            isError={true}
                            text={`Something went wrong. Try again. Message: \n${error.messages &&
                                error.messages.join('\n')}`}
                        />
                    )}
                    {!!postSuccess && (
                        <InlineMessage isError={false} text={'Zadanie dodano do bazy'} />
                    )}
                </Paper>
            </Wrapper>
        );
    }
}

Landing.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
