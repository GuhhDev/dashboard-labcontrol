import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #f5f6fa;
    color: #333;
  }

  button {
    cursor: pointer;
  }
  
  /* Layout para conteúdo ao lado da sidebar */
  body > #root > div {
    display: flex;
  }
  
  /* Estilo para os containers de conteúdo principais */
  main {
    flex: 1;
    margin-left: 240px;
    padding: 2rem;
    min-height: 100vh;
    width: calc(100% - 240px);
    
    @media (max-width: 768px) {
      margin-left: 70px;
      width: calc(100% - 70px);
    }
    
    @media (max-width: 480px) {
      margin-left: 0;
      width: 100%;
    }
  }
`;