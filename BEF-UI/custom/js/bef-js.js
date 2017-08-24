/**
 * variable
 */
var defaultLang = window.localStorage.getItem('accept-language');

/**
 * Document Ready
 */
$( document ).ready(function(){
	
	$.getScript('./static/test.js', function(){});
	

    // localStorage 에서 accept language를 확인한 후 정의
    i18n.init({ lng: defaultLang, debug: false })

    /*
        lang select
     */
    // language select btn
    $('#header').append(
    '<span>' +
        '<select id="langSelect" style="margin-top:10px; width:55px; height:20px; float:right;">' +
            '<option value="en">ENG</option>' +
            '<option value="ko-KR">KOR</option>' +
            '<option value="ja">JAP</option>' +
            '<option value="zh-CN">CN</option>' +
        '</select>' +
    '</span>');
    // language 관련 local storage check
    if( null != window.localStorage.getItem('accept-language') && 'ko-KR' == window.localStorage.getItem('accept-language') ){
        $('#langSelect').val('ko-KR').attr('selected', 'selected');
    }else if( null != window.localStorage.getItem('accept-language') && 'ja' == window.localStorage.getItem('accept-language') ){
        $('#langSelect').val('ja').attr('selected', 'selected');
    }else if( null != window.localStorage.getItem('accept-language') && 'zh-CN' == window.localStorage.getItem('accept-language') ){
        $('#langSelect').val('zh-CN').attr('selected', 'selected');
    }else{
        $('#langSelect').val('en').attr('selected', 'selected');
    }
    // language select btn change
    $('#langSelect').change(function(){
        defaultLang  = $('#langSelect option:selected').val();
        window.localStorage.setItem('accept-language',defaultLang);
        location.reload();
    });


}); // end ready

/**
 * deploy 버튼 눌렸을 때 event 발생
 */
RED.events.on('deploy', function(){
    console.log('BEF - Deploy');
});





/**************************************************************************************************
 * 번역 ~ 번역 ~
 **************************************************************************************************/
/*
    dashboard 클릭 할때 마다 체크
    이유 : 번역을 위해서 (매 노드를 클릭 할때 마다 설명들이 새로 생성)
 */
$('#main-container').on('click',function(){
    if( defaultLang == 'ko-KR' ){
        koTranslateContent();
    }
});
/*
    번역 하는 곳
 */
function koTranslateContent(){
    console.log('####Translate####');
    var toTranslate = $('#main-container');

    /*---------------------------------------------------------------------
     * 공통
     *---------------------------------------------------------------------*/
    toTranslate.find('.node-help a:contains("Details")').text('자세한 설명');
    /*---------------------------------------------------------------------
     * Inject
     *---------------------------------------------------------------------*/
    toTranslate.find('.node-help p:contains("Injects a message into a flow either manually or at regular intervals. The message\n' +
        'payload can be a variety of types, including strings, JavaScript objects or the current time.")').text('인젝트');
    toTranslate.find('.node-help a:contains("Outputs")').text('출력');
    toTranslate.find('.node-help dd:contains("The configured payload of the message.")').text('payload에 설정할 메시지 입력하는 곳');
    toTranslate.find('.node-help dd:contains("An optional property that can be configured in the node.")').text('노드안에 property 옵션 설정 가능');

    toTranslate.find('.node-help p:contains("The Inject node can initiate a flow with a specific payload value.\n' +
        'The default payload is a timestamp of the current time in millisecs since January 1st, 1970.")').text('1970sus 1월 1일 ');
}


