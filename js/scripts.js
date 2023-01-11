// SCRIPT COMENTADO PARA FINS DE ESTUDO

const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    // adicionar digito no visor da calculadora
    addDigit(digit) {
        //verificar se currentOperation já tem alguma string "."
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    // todas as operações da calculadora
    processOperation(operation) {

        // checar se o current é vazio
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            if (this.previousOperationText.innerText !== "") {
                // mudar operação
                if (this.previousOperationText.innerText !== "") {
                    this.changeOperation(operation);
                }
            } return // para não mudar a operação caso o previous esteja vazio
        }

        // pegar valores atuais e anteriores
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0]; // converter o valor para número
        const current = +this.currentOperationText.innerText // converter o valor para número

        switch (operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperator();
                break;
            case "C":
                this.processClearAllOperation();
                break;
            case "=":
                this.processEqualOperation();
                break;
            default:
                return;
        }
    }

    // mudar valores no visor da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // checar se value é zero. se for, apenas adicionar o current value lá pra cima
            if (previous === 0) {
                operationValue = current
            }

            // adicionar o current value para value
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

    // mudar operação matemática
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]

        if (!mathOperations.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // deletar um digito do current
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    // limpar visor current
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    // limpar todo o visor 
    processClearAllOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // metódo de igual
    processEqualOperation() {
        const operation = previousOperationText.innerText.split(" ")[1]
        this.processOperation(operation);
    }
};

const calc = new Calculator(previousOperationText, currentOperationText);

// para cada variável buttons, que acima recebe a tag button do id buttons-container, como btn, execute:
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => { // ao realizar o evento "click" na variável btn, receba o evento como parametro
        const value = e.target.innerText; // variável value recebe evento como texto HTML

        if (+value >= 0 || value === ".") { // se variável value for número (+value) maior ou igual a 0, ou se for string ".", execute:
            calc.addDigit(value) // exibe no console a variável value
        } else { // caso o contrário
            calc.processOperation(value) // exibe no console string "Op: " mais o valor da variável value
        }
    });
});