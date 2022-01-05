jQuery(document).ready(function() {

		var autoPopop 						= wwsObj.autoPopop;
		var pluginUrl 						= wwsObj.plugin_url;
		var isProduct 						= wwsObj.is_product;
		var currentPageURL 				= wwsObj.current_page_url;
		var currentPopupTemplate 	= wwsObj.current_popup_template;
		var isPopupDisplayOnCurrentPage = wwsObj.is_popup_display_on_current_page;
		var groupInvitationID     = wwsObj.group_invitation_id;
		var adminAjaxURL          = wwsObj.admin_ajax_url;
		var scrollLenght					= wwsObj.scroll_lenght;

		// Mobile detection
		var isMobile = {
		    Android: function() {
		        return navigator.userAgent.match(/Android/i);
		    },
		    BlackBerry: function() {
		        return navigator.userAgent.match(/BlackBerry/i);
		    },
		    iOS: function() {
		        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		    },
		    Opera: function() {
		        return navigator.userAgent.match(/Opera Mini/i);
		    },
		    Windows: function() {
		        return navigator.userAgent.match(/IEMobile/i);
		    },
		    any: function() {
		        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		    }
		};

		
		var wwsAutoPopupAudio = document.createElement('audio');
	      wwsAutoPopupAudio.setAttribute('src', pluginUrl + 'assets/public/mp3/sk-wws-popup-open-sound.mp3');
	      jQuery.get();
	      wwsAutoPopupAudio.addEventListener("load", function() {}, true);
	


	// popup button display by scroll lenght
	if ( scrollLenght != null ) {
		jQuery(document).scroll(function () {
		    var y = jQuery(window).scrollTop() + jQuery(window).height();
		    var documentHeight = jQuery(document).height() * scrollLenght / 100;
		    if (y >= documentHeight - 10 ) {
		        jQuery('.wws-popup-container').fadeIn();
		    } else {
		        jQuery('.wws-popup-container').fadeOut();
		    }
		});
	}
	



	// Popup toggle
	jQuery('.wws-popup__close-btn').click(function() {
		jQuery('.wws-popup').slideToggle();
		jQuery('.wws-gradient').hide();
		jQuery('.wws-popup').attr('data-wws-popup-status', 0);
	});
	jQuery('.wws-popup__open-btn').click(function() {
		jQuery('.wws-popup').slideToggle();
		if ( jQuery('.wws-popup').attr('data-wws-popup-status') == 0 ) {
			jQuery('.wws-popup').attr('data-wws-popup-status', 1);
			jQuery('.wws-gradient').show();
		} else {
			jQuery('.wws-popup').attr('data-wws-popup-status', 0);
			jQuery('.wws-gradient').hide();
		}
	});


	// Hide blinking cursor
	jQuery('.wws-popup__input').click( function() {
		jQuery('.wws-blinking-cursor').hide();
	} );



	//	Auto popup
	if ( autoPopop == 1 
		&& sessionStorage.wwsAutoPopup != 1 
		&& jQuery( '.wws-popup' ).attr( 'data-wws-popup-status' ) == 0 ) {

		if ( jQuery( '.wws-popup' ).attr( 'data-wws-popup-status' ) == 0 ) {
			setTimeout( function() {
				if ( scrollLenght == null ) {
					wwsAutoPopupAudio.play();
				}
				jQuery( '.wws-popup' ).slideDown();
				jQuery('.wws-gradient').show();
				jQuery( '.wws-popup' ).attr( 'data-wws-popup-status', 1 );
				sessionStorage.wwsAutoPopup = 1;
			}, 10000 );
		}
		
	}


	// Send message
	jQuery('.wws-popup__send-btn').click( function() {
		var skWwsInput = jQuery('.wws-popup__input').val();
		var supportNumber = wwsObj.supportNumber;
		if ( skWwsInput == '' ) return;
		if ( isProduct == 1 ) {
			skWwsInput = currentPageURL + '%0A' + skWwsInput;
		}
		if ( isMobile.any() ) {
			window.open('https://api.whatsapp.com/send?phone=' + supportNumber + '&text=' + skWwsInput);
		} else {
			window.open('https://web.whatsapp.com/send?phone=' + supportNumber + '&text=' + skWwsInput);
		}
	} );


	// Group invitation click function
	jQuery('.wws-popup-group-invitation__button').click(function() {
		window.open('https://chat.whatsapp.com/' + groupInvitationID );
	});



	// User Analytics
	jQuery('.wws-popup__send-btn, .wws-popup-group-invitation__button').click( function() {
		var skWwsInput = jQuery('.wws-popup__input').val();
		if ( skWwsInput == '' ) return;

		jQuery.ajax({
			url: adminAjaxURL,
			type: 'post',
			data: { 
				'action' : 'wws_click_analytics',
				'message': skWwsInput,
			}
		})
	});

	jQuery('.wws-popup__support-person-link').click( function() {
		var skWwsInput = jQuery(this).attr('data-wws-pre-msg');
		jQuery.ajax({
			url: adminAjaxURL,
			type: 'post',
			data: { 
				'action' : 'wws_click_analytics',
				'message': skWwsInput,
			}
		})
	});





});

	