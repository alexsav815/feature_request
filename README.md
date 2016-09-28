# feature_request
Prototype for enetring/viewing/sorting feature requests.

Currently, request data can be entered to database ('Enter Request'). For the same client, request priorities are updated based on the current eneterd priority.

'View Requests' is under construction. It will pull list of requests based on one or more filtering criteris, e.g. date range, client name, etc.

The web application utilizes the following stack: <br>
1) Server: Apache 2.4.7/Ubuntu OS <br>
2) DB: Mongodb v.4.4.9 <br>
3) Layout/Interaction: HTML5/CSS/jQuery/Javascript <br>
4) Server side scripting: PHP 5.5.9/Mongodb drivers <br>

Apache and MongoDB servers must be started. <br>
To run the web-site on localhost, make sure symbolic link to the main project directory (containing index.html) is established in /var/www/html. e.g. <br>

cd /var/www/html <br>
sudo ln -s /path/to/projectdir linkname <br>

Launch web site as localhost/linkname. <br>

Author: <br>
<i>Alexey Savelyev</i>, PhD <br>
<a href="https://www.linkedin.com/in/alexey-savelyev-4a4937127" target="_blank">LinkedIn</a> <br>
alexsav.science@gmail.com
