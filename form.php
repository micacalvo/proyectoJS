<?php

$name = $_POST['nombre'];
$mail = $_POST['email'];
$pais = $_POST['pais'];
$ciudad = $_POST['ciudad'];
$mensaje = $_POST['coment'];
$service = $_POST['service'];


$para = 'micacalvo.asesoria@hotmail.com';
$asunto = 'Enviado desde la web';

mail($para, $asunto, utf8_decode($mensaje));

header('Location:exito.html');

?>