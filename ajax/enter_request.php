<?php
header('Content-type: application/json');

session_start(); 

$results[ '_status' ] = "complete";

if ( !sizeof( $_REQUEST ) )
{
    $results[ "error" ] = "PHP code received no \$_REQUEST?";
    echo (json_encode($results));
    exit();
}


$clientid = $_REQUEST[ 'client' ];
$title  = $_REQUEST[ 'title' ];
$description = $_REQUEST[ 'description' ];
$priority = $_REQUEST[ 'priority' ];
$targetdate = $_REQUEST[ 'targetdate' ];
$productarea = $_REQUEST[ 'productarea' ];

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
  
if ( 0 ) {
    // check for valid captcha
    $coll = $m->featurerequest->captcha;
    if ( !$doc = $coll->findOne(
              array( 
                  //"window" => $window, 
                  "success" => 1,
                  "time" => array( '$gte' => $mindate 
                  ) ) ) ) {
       // $coll->remove( array( "window" => $window ) );
        $results[ "error" ] = "Internal error 5401";
        echo (json_encode($results));
        exit();
    }
    //$coll->remove( array( "window" => $window ) );
}

$coll_requests = $m->featurerequest->requests;

/// Update priorities ////////////////////

$filter_upgrade = array('clientid' => $clientid, 'priority' => array( '$gte' => (int)$priority ));
$filter_check = array('clientid' => $clientid, 'priority' => (int)$priority );

if (!empty($coll_requests->findOne($filter_check)))
   {
      $coll_requests->update($filter_upgrade, array('$inc' => array('priority' => 1) ), array("multiple" => true) );
   }  				   

////////////////////////

try {
    $coll_requests->insert( 
        array( 
            "title" => $title
            ,"description" => $description
	    ,"clientid" => $clientid
	    ,"priority" => (int)$priority
	    ,"targetdate" => $targetdate
	    ,"productarea" => $productarea
            ,"registered" => new MongoDate() 
                        
        )
      );
} catch(MongoCursorException $e) {
    $results[ 'status' ] = "  " . $e->getMessage();
    echo (json_encode($results));
    exit();
}


$results[ 'status' ] = "Request entry has been successfully added to database...";

echo (json_encode($results));
exit();
?>
