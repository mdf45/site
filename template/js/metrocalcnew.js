function number_format( number, decimals, dec_point, thousands_sep ) {
    var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
    var d = dec_point == undefined ? "," : dec_point;
    var t = thousands_sep == undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
    var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

function print_metro_result() {
    var types = '';
    $(".metroraschetselect").each(function(){
        var res = $(this).find("select").find("option:selected").html();
        var txt = $(this).prev("div").html();
        types += '<p><b>'+txt+'</b>: '+res+'</p>';
    });
    var print_cost = $("input[name='print']:checked").val();
    var print_text = '<p><b>Стоимость печати</b>: без стоимости печати</p>';
    if (print_cost) {
        print_text = '<p><b>Стоимость печати</b>: '+number_format(print_cost, 0, '', ' ')+' руб.</p>';
    }
    var variant = $("#metrovariant").val();
    if (variant == '156') {
        print_text = '<p><b>Стоимость печати</b>: включена в стоимость размещения</p>';
    }
    types += print_text;
    /*
    if(print_cost)
        {types+='<p><b>Стоимость печати</b>: '+number_format(print_cost, 0, '', ' ')+' руб.</p>';}
    else
        {types+='<p><b>Стоимость печати</b>: без стоимости печати</p>';}
    */
    types += '<p>&nbsp;</p><p><b>ИТОГОВАЯ СТОИМОСТЬ</b>: ' + $("#result").html() + ' рублей с учетом НДС</p><p>&nbsp;</p>';
    $("input[name='metro_print_text']").val(types);
    $("#metro_print").submit();
}


function calc(){//считаем по кнопке с учетом печати или без нее
    var id = $("#metrovariant").val();
    var printer = $("#tmplvar_20").val();
    var printer = printer.substring(0, 3);
    printer = parseInt(printer, 10);
    /*printer=(printer<=168?168:236);*/
    printer = (printer <= 172 ? 172 : (printer >= 330 ? 410 : 246));
//    alert(printer);
    var price_printer=$("span.vagon_" + printer).text();
//    alert (price_printer);
    $("#printcheck").val(price_printer);
    var filter = '';
    $("select.param").each(function() {
        sid = $(this).attr("id");
        val = $(this).val();
        filter1 = "tv" + sid.substring(8) + "|" + val + "||";
        filter += filter1;
    })
    var qr = 'id='+id+'&filter='+filter;
    $.ajax({
        url: "ajaxMetro.php",                                   
        data: qr,
        type: "POST",   
        beforeSend:function(){
            $("#loader").show();
            $("#result").html('');
            $("#priceinfo").html('');
        },                   
        success: function(msg){
            $("#loader").hide();
        //    alert(msg);
            //msg1=parseInt(msg,10);
            msg1 = parseFloat(msg);
        //    alert(msg1);
            if (msg1) {
                addprice = ($("#printcheck").is(':checked')) ? $("#printcheck").val() : 0;
                //addprice = parseInt(addprice,10);
                addprice = parseFloat(addprice);
                msg = msg1+addprice;
                msg = number_format(msg, 2, '.', ' ');
                $("#priceinfo").html('рублей с учетом НДС<br /><br /><div><a href="javascript:void(0);" onclick="print_metro_result();"><img src="/assets/templates/megapolis/img/print_button.png" alt="Распечатать" /></a></div>');
				$("#result").html(msg);
            } else {
				res = msg.split('|');
				if (res[0] == 'error') {
					for (var i = 1; i < res.length; i++) {
						$("select#tmplvar_" + res[i]).parents(".control_wrapper").addClass("invalid");
					}
				}
				
			}
        }
    })
}

function recalc2(){//пересчитываем только печать при нажатии чекбокса
    summ = $("#result").html();
    summ = parseInt(summ,10);
    addsumm1 = $("#printcheck").val();
    addsumm = ($("#printcheck").is(':checked')) ? parseInt(addsumm1,10) : (parseInt(addsumm1,10)*-1);
    if (summ&&addsumm) {
        itog = summ + addsumm;
        $("#result").text(itog);
    }
}


function cans() {
    $("#result").text('');
    $("#priceinfo").text('');
}


function recalc() {
    cans();
    calc();
}


$(document).ready(function(){


$("#metrovariant").change(function(){
    $("#result").text('');
    $("#priceinfo").html('');
    var id=$("#metrovariant").val();
    if (id != '0') {
        var cr = 'id=' + id + '&action=getmetrocontent';

        $.ajax({
            url: "ajaxMetro.php",
            data: cr,
            type: "POST",   
            beforeSend:function() {
            },                   
            success: function(msg) {
                $("#metrovariantcontent").html(msg);        
            }
        })
        var qr='id='+id+'&action=change';
        $.ajax({
            url: "ajaxMetro.php",
            data: qr,
            type: "POST",   
            beforeSend:function() {
                $("#loader").show();
                $("#addparams").html('');
            },                   
            success: function(msg) {
                $("#loader").hide();
                $("#addparams").html(msg);
                $("#addparams").find('select.styler').each(function(){
                    $(this).styler();
                });
                if (id == 155 || id == 160 || id == 159 || id == 898 || id == 899) {
                    $("#printcheck").parents(".printdiv").show();
                } else {
					$("#printcheck").parents(".printdiv").hide();
				}
                if (id==159||id==160) {
                    $("#belskidka").parent("div").show();
                }
            }
        })
    }
})
$(document).on("change", "select.param", function(){
	$(this).parents(".control_wrapper").removeClass("invalid");
	
})

})