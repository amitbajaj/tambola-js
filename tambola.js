var tickets = [];
function markNumbers(){
    var tbl=document.getElementById('clientboard');
    for(cr=0;cr<tbl.rows.length;cr++){
        cbr=tbl.rows[cr];
        for(cc=0;cc<cbr.cells.length;cc++){
            cellNum = cbr.cells[cc].innerHTML;
            if(cellNum!='&nbsp;'){
                var tkts = document.getElementById('tickets').childNodes;
                tkts.forEach( ptag=>{
                    tkt = ptag.childNodes[0];
                    for(r=0;r<tkt.rows.length;r++){
                        row = tkt.rows[r];
                        for(c=0;c<row.cells.length;c++){
                            cell=row.cells[c];
                            if(cell.innerHTML == cellNum){
                                cell.style.backgroundColor = 'red';
                            }
                        };
                    };
                })    
            }

        }
    }

}

function makeFixedSize(sNum){
    var sFinal = '  '+sNum;
    if(sFinal.length==4) sFinal = sFinal.substr(1);
    return sFinal;
}

function printTicket(tkt){
    var line=('-'.repeat(37));
    for(r=0;r<tkt.length;r++){
        var nums = '';
        for(c=0;c<tkt[r].length;c++){
            if(tkt[r][c]!='-1'){
                nums+='|'+makeFixedSize(tkt[r][c]);
            }else{
                nums+='|   ';
            }
            
        }
        nums+='|';
        console.log(line);
        console.log(nums);
    }
    console.log(line);    
}

function isRowComplete(tkt,iRow,iMax){
    var rows=[];
    var rowCount=0;
    for(c=0;c<tkt[iRow].length;c++){
        if(tkt[iRow][c]!=-1){
            rowCount++;
        }
        if(rowCount==iMax) break;
    }
    return (rowCount==iMax);
}

