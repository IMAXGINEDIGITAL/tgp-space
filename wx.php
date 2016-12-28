<?php

	// $encodingAesKey = "H8qepe1hRsFmzuCB0q0SQpjW1h0aZfHzoy9RYzO72Rq";
	// $token = "IMAXGINE";
	// $db_addr = "rm-wz9y15b6u9l4kc0z2o.mysql.rds.aliyuncs.com";
	$db_addr = "rm-wz9y15b6u9l4kc0z2.mysql.rds.aliyuncs.com";
	$db_user = "imaxgine_dba";
	$db_pwd = "!23Imaxgine";
	$db_name = "hpp_token";
	$nonce = "shduerh248urbf10";
	$app_id = "wx00ba438394c59242";
	$app_secret = "a4e017b2bfffa1ccbf56ac3326d1453e";

	$method = $_POST['method'];

	if ($method == 'calculate') {
	// if (1) {
		$timestamp = time();
		$guest_url = $_SERVER['HTTP_REFERER'];

		$mysqli = new mysqli($db_addr, $db_user, $db_pwd, $db_name);
		$query = "SELECT token, js_ticket, time FROM js_token WHERE id=1";
		$db_ret = $mysqli->query($query);

		$row = $db_ret->fetch_object();
		// echo $row;
		$token = $row->token;
		$ticket = $row->js_ticket;
		$time_last = $row->time;

		// echo $token."\n";
		// echo $ticket."\n";

		if ((time() - strtotime($time_last)) > 6000) {
			// echo "test3\n";
			$target = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$app_id&secret=$app_secret";
			// echo $target;
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL,$target);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_HEADER, 0);
			$chRet = curl_exec ($ch);
			curl_close ($ch);

			$info = json_decode($chRet, true);
			// echo $info['access_token']."\n";
			// echo $info['expires_in']."\n";
			$new_wx_token = $info['access_token'];

			$target = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=$new_wx_token&type=jsapi";
			// echo $target;
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL,$target);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_HEADER, 0);
			$chRet = curl_exec ($ch);
			curl_close ($ch);
			$info = json_decode($chRet, true);
			// echo $info['errcode']."\n";
			// echo $info['errmsg']."\n";
			// echo $info['ticket']."\n";
			// echo $info['expires_in']."\n";
			$new_jssdk_token = $info['ticket'];
			$ticket = $new_jssdk_token;

			$query = "UPDATE js_token SET token='$new_wx_token', js_ticket='$new_jssdk_token' WHERE id=1";
			$mysqli->query($query);
		}
		$mysqli->close();

		$string1 = "jsapi_ticket=$ticket&noncestr=$nonce&timestamp=$timestamp&url=$guest_url";
		$magic = sha1($string1);

		$resp = array("success"=>true);
		$data = array("appId"=>$app_id, "timestamp"=>$timestamp, "nonceStr"=>$nonce, "signature"=>$magic);
		$resp['data'] = $data;

		echo json_encode($resp);
	} else {
		$resp = array('success'=>false);
		$resp['data'] = array("errmsg"=>"invalid method");
		echo json_encode($resp);
	}

?>