var ga = {};
ga.tmp = {};

ga.fielderrors = 0;

ga.set = function( param, value ) {
    if ( value ) {
        ga.set.data[ param ] = value;
    }
    return ga.set.data[ param ];
}
ga.set.data = {};


ga.valid = {};

ga.valid.checkMatch = function( tag1, tag2 ) {

   if ( $( tag1 ).val() != $( tag2 ).val() )
   {
      $( tag1 + "_msg" ).html( " does not match" );
   } else {
      $( tag1 + "_msg" ).html( "" );
   }
}
    
ga.valid.checkText = function( tag ) {
    var t = $( tag );
    var fieldValue=t.val();
    var ok = 0;
    var pattern = t.attr("pattern");
    var reg = new RegExp(pattern);
    
    
    if (pattern) {
	//console.log("It has pattern: " + pattern);
	
	if ( !reg.test(fieldValue) )
	{
	    //t.val( t.prop( "defaultValue" ) );
            if ( fieldValue.length || t.prop( "required" ) ) {
	        $( tag + "_msg" ).html( " wrong format" );
            } else {
                ok = 1;
            }
	}
	else {
	    ok = 1;
	    $( tag + "_msg" ).html("");
	}
    }	
    else {
	//console.log("No pattern!");
	if (!fieldValue && t.prop( "required" ) ) {
	    $( tag + "_msg" ).html(' missing required field');
	}
	else {
	    ok = 1;
	}
    }
    return ok; 
}

ga.valid.checkFloat = function( tag ) {
    
    var t = $( tag );
    var fieldValue=t.val();
    var ok = 0;
    //if ( isNaN( fieldValue ) ) {
    //if ( !fieldValue.match( /^[+-]?\d+(\.\d+)?$/ ) )
    
    //console.log ("Float val: " + fieldValue);
    if (!fieldValue.length && t.prop("required") )
    {
	$( tag + "_msg" ).html( " wrong format" );
	return ok;
    }
    
    if ( !fieldValue.match( /^-?(([1-9][0-9]*)|(0))?([.][0-9]+)?([eE][-+]?[0-9]+)?$/ ) )
    {
	// t.val( t.prop( "defaultValue" ) );                                
	//$( tag + "_msg" ).html( " not a valid floating point number, reset to default" );
        if ( fieldValue.length || t.prop( "required" ) ) {
	    $( tag + "_msg" ).html( " wrong format" );
        } 
	else {
	    ok = 1;
        }
	
    } else {
	ok = 1;
        if ( fieldValue < parseFloat ( t.attr( "min" ) ) )
	{ 
            t.val( t.attr( "min" ) );
            $( tag + "_msg" ).html( " value set to minimum allowed" );
	} else {
            if ( fieldValue > parseFloat ( t.attr( "max" ) ) )
            { 
		t.val( t.attr( "max" ) );
		$( tag + "_msg" ).html( " value set to maximum allowed" );
            } else {                                                             
		$( tag + "_msg" ).html( "" );
	    }
	} 
    }
    return ok; 
}

ga.valid.checkInt = function( tag ) {
    
    var t = $( tag );
    var fieldValue=t.val();
    var ok = 0;

    //if ( isNaN( fieldValue ) )
    //if ( !fieldValue.match( /^[+-]?\d+$/ ) )    
    if ( !fieldValue.match( /^-?((0)|([1-9][0-9]*))$/ ) )    
    {
	//t.val( t.prop( "defaultValue" ) );
	//$( tag + "_msg" ).html( " not a valid number, reset to default" );
        if ( fieldValue.length || t.prop( "required" ) ) {
	    $( tag + "_msg" ).html( " wrong format" );
        } else {
            ok = 1;
        }
    } else {
	ok = 1;
	if ( fieldValue < parseInt ( t.attr( "min" ) ) )
	{ 
            t.val( t.attr( "min" ) );
            $( tag + "_msg" ).html( " value set to minimum allowed" );
	} else {
            if ( fieldValue > parseInt ( t.attr( "max" ) ) )
            { 
		t.val( t.attr( "max" ) );
		$( tag + "_msg" ).html( " value set to maximum allowed" );
            } else {
		if ( parseInt( fieldValue ) != fieldValue )
		{   
                    $( tag + "_msg" ).html( " value rounded to nearset integer" );
                    t.val( parseInt( parseFloat( fieldValue ) + .5 ) );
		} else {
                    $( tag + "_msg" ).html( "" );
		}
            }
	}
    }
    return ok;
}

