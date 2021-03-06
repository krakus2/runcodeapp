import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';

export const styles = theme => ({
   primaryColor: {
      color: theme.palette.primary.main
   },
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
   }
});

const defaultTheme = createMuiTheme({
   typography: {
      useNextVariants: true
   }
});

export const Wrapper = styled.main`
   font-size: 18px;
   display: flex;
   flex-direction: column;
   align-items: center;
   background-color: #f7f7f8;
`;

export const MyPaper = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   background: #fff;
   border: 1px solid #e0e4e7;
   border-radius: 4px;
   margin: ${props => (props.isMobile ? '20px auto 0 auto' : '20px 10px')};
   padding: ${props => (props.isMobile ? '10px 25px 10px 10px' : '32px 63px 32px 48px')};
   width: ${props => (props.isMobile ? '100vw' : '600px')};
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
   ${props => !props.error && 'padding-bottom: 19px'};
   ${props => !props.isMobile && 'margin: 0 -10px 0 auto'};
   .lds-ring {
      display: inline-block;
      position: relative;
      width: 24px;
      height: 24px;
   }
   .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 22px;
      height: 22px;
      margin: 2px;
      border: 2px solid #fff;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #fff transparent transparent transparent;
   }
   .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
   }
   .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
   }
   .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
   }
   @keyframes lds-ring {
      0% {
         transform: rotate(0deg);
      }
      100% {
         transform: rotate(360deg);
      }
   }
`;

export const SliderWrapper = styled.div`
   margin: ${defaultTheme.spacing.unit}px 0 ${defaultTheme.spacing.unit}px
      ${defaultTheme.spacing.unit}px;
   width: 100%;
`;

export const RowWrapper = styled.div`
   display: flex;
   flex-direction: ${props => (props.column ? 'column' : 'row')};
   flex-wrap: wrap;
   margin: ${defaultTheme.spacing.unit}px;
   position: relative;
   width: 100%;
   margin-left: ${props => (props.leftMargin ? `${defaultTheme.spacing.unit}px` : '0px')};
`;

export const GridWrapper = styled.div`
   display: grid;
   grid-template-columns: ${props =>
      props.isMobile ? 'repeat(auto-fill, 70px)' : props.grid};
   grid-gap: 10px;
`;

export const Span = styled.span`
   color: ${defaultTheme.palette.primary.main};
   font-weight: 600;
`;
