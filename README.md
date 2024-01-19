# demo-swap

# Description 
Demo Swap is a unique trading platform, made for Team Fortress 2 players/collectors to find other players looking to trade in-game items. Users will create a profile that requires their SteamIDs, identifying their profiles and trade offers with their steamIDs as well. This gives users the ability to see the ID of who they are trading with, so they can connect with one another on Steam to finalize their trade. 

Demo Swap has a current trade offers tab, showing current trades that users are offering and what they are looking to receive in turn. Users can click these trade tables and will be greeted with the trading page where they can participate in the trade. 

Users will also be able to see past trades appear in their profile page, with the steamID of the other user and the date the trade took place at. 

# Necessary Terminal Commands for Proper Installation
After cloning this repository, there are a few things you must have installed to properly run Demo Swap.

Run - 
1. npm install typescript --save-dev (this will configure tsconfig.json)
2. npx tsc --init
3. npm install express-session
4. npm install express-handlebars
5. npm install sequelize
6. npm install connect-session-sequelize

# Setting up tsconfig.json
Ensure tsconfig.json is set to these values for compiler options:
Language environment section:
"target": "es6",    

Modules section:
"module": "commonjs",                                
"rootDir": "./public/js",

Emit section:
 "sourceMap": true,                                
 "outDir": "./public/js/compiled", 

Interop constraints section:
"esModuleInterop": true,                             
"forceConsistentCasingInFileNames": true,

typeChecking section:
"strict": true,    

Completeness section:
"skipLibCheck": true 

# Setting up .env 
Set .env to match your mySQL username, password, and include the JAWSDB code below

JAWSDB_URL = mysql://jskklelyqr6rsq62:r6jjrr6jj74j4odh@t07cxyau6qg7o5nz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/b43xdbbxax0zjpze

# Link to live server and screenshots 
Heroku: https://demo-swap-354ed4292240.herokuapp.com/

![Login](TF2-1.png)

![Home](<TF2 Home-2.png>)

![Current Offers](<TF2 Trades-1.png>)