import styled from 'styled-components';

const TextArea = styled.textarea`
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;

    min-height: 70px;
    border-radius: 2px;
`;

export default TextArea;