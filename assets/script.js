// Áreas de texto/display
const resultadoOutputInput = document.getElementById("input-output-texto")
const resultadoOutputAuxiliar = document.getElementById("output-auxiliar-texto")

// Todos los botones se trabajan por clases
const botonesNumerales = document.querySelectorAll(".numero")
const botonesFuncion = document.querySelectorAll(".funcion")
const botonesOperadores = document.querySelectorAll(".operador")

// Estado inicial
let primerNumero = ""
let segundoNumero = ""
let operador = ""
let resultado = ""

// Verificar el ingreso de datos
const valoresValidos = ["0","1","2","3","4","5","6","7","8","9", "."]
const operadoresValidos = [
    "÷", "×", "−",
     "+", "%",
     "-", "*", "/"]

// Se le agrega un EventListener a cada botón que aplicará la lógica de abajo. La lógica por botones y por teclado evidentemente es la misma, y para las 3 clases de botones se usa el mismo método de "foreach"
botonesNumerales.forEach(numero => {
    numero.addEventListener("click", ()=>{
        if (valoresValidos.includes(numero.textContent))
        {
            if (resultado != "" && operador != "" && segundoNumero != "") // Decidí que si el usuario ingresa un número cuando ya realizó una operación, se borra el contenido, por temas de simplicidad, pero si ingresa otro operador si podrá seguir calculando
            {
                LimpiarTodasVariables()
                resultadoOutputInput.textContent = numero.textContent
            }
            else if (resultadoOutputInput.textContent == "0" && numero.textContent != ".") // El segundo condicional existe en caso de que el usuario quiera hacer una operación fraccional con cero (0.5 por ejemplo)
            {
                resultadoOutputInput.textContent = numero.textContent
            }
            else if (operador != "" && segundoNumero == "")
            {
                resultadoOutputInput.textContent = numero.textContent
                segundoNumero += numero.textContent
            }
            else if (operador != "" && segundoNumero != "")
            {
                resultadoOutputInput.textContent += numero.textContent
                segundoNumero += numero.textContent
            }
            else if (!resultadoOutputInput.textContent.includes(".") ) // Verifica si el texto que aparece presenta un punto, en caso de presionarse el punto lo agrega
            {
                resultadoOutputInput.textContent += numero.textContent
            }
            else if (resultadoOutputInput.textContent.includes(".") && numero.textContent != ".") // Caso común, solo el punto no se puede agregar más de 1 vez
            {
                resultadoOutputInput.textContent += numero.textContent
            }
        }
    })
});

botonesOperadores.forEach(boton => {
    boton.addEventListener("click", ()=>{
        // Usuario ingresa número
        // Si presiona operador, se guarda el número
        // Se asigna el operador al botón seleccionado
        primerNumero = resultadoOutputInput.textContent
        segundoNumero = ""
        operador = boton.textContent
        
        switch (boton.id)
        {
            case "btn-dividir":
                resultadoOutputAuxiliar.textContent = resultadoOutputInput.textContent + "÷"
                break
            case "btn-multiplicar":
                resultadoOutputAuxiliar.textContent = resultadoOutputInput.textContent + "×"
                break
            case "btn-restar":
                resultadoOutputAuxiliar.textContent = resultadoOutputInput.textContent + "−"
                break
            case "btn-sumar":
                resultadoOutputAuxiliar.textContent = resultadoOutputInput.textContent + "+"
                break
            case "btn-parimpar":
                if (parseFloat(resultadoOutputInput.textContent) % 2 == 0)
                    {
                        resultadoOutputAuxiliar.textContent = resultadoOutputInput.textContent + " es par"
                    }
                    else
                    {
                        resultadoOutputAuxiliar.textContent = resultadoOutputInput.textContent + " es impar"
                    }
                break
        }
    })
});

