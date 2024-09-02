DT208G - Backendbaserad webbutveckling - miso1101
Mitt projekt är en serverwebbaserad kursapplikation byggd med Express.js och SQLite3. 
Syftet är att besökaren kan lägga till, visa, uppdatera och ta bort kurser från en SQLite-databas. 
Jag använder EJS som vyhanterare för att rendera HTML-sidor och hanterar formulärdata med body-parser. 

Skapade funktioner: 
Visa kurser: Huvudsidan listar alla tillgängliga kurser i databasen. 
Lägg till ny kurs: Besökaren kan lägga till en ny kurs genom att fylla i ett formulär. 
Uppdatera kurs: Besökaren kan uppdatera informationen för en befintlig kurs. 
Radera kurs: Besökaren kan radera en kurs från databasen. 
Om-sida: En undersida som ger information om applikationen.

Projektet använder följande npm-paket:
express: Webbramverk för Node.js
body-parser: Middleware för att hantera inkommande POST-data 
dotenv: Hantering av miljövariabler
ejs: typ av "view motor" för att rendera/hantera HTML-sidor
sqlite3: SQLite3-databasmodul för Node.js
nodemon: Verktyg för att automatiskt starta om servern vid kodändringar

