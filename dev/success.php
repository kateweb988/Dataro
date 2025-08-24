<?php
header("Content-Type: text/html; charset=utf-8");
$name = htmlspecialchars($_POST["name"]);
$name2 = htmlspecialchars($_POST["name2"]);
$data = htmlspecialchars($_POST["data"]);
$tele = htmlspecialchars($_POST["tele"]);
$number = htmlspecialchars($_POST["number"]);


$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); // число.месяц.год  
$time=date("H:i"); // часы:минуты:секунды 
$myemail = "konkord_rekruting@mail.ru";

$tema = "Новая заявка";
$message_to_myemail = "
<br><br>
Имя: $name<br>
Имя2: $name2<br>
Телефон: $data<br>
Телеграм: $tele<br>
Номер: $number<br>

Источник (ссылка): $refferer
";

mail($myemail, $tema, $message_to_myemail, "From: Army <admin@kateweb.ru> \r\n  \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );



?>
