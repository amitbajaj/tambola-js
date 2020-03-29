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
    iCol=Math.floor((num-1)/10);
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
    var iIndex=0, iSeq=[], iNum=0, iPos=0;
    var iTktNums=0;
    for(i=0;i<9;i++) iSeq[i]=0;
    while(iTktNums<=15){
        iIndex=getRandom(0,remainingNums.length-1);
        iNum = remainingNums[iIndex];
        if (putNumOnTicket(iNum)){
            iTktNums++;
            remainingNums.splice(iIndex,1);
            iPos = Math.floor((iNum-1)/10);
            iSeq[iPos]++;
            if (iSeq[iPos]==3){
                iMin=(iPos*10)+1;
                iMax=(iPos+1)*10;
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

var boardNums;
function resetBoard(){
    boardNums=[];
    drawBoard();
    var recent = document.getElementById('last5nums').rows[0];
    for(i=0;i<5;i++){
        recent.cells[i].innerHTML='&nbsp;';
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

function generateNumber(){
    if (boardNums.length==0){
        alert('All numbers are on the board!!');
    }else{
        var iIndex = getRandom(0,boardNums.length-1);
        var iNum = boardNums[iIndex];
        var iRow = Math.floor((iNum-1)/10);
        var iCol = ((iNum-1) % 10);
        var tbl=document.getElementById('board');
        var cl = tbl.rows[iRow].cells[iCol];
        cl.innerHTML = iNum;
        cl.style.animation='highlight 5s';
        boardNums.splice(iIndex,1);
        var recent = document.getElementById('last5nums').rows[0];
        for(i=0;i<4;i++){
            recent.cells[i].innerHTML=recent.cells[i+1].innerHTML;
        }
        recent.cells[4].innerHTML = iNum;
    }
}
