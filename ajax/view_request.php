<?php
header('Content-type: application/json');

session_start(); 

$results = [];

if ( !sizeof( $_REQUEST ) )
{
    $results[ "error" ] = "PHP code received no \$_REQUEST?";
    echo (json_encode($results));
    exit();
}


date_default_timezone_set( 'UTC' );
$mindate = new MongoDate();
$mindate->sec -= 3 * 60;

// connect
try {
     $m = new MongoClient();
} catch ( Exception $e ) {
    $results[ "error" ] = "Could not connect to the db " . $e->getMessage();
    echo (json_encode($results));
    exit();
}

$coll_requests = $m->featurerequest->requests;

$clientid = $_REQUEST['client'];



$filter = array('clientid' => $clientid);

$sel_client = $coll_requests->find($filter);

//$coll_requests->update($filter, array('$inc' => array('priority' => 1) ), array("multiple" => true) );

////////////////////////

$req_priority = [];
foreach ( $sel_client as $v ) {
   $req_priority[ $v['priority' ] ] = $v;
}
ksort( $req_priority );




foreach ( $req_priority as $v ) {
    $name = $v[ 'clientid' ];
    $userinfo[] =
        array(
            "Name"             => $name
	    ,"Priority"	       => $v[ 'priority' ]
	    ,"Title" 	       => $v[ 'title' ]
	    ,"Date"	       => $v[ 'targetdate' ]
	    ,"Product"	       => $v[ 'productarea' ]
            );
 
}

// HTML Table//////
$html_userinfo = "<table class='padcell'><tr><th>" . implode( "</th><th>", array_keys( $userinfo[ 0 ] ) ) . "</th></tr>";
//$html_userinfo = "<table><tr><th>" . implode( "</th><th>", array_keys( $userinfo[ 0 ] ) ) . "</th></tr>";
//$html_userinfo .= "<tr><td>" . implode( "</td><td> ",  $totals_info ) . "</td></tr>";

foreach ( $userinfo as $k => $v ) {
    $html_userinfo .= "<tr><td>" . implode( "</td><td> ",  $v ) . "</td></tr>";
}

$html_userinfo .= "</table>";

//////////////////////////



$results[ 'view_request_userreport' ] = $html_userinfo;

//$results[ "error" ] = "Test  ";
//    echo (json_encode($results));
//    exit();

echo (json_encode($results));
exit();
?>
