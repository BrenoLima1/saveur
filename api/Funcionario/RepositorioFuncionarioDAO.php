<?php

interface RepositorioFuncionarioDAO
{
    public function login(Funcionario $funcionario);

    public function cadastrarReserva(Reserva $reserva);

    public function validarReserva(Reserva $reserva);

    public function listarReservas();

    public function cancelarReserva($idReserva);
}

?>
