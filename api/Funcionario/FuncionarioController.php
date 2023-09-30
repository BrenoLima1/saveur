<?php

require_once 'DAO/config.php';
require_once 'FuncionarioDAO.php';
require_once 'Funcionario.php';
require_once('Util/sessao.php');
require_once('./Reserva/Reserva.php');

class FuncionarioController {
    private $funcionarioDAO;

    public function __construct() {
        $this->funcionarioDAO = new FuncionarioDAO(conexaoPDO());
    }

    public function login(Funcionario $funcionario) {
        try {
            $usuario = $this->funcionarioDAO->login($funcionario);
            if ($usuario) {
                // Logado com sucesso
                iniciarSessao();
                return $usuario;
            } else {
                // Login ou senha inválidos
                return false;
            }
        } catch (FuncionarioException $e) {
            http_response_code(500);
            die($e->getMessage());
        }
    }

    public function logout()
    {
        destruirSessao();
    }

    public function cadastrarReserva(Reserva $reserva)
    {
        try {
            $validacao = $this->funcionarioDAO->validarReserva($reserva);

            if($validacao){
                $cadastroReserva = $this->funcionarioDAO->cadastrarReserva($reserva);
                return $cadastroReserva;
            }

            return $validacao;
        } catch (FuncionarioException $e) {
            die($e->getMessage());
        }
    }

    public function listarReservas()
    {
        try {
            return $this->funcionarioDAO->listarReservas();
        } catch (FuncionarioException $e) {
            die($e->getMessage());
        }
    }

    public function cancelarReserva($idReserva)
    {
        try {
            return $this->funcionarioDAO->cancelarReserva($idReserva);
        } catch (FuncionarioException $e) {
            die($e->getMessage());
        }
    }
}



?>
