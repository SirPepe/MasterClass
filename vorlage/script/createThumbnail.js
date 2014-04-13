/*
  Anforderungen
  -------------
  1.  createThumbnail(source, maxWidth, maxHeight) erstellt eine verkleinerte
      Version dessen, was in "source" abgebildet ist
      1.1 sind "source", "maxWidth" oder "maxHeight" nicht angegeben, wird ein
          Error geworfen
      1.2 ist "source" kein Blob oder kein Canvas, Video oder Img-Element, wird
          ein Error geworfen
  2.  createThumbnail(source, maxWidth, maxHeight) erstellt ein Promise auf
      einen verkleinerten Screenshot von "source"
      2.1 bei erfolgreichem Erstellen des verkleinerten Screenshots wird das
          Promise mit dem Screenshot als Blob-Objekt aufgelöst
          2.1.1 der Screnshot hat das gleiche Seitenverhältnis wie das Original
          "source"
          2.1.2 der Screenshot hat die größtmöglichen Maße, die "maxWidth" und
                "maxHeight" nicht  überschreiten
      2.2 bei Fehler während des Screenshot-Erstellens wird das Promise mit
          einem Error rejected
*/