ga.valid.safeFile = function( tag ) {
   var t = $( tag );
   var fieldValue=t.val();
   if ( !fieldValue.match( "^[a-zA-Z0-9]+([a-zA-Z0-9_\.\-]+|\/[a-zA-Z0-9_\-])+$" ) )
   {
       t.val( t.prop( "defaultValue" ) );
       $( tag + "_msg" ).html( "Not an acceptable filename, reset to default" );
   } else {
       $( tag + "_msg" ).html( "" );
   }
}

ga.valid.checkLrfile = function( tag ) {

   var t   = $( tag ),
       r   = $( tag + '_altval > i' ),
       msg = $( tag + "_msg" ),
       ok  = 0;
   if ( !t || !t.is(':visible') ) {
       return 1;
   }
   if ( t && t.val() && t.val().length ) {

       ok = 1;
   } else {
       if ( r && r.html() && r.html().length && r.html() === "Server" ) {

           ok = 1;
       }
   }
   if ( !ok ) {
       msg.html( " missing required field" );
   }
   return ok;
}

ga.valid.checkRpath = function( tag ) {

   var t   = $( tag ),
       r   = $( tag + '_altval > i' ),
       msg = $( tag + "_msg" ),
       ok  = 0;

   if ( !t || !t.is(':visible') ) {
       return 1;
   }
   if ( r && r.html() && r.html().length && r.html() === "Server" ) {

       ok = 1;
   }
   if ( !ok ) {
       msg.html( " missing required field" );
   }

   return ok;
}

ga.valid.checkRfile = function( tag ) {

   var t   = $( tag ),
       r   = $( tag + '_altval > i' ),
       msg = $( tag + "_msg" ),
       ok  = 0;

   if ( !t || !t.is(':visible') ) {
       return 1;
   }
   if ( r && r.html() && r.html().length && r.html() === "Server" ) {

       ok = 1;
   }
   if ( !ok ) {
       msg.html( " missing required field" );
   }

   return ok;
}


ga.altfile = function( module, idfile, idref ) {
    
    ga.altfile.data[ module ] = ga.altfile.data[ module ] || {};
    ga.altfile.data[ module ][ idfile ] = idref;
};

ga.altfile.data  = {};
ga.altfile.bdata = {};

