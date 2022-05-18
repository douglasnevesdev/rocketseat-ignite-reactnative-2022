# Configurando Ambiente

> ### Arquitetura React Native

### O que é React Native

- Framework de criação de aplicações nativas mobile.
- Projeto Open Source mantido pelo Facebook.
- Multiplataforma
- Pode manipular cada plataforma de forma diferente.

### Caracteristicas React Native

- Fast Refresh que da feedback quease que insatantâneio das alterações.
- Uma base de código para plataformas IOS e Android.
- Javascript, uma linguagem muito popular.
- Comunidade ativa com unúmeras bibliotecas e UI Frameworks.

### Tradicional

- IOS -> Object-C/Swift -> .IPA
- Android -> Java/Kotlin -> .APK
- Manter 2 bases de codigo.

> ### Configuração do ambiente de desenvolvimento

- https://react-native.rocketseat.dev/

> ### Criando um projeto no React Native

- Existe 2 formas de criar um projeto React native
  - Utilizando CLI.
  - Utilizando Expo.
- npx react-native init nomeProjeto
- Criamos o projeto myskills utilizando CLI.

# Conceitos Importantes

> ### Estrutura do projeto React Native

- No CLI temos a pasta android e IOS que contem os codigos nativos.
- .buckconfig que é um arquivo de compilação desenvolvido pelo facebook, focado no desempenho da plataforma.
- .flowconfig que faz a verificação da tipagem
- .watchmanconfig observa se tem modificações nos arquivos e espalha gatilho para refletir essas mudanças.
- metro.config.js empacotador de todo o codigo em um unico javascript.
- Para iniciar o projeto uso o comando yarn run android/ios.
- No terminal, aperta o R conseguimos recarregar o bundle.

> ### Como fazer reload na Aplicação e Fast Refresh

- Recurso que vem habilitado automaticamente para quando fizer qualquer alteração no codigo do aplicativo o refresh ser realizado.

> ### Estrutura JSX

- Podemos deixar o emulador sempre aberto acionando uma configuração no android studio, quando emulador do android estiver aberto, em configurações procure a opção emulator always on top, assim a tela do emulador sempre vai ficar absoluto sobre as outras janelas.
- Evitar importações do tipo export default function App(){}, utilize export function App(){}, dessa forma o vscode lida melhor com as importações automaticas.

> ### Utiliando StyleSheet

- Podemos utilizar estilizações inline ou importar o StyleSheet do react native e no final do arquivo declarar o objeto e utilizar no mobile.

> ### A Imutabilidade no React Utilizando o useState

- Algo que não pode ter seu conteudo alterado.
- O react fornece o useState, aonde tenho uma variavel e uma função para alterar os dados.

```javascript
const [newSkill, setNewSkill] = useState();
```

- Sempre usar no nome da função handle(Lidar) quando é uma função disparada por uma ação do usuario.
- Envolver o JSX com {} permite utilizar javascript com JSX

> ### Propriedades do React Native

- Podemos passar para nossos componentes propriedades, abaixo passei uma propriedade onPress com a função handleAddNewSkill e executo no componente.

```javascript
const [newSkill, setNewSkill] = useState('');
const [mySkills, setMySkills] = useState([]);
function handleAddNewSkill() {
  //setMySkills([...mySkills, newSkill]);
  setMySkills(oldState => [...oldState, newSkill]);
}
<Button onPress={handleAddNewSkill} />;
```

- Componente Button

```javascript
export function Button({onPress}) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={onPress}>
      <Text style={styles.buttonText}>Add</Text>
    </TouchableOpacity>
  );
}
```

- Lembre-se de adicionar o key={} fora do componente.
  > ### Scroll View x FlatList
- Para lidar com lista grande o react native tem o componente FlatList, principalmente com performace.
- Use o Scroll View para poucos elementos, se precisar de muitos utilize FlatList.
- Scroll View carrega todos os elementos enquanto o FlatList você pode gerenciar.

> ### Introdução aos Hooks com useState

