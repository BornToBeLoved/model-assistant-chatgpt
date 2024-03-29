const Chat = (function(){
    const myName = "blue";
 
    // init 함수
    function init() {
        // enter 키 이벤트
        $(document).on('keydown', 'div.input-div textarea', function(e){
            if(e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                const message = $(this).val();
 
                // 메시지 전송
                sendMessage(message, myName);
                const answer = sendToServer(message, myName);
                // 입력창 clear
                clearTextarea();
                // console.log(answer)
                sendMessage(answer, "server");
            }
        });
    }
    function sendToServer(message, myName) {
        var query;
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:2000/chat",
            data: {query:message, name: myName},
            async: false,
            success: function(response){
               console.log(response)
               query = response;
            }
          });
        return query;
    }
    // 메세지 태그 생성
    function createMessageTag(LR_className, senderName, message) {
        // 형식 가져오기
        let chatLi = $('div.chat.format ul li').clone();
 
        // 값 채우기
        chatLi.addClass(LR_className);
        chatLi.find('.sender span').text(senderName);
        chatLi.find('.message span').text(message);
 
        return chatLi;
    }
 
    // 메세지 태그 append
    function appendMessageTag(LR_className, senderName, message) {
        const chatLi = createMessageTag(LR_className, senderName, message);
 
        $('div.chat:not(.format) ul').append(chatLi);
 
        // 스크롤바 아래 고정
        $('div.chat').scrollTop($('div.chat').prop('scrollHeight'));
    }
 
    // 메세지 전송
    async function sendMessage(message, name) {
        // 서버에 전송하는 코드로 후에 대체
        const data = {
            "senderName"    : name,
            "message"        : message
        };
 
        // 통신하는 기능이 없으므로 여기서 receive
        rece(data);
    }
 
    // 메세지 입력박스 내용 지우기
    function clearTextarea() {
        $('div.input-div textarea').val('');
    }
 
    // 메세지 수신
    function rece(data) {
        const LR = (data.senderName != myName)? "left" : "right";
        appendMessageTag( LR, data.senderName, data.message);
        $("body").scrollTop($(document).height());
    }
 
    return {
        'init': init
    };
})();
 
$(function(){
    Chat.init();
});

// 코드출처: https://dororongju.tistory.com/151