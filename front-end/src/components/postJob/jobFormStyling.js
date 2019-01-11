import styled from "styled-components";

export const PostJobForm = styled.form`
  color: green;
  margin-top: 20px;
  // border: 1px solid blue;
`;

export const InputTitles = styled.label`
  color: blue;
  font-size: 1.8rem;
  // border: 1px solid yellow;
`;

export const Input = styled.input`
  width: 30%;
  margin-left: 2%;
  font-size: 1.8rem;
  justify-content: start;
  margin-bottom: 20px;
  // border: 1px solid green;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: start;
  // border: 1px solid red;
`;

export const TextArea = styled.textarea`
  width: 60%;
  height: 30vh;
  border-radius: 3px;
  margin-bottom: 20px;
  padding: 10px 0 10px 10px;
  text-align: top;
  line-height: 15px;
  font-size: 1.8rem;
  font-family: sans-serif;
  resize: none;
  margin-left: 2%;
`;
