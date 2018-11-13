import styled from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";

/*const isMobile = /iPhone|Android/i.test(navigator.userAgent);*/
// to nie jest rozwiazanie dynamiczne, moze sprobowac zaimplementowac gdzies w komponencie - done

export const styles = theme => ({
    primaryColor: {
        color: theme.palette.primary.main
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: 5,
        marginBottom: 5,
        width: "100%"
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
    /*TheHelper: {
        fontSize: theme.typography.body2.fontSize
    },
    paper: {
        margin: "20px 10px",
        padding: "32px 63px 32px 48px",
        width: isMobile ? 'auto' : 600
    }*/
});

const defaultTheme = createMuiTheme({
    typography: {
        useNextVariants: true
    }
});

export const Wrapper = styled.div`
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F7F7F8;
`;

export const MyPaper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #fff;
    border: 1px solid #e0e4e7;
    border-radius: 4px;
    margin: ${props => props.isMobile ? "20px auto" : "20px 10px"};
    padding: ${props => props.isMobile ? "10px 20px 10px 5px" : "32px 63px 32px 48px"};
    width: ${props => props.isMobile ? "100vw" : "600px"};
`;

export const FormWrapper = styled.form`
    margin-top: 20px;
    width: 100%;
`;

export const EditorWrapper = styled.div`
    margin-top: 8px;
    width: 100%;
    height: 600px;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 auto 0 auto;
`;

export const SliderWrapper = styled.div`
    margin: ${defaultTheme.spacing.unit}px 0 ${defaultTheme.spacing.unit}px
        ${defaultTheme.spacing.unit}px;
    width: 100%;
`;

export const RowWrapper = styled.div`
    display: flex;
    flex-direction: ${props => props.column ? "column" : "row"}
    flex-wrap: wrap;
    margin: ${defaultTheme.spacing.unit}px;
    position: relative;
    width: 100%;
    ${props => props.leftMargin && "margin-left"}: ${defaultTheme.spacing.unit * 2}px;
`;

export const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: ${props => props.isMobile ? "repeat(auto-fill, 70px)" : props.grid};
    grid-gap: 10px;
    margin: ${defaultTheme.spacing.unit}px;
`;

export const Span = styled.span`
    color: ${defaultTheme.palette.primary.main};
    font-weight: 600;
`;
