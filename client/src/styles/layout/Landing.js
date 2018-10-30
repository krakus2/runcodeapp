import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
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
`;

export const FormWrapper = styled.form`
    margin-top: 20px;
    width: 100%;
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
    flex-direction: row;
    flex-wrap: wrap;
    margin: ${defaultTheme.spacing.unit}px;
    position: relative;
    width: 100%;
    ${props => props.leftMargin && 'margin-left'}: ${defaultTheme.spacing.unit * 2}px;
`;

export const GridWrapper = styled.div`
    display: grid;
    ${props => props.grid && 'grid-template-columns'}: ${props => props.grid};
    grid-gap: 10px;
    margin: ${defaultTheme.spacing.unit}px;
`;
