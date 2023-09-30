<?php

require_once ('RepositorioFuncionarioDAO.php');
require_once ('Funcionario.php');
require_once('FuncionarioException.php');
require_once('./Reserva/Reserva.php');

class FuncionarioDAO implements RepositorioFuncionarioDAO{

    private $pdo;
    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
      }

      public function login(Funcionario $funcionario)
    {

        try {
            $ps = $this->pdo->prepare('SELECT * FROM funcionarios WHERE login = ?');
            $ps->execute([$funcionario->getLogin()]);
            $ps->setFetchMode(PDO::FETCH_ASSOC);
            $data = $ps->fetch();

            if (!$data || !password_verify( $funcionario->getSenha(), $data['senha'])) {
                return null;
            }

            return $data;
        } catch (PDOException $e) {
            throw new FuncionarioException("Falha na conexão : " . $e->getMessage());
        }
    }

    public function validarReserva(Reserva $reserva){
        try{
            $ps = $this->pdo->prepare("SELECT * FROM reservas WHERE reservas.id_mesa = ? AND reservas.dia = ?
            AND TIMEDIFF(?, reservas.horario) < '02:00:00' AND TIMEDIFF(reservas.horario, ?) < '02:00:00'
            AND reservas.situacao <> 'cancelada'");
            $ps->execute([$reserva->getMesa(), $reserva->getDia(), $reserva->getHorario(), $reserva->getHorario()]);
            $mesaReservada = $ps->fetch(PDO::FETCH_ASSOC);

            if ($mesaReservada){
            http_response_code(409);
            return false;
            }
            return true;

        }catch(PDOException $e){
            throw $e;
        }

    }

    public function cadastrarReserva(Reserva $reserva){
        try{
            $this->pdo->beginTransaction();
            $ps = $this->pdo->prepare("INSERT INTO reservas(id_funcionario, id_mesa, cliente, dia, horario, situacao) VALUES (?,?,?,?,?,?)");

            if($this->validarReserva($reserva)){
                $ps->execute([$reserva->getIdFuncionario(), $reserva->getMesa(), $reserva->getnomeCliente(), $reserva->getDia(), $reserva->getHorario(), $reserva->getSituacao()]);
                $this->pdo->commit();
                return true;
            }

            $this->pdo->rollBack();
            return false;

        }catch(PDOException $e){
            $this->pdo->rollBack();
            throw new FuncionarioException("Falha ao cadastrar reserva : " . $e->getMessage());
        }

    }

	public function listarReservas() {
        try {
            $ps = $this->pdo->query(" SELECT
            reservas.id as idReserva,
            funcionarios.nome as funcionarios,
            reservas.cliente as cliente,
            mesas.numero as mesa,
            reservas.dia as dia,
            reservas.horario as horario,
        reservas.situacao as situacao FROM reservas
            JOIN funcionarios ON(funcionarios.id = reservas.id_funcionario)
            JOIN mesas ON (mesas.id = reservas.id_mesa)
        WHERE situacao <> 'cancelada' AND situacao <> 'concluída' AND dia >= CURDATE() ORDER BY dia, horario, mesa");
        return $ps->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new FuncionarioException("Falha ao listar reservas: " . $e->getMessage());
        }
	}

	public function cancelarReserva($idReserva) {
        try {
            $this->pdo->beginTransaction();
            $ps = $this->pdo->prepare("UPDATE reservas SET situacao = 'cancelada' WHERE id = ?");
            $ps->execute([$idReserva]);
            $this->pdo->commit();
            return true;
        } catch (FuncionarioException $e) {
            $this->pdo->rollBack();
            http_response_code(500);
            throw new FuncionarioException("Falha ao listar reservas: " . $e->getMessage());
        }
	}
}
?>
