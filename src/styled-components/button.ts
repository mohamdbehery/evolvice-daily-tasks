import styled from 'styled-components';

const Button = styled.button`    
    background-color: #30cb6b;
    border: none;
    padding: 10px 20px;
    color: white;
    box-shadow: 2px 2px #88888878;
    font-weight: bold;
    margin-left: 5px;

    :hover, :active{
        color: #ccc;
        background-color: #5e3f00;
        cursor: pointer;
    }
`;

export default Button;