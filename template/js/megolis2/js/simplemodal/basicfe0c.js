/*
 * SimpleModal Basic Modal Dialog
 * http://www.ericmmartin.com/projects/simplemodal/
 * http://code.google.com/p/simplemodal/
 *
 * Copyright (c) 2010 Eric Martin - http://ericmmartin.com
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Revision: $Id: basic.js 254 2010-07-23 05:14:44Z emartin24 $
 */

jQuery(function ($) {
	// Load dialog on page load
	//$('#basic-modal-content').modal();

	
	
	// Load dialog on click
	$('.zakaz_reklama').click(function (e) {
		var s = $(this).attr("rel");
		$("input[name=subject]").val(s);
		var w = $(window).width();
		var h = $(window).height();
		var minWidth = (w < 520 ? w-110 : 520) + 'px';
		var minHeight = (h < 575 ? h-60 : 575) + 'px';
		$('#info-content').modal({
			overlayClose : true,
			/*minWidth : '520px',
			minHeight : '575px',*/
			minWidth : minWidth,
			minHeight : minHeight,
			onOpen: function (dialog) {
				dialog.overlay.fadeIn('slow', function () {
					dialog.data.hide();
					dialog.container.fadeIn('slow', function () {
						dialog.data.slideDown('slow');	 
					});
				});
			},
			onClose: function (dialog) {
				dialog.data.fadeOut('fast', function () {
					dialog.container.hide('fast', function () {
						dialog.overlay.slideUp('fast', function () {
							$.modal.close();
						});
					});
				});
			}
		});

		$("#send-button").click(function(){
			var subject = $("input[name=subject]").val().replace(/\'/g,'"');
			var name = $("input[name=name]").val().replace(/\'/g,'"');
			var phone = $("input[name=phone]").val().replace(/\'/g,'"');
			var email = $("input[name=remail]").val().replace(/\'/g,'"');
			var fdbmail = '';
			var comments = $("#comments").val().replace(/\'/g,'"');

			var qr = 'q=assets/snippets/ajax/ajaxResponce.php&subject='+subject+'&name='+name+'&phone='+phone+'&email='+email+'&fdbmail='+fdbmail+'&comments='+comments;
			//alert(qr);
			//alert($("input[name=remail]").val());

			$.ajax({
				url: "index-ajax.php",                                   
				data: qr,
				type: "POST",   
				beforeSend:function(){
					$("#info-info").html('<img src="assets/templates/megapolis/img/loading-small.gif" alt="Загрузка данных" />');
				},                   
				success: function(msg){
					$("#info-info").html(msg);
				}
			})
		})
		return false;
	});


	// Load dialog on click
	$('.zakaz_zvonok').click(function (e) {
		var s = $(this).attr("rel");
		$("input[name=subject]").val(s);
		var w = $(window).width();
		var h = $(window).height();
		var minWidth = (w < 480 ? w-110 : 480) + 'px';
		var minHeight = (h < 360 ? h-60 : 360) + 'px';
			$('#info-zvonok').modal({
			overlayClose:true,/*minWidth:'480px',minHeight:'360px',*/minWidth:minWidth,minHeight:minHeight,
			onOpen: function (dialog) {
				dialog.overlay.fadeIn('slow', function () {
					dialog.data.hide();
					dialog.container.fadeIn('slow', function () {
						dialog.data.slideDown('slow');	 
					});
				});
			},
			onClose: function (dialog) {
				dialog.data.fadeOut('fast', function () {
					dialog.container.hide('fast', function () {
						dialog.overlay.slideUp('fast', function () {
							$.modal.close();
						});
					});
				});
			}
		});

		$("#send-button2").click(function(){
			var phone_code = $("input[name=phone_code]").val().replace(/\'/g,'"');
			var phone_number = $("input[name=phone_number]").val().replace(/\'/g,'"');
			var phone_name = $("input[name=phone_name]").val().replace(/\'/g,'"');
			var fdbmail = '';

			var qr = 'q=assets/snippets/ajax/ajaxResponce.php&phone_code='+phone_code+'&phone_number='+phone_number+'&phone_name='+phone_name+'&fdbmail='+fdbmail;

			$.ajax({
				url: "index-ajax.php",                                   
				data: qr,
				type: "POST",   
				beforeSend:function(){
					$("#info-info1").html('<img src="assets/templates/megapolis/img/loading-small.gif" alt="Загрузка данных" />');
				},                   
				success: function(msg){
					$("#info-info1").html(msg);
				}
			})
		})
		return false;
	});



	// Load dialog on click
	$('.showvideo').click(function (e) {
		var r=$(this).attr("rel");
		var zagol=$(this).attr("title")
		$("#info_video_block .video_zagol").html(zagol);
		var w = $(window).width();
		var h = $(window).height();
		var minWidth = (w < 650 ? w-110 : 650) + 'px';
		var minHeight = (h < 480 ? h-60 : 480) + 'px';
		$('#info_video_block').modal({
		overlayClose:true,/*minWidth:'650px',minHeight:'480px',*/minWidth:minWidth,minHeight:minHeight,
		onOpen: function (dialog) {
			dialog.overlay.fadeIn('slow', function () {
				dialog.data.hide();
				dialog.container.fadeIn('slow', function () {
					dialog.data.slideDown('slow');	 
				});
			});
		},
		onShow: function (dialog) {
			jwplayer("container").setup({ 
				flashplayer: "http://www.megapolis-reklama.by/mediaplayer/player.swf", 
				streamer:'',
				file:r,
				height: 420, 
				width: '100%',
				autoplay:true
			}); 		
		
		},
		onClose: function (dialog) {
			
			dialog.data.fadeOut('fast', function () {
				dialog.container.hide('fast', function () {
					dialog.overlay.slideUp('fast', function () {
						$.modal.close();
						$(".video_zagol").html('');
					});
				});
			});
		}	
		
		
		});

		

		return false;
	}); // End Load dialog on click




	// Load dialog on click
	$('.zakaz_tv').click(function (e) {
		var s=$(this).attr("rel");
		$("input[name=subject]").val(s);
		var w = $(window).width();
		var h = $(window).height();
		var minWidth = (w < 520 ? w-110 : 520) + 'px';
		var minHeight = (h < 575 ? h-60 : 575) + 'px';
		$('#info-content').modal({
		overlayClose:true,/*minWidth:'520px',minHeight:'575px',*/minWidth:minWidth,minHeight:minHeight,
		onOpen: function (dialog) {
			dialog.overlay.fadeIn('slow', function () {
				dialog.data.hide();
				dialog.container.fadeIn('slow', function () {
					dialog.data.slideDown('slow');	 
				});
			});
		},
		onClose: function (dialog) {
			dialog.data.fadeOut('fast', function () {
				dialog.container.hide('fast', function () {
					dialog.overlay.slideUp('fast', function () {
						$.modal.close();
					});
				});
			});
		}
		
		
		});

		$("#send-button").click(function(){
		var subject=$("input[name=subject]").val().replace(/\'/g,'"');
		var name=$("input[name=name]").val().replace(/\'/g,'"');
		var phone=$("input[name=phone]").val().replace(/\'/g,'"');
		var email=$("input[name=remail]").val().replace(/\'/g,'"');
		var addinfo1=$("#info").html();
		var addinfo2=$(".resultTable").html();
		var addinfo3=$("#itogo").html();

		var fdbmail='';
		var comments=$("#comments").val().replace(/\'/g,'"');

		var qr='q=assets/snippets/ajax/ajaxResponce.php&subject='+subject+'&name='+name+'&phone='+phone+'&email='+email+'&fdbmail='+fdbmail+'&comments='+comments+'&addinfo1='+addinfo1+'&addinfo2='+addinfo2+'&addinfo3='+addinfo3;
		
		
		$.ajax({
			url: "index-ajax.php",                                   
			data: qr,
			type: "POST",   
			beforeSend:function(){
				$("#info-info").html('<img src="assets/templates/megapolis/img/loading-small.gif" alt="Загрузка данных" />');
			},                   
			success: function(msg){
				$("#info-info").html(msg);
			}
		})


		})	

		return false;
	});




});