#!/bin/bash

# turn on bash's job control
set -m

# Start the first process
./startTerminal.sh &

# Start the second process
./startFront.sh

# now we bring the primary process back into the foreground
# and leave it there
fg %1
