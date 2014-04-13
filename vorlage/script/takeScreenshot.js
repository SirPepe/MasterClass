/*
  Anforderungen
  -------------
  1.   takeScreenshot(quelle) erstellt einen Screenshot des Elements "quelle"
       1.1 wird "quelle" nicht angegeben, wirft die Funktion einen Error
       1.2 ist "quelle" kein Canvas-, Img-, oder Video-Element, wirft die
           Funktion einen Error
  2.   takeScreenshot(quelle) gibt ein Promise zurück
       2.1 bei erfolgreichem Screenshot wird das Promise mit dem Screenshot als
           Blob-Objekt aufgelöst
           2.1.1 der Screenshot hat die gleichen Maße wie die in "quelle"
                 verwendete Datei (Bild, Video) bzw. das Element "quelle" selbst
                 (z.B. bei Canvas-Elementen)
       2.2 bei Fehler während des Screenshot-Erstellens wird das Promise mit
           einem Error rejected
*/