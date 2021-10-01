/**
 * sticky sidebar - A JavaScript plugin for making smart and high performance.
 * @link https://codepen.io/nirmalprjpt564/pen/xxxwBNN
 * @license The MIT License (MIT)
 * 
 * ----------- 주 의 사 항 -----------
 * 1. 팝업에서 Sticky-sidebar를 이용할 경우 .sticky tag에 data-scroll-target=''을 통해 스크롤 대상 영역의 ID를 넣을 것.
 *    ex) <div class="sticky" data-scroll-target="#main-content"></div>
 * 2. Sticky-sidebar가 화면 하단의 어디까지 이동할 수 있는지 계산하기 위해 .sticky-stopper 클래스를 필수로 사용할 것.
 * 
 * 예제 소스코드는 위의 링크에 작성된 URL을 통해 확인할 것.
**/

var StickySidebar = (function() {
	var $sticky = $('.sticky');	/* Scroll 대상 */
	var $stickyStopper = $('.sticky-stopper'); /* Scroll이 멈추는 영역 */
	var $scrollTarget = $sticky.data('scrollTarget') || ''; /* 스크롤 되는 화면의 ID 값; 팝업에서 사용(주석 참고) */
	var $scrollWindow = ($scrollTarget == '') ? $(window) : $($scrollTarget);
	if (!!$sticky.offset()) {
		
		var generalSidebarHeight = $sticky.innerHeight();
		var stickyTop = $sticky.offset().top;
		var stickyStopperPosition = $stickyStopper.offset().top;
		if(stickyStopperPosition > $scrollWindow.innerHeight()) stickyStopperPosition = $scrollWindow.innerHeight()
		var stopPoint = stickyStopperPosition - generalSidebarHeight;
		
		$scrollWindow.scroll(function(){
			var windowTop = $scrollWindow.scrollTop();
			var diff = windowTop - stopPoint; /* scroll 대상($sticky)의 위치 */
			if (stopPoint < windowTop) {
				$sticky.css({ position: 'absolute', top: diff });
			} else {
				$sticky.css({position: 'absolute', top: 'initial'});
			}
		});
	}
});