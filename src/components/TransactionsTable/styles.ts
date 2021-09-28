import styled from "styled-components";

export const Container = styled.div`
  margin-top: 4rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--shape);
      color: var(--text-body);
      border-radius: 0.25rem 0 0 0.25rem;
      max-width: 450px;

      & + td {
        border-radius: 0;
      }

      &.edit {
        border-radius: 0 0.25rem 0.25rem 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      &:first-child {
        color: var(--text-title);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &.deposit {
        color: var(--green);
      }

      &.withdraw {
        color: var(--red);
      }

      button {
        background: transparent;
        border: none;
        margin: 0;
        padding: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        & + button {
          margin-left: 1rem;
        }
      }
    }
  }
`;
