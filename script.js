// Função principal para gerar CPF válido
function gerarCPF() {
    // Gerar 9 dígitos aleatórios
    let cpf = [];
    for (let i = 0; i < 9; i++) {
        cpf.push(Math.floor(Math.random() * 10));
    }

    // Calcular primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += cpf[i] * (10 - i);
    }
    let primeiroDigito = 11 - (soma % 11);
    if (primeiroDigito >= 10) primeiroDigito = 0;
    cpf.push(primeiroDigito);

    // Calcular segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += cpf[i] * (11 - i);
    }
    let segundoDigito = 11 - (soma % 11);
    if (segundoDigito >= 10) segundoDigito = 0;
    cpf.push(segundoDigito);

    // Verificar se não é um CPF inválido (todos dígitos iguais)
    if (cpf.every(digito => digito === cpf[0])) {
        return gerarCPF(); // Gerar novamente se for inválido
    }

    // Formatar CPF
    const cpfFormatado = `${cpf.slice(0,3).join('')}.${cpf.slice(3,6).join('')}.${cpf.slice(6,9).join('')}-${cpf.slice(9,11).join('')}`;
    
    document.getElementById('cpfGerado').textContent = cpfFormatado;
}

// Função para copiar CPF para área de transferência
function copiarCPF() {
    const cpf = document.getElementById('cpfGerado').textContent;
    
    // Criar elemento temporário para copiar
    const elemento = document.createElement('textarea');
    elemento.value = cpf;
    document.body.appendChild(elemento);
    elemento.select();
    document.execCommand('copy');
    document.body.removeChild(elemento);
    
    // Feedback visual
    const botao = document.querySelector('.copiar');
    const textoOriginal = botao.textContent;
    botao.textContent = '✅ Copiado!';
    botao.style.background = '#28a745';
    
    setTimeout(() => {
        botao.textContent = textoOriginal;
    }, 2000);
}

// Função para validar CPF (usada internamente)
function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');
    
    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) return false;
    
    // Valida primeiro dígito
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let dv1 = resto >= 10 ? 0 : resto;
    if (dv1 !== parseInt(cpf.charAt(9))) return false;
    
    // Valida segundo dígito
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let dv2 = resto >= 10 ? 0 : resto;
    if (dv2 !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

// Gerar CPF automático quando a página carrega
window.onload = function() {
    gerarCPF();
};

// Adicionar evento de tecla para atalho (opcional)
document.addEventListener('keydown', function(event) {
    // Ctrl + G para gerar novo CPF
    if (event.ctrlKey && event.key === 'g') {
        event.preventDefault();
        gerarCPF();
    }
    // Ctrl + C para copiar (mas o navegador já faz isso)
});