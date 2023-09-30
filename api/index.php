<?php

require_once './Funcionario/FuncionarioController.php';
require_once('./Reserva/Reserva.php');

$controladora = new FuncionarioController();

$caminho = $_SERVER['REQUEST_URI'];
$rota = basename($caminho);
$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo === 'GET' && preg_match('/^sessao$/i', $rota)) {
    if(verificarSessao()){
        http_response_code(200);
        die(json_encode('Autorizado'));
    }else{
        http_response_code(401);
        die(json_encode('Não autorizado'));
    }
//login
}elseif ($metodo === 'POST' && preg_match('/^login$/i', $rota)) {
    try {
        if (isset($_POST['login'], $_POST['senha'])) {
            $login = htmlspecialchars($_POST['login']);
            $senha = htmlspecialchars($_POST['senha']);
            $funcionario = $controladora->login(new Funcionario('', $login, $senha));
            http_response_code(200);
            die(json_encode($funcionario));
        } else {
            http_response_code(401);

            die(json_encode([
                'message' => 'Não autorizado',
            ]));
        }
    } catch (Exception $e) {
        http_response_code(500);

        die(json_encode([
            'message' => 'Erro interno do servidor: ' . $e->getMessage(),
        ]));
    }

//logout
}elseif($metodo === 'POST' && preg_match('/^logout$/i', $rota)) {
    $controladora->logout();
    http_response_code(200);
    die(json_encode('Flw vlw'));

    //cadastrar reserva
}elseif($metodo === 'POST' && preg_match('/^reservas$/i', $rota)) {
    try{
        if(isset($_POST['cliente'], $_POST['dia'], $_POST['horario'], $_POST['mesa'], $_POST['id'])){
        $cliente = htmlspecialchars($_POST['cliente']);
        $dia = htmlspecialchars($_POST['dia']);
        $horario = htmlspecialchars($_POST['horario']);
        $mesa = htmlspecialchars($_POST['mesa']);
        $idFuncionario = htmlspecialchars($_POST['id']);
        $reserva = new Reserva($cliente, $dia, $horario, $mesa, $idFuncionario);

        if($controladora->cadastrarReserva($reserva)){
           http_response_code(201);
           die(json_encode('Reserva cadastrada com sucesso!'));
    }else{
        http_response_code(400);
        die(json_encode('Dados não inseridos.'));
    }
    }else{
        http_response_code(409);
        die(json_encode('Erro ao cadastrar.'));
    }
    }catch (Exception $e) {
        http_response_code(500);

        die(json_encode([
            'message' => 'Erro interno do servidor: ' . $e->getMessage(),
        ]));
    }

}elseif($metodo === 'GET' && preg_match('/^reservas$/i', $rota)){
    try {
        http_response_code(200);
        echo json_encode($controladora->listarReservas());
        // die(json_encode($controladora->listarReservas()));
    } catch (Exception $e) {
        http_response_code(500);

        die(json_encode([
            'message' => 'Erro interno do servidor: ' . $e->getMessage(),
        ]));
    }

}elseif ($metodo === 'PUT' && preg_match('/^reserva$/i', basename(dirname($caminho))) && is_numeric(basename($rota))) {
    header('Content-Type: application/json');
    $data = json_decode(file_get_contents("php://input"));

    // $idReserva = $data->id ?? null;
    $idReserva = isset($data->id) ? $data->id : null;

    try {
        if(!$idReserva){
            http_response_code(404);
            die(json_encode('ID inexistente'));
        }elseif ($controladora->cancelarReserva($idReserva)) {
            http_response_code(200);
            die(json_encode('Reserva cancelada com sucesso!'));
        }
    } catch (Exception $e) {
        http_response_code(500);

        die(json_encode([
            'message' => 'Erro interno do servidor: ' . $e->getMessage(),
        ]));
    }
}
?>
