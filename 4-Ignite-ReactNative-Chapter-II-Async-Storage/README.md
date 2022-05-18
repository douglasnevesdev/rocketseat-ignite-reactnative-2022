# Ambiente Expo

> ### O projeto que vamos codar

- https://www.figma.com/file/vThJ6qrb4HDT6RfO5sJGu0/GoFinances-Ignite
- Regra da Apple, se você ter algum login social é obrigatorio ter da Apple tambem se não eles não publica o aplicativo na loja.

> ### Introdução ao Expo

- Framework que tem como objetivo gerenciar o ambiente de desenvolvimento.

> ### Projeto com Expo Managed x Bare Workflow

- Quando iniciamos a construção de um projeto utilizando o expo ele fornece as opções para escolher entre o Expo Managed e Bare Workflow logo apos o comando expo init meuapp.

### Expo Managed

- Não temos a pasta android/ios.
- Não temos o poder para customizar nativamente o android/ios.
- Temos que utilizar as APIs disponiveis no Expo.
- Para projetos simples, normalmente projetos pequenos.
- Você pode fazer o eject, aonde ele cria as pastas android/ios.

### Bare Workflow

- Fornece as pastas android/ios.
- Você tem todos os recursos nativos de ambas as plataformas.
- Tem todos os beneficos que o expo fornece.
- A partir da versão 4.62.0 não existe mais a opção de criar o projeto Bare Workflow com typescript configurado.
  - Siga os passos abaixo: https://www.notion.so/Configurando-TS-no-Expo-Bare-72ab2a6c963947308f3d166547631b46

# Styled Components

> ### Conhecendo o Styled Components

- Criar a pasta src com objetivo de manter os arquivos criados por nos.
- A biblioteca Styled Components permite utilizar o css como na web e permite dividir ainda mais a aplicação do seu aspecto funcional e do seu aspecto visual.

> ### Criando componentes com o Styled Components

- Instalar a biblioteca Styled components e sua tipagem

```javascript
yarn add styled-components
yarn add @types/styled-components-react-native -d
```

- A partir deste momento, para cada componente criamos um arquivo styles.ts, observe que usamos a extensão .ts ao inves de .tsx, isso porque não vamos renderizar nosso elemento de estilo, isso é feito por nosso componente que vai renderizar nossa interface .tsx.
- Todo componente React começa com letra maiscula, o index.tsx é uma excessão.
- Instalar o plugin Styled Components no vscode.

> ### Criando estilos globais

- É importante centralizar informações de cores, fontes entre outros itens em um local.
- Criamos uma pasta chamada global dentro de src para salvar tudo que desejo compartilhar com toda aplicação.
- O Styled-components fornece o ThemeProvider que deve ser utilizado no App.tsx para aplicar o estilo global.
- O ThemeProvider é um contexto.
- Agora atraves das propriedades do styled-components podemos pegar a propriedade theme que esta disponivel para toda a aplicação.

```javascript
background-color: ${(props) => props.theme.colors.primary}; //Estruturado
background-color: ${({ theme }) => theme.colors.primary}; //Destruturado
```

- Criamos um arquivo styled.d.ts que é utilizado para sobrescrever tipos utilizando typescript.

> ### Utilizando Fontes personalizadas

- Para instalar fontes, vamos usar uma biblioteca do expo.

```javascript
expo install expo-font @expo-google-fonts/poppins
```

- No arquivo principal app.tsx vamos importa as fontes que precisamos no projeto incluindo o hooks useFonts fornecido pelo expo.
- Adicionaremos mais um classe para ter um maior controle da splash, com isso podemos carregar o aplicativo somente quando a fonte ser carregada primeiro.

```javascript
expo install expo-app-loading
```

> ### Densidade de Pixel

- 2010 o Iphone 4 traz as telas de retina, dessa forma os pixel foram divididos em 2, pixel de hardware (ponto de luz na tela) e pixel de software.
- Densidade de pixel é a quantidade total do numero de pixel que existe dentro de uma area fisica da tela, conhecido tambem como DPI, pixel por polegada, ou seja, em celulares maior a tendencia é ter muito mais pixel na tela, então quando falamos que um celular tem uma densidade menor de quantidade de pixel significa que ele te menos pixel na tela.
- Quanto mais proximo do usuario o equipamente(tela) melhor seria ter mais densidade de pixel, porque ele vai obter mais detalhes e quando mais distante menor, ou seja, ele distante não precisa de muita resolução.
- Independencia de densidade que tem como objetivo renderizar os elementos de uma forma independente das caracteristicas exatas da densidade de pixel, o google criou para o android uma nova unidade de medida que conhecemos como DPI (Pixel independentes de densidade) e a apple criou points (Usa mesma logica que o DPI) e por isso no react não usamos px, % porque o proprio react vai renderizar isso de acordo com a unidade de medida de cada plataforma.
- Vamos tentar trabalhar com proporções ao inves de unidades absolutas, para tentar melhor adaptar aos celulares.
- Para definir altura temos 2 caminhos
  - Definir em pixel
  - Utilizando uma biblioteca que trabalha com proporção.
- Usaremos a biblioteca react-native-responsive-fontsize que permite trabalhar semelhante ao .rem no css.

```javascript
yarn add react-native-responsive-fontsize
```

```javascript
height: ${RFPercentage(42)}px; // Retorna o pixel ja convertido com proporção.
```

> ### utilizando Icones

- Quando utilizamos expo temos instalado por padrão uma biblioteca vector-icons -> https://icons.expo.fyi/
- Foi apresentado como utilizar o styled componentes inclusive para componentes não nativos.

> ### Acessando propriedades no Styled Components

- Podemos acessar as propriedades de um elemento pelo styledcomponentes, usando o .attrs({})``

> ### Posicionando os cartões em destaque

- Biblioteca iphone-x helper auxilia em adicionar uma margem de segurança.

```javascript
yarn add react-native-iphone-x-helper
```

> ### Tipando e acessando propriedades no Styled Components

- Se precisar definir os tipos possiveis que uma interface Typescript pode usar você pode fazer da seguinte maneira:

```javascript
interface Props {
  title: string;
  amount: string;
  lastTransaction: string;
  type: "up" | "down" | "total";
}
```