botonesFuncion.forEach(boton => {
    boton.addEventListener("click", ()=>{        
        switch (boton.id)
        {
            case "btn-clear":
                if (/[a-zA-Z]/.test(resultadoOutputInput.textContent)) // Extraído de ChatGPT. Regex que revisa si el contenido tiene alguna letra.
                {
                    LimpiarTodasVariables()
                }
                else if (resultadoOutputInput.textContent.length > 1)
                {
                    resultadoOutputInput.textContent = resultadoOutputInput.textContent.slice(0, -1)
                    segundoNumero = String(segundoNumero).slice(0, -1)
                }
                else
                {
                    LimpiarTodasVariables()
                }
                break
            case "btn-clear-all":
                LimpiarTodasVariables()
                break
            case "btn-resultado":
                if (resultadoOutputInput.textContent.at(-1) == ".")
                {
                    resultadoOutputInput.textContent = resultadoOutputInput.textContent.slice(0, -1)
                }
            
                if (operador == "")
                {
                    resultadoOutputAuxiliar.textContent = resultadoOutputInput.textContent + "="
                }
                else
                {
                    if (!isNaN(primerNumero) && !isNaN(segundoNumero) && isFinite(primerNumero))
                    {
                        switch (operador)
                        {
                            case "÷":
                                resultado = parseFloat(primerNumero) / parseFloat(segundoNumero)
    
                                resultadoOutputAuxiliar.textContent = primerNumero + "÷" + segundoNumero
                                
                                resultadoOutputInput.textContent = resultado
        
                                primerNumero = resultado
                                break
                            case "×":
                                resultado = parseFloat(primerNumero) * parseFloat(segundoNumero)
                                resultadoOutputAuxiliar.textContent = primerNumero + "×" + segundoNumero
                                
                                resultadoOutputInput.textContent = resultado
        
                                segundoNumero = resultado
                                break
                            case "−":
                                resultado = parseFloat(primerNumero) - parseFloat(segundoNumero)
                                resultadoOutputAuxiliar.textContent = primerNumero + "-" + segundoNumero
                                
                                resultadoOutputInput.textContent = resultado
        
                                primerNumero = resultado
                                break
                            case "+":
                                resultado = parseFloat(primerNumero) + parseFloat(segundoNumero)
    
                                resultadoOutputAuxiliar.textContent = primerNumero + "+" + segundoNumero
        
                                resultadoOutputInput.textContent = resultado
        
                                segundoNumero = resultado
                                // La asignación de variables está intercambiada para permitir que el usuario pueda seguir dividiendo o restando con el resultado.
                                break
                        }
                    }
                }
                break
        }
    })
});

