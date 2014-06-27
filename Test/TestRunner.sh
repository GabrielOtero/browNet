#!/bin/bash
./node_modules/jasmine-node-karma/bin/jasmine-node-karma Test/jasmine-node

jasmine_node_exit_code=$?


./node_modules/bower/bin/bower install https://github.com/pivotal/jasmine.git

./node_modules/phantomjs/bin/phantomjs ./Test/jasmine/phantomScript.js

jasmine_front_exit_code=$?

if [ $jasmine_node_exit_code -eq 0 ] && [ $jasmine_front_exit_code -eq 0 ]; then
	echo "All test passed! :D"
	exit 0
else
	echo "There are tests with errors! :("
	exit 1
fi


