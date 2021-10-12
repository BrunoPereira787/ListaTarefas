
const getBanco = () => JSON.parse(localStorage.getItem('tarefa')) ?? [];
const setBanco = (banco) => localStorage.setItem('tarefa', JSON.stringify(banco));

window.onload = () => adTarefaBanco()

const criaTarefa = (tarefa, classe = '', i) => {
    if(tarefa === ''){
        return
    } else{
        const div = document.createElement('div');
        div.setAttribute(`class`, `lista ${classe}`);
        div.innerHTML += `
            <p>${tarefa}</p>
            <div class="icone">
                <img src="icones/Group11.svg" class="iconCompleta" alt="" data-indice=${i}>
                <img src="icones/Group12.svg" alt="" class="apagarTarefa" data-indice=${i}>
            </div>    
        `;
        document.querySelector('.listaTarefa').appendChild(div);   
        document.querySelector('.adTarefaInput').value = '';
    }
}

const adTarefa = (e) => {
    if(e.charCode === 13){
        const adTarefaInput = document.querySelector('.adTarefaInput');
        const banco = getBanco();
        banco.push({tarefa: `${adTarefaInput.value}`, classe: ''});
        setBanco(banco);
        adTarefaBanco();
    }
}

const adTarefaButton = () =>{
    const adTarefaInput = document.querySelector('.adTarefaInput');
    if(!adTarefaInput.value) return
    const banco = getBanco();
    banco.push({tarefa: `${adTarefaInput.value}`, classe: ''});
    setBanco(banco);
    adTarefaBanco(); 
}

const limparBanco = () =>{
    const listaTarefa = document.querySelector('.listaTarefa');
    while(listaTarefa.firstChild){
        listaTarefa.removeChild(listaTarefa.lastChild);
    }
}

document.querySelector('.adTarefaInput').addEventListener('keypress', adTarefa);
document.querySelector('.buttonTarefa').addEventListener('click', adTarefaButton)

const apagarTarefa = (inidice) =>{
    const banco = getBanco();
    banco.splice(inidice, 1);
    setBanco(banco);    
    adTarefaBanco();
}

const atualizarTarefa = (inidice) =>{
    const banco = getBanco();
    banco[inidice].classe = banco[inidice].classe === '' ? 'completa' : '';
    setBanco(banco);
    adTarefaBanco();
}

document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('apagarTarefa')){
        const indice = el.dataset.indice;
        apagarTarefa(indice)
    } else if (el.classList.contains('iconCompleta')){
        const indice = el.dataset.indice;
        atualizarTarefa(indice)
    }
});

const limparTarefa = (tarefa) =>{
    tarefa.value = ''
}

const adTarefaBanco = () =>{
    limparBanco()
    const banco = getBanco();
    for(let i = 0; i < banco.length; i++){
        let {tarefa, classe} = banco[i];
        criaTarefa(tarefa, classe, i);
    }
}