// Funcionalidad control con teclado
document.addEventListener("keydown", (pressed)=>
{
    // Desactiva "Quick find" de Firefox
    if (pressed.key == "/")
    {
        pressed.preventDefault();
    }
    
    // Todo lo de abajo es la misma lógica que los botones de arriba, solo se cambia el tipo de input.
    if (valoresValidos.includes(pressed.key))
    {   
        if (resultado != "" && operador != "" && segundoNumero != "")
        {
            LimpiarTodasVariables()
            resultadoOutputInput.textContent = pressed.key
        }
        else if (resultadoOutputInput.textContent == "0" && pressed.key != ".") // El segundo condicional existe en caso de que el usuario quiera hacer una operación fraccional con cero (0.5 por ejemplo)
        {
            resultadoOutputInput.textContent = pressed.key
        }
        else if (operador != "" && segundoNumero == "")
        {
            resultadoOutputInput.textContent = pressed.key
            segundoNumero += pressed.key
        }
        else if (operador != "" && segundoNumero != "")
        {
            resultadoOutputInput.textContent += pressed.key
            segundoNumero += pressed.key
        }
        else if (!resultadoOutputInput.textContent.includes(".") ) // Verifica si el texto que aparece presenta un punto, en caso de presionarse el punto lo agrega
        {
            resultadoOutputInput.textContent += pressed.key

        }
        else if (resultadoOutputInput.textContent.includes(".") && pressed.key != ".") // Caso común, solo el punto no se puede agregar más de 1 vez
        {
            resultadoOutputInput.textContent += pressed.key

        }
    }

    else if (operadoresValidos.includes(pressed.key))
    {
        primerNumero = resultadoOutputInput.textContent
        operador = pressed.key
        segundoNumero = ""
        resultado = ""

        if (pressed.key == "/")
        {
            resultadoOutputAuxiliar.textContent = resultadoOutputInput.textContent + "÷"
        }
        else if (pressed.key == "*")
        {
            resultadoOutputAuxiliar.textContent = resultadoOutputInput.textContent + "×"
        }
        else if (pressed.key == "-"){
            resultadoOutputAuxiliar.textContent = resultadoOutputInput.textContent + "-"
        }
        else if (pressed.key == "+"){
            resultadoOutputAuxiliar.textContent = resultadoOutputInput.textContent + "+"
        }
        else if (pressed.key == "%")
        {
            if (parseFloat(resultadoOutputInput.textContent) % 2 == 0)
            {
                resultadoOutputAuxiliar.textContent = resultadoOutputInput.textContent + " es par"
            }
            else
            {
                resultadoOutputAuxiliar.textContent = resultadoOutputInput.textContent + " es impar"
            }
        }
    }

    switch (pressed.key)
    {
        case "Backspace":
            if (/[a-zA-Z]/.test(resultadoOutputInput.textContent)) // Extraído de ChatGPT. Regex que revisa si el contenido tiene alguna letra.
            {
                LimpiarTodasVariables()
            }
            else if (resultadoOutputInput.textContent.length > 1)
            {
                resultadoOutputInput.textContent = resultadoOutputInput.textContent.slice(0, -1)
                segundoNumero = String(segundoNumero).slice(0, -1)
            }
            else
            {
                LimpiarTodasVariables()
            }
            break
        case "Enter":
            if (resultadoOutputInput.textContent.at(-1) == ".")
            {
                resultadoOutputInput.textContent = resultadoOutputInput.textContent.slice(0, -1)
            }

            if (operador == "")
            {
                resultadoOutputAuxiliar.textContent = resultadoOutputInput.textContent + "="
            }
            else
            {
                if (!isNaN(primerNumero) && !isNaN(segundoNumero) && isFinite(primerNumero))
                {
                    switch (operador)
                    {
                        case "/":
                            resultado = parseFloat(primerNumero) / parseFloat(segundoNumero)

                            resultadoOutputAuxiliar.textContent = primerNumero + "÷" + segundoNumero
                            
                            resultadoOutputInput.textContent = resultado
    
                            primerNumero = resultado
                            break
                        case "*":
                            resultado = parseFloat(primerNumero) * parseFloat(segundoNumero)
                            resultadoOutputAuxiliar.textContent = primerNumero + "×" + segundoNumero
                            
                            resultadoOutputInput.textContent = resultado
    
                            segundoNumero = resultado
                            break
                        case "-":
                            resultado = parseFloat(primerNumero) - parseFloat(segundoNumero)
                            resultadoOutputAuxiliar.textContent = primerNumero + "-" + segundoNumero
                            
                            resultadoOutputInput.textContent = resultado
    
                            primerNumero = resultado
                            break
                        case "+":
                            resultado = parseFloat(primerNumero) + parseFloat(segundoNumero)

                            resultadoOutputAuxiliar.textContent = primerNumero + "+" + segundoNumero
    
                            resultadoOutputInput.textContent = resultado
    
                            segundoNumero = resultado
                            break
                    }
                }
            }
            break
    }
})

// Función para regresar todo a su estado original.
function LimpiarTodasVariables()
{
    resultadoOutputInput.textContent = 0
    resultadoOutputAuxiliar.textContent = 0
    segundoNumero = ""
    primerNumero = ""
    operador = ""
    resultado = ""
}