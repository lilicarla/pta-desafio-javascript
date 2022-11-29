const character = document.getElementsByClassName("character")[0]; // armazena na variável fixa o primeiro elemento da classe "character", que neste caso é a imagem do personagem
const containerCharacter = document.getElementsByClassName("container-character")[0]; // armazena na variável fixa o primeiro elemento da classe "container-character", a div onde a imagem está inserida

const VELOCITY = 10; // declara a variável que tem como valor constante a velocidade do personagem. basicamente é o tamanho dos "passos" que o personagem dá ao se movimentar

const SCREEN_WIDTH = screen.width; // declara a variável que tem como valor constante a largura da tela
const SCREEN_HEIGHT = screen.height; // declara a variável que tem como valor constante a altura da tela

const SCREEN_BOTTOM_MARGIN = (window.outerHeight - window.innerHeight) + character.clientHeight; // declaramos uma variável fixa que tem como valor a margem que precisamos para que o personagem não saia do limite inferior da tela

let xPosition = 500; // variável com a posição do personagem no eixo horizonal da tela
let yPosition = 300; // variável com a posição do personagem no eixo vertical da tela

const keysAvaiable = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"] // array de teclas que podem ser pressionadas para mover o personagem
const directions = ["turnUp", "turnLeft", "turnRight", "turnDown"]; // array de direções para as quais o personagem pode se mover

window.addEventListener("keydown", (event) => { // método que "escuta" ações de pressionar o teclado e executa ações específicas a depender do valor da tecla
    const key = event.key; // variável que armazena o valor da tecla pressionada

    const keyPressedAvaiable = keysAvaiable.some((currentKey) => { // método que verifica se algum valor do array keysAvaiable atende a condição
        return currentKey === key; // retorna true se a tecla pressionada é igual a alguma tecla do array keysAvaiable
    })

    if (!keyPressedAvaiable) return; // encerra o método se a tecla pressionada não corresponde com nenhuma do array keysAvaiable

    directions.forEach((direction) => { // para cada elemento do array directions, uma condição é aplicada
        if (character.classList.contains(direction)) character.classList.remove(direction); // verifica se o elemento character possui o atributo e o remove
    })

    if (key === "ArrowUp") {
        if (yPosition === 0) { // se o personagem chegar no limite superior da tela (Y = 0), ele não se movimenta, encerrando o método
            return;
        } else { // caso contrário, o personagem se movimenta normalmente (na velocidade estabelecida anteriormente) diminuindo a distancia em relação ao topo da tela
            character.classList.add("turnUp");
            yPosition -= VELOCITY;
        }
    }

    if (key === "ArrowDown") {
        if (yPosition < SCREEN_HEIGHT - SCREEN_BOTTOM_MARGIN) { // se a posição do personagem for menor que o limite, ele se movimenta normalmente, diminuindo a distancia em relação a parte inferior da tela
            character.classList.add("turnDown");
            yPosition += VELOCITY;
        } else { // caso contrário, ele não se movimenta, encerrando o método
            return;
        }
    }

    if (key === "ArrowLeft") {
        if (xPosition === 0) { // se o personagem chegar no limite lateral esquerdo da tela (X = 0), ele não se movimenta, encerrando o método
            return;
        } else { // caso contrário, o personagem se movimenta normalmente (na velocidade estabelecida anteriormente) diminuindo a distancia em relação ao lado esquerdo da tela
            character.classList.add("turnLeft");
            xPosition -= VELOCITY;
        }
    }

    if (key === "ArrowRight") {
        if (xPosition < SCREEN_WIDTH - character.clientWidth) { // se a posição do personagem for menor que o limite lateral direito, ele se movimenta normalmente, diminuindo a distancia em relação ao lado direito da tela
            character.classList.add("turnRight");
            xPosition += VELOCITY;
        } else { // caso contrário, ele não se movimenta, encerrando o método
            return;
        }
    }

    containerCharacter.style.top = `${yPosition}px`; // atualiza-se o atributo de posição vertical do personagem no CSS
    containerCharacter.style.left = `${xPosition}px` // atualiza-se o atributo de posição horizontal do personagem no CSS
});