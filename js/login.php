<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8 />
</head>
<body>
    <form method="post" action="http://homfen.flynotions.com/test/xiamiidupload.php">
    <input type="text" name="ids"/>
	<input type="text" name="list"/>
    <input type="submit" value="upload"/>
</form>
<?
session_start();

//注销登录
if($_GET['action'] == "logout"){
    unset($_SESSION['userid']);
    unset($_SESSION['username']);
    header("Location:index.html");
    exit;
}
if(!isset($_POST['submit'])){
	echo '<script>setTimeout(function(){window.location="http://homfen.flynotions.com/404.html"},0);</script>';
    exit();
}
$username = htmlspecialchars($_POST['u']);
$password = MD5($_POST['p']);
$con = mysql_connect("mysql1405.ixwebhosting.com","A923091_homfen","H0n9f!n98adm");
if (!$con){
	die('Could not connect: ' . mysql_error());
}
mysql_select_db("A923091_homfenadmin", $con);
mysql_query("set names 'utf8'",$con);
$check_query = mysql_query("select * from admin where name='$username' and password='$password' limit 1",$con);
mysql_close($con);
if($result = mysql_fetch_array($check_query)){
    //登录成功
    $_SESSION['username'] = $username;
    $_SESSION['userid'] = $result['id'];
    echo $username,' 欢迎你！<br />';
    echo '点击此处 <a href="login.php?action=logout">注销</a> 登录！<br />';
    exit;
} else {
    header("Location:404.html");
}
?>
</body>
</html>