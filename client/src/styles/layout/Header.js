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