ga.valid.checksubmit = function( module ) {
   var i,
       ok = 1;

   if ( !ga.altfile.bdata[ module ] && !ga.value.types[ module ]) {
       console.log("No data registered..");
       return 1;
   }

   for ( i in ga.altfile.bdata[ module ] ) {
      if ( ga.altfile.bdata[ module ][ i ].req  ) {
	  //console.log( "ga.altfile.bdata[ module ][ i ].req = " +  ga.altfile.bdata[ module ][ i ].req);
          switch ( ga.altfile.bdata[ module ][ i ].req ) {
              case "lrfile" : ok = ok && ga.valid.checkLrfile( "#" + i ); if ($("#" + i).length && !ga.valid.checkLrfile( "#" + i )) {++ga.fielderrors;} break;
              case "rpath"  : ok = ok && ga.valid.checkRpath ( "#" + i ); if ($("#" + i).length && !ga.valid.checkRpath ( "#" + i )) {++ga.fielderrors;} break;
              case "rfile"  : ok = ok && ga.valid.checkRfile ( "#" + i ); if ($("#" + i).length && !ga.valid.checkRfile ( "#" + i )) {++ga.fielderrors;} break;
              default       : console.log( "ga.valid.checksubmit() unsupported required check " +  ga.altfile.bdata[ module ][ i ].req ); break;
          }
      }
   }
    
    console.log("Checksubmit: Proceed to Verify..");
    for ( i in ga.value.types[ module ] ) {
	if ( ga.value.types[ module ][ i ].req  ) {
	    //console.log( "ga.value.types[ module ][ i ].req = " +  ga.value.types[ module ][ i ].req);
            switch ( ga.value.types[ module ][ i ].req ) {
	    case "float": 
		if ($("#" + i).length && !ga.valid.checkFloat( "#" + i )) {++ga.fielderrors; console.log("Inside check float 2..");}
		break;
	    case "integer": 
		if ($("#" + i).length && !ga.valid.checkInt( "#" + i )) {++ga.fielderrors;}
		break;
	    case "text": 
		if ($("#" + i).length && !ga.valid.checkText( "#" + i )) {++ga.fielderrors;}
		//console.log( "pattern of " + i + ": " + $('#'+i).attr("pattern") );
		//console.log( "text_req Check: " +  ga.valid.checkText( "#" + i ));
		break;	
	    case "file": 
		if ($("#" + i).length && !ga.valid.checkLrfile( "#" + i )) {++ga.fielderrors;}
		break;
	    default: 
		console.log( "ga.valid.checksubmit() unsupported required check " +  ga.value.types[ module ][ i ].req ); break;
		
	    }
	}
    }
    
    if (ga.fielderrors > 0)
    {
   	ok = 0;
    }
    
    //console.log( "ga.fielderrors = " + ga.fielderrors );     
    return ok;
}



ga.valid.showerrormessage = function() {
    messagebox( {
	icon : "warning.png",
	text : "" + ga.fielderrors + " fields are missing or not set correctly!",
	buttons : [
	    { id    : "ok",
	      label : "OK" } ]
    });
    ga.fielderrors = 0;
}



ga.value = {};
ga.value.types = {};
ga.value.registerid = function(module, id, label, required) {
    ga.value.types[ module ]          = ga.value.types[ module ] || {};
    ga.value.types[ module ][id]      = {};
    ga.value.types[ module ][id].id   = id;
    ga.value.types[ module ][id].label = label;
    ga.value.types[ module ][id].req  = required || 0;
}



