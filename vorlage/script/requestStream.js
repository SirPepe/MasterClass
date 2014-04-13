/*
  Anforderungen
  -------------
  1. requestStream() fordert Zugriff auf die Kamera an
  2. requestStream() gibt ein Promise zurück
      2.1 wird der Zugriff auf die Kamera gewährt, wird das Promise mit dem
          Stream-Objekt aufgelöst
      2.2 wird der Zugriff auf die Kamera nicht gewährt oder gibt es einen
          Fehler, wird das Promise mit einem Error-Objekt rejected
*/