/*

	jQuery Tags Input Plugin 1.3.3
	
	Copyright (c) 2011 XOXCO, Inc
	
	Documentation for this plugin lives here:
	http://xoxco.com/clickable/jquery-tags-input
	
	Licensed under the MIT license:
	http://www.opensource.org/licenses/mit-license.php

	ben@xoxco.com

*/

(function($) {

	var delimiter = new Array();
	var tags_callbacks = new Array();
	var tagsAvailable = [];
	$.fn.doAutosize2 = function(o){
	    var minWidth = $(this).data('minwidth'),
	        maxWidth = $(this).data('maxwidth'),
	        val = '',
	        input = $(this),
	        testSubject = $('#'+$(this).data('tester_id'));
	
	    if (val === (val = input.val())) {return;}
	
	    // Enter new content into testSubject
	    var escaped = val.replace(/&/g, '&amp;').replace(/\s/g,' ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	    testSubject.html(escaped);
	    // Calculate new width + whether to change
	    var testerWidth = testSubject.width(),
	        newWidth = (testerWidth + o.comfortZone) >= minWidth ? testerWidth + o.comfortZone : minWidth,
	        currentWidth = input.width(),
	        isValidWidthChange = (newWidth < currentWidth && newWidth >= minWidth)
	                             || (newWidth > minWidth && newWidth < maxWidth);
	
	    // Animate width
	    if (isValidWidthChange) {
	        input.width(newWidth);
	    }


  };
  $.fn.resetAutosize2 = function(options){
    // alert(JSON.stringify(options));
    var minWidth =  $(this).data('minwidth') || options.minInputWidth || $(this).width(),
        maxWidth = $(this).data('maxwidth') || options.maxInputWidth || ($(this).closest('.tagsinput').width() - options.inputPadding),
        val = '',
        input = $(this),
        testSubject = $('<tester/>').css({
            position: 'absolute',
            top: -9999,
            left: -9999,
            width: 'auto',
            fontSize: input.css('fontSize'),
            fontFamily: input.css('fontFamily'),
            fontWeight: input.css('fontWeight'),
            letterSpacing: input.css('letterSpacing'),
            whiteSpace: 'nowrap'
        }),
        testerId = $(this).attr('id')+'_autosize_tester';
    if(! $('#'+testerId).length > 0){
      testSubject.attr('id', testerId);
      testSubject.appendTo('body');
    }

    input.data('minwidth', minWidth);
    input.data('maxwidth', maxWidth);
    input.data('tester_id', testerId);
    input.css('width', minWidth);
  };
  
	$.fn.addTag2 = function(value,options, alias) {
			options = jQuery.extend({focus:false,callback:true},options);
			this.each(function() { 
				var id = $(this).attr('id');
				
				var tagslist = $(this).val().split(delimiter[id]);
				if (tagslist[0] == '') { 
					tagslist = new Array();
				}

				value = jQuery.trim(value);
		
				if (options.unique) {
					var skipTag = $(this).tagExist2(value);
				} else {
					var skipTag = false; 
				}
				
				var a = $('#'+id+'_available_values').find('.ava_choice:visible');
				if (a.length == 1 && !a.hasClass('chose') && !alias) {
					alias = a.text();
					value = a.data('code');
					a.addClass('chose');
				}
				
				//$('#'+id+'_tag').removeClass('not_valid');
				if(skipTag == true) {
				    //Marks fake input as not_valid to let styling it
				    $('#'+id+'_tag').addClass('not_valid');
    			}
				
				if (value !='' && skipTag != true) { 
                    $('<span></span').addClass('tag').append(
                        $('<span></span>').text(alias || value).append('&nbsp;&nbsp;'),
                        $('<a>', {
                            href  : '#',
                            title : 'Removing tag',
                            text  : 'x'
                        }).click(function () {
                            return $('#' + id).removeTag2(escape(value), alias);
                        })
                    ).insertBefore('#' + id + '_addTag');
                    
					tagslist.push(value || alias);
				
					$('#'+id+'_tag').val('');
					if (options.focus) {
						$('#'+id+'_tag').focus();
					} else {		
						$('#'+id+'_tag').blur();
					}
					
					$.fn.tagsInput2.updateTagsField2(this,tagslist);
					//$.fn.tagsInput2.updateAvailableValues2(this ,value);
					
					if (options.callback && tags_callbacks[id] && tags_callbacks[id]['onAddTag']) {
						var f = tags_callbacks[id]['onAddTag'];
						f.call(this, value);
					}
					if(tags_callbacks[id] && tags_callbacks[id]['onChange'])
					{
						var i = tagslist.length;
						var f = tags_callbacks[id]['onChange'];
						f.call(this, $(this), tagslist[i-1]);
					}
				}
		
			});		
			
			return false;
		};
		
	$.fn.removeTag2 = function(value, alias) { 
			value = unescape(value);
			this.each(function() { 
				var id = $(this).attr('id'),
					old = $(this).val().split(delimiter[id]), _i;
				
				for (var i = 0, len = old.length; i < len; i++) {
					if (old[i] == value) {
						old.splice(i,1);
						_i = i;
					}
				}
				$('#'+id+'_tagsinput').find('.tag').eq(_i).remove();
				str = old.join(delimiter[id]);
				
				$(this).val(str);
				//$.fn.tagsInput.importTags2(this,str);
				$.fn.tagsInput2.updateVisibleValues2(this, alias);

				if (tags_callbacks[id] && tags_callbacks[id]['onRemoveTag']) {
					var f = tags_callbacks[id]['onRemoveTag'];
					f.call(this, value);
				}
			});
					
			return false;
		};
	
	$.fn.tagExist2 = function(val) {
		var id = $(this).attr('id');
		var tagslist = $(this).val().split(delimiter[id]);
		return (jQuery.inArray(val, tagslist) >= 0); //true when tag exists, false when not
	};
	
	// clear all existing tags and import new ones from a string
	$.fn.importTags2 = function(str, all) {
                id = $(this).attr('id');
		$('#'+id+'_tagsinput .tag').remove();
		$.fn.tagsInput2.importTags2(this,str, all);
	};
		
	$.fn.tagsInput2 = function(options) { 
    var settings = jQuery.extend({
      interactive:true,
      placeholder:'add a tag',
      minChars:0,
      width:'300px',
      height:'100px',
      autocomplete: {selectFirst: false },
      'hide':true,
      'delimiter':',',
      'unique':true,
      removeWithBackspace:true,
      placeholderColor:'#666666',
      autosize: true,
      comfortZone: 20,
      inputPadding: 6*2,
      tagsVisible: [],
      tagsAvailable: []
    },options);

		this.each(function() { 
			if (settings.hide) { 
				$(this).hide();				
			}
			var id = $(this).attr('id');
			/*if (!id || delimiter[$(this).attr('id')]) {
				console.warn(!id);
				id = $(this).attr('id', 'tags' + new Date().getTime()).attr('id');
			}*/
			
			var data = jQuery.extend({
				pid:id,
				real_input: '#'+id,
				holder: '#'+id+'_tagsinput',
				input_wrapper: '#'+id+'_addTag',
				fake_input: '#'+id+'_tag',
				available_wrapper: '#'+id+'_available_values',
				tagsInput_wrapper: '#'+ id +'_tagsInput_wrapper'
			},settings);
			delimiter[id] = data.delimiter;
			
			if (settings.onAddTag || settings.onRemoveTag || settings.onChange || settings.onClickToAddTag) {
				tags_callbacks[id] = new Array();
				tags_callbacks[id]['onAddTag'] = settings.onAddTag;
				tags_callbacks[id]['onRemoveTag'] = settings.onRemoveTag;
				tags_callbacks[id]['onChange'] = settings.onChange;
				tags_callbacks[id]['onClickToAddTag'] = settings.onClickToAddTag;
			}
	
			var markup = '<div id="'+ id +'_tagsInput_wrapper" class="tagsinput2-wrapper"';
			
			if (settings.tagsVisible.length > 0) {
				markup = markup + ' data-dropdown="0"';
			}
			markup = markup + '><div id="'+id+'_tagsinput" class="tagsinput">';

			markup = markup + '<div id="'+id+'_addTag">';
			
			if (settings.interactive) {
				markup = markup + '<input id="'+id+'_tag" value="" placeholder="'+settings.placeholder+'" />';
			}
			
			markup = markup + '</div><div class="tags_clear"></div></div></div>';
			
			$(markup).insertAfter(this);
			
			if (settings.tagsAvailable.length > 0) {
				tagsAvailable = settings.tagsAvailable;
			}
			if (settings.tagsVisible.length > 0) {
				var available_values = '<div id="'+id+'_available_values" class="availabel_values_wrapper"></div>', 
					available_value = '';

				$(available_values).insertAfter($(data.holder));
				for (var i = 0, groupLen = settings.tagsVisible.length; i < groupLen; i++) {
					var valueGroup = settings.tagsVisible[i];
					available_value += '<div class="available_values_group">';
					for (var j = 0, len = valueGroup.length; j < len; j++) {
						for (var k = 0, tagsLen = settings.tagsAvailable.length; k < tagsLen; k++) {
							if (valueGroup[j] == settings.tagsAvailable[k].name) {
								available_value += '<a class="ava_choice" data-code="' + settings.tagsAvailable[k].code + '">' + valueGroup[j] + '</a>';
							}
						}
						
					}
					available_value += '</div>';
				}
				
				$(data.available_wrapper).append($(available_value));
				$(data.available_wrapper).css('width', settings.width);

				var a = $(data.available_wrapper).find('a');
				a.live('click', data, function () {
					if ($(this).hasClass('chose')) {return;}
					var tagChose = $(this).data('code'),
						alias = $(this).text();
					$(data.real_input).addTag2(tagChose,{focus:true,unique:(settings.unique)}, alias);			
					$(this).addClass('chose');
					$(data.available_wrapper).find('a').show();
				});
			}

			$(data.holder).css('width',settings.width);
			$(data.holder).css('min-height',settings.height);
			$(data.holder).css('height',settings.height);

			if ($(data.real_input).val()!='') { 
				$.fn.tagsInput2.importTags2($(data.real_input),$(data.real_input).val());
			}		
			if (settings.interactive) { 
				$(data.fake_input).css('color',settings.placeholderColor);
		        $(data.fake_input).resetAutosize2(settings);
		
				$(data.holder).bind('click',data,function(event) {
					$(event.data.fake_input).focus();
				});
			
				$(data.fake_input).bind('focus',data,function(event) {
					$(event.data.fake_input).css('color','#000000');		
				});
						
				if (settings.autocomplete_url != undefined) {
					autocomplete_options = {source: settings.autocomplete_url};
					for (attrname in settings.autocomplete) { 
						autocomplete_options[attrname] = settings.autocomplete[attrname]; 
					}
				
					if (jQuery.Autocompleter !== undefined) {
						$(data.fake_input).autocomplete(settings.autocomplete_url, settings.autocomplete);
						$(data.fake_input).bind('result',data,function(event,data,formatted) {
							if (data) {
								$('#'+id).addTag(data[0] + "",{focus:true,unique:(settings.unique)});
							}
					  	});
					} else if (jQuery.ui.autocomplete !== undefined) {
						$(data.fake_input).autocomplete(autocomplete_options);
						$(data.fake_input).bind('autocompleteselect',data,function(event,ui) {
							$(event.data.real_input).addTag(ui.item.value,{focus:true,unique:(settings.unique)});
							return false;
						});
					}
				
					
				} else {
						// if a user tabs out of the field, create a new tag
						// this is only available if autocomplete is not used.
						$(data.fake_input).bind('blur',data,function(event) {
							if ($(event.data.fake_input).val()!='') { 
								if( (event.data.minChars <= $(event.data.fake_input).val().length) && (!event.data.maxChars || (event.data.maxChars >= $(event.data.fake_input).val().length)) ) {
									if (settings.tagsAvailable.length > 0) {
										$(data.fake_input).keyup();
									}
									else {
										$(event.data.real_input).addTag2($(event.data.fake_input).val(),{focus:true,unique:(settings.unique)});
									}
								} 
							} else {
								$(event.data.fake_input).css('color',settings.placeholderColor);
							}
							return false;
						});
				
				}
				// if user types a comma, create a new tag
				$(data.fake_input).bind('keypress',data,function(event) {
					if (event.which==event.data.delimiter.charCodeAt(0) || event.which==13 ) {
					    event.preventDefault();
						if( (event.data.minChars <= $(event.data.fake_input).val().length) && (!event.data.maxChars || (event.data.maxChars >= $(event.data.fake_input).val().length)) ) {
							if (settings.tagsAvailable.length > 0) {
								$(data.fake_input).keyup();
							}
							else {
								$(event.data.real_input).addTag2($(event.data.fake_input).val(),{focus:true,unique:(settings.unique)});
							}
						}
							
					  	$(event.data.fake_input).resetAutosize2(settings);
						return false;
					} else if (event.data.autosize) {
			            $(event.data.fake_input).doAutosize2(settings);
            
          			}
				});

				$(data.fake_input).bind('keyup',data,function(event) {
					var val = $(event.data.fake_input).val(),
						a = $(event.data.available_wrapper).find('.ava_choice'),
						regExp = new RegExp(val), j = 0, arr = [];
					for (var i = 0, len = a.length; i < len; i++) {
						$(a[i]).show();
					}
					if ($.trim(val).length > 0) {
						//查询可见区域
						for (var i = 0, len = a.length; i < len; i++) {
							//匹配的
							if (regExp.test($(a[i]).text())) {
								j++;
							} else {
								//不匹配的
								arr.push($(a[i]));
							}
						}
						//从全部数据中查询 
						if (j == 0) {
							var t = '';
							for (var i = 0, len = tagsAvailable.length; i < len; i++) {
								if (regExp.test(tagsAvailable[i].name)) {
									t = '<a class="ava_choice" data-code="'+tagsAvailable[i].code+'">'+tagsAvailable[i].name+'</a>';
									j++;
								}
							}
							if (j > 0) {
								$(data.tagsInput_wrapper).find('.available_values_group').last().append(t.toString());
							}
						}
						
						if (j > 0) {
							if (arr.length > 0) {
								for (var i = arr.length - 1; i >= 0; i--) {
									arr[i].hide();
								}
							}
							
							var available_values_group = $(data.tagsInput_wrapper).find('.available_values_group');
							for (var i = 0, len = available_values_group.length; i < len; i++) {
								$(available_values_group[i]).height('auto');
							}
						}
					}
				});
				
				if (settings.tagsVisible.length > 0) {
					$(document).on('click', function(e) {
						var $target = $(e.target), available_values_group = $(data.tagsInput_wrapper).find('.available_values_group');
						if ($target.closest(data.tagsInput_wrapper).length == 1) {
							if ($(data.tagsInput_wrapper).data('dropdown')==0) {
								for (var i = 0, len = available_values_group.length; i < len; i++) {
									var currheight = $(available_values_group[i]).height();
									autoHeight = $(available_values_group[i]).css('height','auto').height();
									$(available_values_group[i]).height(currheight).animate({height: autoHeight}, 300, 'swing');
								}
								$(data.tagsInput_wrapper).data('dropdown',1);
							}
						} else {
							if ($(data.tagsInput_wrapper).data('dropdown')==1) {
								for (var i = 0, len = available_values_group.length; i < len; i++) {
									$(available_values_group[i]).animate({height: '3px'});
								}
								$(data.tagsInput_wrapper).data('dropdown',0);
							}
						}
					});
				}
				
				//Delete last tag on backspace
				data.removeWithBackspace && $(data.fake_input).bind('keydown', function(event)
				{
					if(event.keyCode == 8 && $(this).val() == '')
					{
						
						 event.preventDefault();
						 var last_tag = $(this).closest('.tagsinput').find('.tag:last').text();
						 var id = $(this).attr('id').replace(/_tag$/, '');
						 last_tag = last_tag.replace(/[\s]+x$/, '');
						 if (settings.tagsAvailable.length > 0) {
							 $('#' + id).removeTag2(escape($.fn.tagsInput2.areaCodeConverter(last_tag, tagsAvailable)), last_tag);
						 } else {
							 $('#' + id).removeTag2(escape(last_tag));
						 }
						 $(this).trigger('focus');
					}
				});
				$(data.fake_input).blur();
				
				//Removes the not_valid class when user changes the value of the fake input
				if(data.unique) {
				    $(data.fake_input).keydown(function(event){
				        if(event.keyCode == 8 || String.fromCharCode(event.which).match(/\w+|[谩茅铆贸煤脕脡脥脫脷帽脩,/]+/)) {
				            $(this).removeClass('not_valid');
				        }
				    });
				}
			} // if settings.interactive
		});
			
		return this;
	
	};
	
	$.fn.tagsInput2.updateTagsField2 = function(obj,tagslist) { 
		var id = $(obj).attr('id');
		$(obj).val(tagslist.join(delimiter[id]));
	};
	
	$.fn.tagsInput2.updateAllVisibleValues2 = function (obj, val, all) {
		var id = $(obj).attr('id'), a = $('#'+id+'_available_values').find('.ava_choice'), finished = false;
		a.removeClass('chose');
		for (var k = 0, kLen = val.length; k < kLen; k++) {
			for (var i = 0, len = a.length; i < len; i++) {
				if ($(a[i]).text() == val[k]) {
					$(a[i]).addClass('chose');
					finished = true;
				}
			}
			if (!finished) {
				var t = '';
				for (var i = 0, len = tagsAvailable.length; i < len; i++) {
					if (val[k] == tagsAvailable[i].name) {
						t = '<a class="ava_choice chose" data-code="'+tagsAvailable[i].code+'">'+tagsAvailable[i].name+'</a>';
					}
				}
				$('#'+id+'_available_values').find('.available_values_group').last().append(t.toString());
			}
		}
		
	}

	$.fn.tagsInput2.updateVisibleValues2 = function(obj,val) {
		var id = $(obj).attr('id'), a = $('#'+id+'_available_values').find('.ava_choice'), finished = false;
		for (var i = 0, len = a.length; i < len; i++) {
			if ($(a[i]).text() == val && $(a[i]).hasClass('chose')) {
				$(a[i]).removeClass('chose');
				finished = true;
			} else if ($(a[i]).text() == val && !$(a[i]).hasClass('chose')) {
				$(a[i]).addClass('chose');
				finished = true;
			}
		}
		if (!finished) {
			var t = '';
			for (var i = 0, len = tagsAvailable.length; i < len; i++) {
				if (val == tagsAvailable[i].name) {
					t = '<a class="ava_choice chose" data-code="'+tagsAvailable[i].code+'">'+tagsAvailable[i].name+'</a>';
				}
			}
			$('#'+id+'_available_values').find('.available_values_group').last().append(t.toString());
		}
	};
	
	$.fn.tagsInput2.areaCodeConverter = function (name, areaArr) {
		for (var i = 0, len = areaArr.length; i < len; i++) {
			if (areaArr[i].name == name) {
				return areaArr[i].code;
			}
		}
	};
	$.fn.tagsInput2.areaNameConverter = function (code) {
		for (var i = 0, len = tagsAvailable.length; i < len; i++) {
			if (tagsAvailable[i].code == code) {
				//if ()
				return tagsAvailable[i].name;
			}
		}
	};
	
	$.fn.tagsInput2.importTags2 = function(obj,val, all) {
		$(obj).val('');
		var id = $(obj).attr('id');
		var tags = val.split(delimiter[id]);
		if(!all){
			for (var i=0; i<tags.length; i++) { 
				var alias = $.fn.tagsInput2.areaNameConverter(tags[i]);
				$(obj).addTag2(tags[i],{focus:false,callback:false}, alias);
				$.fn.tagsInput2.updateVisibleValues2(obj, alias);
			}
		}
		if (all) {
			var aliasArr = [], alias;
			for (var i=0; i<tags.length; i++) { 
				aliasArr.push($.fn.tagsInput2.areaNameConverter(tags[i]));
				alias = $.fn.tagsInput2.areaNameConverter(tags[i]);
				$(obj).addTag2(tags[i],{focus:false,callback:false}, alias);
			}
			
			$.fn.tagsInput2.updateAllVisibleValues2(obj, aliasArr, all);
		}
		
		if(tags_callbacks[id] && tags_callbacks[id]['onChange'])
		{
			var f = tags_callbacks[id]['onChange'];
			f.call(obj, obj, tags[i]);
		}
		if (all) {
			this.allStart = false;
		}
	};

})(jQuery);