ga.value.setLastValue = function( pkg, tag, defval ) {
    var tl = pkg + ":" + tag + ":last_value";
    var dv = pkg + ":" + tag + ":default_value";
    var t = $( tag );
    var p2d;
    if ( !/_output$/.test( pkg ) ) {
        return false;
    }

    if ( $( "#global_data" ).data( tl ) == undefined ) {
        switch( t.attr( "type" ) )
        {
            case "checkbox" :
            case "radio" :
                $( "#global_data" ).data( tl, t.is( ":checked") );
                $( "#global_data" ).data( dv, t.is( ":checked") ); break;
            case "div" : 
            case "msgs" : 
                $( "#global_data" ).data( tl, t.html() ); 
                $( "#global_data" ).data( dv, t.html() );
                break;
            case "plot2d" :


                           break;
            case "filelink" :
            case "filelinkm" :
                $( "#global_data" ).data( tl, $( tag + "_filelink" ).html() );

                break;

            default : 
                      if ( defval )
                      {

                         t.val( defval );
                      }                         

                      $( "#global_data" ).data( tl, t.val() );
                      $( "#global_data" ).data( dv, t.val() );
                      break;
        }
    } else {
        switch( t.attr( "type" ) )
        {
            case "checkbox": 
            case "radio": 
                   t.prop( "checked", $( "#global_data" ).data( tl ) ); break;
            case "div" : 
            case "msgs" : t.html( $( "#global_data" ).data( tl ) ); break;
            case "atomicstructure" : 
                  var stag = tag.replace( /^#/, "" );

                  if ( $( "#global_data" ).data( tl ) ) {

                      _jmol_info[ stag ].script = $( "#global_data" ).data( tl );

                      t.html(Jmol.getAppletHtml( "jmolApplet" + stag,  _jmol_info[ stag ] ) );

                  } else {

                      t.html("");
                  }
                  break;

            case "plot2d" : 


                     p2d = gd.data( tl );
                     if ( p2d.data ) {
                         ga.value.set.plot2d( tag, p2d.options );
                         t.plot( p2d.data, ga.value.get.plot2d.plot_options( tag, p2d.options ) );
                     } else {
                         t.plot( p2d, ga.value.get.plot2d.plot_options( tag ) );
                     }
                     break;
            case "filelink" : 
            case "filelinkm" : 
                     $( tag + "_filelink" ).html( $( "#global_data" ).data( tl ) );
                     break;
            default: 

            
            t.val( $( "#global_data" ).data( tl ) );
            break;
        }
    }
}
ga.value.saveLastValue = function( pkg, tag ) {
   var t = $( tag );

   switch( t.attr( "type" ) )
   {
       case "file" :  return; break;
       case "checkbox" :
       case "radio" :
                     $( "#global_data" ).data( pkg + ":" + tag + ":last_value", t.is( ":checked") ); break;
       case "div" :
       case "msgs" : $( "#global_data" ).data( pkg + ":" + tag + ":last_value", t.html() ); break;
       case "plot2d" : 

                       break;
       case "filelink" : 
       case "filelinkm" : 
                     $( "#global_data" ).data( pkg + ":" + tag + ":last_value", $( tag + "_filelink" ).html() ); 
                     break;
       case "atomicstructure" : 
                     var stag = tag.replace( /^#/, "" );

                     if ( _jmol_info && _jmol_info[ stag ] && _jmol_info[ stag ].length ) {

                         $( "#global_data" ).data( pkg + ":" + tag + ":last_value", _jmol_info[ stag ].script ); 
                     } else {

                         $( "#global_data" ).data( pkg + ":" + tag + ":last_value", "" ); 
                     }
                     break;
       default: $( "#global_data" ).data( pkg + ":" + tag + ":last_value", t.val() ); break;
   }


}

ga.value.saveLastValues = function( pkg ) {

   $( "#" + pkg + " :input" ).each(function() {

      ga.value.saveLastValue( pkg, "#" + $( this ).attr( "id" ) );
   });
}


ga.data = {};

ga.value.set = {};
ga.value.get = {};

ga.value.settings = {};

ga.value.set.plot2d = function( tag, options ) {

    var tagtitle  = tag + "_title",
        tagxlabel = tag + "_xlabel",
        tagylabel = tag + "_ylabel";

    $( tagtitle  ).html( options.title  ? options.title  : "");
    $( tagxlabel ).html( options.xlabel ? options.xlabel : "");
    $( tagylabel ).html( options.ylabel ? options.ylabel : "");
}


ga.value.set.plot2d.pan = function( tag, value ) {

    ga.value.settings[ tag ] = ga.value.settings[ tag ] || {};
    ga.value.settings[ tag ].pan = value ? true : false;
}



ga.value.set.plot2d.zoom = function( tag, value, pkg ) {

    var tagtitle  = tag + "_title",
        tagxlabel = tag + "_xlabel",
        tagylabel = tag + "_ylabel";
        tagxy     = tag + "_xy";

    ga.value.settings[ tag ] = ga.value.settings[ tag ] || {};
    ga.value.settings[ tag ].zoom = value ? true : false;
    if ( value ) {
       ga.value.settings[ tag ].pkg = pkg;

       $( tag + "_title," + tag + "_xlabel," + tag + "_ylabel," + tag + "_xy" )
            .on("click", ga.value.set.plot2d.zoom.click );
    }
}
ga.value.set.plot2d.pkg = function( pkg, tag ) {


    ga.value.settings[ tag ] = ga.value.settings[ tag ] || {};
    ga.value.settings[ tag ].pkg = pkg;
    $( tag + "_title," + tag + "_xlabel," + tag + "_ylabel," + tag + "_xy" )
        .on("click", ga.value.set.plot2d.reset );
}

ga.value.set.plot2d.reset = function( event ) {
    var id = "#" + event.target.id.replace( /(_title|_xlabel|_ylabel|_xy)$/, "" );
    event.preventDefault();

    ga.value.setLastValue( ga.value.settings[ id ].pkg, id );
}

ga.value.set.plot2d.hover = function( tag, value ) {

    ga.value.settings[ tag ] = ga.value.settings[ tag ] || {};
    ga.value.settings[ tag ].hover = value ? true : false;
}



ga.plot_options = function () {
    var textcolor = "rgb( " + ga.colors.text + " )",
        retobj = {
            font : {
                color : textcolor
            },
	    grid : {
                hoverable: false
	    },
            xaxis : {
                color : "gray",
                lineWidth : 0.5,
                font : {
                    color : textcolor
                }
            },
            yaxis : {
                color : "gray",
                lineWidth : 0.5,
                font : {
                    color : textcolor
                }
            },
            lines: { 
                lineWidth : 1.0
            },
            zoom: {
                interactive: false
            },
            pan: {
                interactive: false
            }
        };

    return retobj;
};

ga.value.get.plot2d = {};
ga.colors = function( colors ) {
    
    ga.colors.background = ga.colors.makeRGB( colors.background );
    ga.colors.text       = ga.colors.makeRGB( colors.text );
};

ga.colors.makeRGB = function( color ) {
    
    var res;
    if ( /\d{1,3},\s*\d{1,3},\s*\d{1,3}$/.test( color ) ) {
        
        return color;
    }

    res = ga.color.toRGB( color );

    
    
    return res.r + "," + res.g + "," + res.b;
}

ga.value.get.plot2d.plot_options = function( tag, options ) {


    var plot_options = ga.plot_options();

    plot_options.pan.interactive  = ga.value.settings[ tag ].pan   ? true : false;
    plot_options.zoom.interactive = ga.value.settings[ tag ].zoom  ? true : false;
    plot_options.grid.hoverable   = ga.value.settings[ tag ].hover ? true : false;

    if ( options ) {
	
	if ( options.grid ) {
            plot_options.grid           = options.grid;
	}
	
	if ( options.legend ) {
            plot_options.legend           = options.legend;
            
            if ( options.legend.container ) {
                plot_options.legend.container = $( tag + "_legend" );
		//plot_options.legend.container = $( tag );
            }
        }
        if ( options.xmin ) {
            plot_options.xaxis.min        = options.xmin;
        }
        if ( options.xmax ) {
            plot_options.xaxis.max        = options.xmax;
        }
        if ( options.xscale ) {
            switch ( options.xscale ) {
                case "log" :
                plot_options.xaxis.transform        = function(v) { return v > 0 ? Math.log( v ) : 1e-99; };
                plot_options.xaxis.inverseTransform = function(v) { return Math.exp( v ); };
                plot_options.xaxis.tickFormatter    = ga.value.plot2d.ticformatter;
                break;
                default : 
                console.log( "ga.value.get.plot2d.plot_options( " + tag + " , options ) has unsupported xscale of " + options.xscale );
                break;
            }
        }
        if ( options.xtics ) {
            plot_options.xaxis.ticks = options.xtics;
        }
        if ( options.ymin ) {
            plot_options.yaxis.min        = options.ymin;
            
        }
        if ( options.ymax ) {
            plot_options.yaxis.max        = options.ymax;
            
        }
        if ( options.yscale ) {
            switch ( options.yscale ) {
                case "log" :
                plot_options.yaxis.transform        = function(v) { return v > 0 ? Math.log( v ) : 1e-99; };
                plot_options.yaxis.inverseTransform = function(v) { return Math.exp( v ); };
                plot_options.yaxis.tickFormatter    = ga.value.plot2d.ticformatter;
                break;
                default : 
                console.log( "ga.value.get.plot2d.plot_options( " + tag + " , options ) has unsupported yscale of " + options.yscale );
                break;
            }
        }
        if ( options.ytics ) {
            plot_options.yaxis.ticks = options.ytics;
        }
    }

    return plot_options;
}

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

function replotChartAsCanvas(graph_selector, data_arr, options, xax, yax){
    //change canvas options to true and replot
    var canvas_options = {
	canvas: true,
	axisLabels: {
            show: true
	},
	//axisLabelFontFamily : 'Arial', 
	//axisLabelFontSizePixels : 125,
	xaxes: [
	    {
		axisLabelUseCanvas: true,
		axisLabel: xax,
		axisLabelFontFamily : 'Arial', 
		axisLabelFontSizePixels : 20,
		axisLabelPadding : 7
	    }
	],
	yaxes: [
	    {
		axisLabelUseCanvas: true,
		position: 'left',
		axisLabel: yax,
		axisLabelFontFamily : 'Arial', 
		axisLabelFontSizePixels : 20,
		axisLabelPadding : 5
	    }
	]
    }
    var merged_opts = {}
    $.extend(merged_opts, options, canvas_options);  //done this way to ensure canvas_options take priority
    var plot = $.plot(graph_selector, data_arr, merged_opts);
    return plot.getCanvas();
}

ga.data.update = function( mod, data, msging_f, msg_id ) {
    var output_msgs_cleared = 0,
        appended            = 0,
        state_changed       = 0,
        do_close            = 0,
        do_close2           = 0,
        mod_out             = mod + "_output",
        hmod_out            = "#" + mod_out,
        jqmod_out           = $( hmod_out ),
        retobj              = {},
        hmod_out_msgs       = hmod_out + "_" + "msgs",
        jqhmod_out_msgs     = $( hmod_out_msgs ),
        htag,
        jqhtag,
        savekey,
        tlink,
        thtml,
        t,
        jsmolfile,
        match;

    if ( msging_f ) {

        $( "#" + mod + "_progress" ).html( "" );
        jqhmod_out_msgs.text( "" );
    }

    $.each(data, function(k, v) {
        
        match = jqmod_out.find( "#" + k );
        if ( match.length )
        {
            if ( !output_msgs_cleared )
            {
                jqhmod_out_msgs.text( "" );
                output_msgs_cleared = 1;
            }
            switch ( match.attr( "type" ) )
            {
            case "plot2d" : 

                htag = "#" + k;
		var plot;
		var canvas_merged;
		var xaxis;
		var yaxis;
		var image;
		var file;
	
                if ( v.data ) {
                    ga.value.set.plot2d( htag, v.options );
		    
		    //console.log("htag: " + htag + "  v.options: "  + v.options.xlabel );
		    xaxis = v.options.xlabel;
		    yaxis = v.options.ylabel;

		    //$( htag + "_xlabel" ).html("");
		    //$( htag + "_ylabel" ).html("");

		    canvas_merged = replotChartAsCanvas(match, v.data, ga.value.get.plot2d.plot_options( htag, v.options ), xaxis, yaxis);
		    image = canvas_merged.toDataURL("image/png").replace("image/png", "image/octet-stream");  /// here is the most important part because if you dont replace you will get a DOM 18 exception.
		    file = dataURLtoFile(image, 'plot.png');
		    a.href = URL.createObjectURL(file);
		    $("#a").removeClass( "hidden" )

                    $.plot( htag, v.data, ga.value.get.plot2d.plot_options( htag, v.options ) );
                } else {
		    
		    canvas_merged = replotChartAsCanvas(match, v,  ga.value.get.plot2d.plot_options( htag ), xaxis, yaxis);
                    image = canvas_merged.toDataURL("image/png").replace("image/png", "image/octet-stream");  /// here is the most important part because if you dont replace you will get a DOM 18 exception.
		    file = dataURLtoFile(image, 'plot.png');
		    a.href = URL.createObjectURL(file);
		    $("#a").removeClass( "hidden" )
		    
		    $.plot( htag, v,  ga.value.get.plot2d.plot_options( htag ) );
                }
		
		
		//var a = document.getElementById("a");
		//var combined = $(htag + "_div");
		////html2canvas( match.get(0), {
		//html2canvas( combined.get(0), {
		//    background: "#ffffff",
		//    //width     : 600,
		//    onrendered: function (canvas) {
		//	image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
		//	//console.log("tag: " + htag + "_savetofile" + "  Image: " + image);
		//	file = dataURLtoFile(image, 'plot.png');
		//	a.href = URL.createObjectURL(file);
		//	$("#a").removeClass( "hidden" );
		//    }
		//});
		
		//var myCanvas = plot.getCanvas();
		//var image = myCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  /// here is the most important part because if you dont replace you will get a DOM 18 exception.
		//var file = dataURLtoFile(image, 'plot.png');
		//console.log(file);
		
                //var a = document.getElementById("a");
		//a.href = URL.createObjectURL(file);
		//$("#a").removeClass( "hidden" )

                savekey = mod_out + ":#" + k + ":last_value";
                $( "#global_data" ).data( savekey , v ); 
                break;
            case "atomicstructure" : 
                //                               Jmol.setDocument( 0 );
                savekey = mod_out + ":#" + k + ":last_value";
                if ( v.file ) {
                    jsmolfile = v.file;
                } else {
                    jsmolfile = v;
                }
                
                _jmol_info[ k ].script =
                    'set background [' + ga.colors.background + ']; set zoomlarge false;set echo top center;echo loading ' + jsmolfile.split( '/' ).pop() + ';refresh;load "' + jsmolfile + '";';
                if ( ga.set( mod + ":jsmoladd" ) ) {
                    _jmol_info[ k ].script += ga.set( mod + ":jsmoladd" );
                }
                if ( v.script ) {
                    _jmol_info[ k ].script += ";" + v.script;
                }
                
                //                               Jmol.getApplet("jmol", _jmol_info[ k ]);

                $( "#global_data" ).data( savekey , _jmol_info[ k ].script ); 
                $("#" + k ).html(Jmol.getAppletHtml( "jmolApplet" + k, _jmol_info[ k ] ));

                break;
            case "checkbox" : 
            case "radio" : 
                match.prop( "checked", true ); 
                break;
            case "div" :  
                match.html( v );
                break;
            case "video" : 
                jqhtag = $( "#" + k );
                thtml = "<video ";
                if ( jqhtag.attr( "data-width" ) ) {
                    thtml += ' width="' +  jqhtag.attr( "data-width" ) + '"';
                }
                if ( jqhtag.attr( "data-height" ) ) {
                    thtml += ' height="' +  jqhtag.attr( "data-height" ) + '"';
                }
                thtml += ' controls>';
                thtml += '<source src="' + v +'.mp4" type="video/mp4" /><source src="' + v +'.webm" type="video/webm" />';
                thtml += '</video>';
                
                jqhtag.html( thtml );
                break;
            case "image" : 
                jqhtag = $( "#" + k );
                thtml = "<img ";
                if ( jqhtag.attr( "data-width" ) ) {
                    thtml += ' width="' +  jqhtag.attr( "data-width" ) + '"';
                }
                if ( jqhtag.attr( "data-height" ) ) {
                    thtml += ' height="' +  jqhtag.attr( "data-height" ) + '"';
                }
                thtml += ' src="' + v + '">';
                
                jqhtag.html( thtml );
                break;
            case "filelink" : 
                tlink = "<a href=\"" + v + "\" target=\"_blank\">" + v.split( '/' ).pop() + "</a>";
                savekey = mod_out + ":#" + k + ":last_value";
                $( "#global_data" ).data( savekey , tlink );
                $( "#" + k + "_filelink" ).html( tlink );
                break;
            case "filelinkm" : 
                savekey = mod_out + ":#" + k + ":last_value";
                tlink = "";
                $.each( v, function( k2, v2 ) {
                    tlink += "<a href=\"" + v2 + "\" target=\"_blank\">" + v2.split( '/' ).pop() + "</a> ";
                } );
                $( "#global_data" ).data( savekey , tlink );
                $( "#" + k + "_filelink" ).html( tlink );
                break;
            default :
                if ( $( "#global_data" ).data( "_append:" + mod_out + "_" + k ) )
                {
                    match.val( match.val() + "\n" + v );
                    match.height( parseFloat( match.prop( 'scrollHeight' ) + parseFloat( match.css("borderTopWidth") ) + parseFloat( match.css("borderBottomWidth") ) ) );
                } else {
                    match.val( v );
		}
                break;
            }
        } else {
            if ( msging_f ) {
                if ( k.charAt( 0 ) == "_" ) {
                    if ( !/^_fs_/.test( k ) || !ga.data.nofcrefresh[ mod ] ) {
                        if ( k == "_message" )
                        { 
                            messagebox( v );
                        }
                        if ( /^_getinput/.test( k ) )
                        { 
                            
                            
                            if ( k == "_getinput" ) {
                                ga.valuen.input( mod, v );
                            }
                        }
                        if ( k == "_textarea" )
                        { 
                            
                            ga.data.textarea( hmod_out, v );
                        }
                        if ( k == "_airavata" )
                        { 
                            
                            ga.data.airavata( hmod_out, v );
                        }
                        if ( k == "_status" )
                        { 
                            
                            if ( v == "complete" ) {
                                msging_f( msg_id, 0, 0 );
                            }
                        }
                    }
                } else {
                    if ( !appended )
                    {
                        jqhmod_out_msgs.append( "<p>Unexpected results:</p>" );
                        appended = 1;
                    }
                    jqhmod_out_msgs.append( "<p>" + k + " => " + v + "</p>" );
                }
            } else {
                if ( k.charAt( 0 ) == "_" ) {
                    if ( !/^_fs_/.test( k ) || !ga.data.nofcrefresh[ mod ] ) {
                        $( "#_state" ).data( k, v );
                        state_changed = 1;
                        if ( k == "_status" )
                        { 
                            
                            retobj.job_status = v;
                        }
                        if ( /^_getinput/.test( k ) )
                        { 
                            
                            
                            if ( k == "_getinput" ) {
                                ga.valuen.input( mod, v );
                            }
                        }
                        if ( k == "_textarea" )
                        { 
                            
                            ga.data.textarea( hmod_out, v );
                        }
                        if ( k == "_airavata" )
                        { 
                            
                            ga.data.airavata( hmod_out, v );
                        }
                        if ( k == "_loginverify" )
                        { 
                            
                            ga.login.verify( v );
                        }
                        if ( k == "_loginapprove" )
                        { 
                            
                            ga.login.approve( v );
                        }
                    }
                } else {
                    if ( k == "-close" )
                    {
                        do_close = 1;
                    } else {
                        if ( k == "-close2" )
                        {
                            do_close2 = 1;
                        } else {
                            if ( !appended )
                            {
                                jqhmod_out_msgs.text( "" );
                                jqhmod_out_msgs.append( "<p>Unexpected results:</p>" );
                                appended = 1;
                                output_msgs_cleared = 1;
                            }
                            jqhmod_out_msgs.append( "<p>" + k + " => " + v + "</p>" );
                        }
                    }
                }
            }
        }
    });
    ga.value.saveLastValues( mod_out );
    ga.value.saveLastValue( mod_out, hmod_out_msgs );
    $( hmod_out + '_progress' ).html( "" );
    
    console.log("State_changes:  " + state_changed);
    console.log("Closes:  " + do_close + ";  " + do_close2);
    console.log("logon: " + $( '#_state' ).data( '_logon' ) );
    
    if ( state_changed )
    {
        syncState();
    }
    if ( do_close )
    {
        closeModal();
    }
    if ( do_close2 )
    {
        closeModal2();
    }
    return retobj;
};

ga.valid.clearerrorcounter = function() {
    ga.fielderrors = 0;
}
