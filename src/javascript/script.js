// Seleciona todos os elementos com a classe '.kanban-card' e adiciona eventos a cada um deles
document.querySelectorAll('.card').forEach(card => {
    // Evento disparado quando começa a arrastar um card
    card.addEventListener('dragstart', e => {
        // Adiciona a classe 'dragging' ao card que está sendo arrastado
        e.currentTarget.classList.add('dragging');
    });

    // Evento disparado quando termina de arrastar o card
    card.addEventListener('dragend', e => {
        // Remove a classe 'dragging' quando o card é solto
        e.currentTarget.classList.remove('dragging');
    });
});

// Seleciona todos os elementos com a classe '.kanban-cards' (as colunas) e adiciona eventos a cada um deles
document.querySelectorAll('.cards').forEach(column => {
    // Evento disparado quando um card arrastado passa sobre uma coluna (drag over)
    column.addEventListener('dragover', e => {
        // Previne o comportamento padrão para permitir o "drop" (soltar) do card
        e.preventDefault();
        // Adiciona a classe 'cards-hover'
        e.currentTarget.classList.add('cards-hover');
    });

    // Evento disparado quando o card sai da área da coluna (quando o card é arrastado para fora)
    column.addEventListener('dragleave', e => {
        // Remove a classe 'cards-hover' quando o card deixa de estar sobre a coluna
        e.currentTarget.classList.remove('cards-hover');
    });

    // Evento disparado quando o card é solto (drop) dentro da coluna
    column.addEventListener('drop', e => {
        // Remove a classe 'cards-hover', já que o card foi solto
        e.currentTarget.classList.remove('cards-hover');

        // Seleciona o card que está sendo arrastado (que tem a classe 'dragging')
        const dragCard = document.querySelector('.card.dragging');
        
        // Anexa (move) o card arrastado para a coluna onde foi solto
        e.currentTarget.appendChild(dragCard);
    });
});



// Função para criar um novo card
function criarCard(titulo, coluna) {
    const novoCard = document.createElement('div');
    novoCard.classList.add('card');
    novoCard.setAttribute('draggable', 'true');

    novoCard.innerHTML = `
        <div class="badge alta">
            <span>Alta Prioridade</span>
        </div>

        <p class="card-titulo">${titulo}</p>

        <button class="btn-deletar">
            <i class="fa-solid fa-trash"></i>
        </button>

        <div class="card-infos">
            <div class="card-icon">
                <p>
                    <i class="fa-regular fa-comment"></i>
                    0
                </p>
                <p>
                    <i class="fa-solid fa-paperclip"></i>
                    0
                </p>
            </div>

            <div class="user">
                <img src="src/images/avatar.png" alt="avatar">
            </div>
        </div>
    `;

    // Eventos drag
    novoCard.addEventListener('dragstart', e => {
        e.currentTarget.classList.add('dragging');
    });
    novoCard.addEventListener('dragend', e => {
        e.currentTarget.classList.remove('dragging');
    });

    // Evento deletar
    novoCard.querySelector('.btn-deletar').addEventListener('click', e => {
        e.currentTarget.closest('.card').remove();
    });

    coluna.querySelector('.cards').appendChild(novoCard);
}

// Botões de adicionar
document.querySelectorAll('.add').forEach(botao => {
    botao.addEventListener('click', () => {
        const coluna = botao.closest('.tarefa-coluna');

        // Se já tiver formulário aberto, não cria outro
        if (coluna.querySelector('.form-adicionar')) return;

        // Cria o formulário
        const form = document.createElement('div');
        form.classList.add('form-adicionar');
        form.innerHTML = `
            <input type="text" placeholder="Título da tarefa" class="input-tarefa" />
            <button class="btn-salvar">Salvar</button>
        `;

        coluna.appendChild(form);

        const input = form.querySelector('.input-tarefa');
        input.focus();

        // Salvar card
        form.querySelector('.btn-salvar').addEventListener('click', () => {
            const titulo = input.value.trim();
            if (titulo !== '') {
                criarCard(titulo, coluna);
                form.remove();
            } else {
                alert('Por favor, digite o título da tarefa.');
                input.focus();
            }
        });
    });
});
