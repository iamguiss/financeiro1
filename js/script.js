const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

document.addEventListener('DOMContentLoaded', function () {
    const signUpForm = document.getElementById('signup-form');
    const signInForm = document.getElementById('signin-form');

    // Função para armazenar os dados do novo usuário
    signUpForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita o envio automático do formulário
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;

        // Armazenando os dados no localStorage
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);

        // Limpar campos do formulário
        this.reset();
    });

    // Função para fazer login
    signInForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita o envio automático do formulário
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;

        // Verificar se há dados de login armazenados
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');

        if (storedEmail && storedPassword) {
            // Se houver dados de login armazenados, verifique se as credenciais coincidem
            if (email === storedEmail && password === storedPassword) {
                alert('Login realizado com sucesso! Redirecionando para a página principal.');
                window.location.href = 'financeiro.html'; // Redireciona para a página principal
            } else {
                alert('Email ou senha incorretos. Por favor, tente novamente.');
            }
        } else {
            // Se não houver dados de login armazenados, solicite ao usuário que crie uma conta primeiro
            alert('Não há dados de cadastro armazenados. Por favor, crie uma conta primeiro.');
        }
    });
});
