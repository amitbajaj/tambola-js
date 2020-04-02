<?php
include_once 'db.php';
if($isconnected){
    switch($_POST['mode']){
    case 'CR':
        $rname=$_POST['rname'];
        $rid=$_POST['rid'];
        $sql='CALL createRoom("'.$rname.'","'.$rid.'");';
        $conn->query($sql);
        break;
    case 'SN':
        $num=$_POST['num'];
        $seq=$_POST['seq'];
        $rid=$_POST['rid'];
        $sql='CALL insertNumber("'.$rid.'",'.$seq.','.$num.');';
        $conn->query($sql);
        break;
    case 'GN':
        $rid=$_POST['rid'];
        $seq=$_POST['seq'];
        $sql='CALL selectNumbers("'.$rid.'",'.$seq.');';
        if($result=$conn->query($sql)){
            $message='{"status":"success","list":[';
            $isSecond=false;
            while($row = $result->fetch_assoc()) {
                if($isSecond){
                    $message.=',';
                }
                $message.='{"seq":"'.$row['seq'].'","num":"'.$row['num'].'"}';
                $isSecond=true;
            }
            $message.=']}';
            $result->free();
        }else{
            $message='{"status":"fail","list":[],"code"="EE"';
        }
        echo $message;
        break;
    case 'MSG':
        $rid=$_POST['rid'];
        $msg=$_POST['msg'];
        $mseq=$_POST['mseq'];
        $sdr=$_POST['sdr'];
        if($msg!='' && $sdr!=''){
            $sql='CALL sendMessage("' . $rid . '","' . $sdr . '","' . $msg . '");';
            $conn->query($sql);
        }
        $sql='CALL getMessages("'.$rid.'",'.$mseq.');';
            if($res=$conn->query($sql)){
                $isSecond=false;
                $message='{"status":"success","list":[';
                while($row = $res->fetch_assoc()) {
                    if($isSecond){
                        $message.=',';
                    }
                    $message.='{"seq":"'.$row['id'].'","sdr":"'.htmlspecialchars($row['sdr']).'","msg":"'.htmlspecialchars($row['msg']).'"}';
                    $isSecond=true;
                }
                $message.=']}';
                $res->free();
            }else{
                $message='{"status":"fail","list":[],"code"="EE"';
            }
        echo $message;
        break;
    // case 'GN':
    //     $rid=$_POST['rid'];
    //     $seq=$_POST['seq'];
    //     $msg=$_POST['msg'];
    //     $mseq=$_POST['mseq'];
    //     $sdr=$_POST['sdr'];
    //     $sql='';
    //     if($msg!='' && $sdr!=''){
    //         $sql='CALL sendMessage("' . $rid . '","' . $sdr . '","' . $msg . '");';
    //         $conn->query($sql);
    //     }
    //     $sql='CALL selectNumbers("'.$rid.'",'.$seq.');';
    //     $sql.='CALL getMessages("'.$rid.'",'.$mseq.');';
    //     error_log($sql);
    //     if($conn->multi_query($sql)){
    //         if($result=$conn->store_result()){
    //             error_log('Numbers....'.$conn->error.':'.$conn->errno.':'.$conn->sqlstate.':'.$conn->field_count);
    //             $message='{"status":"success","list":[';
    //             $isSecond=false;
    //             while($row = $result->fetch_assoc()) {
    //                 if($isSecond){
    //                     $message.=',';
    //                 }
    //                 $message.='{"seq":"'.$row['seq'].'","num":"'.$row['num'].'"}';
    //                 $isSecond=true;
    //             }
    //             $message.='],"msgs":[';
    //             $result->free();
    //         }else{
    //             $message='{"status":"success","list":[],"msgs":[';
    //         }
    //         if($conn->more_results()){
    //             error_log('There are more results...');
    //         }else{
    //             error_log('There are NO more results...');
    //         }
    //         if($conn->next_result()){
    //             error_log('Message results received');
    //             if($res=$conn->store_result()){
    //                 error_log('Message results stored');
    //                 $isSecond=false;
    //                 while($row = $res->fetch_assoc()) {
    //                     error_log('Message results fetching.......' . implode('===',$row));
    //                     if($isSecond){
    //                         $message.=',';
    //                     }
    //                     $message.='{"seq":"'.$row['id'].'","sdr":"'.htmlspecialchars($row['sdr']).'","msg":"'.htmlspecialchars($row['msg']).'"}';
    //                     $isSecond=true;
    //                 }
    //                 $res->free();
    //             }else{
    //                 error_log('Could not store result :'.$conn->error.':'.$conn->errno.':'.$conn->sqlstate.':'.$conn->field_count);
    //             }
    //         }
    //         $message.=']}';
    //     }else{
    //         $message='{"status":"fail","code":"EE"}';
    //     }
    //     echo $message;
    //     break;
    default:
        $conn->query('CALL doCleanUp();');
    }
}
?>