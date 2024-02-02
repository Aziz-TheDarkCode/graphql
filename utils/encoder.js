function encodeBase64(str) {
    // Utiliser TextEncoder pour obtenir un tableau d'octets
    var encoder = new TextEncoder();
    var byteArray = encoder.encode(str);

    // Convertir le tableau d'octets en chaîne base64
    var base64String = arrayBufferToBase64(byteArray);

    return base64String;
  }

  // Fonction pour convertir un tableau d'octets en chaîne base64
  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

