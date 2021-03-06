function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function esValido(val, reinas, k){
    let result = true

    for(let i = 0; i < k; i++){
        // Analizar las filas
        if(val == reinas[i]){
            result = false
            break
        } 
        // Analizar la columna diagonal derecha
        if(val + k == reinas[i] + i){
            result = false
            break
        }
        // Analizar la columna diagonal izquierda
        if(val - k == reinas[i] - i){
            result = false
            break
        }
    }

    return result
}

function getDominio(reinas, k, n){
    let dominio = new Array(0)

    for(let i = 0; i < n; i++){
        if(esValido(i, reinas, k)){
            dominio.push(i)
        }
    }

    return dominio
}

const algoritmo_las_vegas = (n) => {
    n = parseInt(n)
    let reinas = new Array(n);
    let timeout = parseInt(state.timeout);
    let estados = new Set();

    let i = 0
    let k = 0
    
    while(timeout > 0 && k < n){
        const time = new Date();
        if(k == 0){
            reinas[0] = getRandomInt(n)
            k++
        }else{
            let dominio = getDominio(reinas, k, n)
            
            if(dominio.length != 0){
                reinas[k] = dominio[getRandomInt(dominio.length)]
                k++
            }else{
                k = 0
            }
        }

        estados.add(reinas.slice(0,k).join(''))

        i++
        
        timeout -= (new Date().getTime() - time.getTime());
    }

    let cantidad_estados = estados.size
    if (k == n)
        return {reinas: reinas, pasos: i,estados: cantidad_estados}
    else
        return undefined
};