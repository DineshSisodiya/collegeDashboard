<?php 

/**
* class for CRUD operation on Database
* 
* 
*/
class DBconfig extends mysqli
{
	private $host='localhost';
	private $user='root';
	private $pwd='';
	private $DBname='admito';
	private $conn=null;

	function connect($host=null,$user=null,$pwd=null,$DBname=null)
	{
		if(!empty($host)) {
			$this->host=$host;
		}
		if(!empty($user)) {
			$this->user=$user;
		}
		if(!empty($pwd)) {
			$this->pwd=$pwd;
		}
		if(!empty($DBname)) {
			$this->DBname=$DBname;
		}

		try {
			$this->conn=new mysqli($this->host,$this->user,$this->pwd,$this->DBname);
			if(!$this->conn) 
				throw new Exception("Could not connect to Database");
			$this->conn->set_charset("utf8");
			return $this->conn;
		} catch(Exception $DBexc) {
			echo 'Error : '.$DBexc->getMessage();
		}
	}
	function close() 
	{
		$this->conn->close();
	}
}

?>