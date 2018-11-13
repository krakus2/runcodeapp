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
    border: 1px solid #e0e4e7;
    border-radius: 4px;
`;
