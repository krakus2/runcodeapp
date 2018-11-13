import styled from 'styled-components';

export const HeaderWrapper = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
`;

export const FormWrapper = styled.div`
    justify-self: end;
    align-self: center;
    padding-right: 30px;
    padding-top: 13px;
    ${props => !props.error && 'padding-bottom: 19px'};
`;

export const MyAppBar = styled.div`
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #e0e4e7;
    padding: 0 30px;
`;

export const Title = styled.span`
    display: inline-block;
    font-size: 1.25rem;
    font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
`;

