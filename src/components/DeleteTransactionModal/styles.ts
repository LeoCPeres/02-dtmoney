import styled from "styled-components";
import { darken, transparentize } from "polished";

export const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h2 {
    color: var(--text-title);
    font-size: 1.5rem;

    margin-top: 1rem;
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: var(--green);
    max-width: 350px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    span {
      color: var(--text-title);
    }
  }

  img {
    width: 64px;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;

    border: 1px solid #d7d7d7;
    background: #e7e9ee;

    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }
  }

  button[type="submit"].save {
    width: 100%;
    height: 4rem;
    padding: 0 1.5rem;
    color: #fff;
    background: var(--red);
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }

  button[type="button"].delete {
    width: 100%;
    height: 4rem;
    padding: 0 1.5rem;
    color: #fff;
    background: var(--red);
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1rem;
    font-weight: 600;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
