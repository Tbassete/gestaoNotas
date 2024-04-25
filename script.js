let idFormulario = document.getElementById("idFormulario");

idFormulario.addEventListener("submit", (e) => {
    e.preventDefault();
})

function adicionaDadosAluno() {
    const nome = document.getElementById("input_nome").value;
    const ra = document.getElementById("input_ra").value;
    const email = document.getElementById("input_email").value;

    if (!nome || !ra || !email) {
        alert("Todos os campos são obrigatórios!");
        return;
    }
    // const aluno = new Aluno(nome, ra, email);
    const aluno = {
        nome: nome,
        ra: ra,
        email: email,
    };

    let alunos = JSON.parse(localStorage.getItem('aluno')) || [];
    alunos.push(aluno);
    localStorage.setItem('aluno', JSON.stringify(alunos));

    alert("Aluno adicionado com sucesso!");
    alunos.push(aluno);

}



let tabelaExibida = false;

function exibirTabelaAlunos() {
    if(!tabelaExibida){
    const alunos = JSON.parse(localStorage.getItem('aluno')) || [];


    const tabela = document.getElementById('idTabela');


    alunos.forEach(aluno => {

        const novaLinha = document.createElement('tr');

        novaLinha.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.ra}</td>
            <td>${aluno.email}</td>
            <td>${aluno.prova1}</td>
            <td>${aluno.provaIntegrada1}</td>
            <td>${aluno.aep1}</td>
            <td>${aluno.media1}</td>
            <td>${aluno.prova2 || '-'}</td>
            <td>${aluno.aep2 || '-'}</td>
            <td>${aluno.provaIntegrada2 || '-'}</td>
            <td>${aluno.media2Bimestre || '-'}</td>
            <td>${aluno.mediaFinal || '-'}</td>
            <td>${aluno.situacao || '-'}</td> `; // <td><button onclick="excluirAluno('${aluno.ra}', this)">Excluir</button></td>

        tabela.appendChild(novaLinha);
    });

    tabelaExibida = true;
}
}

function calculaMedia1b(prova1, provaIntegrada1, aep1){
  prova1 = parseFloat(prova1);
  provaIntegrada1 =parseFloat(provaIntegrada1);
  aep1 = parseFloat(aep1);

  return prova1 + provaIntegrada1 + aep1;
  
}

function encontrarJSONPorRA(raProcurado, alunos){

  //let alunos = JSON.parse(localStorage.getItem('aluno')) || [];
  for (let i = 0; i < alunos.length; i++) {
    if (alunos[i].ra === raProcurado) {
        return alunos[i];
    }
}

return null;
}

function adicionaNotaPorRA(raProcurado, prova1, provaIntegrada1, aep1){
  let alunos = JSON.parse(localStorage.getItem('aluno')) || [];
  let alunoEncontrado  = encontrarJSONPorRA(raProcurado, alunos);
  
  if(alunoEncontrado){
    alunoEncontrado.prova1 = prova1;
    alunoEncontrado.provaIntegrada1 = provaIntegrada1;
    alunoEncontrado.aep1 = aep1;
    alunoEncontrado.media1 = calculaMedia1b(prova1, provaIntegrada1, aep1);
    localStorage.setItem('aluno', JSON.stringify(alunos));
  }
  else{
    alert("nenhum aluno encontrado");
  }
}

function adicionaNota1Bimestre(){

  let raProcurado = document.getElementById("input_ra1").value;
  let prova1 = document.getElementById("input_prova_1").value;
  let provaIntegrada1 = document.getElementById("input_prova_integrada_1").value;
  let aep1 = document.getElementById("input_aep_1").value;

  adicionaNotaPorRA(raProcurado, prova1, provaIntegrada1, aep1);

}

function adicionaNotaPorRA2(raProcurado2, prova2, provaIntegrada2, aep2){
  let alunos = JSON.parse(localStorage.getItem('aluno')) || [];
  let alunoEncontrado  = encontrarJSONPorRA(raProcurado2, alunos);
  if(alunoEncontrado){
    alunoEncontrado.prova2 = prova2;
    alunoEncontrado.provaIntegrada2 = provaIntegrada2;
    alunoEncontrado.aep2 = aep2;
    localStorage.setItem('aluno', JSON.stringify(alunos));
  }else{
    alert("nenhum aluno encontrado");
  }
}

function adicionaNota2Bimestre(){
  let raProcurado2 = document.getElementById("input_ra2").value;
  let prova2 = document.getElementById("input_prova_2").value;
  let provaIntegrada2 = document.getElementById("input_prova_integrada_2").value;
  let aep2 = document.getElementById("input_aep_2").value;

  adicionaNotaPorRA2(raProcurado2, prova2, provaIntegrada2, aep2);
}

function editaTabela(){
  let prova1 = document.createElement('td');
  prova1.innerHTML = "<input type=number id=input_prova_1 name=prova1 min=0 max=8 step=0.01>";
}