- Hooks é um recurso novo do react native, anteriormente trabalhavamos com classes, inclusive armazenavamos estados na classe e hoje trabalhamos com componentes baseados em função.
- Todos os hooks inicia com use.
- Variavel normal vs variavel de estado, na variavel normal não temos impacto na interface, na variavel de estado se algum estado muda um novo render ocorre na interface.
- Quando temos um onChangeText={handleFuncao}, na realidade ele esta fazendo assim onChangeText={text => handleInputChange(text)}, porem o react permite omitir.

> ### Continuando com Hooks useEffect

- É um hook que é executado no momento da montagem do componente, recebe 2 parametros, primerio parametro é uma função e o segundo um array de dependencias, ou seja, quais são as depencias do useEffect que quando essas dependecias mudarem nosso useEffect tem que ser executado novamente.
- Se deixar o array vazio, o useEffect sera executado somente no momento de carregamento.

> ### Finalizando essa etapa do App

- Usamos o StatusBar fornecido pelo React Native para definir o topo do aplicativo.
- Podemos usar o StatusBar no App.js para aplicar o estilo em todas as paginas.

# Utilizando TypeScript

> ### Adicionando e configurando o TypeScript no App

- TypeScript é um superSet de tipagem.
- Acesse o site do react native com typescript -> https://reactnative.dev/docs/typescript

```javascript
yarn add -D typescript @types/jest @types/react @types/react-native @types/react-test-renderer
```

- No site do react-native é informado para criar um arquivo tsconfig.json na raiz do projeto e adicionar um codigo que deve ser copiado diretamente do site.
- Agora podemos renomear nossos arquivos .js para .tsx, usufruindo dessa forma do typescript.
- Inferencia de tipo de dados, quando temos valores iniciais no estado, o typescript analisa o conteudo inicial e baseado no valor inicial ele inferi(decide) qual o tipo de dado.

> ### Tipando objetos e estados

- Interface é uma representação de dados e criamos fora da função.
- Utilizando <> podemos definir o tipo, exemplo -> useState<SkillData[]>([]); Nesse caso o SkillDate[] informa que estamos esperando um array do tipo SkillData.
- Usando ? na inteface significa que o elemento é opcional.

> ### Tipando componentes com TypeScript

- Existe 2 formas de trabalhar com tipagens.
- **1 - Obtendo uma tipagem definida**
- Dessa forma ao inves de usar uma interface, declaramos uma variavel do tipo type aonde atribuimos a ela o tipo de tipagem, no react-native temos para cada elemento sua tipagem, vamos testar TouchableOpacityProps.

```javascript
type ButtonProps = TouchableOpacityProps;
export function Button({...rest}: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={styles.buttonText}>Add</Text>
    </TouchableOpacity>
  );
}
```

- Estou utilizando type sobre a variavel ButtonProps e espero como parametro da função alguma propriedade de TouchableOpacityProps, exemplo: onPress, activeOpacity entre outras.
- O ...rest captura todas as propriedades atraves do parametro e adiciona ao componente.
- **2 - Obtendo uma tipagem definida e adicionando novas tipagens.**

```javascript
interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({title, ...rest}: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
```

- Dessa forma eu extendo todas as tipagens da propriedade TouchableOpacity e adiciono a propriedade title.

```javascript
<Button activeOpacity={0.7} onPress={handleAddNewSkill} title="add" />
```

# Debug no React Native

- LogBox é a caixa amarela ou vermelha de warning que fica embaixo no mobile.
- DevTools - Aperte Ctrl + M no emulador (Chaqualhar), clicar em Debug e ele permite você inspencionar no navegador o projeto atraves do console ou sources, o item sources oferece a parte de debugar passa a passo a aplicação.
  - Importante: Se tiver usando windows, clique no item Sources, depois clique na aba FileSystem, clique em Add Folder to workspace, selecione a pasta do projeto e podera debugar, em outros sitemas isso ocorre automaticamente. (Não consegui fazer funcionar no windows)
- Inspector e Perf Monitor pode ser acionadas apertando o Ctrl + M sobre o emulador, elas fornecem o recurso de inspecionar no proprio emulador o elemento.
- DevDocs é um site que fornece documentação sobre varias linguagens e frameworks.
- Flipper é uma ferramenta para debugar o React Native, fornece todos os recursos do chrome e +. https://fbflipper.com/

# Conclusão
