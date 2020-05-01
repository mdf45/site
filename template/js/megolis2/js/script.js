// проверка Email на валидность
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

$(function(){
	$('.b-wrapNav .b-wrapNav__nav ul li:last').css({'margin-right': '0'});
	$('.b-mainCategory .b-mainCategory__container:nth-child(3n+3)').css({'margin-right': '0'});
	$('.b-rightColumn .b-rightColumn__listContainer:first').css({'margin-top': '19px'})
	$('.b-rightColumn .b-rightColumn__subCategoryContainer:nth-child(4n+4)').css({'margin-right': '0'})
	/*$('.b-rightColumn .b-rightColumn__subCategoryContainer-big:nth-child(3n+3)').css({'margin-left': '0'})*/
        $(' .b-wrapNav .b-wrapNav__nav  > ul > li:has(ul)').addClass('li-hover')

        $('td:contains("руб")').addClass('cost');

$(".slidetext1").toggle(function(){
$(this).addClass("active");
$(this).parent("div").next("div.slidetext").slideDown("fast");
},function(){
$(this).parent("div").next("div.slidetext").slideUp("fast");
$(this).removeClass("active");
})

$(".withtitle").tipTip({defaultPosition:'top',delay:200,edgeOffset:-20,maxWidth:'185px'});
$(".withtitle2").tipTip({defaultPosition:'bottom',delay:200,edgeOffset:4,maxWidth:'185px'});

$("img.bigger").each(function(){
$(this).wrap("<a href='"+$(this).attr("src")+"' class='fancybox'  title='"+$(this).attr("alt")+"'></a>");
$(this).parent("a").fancybox();
})

$("form.podpiska_form").on("submit",function(e){
	e.preventDefault();
	var a = $(this);
	var error = '';
	a.find(".required").each(function(){
		if($(this).val() == ''){
			$(this).addClass("invalid");
			error = 'Не заполнены обязательные поля';
		}
		if($(this).hasClass("email")){
			validEmail = isValidEmailAddress($(this).val());
			if (!validEmail) {
				$(this).addClass("invalid");
				error = 'Неверный формат E-mail';
			}
		}
	})
	if (error == '') {
		a.find('.form_info').html('');
		var data2 = $(this).serialize();
		$.ajax({
			url: "ajax.php",                                   
			data: data2,
			type: "POST",
			dataType: "json",
			beforeSend:function(){
				a.find('.form_info').html('Отправляем...');
			},                   
			success: function(msg){
				a.find('.form_info').html('');
				if (msg.error) {
					a.find('.form_info').html('<span class="error">' + msg.error + '</span>');
				} else {
					a.find('.form_info').html('<span class="ok">' + msg.status + '</span>');
					a.find('.form_content').hide();
				}
			}
		})
	} else {
		a.find('.form_info').html('<span class="error">' + error + '</span>');
	}
})

$("input").on("keyup change",function(e){
	if($(this).hasClass("invalid")){
		$(this).removeClass("invalid");
		$(this).parent().find(".field_err").remove();
	}
});
$("textarea").on("keyup change",function(e){
	if($(this).hasClass("invalid")){
		$(this).removeClass("invalid");
	}
});
$(document).click( function(event){
	if( $(event.target).closest(".podpiska_btn").length ) 
	return;
	if( $(event.target).closest(".modal_podpiska").length ) 
	return;
	$(".modal_podpiska").stop().fadeOut();
	event.stopPropagation();
});

$(document).on("click", ".podpiska_btn", function(e) {
	e.preventDefault();
	$(".modal_podpiska").stop().fadeIn();
})

$(".simple_text table").css({"max-width":"100%"}).wrap("<div class='table_wrapper'></div>");
$(".table_wrapper").append("<div class='table_strelka table_strelka_after'></div>").prepend("<div class='table_strelka table_strelka_before'></div>");
/*if($('.table_wrapper').length) {
	alert('ok');
}*/

$(".fancyvideo").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none',
		helpers : {
              media: true
         },
         youtube : {
             autoplay: 0
         }
});

function send_rating(rate) {
    var qr = 'rate=' + rate;
    $.ajax({
        url : "rating.php",                                   
        data : qr,
        type : "POST",   
        beforeSend : function() {},                   
        success : function(msg) {
            txt = msg.split("|");
            if (txt[0] == 'ok') {
                $("#site_rating").html(txt[2]);
                //alert(txt[1]);
                //show_modal_notify('ok', txt[1]);
                alert(txt[1]);
            } else {
                //alert(txt[1]);
                //show_modal_notify('error', txt[1]);
                alert(txt[1]);
            }
        }
    })
}
$(document).on("click", "a.rate", function(e){
    e.preventDefault();
    var rate = $(this).data("rate");
    send_rating(rate);
})

});