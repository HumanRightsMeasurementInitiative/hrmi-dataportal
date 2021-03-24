#!/bin/sh

wget -O Source_Sans_Pro.zip https://fonts.google.com/download?family=Source%20Sans%20Pro
cd /usr/share/fonts
sudo mkdir googlefonts
cd googlefonts
sudo unzip -d . ~/Downloads/Source_Sans_Pro.zip
sudo chmod -R --reference=/usr/share/fonts/opentype /usr/share/fonts/googlefonts
sudo fc-cache -fv
fc-match SourceSansPro