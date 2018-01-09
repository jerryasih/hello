<?php
session_start();

if (isset($_SESSION['log'])) {
  $_SESSION['log'] = $_SESSION['log'] + 1;
  $log = $_SESSION['log'];
} else {
  $_SESSION['log'] = 0;
}

define('USER', 'helloomooba@gmail.com');

function protect($data) {
  $data = trim($data);
  $data = htmlspecialchars($data);
  $data = stripslashes($data);
  return $data;
}

function checkId($id) {
  if ($id == USER) {
    return true;
  }
  else {
    return false;
  }
}

if (!isset($_POST['name'])) {
  $response['text'] = "you will need to tell me your ID";
  $response['status'] = "error";
  $response['log'] = $log;
  echo json_encode($response);
}
else {
  if ($_POST['name'] != NULL) {
    $name = protect($_POST['name']);
    $test = checkId($name) ? 'true' : 'false';
    $response['text'] = $test;
    $response['status'] = "success";
    $response['log'] = $log;
    echo json_encode($response);
  }
  else {
    $response['text'] = "You'll need to tell me your ID";
    $response['status'] = "error";
    $response['log'] = $log;
    echo json_encode($response);
  }
}
?>
