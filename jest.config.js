module.exports = {
  //pastas que serão ignoradas nos testes
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    //array de arquivos que o jest deve executar antes dos testes
    setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  //transforma os arquivos para uma linguagem que o jest entenda
  transform:{
    //todos os arquivos que comecem com qualquer caracter, tendo um ou mais caracteres no nome, e que tenha ponto e as extensões: js|jsx|ts|tsx
    //e terminem com essas extensões devem ser transformados
    //rootDir significa a pasta raiz do projeto
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },

  testEnvironment: "jsdom",

  //para transformar arquivos CSS
  moduleNameMapper:{
    "\\.(scss|css|sass)$": "identity-obj-proxy"
  },
  //para coletar o relatório
  collectCoverage: true,
  // de quais lugares serão coletados os relatórios
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spec.tsx",//excluindo os arquivos que terminam com .spec.tsx
    "!src/**/_app.tsx",//excluindo os arquivos que terminam com .spec.tsx
    "!src/**/_document.tsx",//excluindo os arquivos que terminam com .spec.tsx
  ],
  coverageReporters: ["lcov", "json"]
}