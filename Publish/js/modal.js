/**
* .modal
* @author Won Kim
*
*/
;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {
	'use strict'

	var i = 0;
	function ospModal(props) {
		this.props = {
			modalType		: 'default',			//modalType : default, view
			modalClass		: 'theme-modal',		// modal 객체 class
			modalDialogClass: '',					// modal content class 부여 (sm, md, lg 등등)
			title			: '',					// 타이틀 
			body			: '',					// body 영역
			bodyTmpl		: '',					// jquery-tmpl 형식의 객체
			footer			: '',					// footer 영역 (html)
			footerTmpl		: '',					// jquery-tmpl 형식의 객체
			options			: null,					// modal option (show, hide ... etc)
			isScrollable	: false,				
			isBackdrop		: false,				// true : static(클릭해도 모달창이 닫히지 않도록 설정), false : modal(모달 이외의 영역 클릭시, 모달 닫힘)
			isForm			: false,				//.modal-body form 추가 여부
			confirmText		: 'Confirm',			// default confirm text
			closeText		: 'Cancle',				// default close text
			onCreate		: null,					// 생성 callback
			onDispose		: null,					// Callback, called after the modal was disposed
			onSubmit		: null,				
			btnGroup		: null					// button
			/*[
					{
					'text' : '버튼1 명',
					'addClass' : 'addClass',
					'callback' : {
						'click' : function(e) {
							...
						}, 
						'change' : function(e) {
							...
						}
					},
					{
					'text' : '버튼2 명',
					'addClass' : 'addClass',
					'callback' : {
						'click' : function(e) {
							...
						}, 
						'change' : function(e) {
							...
						}
					}
				]
			}*/
		}
		Object.assign(this.props, props);
		
		this.id = 'osp-modal-' + i;
		this.show();
		i++;
	}
	
	/**
	 * modal 객체 생성
	 */
	ospModal.prototype.createContainerElement = function() {
		var self = this;
		
		this.element = document.createElement('div');
		this.element.id = this.id;
		this.element.setAttribute('class',				'modal fade '.concat(this.props.modalClass, ' ', this.props.modalType));
		this.element.setAttribute('tabindex',			'-1');
		this.element.setAttribute('role',				'dialog');
		this.element.setAttribute('aria-labelledby',	this.id);
		
		if((this.props.isBackdrop)) {
			this.element.setAttribute('data-backdrop',	'static');
		}
		
		var html 	=	'<div class="modal-dialog modal-dialog-centered ' + this.props.modalDialogClass + ' ' + ((this.props.isScrollable)? 'modal-dialog-scrollable' : '') +'">'
					+	'	<div class="modal-content">';
					
		if(this.props.isForm){
			html	+=	'		<form>';
		}
					
			html	+=	'			<div class="modal-header">'
					+	'				<strong class="modal-title"></strong>'
					+	'				<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
					+	'					<span aria-hidden="true">';
			
		if(this.props.modalType === 'view'){
			html	+=	'						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 36 36">'
					+	'							<path d="M26.671,9.329a1.125,1.125,0,0,1,0,1.593l-15.75,15.75a1.126,1.126,0,0,1-1.593-1.593l15.75-15.75a1.125,1.125,0,0,1,1.593,0Z" fill="#fff" fill-rule="evenodd"/>'
					+	'							<path d="M9.329,9.329a1.125,1.125,0,0,0,0,1.593l15.75,15.75a1.126,1.126,0,0,0,1.593-1.593L10.922,9.329a1.125,1.125,0,0,0-1.593,0Z" fill="#fff" fill-rule="evenodd"/>'
					+	'						</svg>';
			
		} else {
			html	+=	'						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 36 36">'
					+	'							<path d="M18,33.75A15.75,15.75,0,1,0,2.25,18,15.75,15.75,0,0,0,18,33.75ZM18,36A18,18,0,1,0,0,18,18,18,0,0,0,18,36Z" fill="#fff" fill-rule="evenodd"/>'
					+	'							<path d="M26.671,9.329a1.125,1.125,0,0,1,0,1.593l-15.75,15.75a1.126,1.126,0,0,1-1.593-1.593l15.75-15.75a1.125,1.125,0,0,1,1.593,0Z" fill="#fff" fill-rule="evenodd"/>'
					+	'							<path d="M9.329,9.329a1.125,1.125,0,0,0,0,1.593l15.75,15.75a1.126,1.126,0,0,0,1.593-1.593L10.922,9.329a1.125,1.125,0,0,0-1.593,0Z" fill="#fff" fill-rule="evenodd"/>'
					+	'						</svg>';
		}
		
		
			html	+=	'					</span>'
					+	'				</button>'
					+	'			</div>'
					+	'			<div class="modal-body">'
					+	'			</div>'
					+	'			<div class="modal-footer"></div>';
					
		if(this.props.isForm){
			html	+=	'		</form>';
		}
		
			html	+=	'	</div>'
					+	'</div>';
		
		this.element.innerHTML = html;
		document.body.appendChild(this.element);
		
		this.titleElement	= this.element.querySelector('.modal-title');
		this.bodyElement	= this.element.querySelector('.modal-body');
		this.formElement	= this.element.querySelector('.modal-content form');
		this.footerElement	= this.element.querySelector('.modal-footer');

		//모달 닫힐때 event
		$(this.element).on('hidden.bs.modal', function() {
			self.dispose();
		});
		
		if (this.props.onCreate) {
			this.props.onCreate(this);
		}
	}
	
	/**
	 * modal show
	 */
	ospModal.prototype.show = function() {
		
		//modal
		if (!this.element) {
			this.createContainerElement();
			
			if(this.props.options) {
				$(this.element).modal(this.props.options);
			}else {
				$(this.element).modal();
			}
		} else {
			$(this.element).modal('show');
		}
		
		//title
		if(this.props.title) {
			$(this.titleElement).show();
			this.titleElement.innerHTML = this.props.title;
			
		} else {
			$(this.titleElement).hide();
		}
		
		//body
		if(this.props.bodyTmpl){
			$(this.bodyElement).show();
			
			if(this.props.isForm){
				$(this.formElement).not('textarea').on('keyup keypress', function(e) {
					var keyCode = e.keyCode || e.which;
					if (keyCode === 13) { 
						
						var tagName = $(e.target).prop('tagName') || '';
						
						switch (tagName) {
						case 'TEXTAREA':
							break;
						default:
							e.preventDefault();
							return false;
						}
					}
				});
				$(this.bodyElement).append(this.props.bodyTmpl);
			}else{
				$(this.bodyElement).append(this.props.bodyTmpl);
			}
			
		}else if(this.props.body) {
			$(this.bodyElement).show();
			
			if(this.props.isForm){
				this.formElement.innerHTML = this.props.body;
			}else{
				this.bodyElement.innerHTML = this.props.body;
			}
			
		} else {
			$(this.bodyElement).show();
		}
		
		//footer
		if(this.props.footerTmpl){
			$(this.footerElement).show();
			$(this.footerElement).append(this.props.footerTmpl);
			
		}else if(this.props.footer) {
			$(this.footerElement).show();
			this.footerElement.innerHTML = this.props.footer;
			
		} else if(this.props.btnGroup) {
			var $footer = $(this.footerElement);
			
			/*[
					{
					'text' : '버튼1 명',
					'position' : 'left, center, right',	//default right
					'addClass' : 'addClass',
					'callback' : {
						'click' : function(e) {
							...
						}, 
						'change' : function(e) {
							...
						}
					},
					{
					'text' : '버튼2 명',
					'position' : 'left or right',	//default right
					'addClass' : 'addClass',
					'callback' : {
						'click' : function(e) {
							...
						}, 
						'change' : function(e) {
							...
						}
					}
				]
			}*/
			
			if($footer.length > 0) {
				$footer.show();
				
				$.each(this.props.btnGroup, function(i, btnInfo){
					var $btn = $('<button/>').addClass('btn');
					$.each(btnInfo, function(k, v) {
						switch (k) {
						case 'text':
							$btn.text(v);
							break;
						case 'addClass':
							$btn.addClass(v);
							break;
						case 'callback':
							$.each(v, function(eventType, callback) {
								if(callback) {
									$btn.on(eventType, callback);
								}
							});
							break;
						default:
							break;
						}
					});
					$footer.append($btn);
				});
			}
			
		} else {
			$(this.footerElement).hide();
		}
	}
	
	/**
	 * modal hide
	 */
	ospModal.prototype.hide = function() {
		$(this.element).modal('hide');
	}
	
	/**
	 * modal dispose
	 */
	ospModal.prototype.dispose = function() {
		$(this.element).modal('dispose');
		document.body.removeChild(this.element);
		
		if (this.props.onDispose) {
			this.props.onDispose(this);
		}
	}
	
	$.extend({
		ospModal : function(props) {
			return new ospModal(props);
		},
		ospAlert : function(props) {
			props.footer = '<button type="button" class="btn btn-white" data-dismiss="modal">' + props.confirmText + '</button>';
			props.onCreate = function(modal) {
				$(modal.footerElement).on('click', 'button', function(e) {
					e.preventDefault();
					modal.hide();
					
					if(modal.props.onSubmit && $.isFunction(modal.props.onSubmit)){
						modal.props.onSubmit(e.target.getAttribute('class').indexOf('btn-confirm') !== -1);
					}
				});
			};
			return this.ospModal(props);
		},
		ospConfirm : function(props) {
			props.footer = '<button class="btn btn-confirm btn-common">' + props.confirmText + '</button><button class="btn btn-white">' + props.closeText + '</button>';
			
			props.onCreate = function(modal) {
				$(modal.footerElement).on('click', 'button', function(e) {
					e.preventDefault();
					modal.hide();
					modal.props.onSubmit(e.target.getAttribute('class').indexOf('btn-confirm') !== -1);
				});
			};
			return this.ospModal(props);
		}
	});
	
	if (typeof Object.assign !== 'function') {
		Object.defineProperty(Object, 'assign', {
			value : function assign(target, varArgs) {
				if (target == null) {
					throw new TypeError('null to object!!!');
				}
				
				var to = Object(target);
				for (var index = 1; index < arguments.length; index++) {
					var nextSource = arguments[index];

					if (nextSource != null) {
						for ( var nextKey in nextSource) {
							if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
								to[nextKey] = nextSource[nextKey];
							}
						}
					}
				}
				return to;
			},
			writable : true,
			configurable : true
		});
	}

}));