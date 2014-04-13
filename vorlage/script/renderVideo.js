/*
  Anforderungen
  -------------
  1.  renderVideo(sourceUrl) stellt ein Video-Element bereit, das das unter
      "sourceUrl" hinterlegte Video abspielen kann
      1.1 ist "sourceUrl" kein String, wird ein Error-Objekt geworfen
  2.  renderVideo(sourceUrl) gibt ein Promise auf ein abspielbereites
      Video-Element zurück
      2.1 wenn das Video geladen werden kann und das Element einen
          abspielbereiten Zustand erreicht, wird das Promise mit dem
          Video-Element aufgelöst
      2.2 gibt es mit dem Video ein Problem, wird das Promise mit einem Error
          rejected
*/