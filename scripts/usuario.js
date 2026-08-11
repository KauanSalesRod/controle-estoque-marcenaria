export class Usuario {
    constructor(nome, email, senha) {
        this.nome = nome
        this.email = email
        this.senha = senha;
    }
    autenticar(emailInformado, senhaInformada) {
        return emailInformado === this.email && senhaInformada === this.senha;
    }
}