function getRandom(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createTicket(iRows, iCols){
    var tkt=[];
    for(i=0;i<iRows;i++){
        tkt[i]=[];
        for(j=0;j<iCols;j++){
            tkt[i][j]=-1;
        }
    }
    return tkt;
}

function showTicket(tbl){
    //var tbl=document.getElementById('ticket');
    var tblRow, tblCol;
    while(tbl.rows.length>0) tbl.deleteRow(0);
    for(r=0;r<ticket.length;r++){
        tblRow = tbl.insertRow();
        for(c=0;c<ticket[r].length;c++){
            tblCol = tblRow.insertCell();
            tblCol.onclick=function(){
                if(this.innerHTML!='&nbsp;'){
                    if(this.style.backgroundColor){
                        this.style.backgroundColor=null;
                    }else{
                        this.style.backgroundColor='red';
                    }    
                }
            }
            tblCol.innerHTML = (ticket[r][c]=='-1'?'&nbsp;':ticket[r][c]);
        }
    }
}

function putNumOnTicket(num){
    bSuccess=false;
    iCol=Math.floor((num)/10);
    if(iCol==9) iCol=8;
    for(i=0;i<ticket.length;i++){
        if (!isRowComplete(ticket,i,5)){
            if(ticket[i][iCol]==-1){
                ticket[i][iCol]=num;
                bSuccess=true;
                break;
            }    
        }
    }
    return bSuccess;
}

var ticket;

function addTicket(){
    var p = document.createElement('P');
    var tbl = document.createElement('TABLE');
    tickets[tickets.length] = tbl;
    tbl.classList.add('board');
    generateNumbersForTicket();
    showTicket(tbl);
    p.append(tbl);
    document.getElementById('tickets').append(p);
}

function generateNumbersForTicket(){
    ticket=createTicket(3,9);
    var remainingNums = [];
    for(i=1;i<=90;i++){
        remainingNums[remainingNums.length]=i;
    }
    var iIndex=0, iSeq=[], iNum=0, iPos=0, iDblCount=0;
    var iTktNums=0;
    for(i=0;i<9;i++) iSeq[i]=0;
    var genNums=[];
    var loopCounter = 0;
    while(iTktNums<15 && loopCounter<=90){
        loopCounter++;
        iIndex=getRandom(0,remainingNums.length-1);
        iNum = remainingNums[iIndex];
        iPos = Math.floor((iNum)/10);
        if(iPos==9) iPos=8;
        if (putNumOnTicket(iNum)){
            genNums.push(iNum);
            iTktNums++;
            remainingNums.splice(iIndex,1);
            iSeq[iPos]++;
            if (iSeq[iPos]==2){
                iDblCount++;
                iMin=(iPos*10);
                iMax=((iPos+1)*10)-1;
                if (iMax==89) iMax=90;
                iLoop=0;
                while(iLoop<remainingNums.length){
                    if(remainingNums[iLoop]>=iMin && remainingNums[iLoop]<=iMax){
                        remainingNums.splice(iLoop,1);
                    }else{
                        iLoop++;
                    }
                }
            }
            if(iDblCount>4){
                for(i=0;i<9;i++){
                    if(iSeq[i]==1){
                        iMin=(iPos*10);
                        iMax=((iPos+1)*10)-1;
                        if (iMax==89) iMax=90;
                        iLoop=0;        
                        while(iLoop<remainingNums.length){
                            if(remainingNums[iLoop]>=iMin && remainingNums[iLoop]<=iMax){
                                remainingNums.splice(iLoop,1);
                            }else{
                                iLoop++;
                            }
                        }        
                    }
                }
            }
        }
    }
    var swapCount=0;
    for(c=0;c<ticket[0].length;c++){
        do{
            swapCount=0;
            for(r=0;r<ticket.length-1;r++){
                if(ticket[r+1][c]!=-1 && ticket[r][c]>ticket[r+1][c]){
                    tempNum=ticket[r][c];
                    ticket[r][c]=ticket[r+1][c];
                    ticket[r+1][c]=tempNum;
                    swapCount++;
                }
                if(r<ticket.length-2){
                    if(ticket[r+1][c]==-1){
                        if(ticket[r+2][c]!=-1 && ticket[r][c]>ticket[r+2][c]){
                            tempNum=ticket[r][c];
                            ticket[r][c]=ticket[r+2][c];
                            ticket[r+2][c]=tempNum;
                            swapCount++;
                        }    
                    }    
                }
            }    
        }while(swapCount>0);
    }
}

var boardNums;
function resetBoard(){
    boardNums=[];
    drawBoard();
    var recent = document.getElementById('last5nums').rows[0];
    for(i=0;i<5;i++){
        recent.cells[i].innerHTML='&nbsp;';
    }
}

function drawEmptyBoard(){
    var tbl=document.getElementById('clientboard');
    while(tbl.rows.length>0) tbl.deleteRow(0);
    for(r=0;r<9;r++){
        rw = tbl.insertRow();
        for(c=0;c<10;c++){
            cl = rw.insertCell();
            cl.innerHTML='&nbsp';
        }
    }
}

function drawBoard(){
    var tbl=document.getElementById('board');
    while(tbl.rows.length>0) tbl.deleteRow(0);
    for(r=0;r<9;r++){
        rw = tbl.insertRow();
        for(c=0;c<10;c++){
            boardNums[boardNums.length]=(r*10)+c+1;
            cl = rw.insertCell();
            cl.innerHTML='&nbsp';
        }
    }
}
var xhrSubmitNumber=new XMLHttpRequest();
var isActive=false;
function generateNumber(){
    if (boardNums.length==0){
        alert('All numbers are on the board!!');
    }else if(isActive){
        alert('Previous number not yet saved to the room. Please wait....');
    }else{
        var btn=document.getElementById('btnPick');
        btn.disabled=true;
        var iIndex = getRandom(0,boardNums.length-1);
        var iNum = boardNums[iIndex];
        var iRow = Math.floor((iNum-1)/10);
        var iCol = ((iNum-1) % 10);
        var tbl=document.getElementById('board');
        var cl = tbl.rows[iRow].cells[iCol];
        cl.innerHTML = iNum;
        cl.style.animation='highlight 2s';
        boardNums.splice(iIndex,1);
        var seq = 90-boardNums.length;
        var recent = document.getElementById('last5nums').rows[0];
        for(i=0;i<4;i++){
            recent.cells[i].innerHTML=recent.cells[i+1].innerHTML;
        }
        recent.cells[4].innerHTML = iNum;
        submitNumber(seq,iNum);
    }
}

function submitNumber(seq,num){
    if (roomId==''){
        //alert('No room to submit the number to...');
        var btn=document.getElementById('btnPick');
        btn.disabled=false;
        return;
    }
    var frmData=new FormData();
    frmData.append('mode','SN');
    frmData.append('seq',seq);
    frmData.append('num',num);
    frmData.append('rid',roomId);
    xhrSubmitNumber.open('POST','code/submit.php');
    xhrSubmitNumber.onreadystatechange=function(){
        if(xhrSubmitNumber.readyState==4){
            if(xhrSubmitNumber.status==200){
                var btn=document.getElementById('btnPick');
                btn.disabled=false;
                isActive=false;
            }else{
                if(confirm(num + ' count not submitted to the room!! trying again??')){
                    submitNumber(seq,num);
                }else{
                    var btn=document.getElementById('btnPick');
                    btn.disabled=false;
                    isActive=false;
                }
            }
        }
    };
    xhrSubmitNumber.send(frmData);
}

var roomId='';
function createRoom(){
    if(isActive){
        alert('This is previous request pending!');
    }else{
        roomName=document.getElementById('roomName').value;
        if(roomName==''){
            alert('Enter a room name.');
            return;
        }
        roomId=uuidv4();
        var frmData=new FormData();
        frmData.append('mode','CR');
        frmData.append('rname',roomName);
        frmData.append('rid',roomId);
        xhrSubmitNumber.open('POST','code/submit.php');
        xhrSubmitNumber.onreadystatechange=function(){
            if(xhrSubmitNumber.readyState==4){
                if(xhrSubmitNumber.status==200){
                    isActive=false;
                    document.getElementById('roomId').innerHTML=roomId;
                }else{
                    isActive=false;
                    if(confirm('Room not created! try again??')){
                        createRoom();
                    }
                }
            }
        };
        xhrSubmitNumber.send(frmData);    
    }
}
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
var xhrRoomSubscriptions=new XMLHttpRequest();
var isRoomSubsActive=false;
var lastSequence=-1;

function subscibeToRoom(){
    var roomId = document.getElementById('roomId').value.trim();
    var btn = document.getElementById('btnjoin');
    if(roomId==''){
        alert('Enter the room Id');
        btn.disabled=false;
    }else{
        if(!isRoomSubsActive){
            isRoomSubsActive=true;
            btn.disabled=true;
            frmData = new FormData();
            frmData.append('mode','GN');
            frmData.append('rid',roomId);
            frmData.append('seq',lastSequence);
            xhrRoomSubscriptions.open('POST','code/submit.php');
            xhrRoomSubscriptions.onreadystatechange=function(){
                if(xhrRoomSubscriptions.readyState==4){
                    if(xhrRoomSubscriptions.status==200){
                        var json=JSON.parse(xhrRoomSubscriptions.responseText);
                        if(json.status=='success'){
                            var tbl=document.getElementById('clientboard');
                            var l5n=document.getElementById('last5nums').rows[0];
                            var aud=document.getElementById('sayNum');
                            for(i=0;i<json.list.length;i++){
                                lastSequence=json.list[i].seq;
                                var iNum=json.list[i].num;
                                var iRow = Math.floor((iNum-1)/10);
                                var iCol = ((iNum-1) % 10);
                                var cl = tbl.rows[iRow].cells[iCol];
                                cl.innerHTML = iNum;
                                cl.style.animation='highlight 2s';
                                for(j=0;j<4;j++){
                                    l5n.cells[j].innerHTML=l5n.cells[j+1].innerHTML;
                                }
                                l5n.cells[4].innerHTML=iNum;
                            }
                            if(Number.isInteger(parseInt(iNum)) && document.getElementById("enableCallout").checked){
                                sayNum.src='media/'+iNum+'.mp3';
                                sayNum.play();    
                            }else{
                                console.log(iNum);
                                console.log(Number.isInteger(iNum));
                            }
                        }
                    }
                    isRoomSubsActive=false;
                    setTimeout(subscibeToRoom,500);
                }
            };
            xhrRoomSubscriptions.send(frmData);
        }
    }
}

var lastMessageId=-1;
var xhrMessages = new XMLHttpRequest();
var isMessageActive=false;
function sendMessage(){
    var msgBox=document.getElementById('msg');
    msgBox.disabled=true;
}

function syncMessages(){
    var rid=document.getElementById('roomId').value.trim();
    var sdr=document.getElementById('sname').value.trim();
    var msgBox=document.getElementById('msg');
    var msg=msgBox.value.trim();
    var roomId = document.getElementById('roomId').value.trim();
    var btn = document.getElementById('btnjoin');
    if(roomId==''){
        setTimeout(syncMessages,1000);
        return;
    }
    var frmData=new FormData();
    frmData.append('mode','MSG');
    frmData.append('rid',roomId);
    if(msgBox.disabled){
        frmData.append('msg',msg);
        frmData.append('sdr',sdr);
        msgBox.value='';
        msgBox.disabled=false;
    }else{
        frmData.append('msg','');
        frmData.append('sdr','');
    }
    frmData.append('mseq',lastMessageId);
    if(isMessageActive){
        msgBox.disabled=false;
        alert('Previous request pending.. try again after sometime');
    }else{
        xhrMessages.open('POST','code/submit.php');
        xhrMessages.onreadystatechange=function(){
            if(xhrMessages.readyState==4){
                isMessageActive=false;
                if(xhrMessages.status==200){
                    var json=JSON.parse(xhrMessages.responseText);
                    var ta=document.getElementById('msgs');
                    if(json.status=='success'){
                        for(i=0;i<json.list.length;i++){
                            lastMessageId=json.list[i].seq;
                            ta.innerHTML=json.list[i].sdr +' -> ' + json.list[i].msg + '\n'+ta.innerHTML;
                        }
                    }
                }
                setTimeout(syncMessages,1000);
            }
        };
        xhrMessages.send(frmData);
    }
}

setTimeout(syncMessages,1000);