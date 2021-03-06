// Node-Http-Modul importieren
import * as Http from "http";
// Node-Url-Modul importieren
import * as Url from "url";

namespace ServerTest {
    // Neuer Datentyp AssocStringString: homogenes, assoziatives Array.
    interface AssocStringString { //assoziativ: Werte werden anstelle von 0,1,2,3 durch einen Key aufgerufen
        [key: string]: string; //homogen: Werte haben den gleichen DatenTyp
        //heterogen: Werte haben unterschiedliche DatenTypen
    }
    
    // Port vom Process-Objekt erfragen 
    let port: number = process.env.PORT;
    // Port nicht definiert -> lokale Maschine, Port selbst definieren
//    if (port == undefined)
//        port = 8100;
    
    // Server-Objekt kreieren
    let server: Http.Server = Http.createServer();
    // Event-Handler installieren
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    // Auf dem Port horchen
    server.listen(port);

    // Listening-Event: Rückmeldung wenn horchen läuft
    function handleListen(): void {
        console.log("Server listening on port " + port);
    }

    // Request-Event: Verarbeiten der Request und erstellen der Response
    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("Ich h�re Stimmen!!");
        // Header: Antwort kommt im HTML-Format mit uft-8
        _response.setHeader("content-type", "text/html; charset=utf-8");
        // Header: ?
        _response.setHeader("Access-Control-Allow-Origin", "*"); 
        //Access-Control.... = Bestimmt �ber die Freigabeeinstellungen der Ressource
        //* = inhalte der Ressource wird f�r alle Zug�nglich gemacht
        
        // Response-Body
        _response.write("Servermeldung: Deine Bestellung war erfolgreich!" + "<br>");
        _response.write("Deine Bestellung:" + "<br>");

        // ? Ruft parse funktion aus node.d.ts auf und �bergibt request.url und den boolean wert true
        let query: AssocStringString = Url.parse(_request.url, true).query; //Empfangene URL verarbeiten; Parse zerlegt es in Einzelteile: Query ist ein assoziatives array string string
        // ?//geht nach dem Namen statt nach ner Number
        //l�uft f�r jeden key durch
        //bsp: query[baumart]=fichte
        for (let key in query) 
            _response.write(key + ": " + query[key]+ "<br>");
        
        // Antwort abschließen und abschicken
        _response.end();
    }
}