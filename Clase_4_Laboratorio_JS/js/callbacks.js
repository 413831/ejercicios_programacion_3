//Ejemplos de callback

function operar(a,b,callback)
{
    return callback(a,b);
}

console.log(operar(4,5,sumar));
console.log(operar(4,5,restar));
console.log(operar(4,5,multiplicar));
console.log(operar(4,5,dividir));

function sumar(a,b)
{
    return a + b;
}

function restar(a,b)
{
    return a - b;
}

function multiplicar(a,b)
{
    return a * b;
}

function dividir(a,b)
{
    let z;
    if(b != 0)
    {
        z = a / b;
    }
    return z;
}
