import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: "firebase-adminsdk-4mf01@shaun-home.iam.gserviceaccount.com",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC3L//fiwEJ3qK2\nIX0XJmyw0S/3oWVuIPekLzw5/abifwxV6lC87EHa88CgOkJwbOgv+qvTY65jqXH0\nYfA84Ns6uHwz2UoYP2X/hjj3OoLs9bRyqkRRna4EE0AJWncmHCLOGY4G7f96QAec\neIIyTnBo3I42q8OlCEUuuewrn/DCXtNhngkPATz4WrpUNi11ImwZ5Y8LqDW8t+fD\nfyKxe4qFvosrEuIbk3D8b8clSBO1+SgVxrJQGlppIaOv3ZWVDbRc+IUdxEk7k1Xr\neYfxJUeivEfGMVCyvFNWN/TW73hQXiECHof7so29+MxRAILd9nD4p4mbj6iOmgxF\nIKx3VxYdAgMBAAECggEABNH+BSdWuShDFtDNxlir/oEapoT4MswqSAc4Kfx7MjWO\noQof4sDCwNyuImk2C1hKSczqTY8vbQ7t4TTcifWOvz5QglrC4N12NSGWiSbggBS9\nEVFap90i0ZeiFTzsqrON1OeGPbdwhAqASMVBA8rdmVzIXzbo2IRdsauRw9obDzo9\nJuT1c+d+fIPSTgT1SnIaL3LhCdDtTOP2EwgcSVYkAMmAEmG0K9P6idBMl37heXB2\n40y9ZeHBQJscwvlifQatsQyvlszODIWQsePINFcXNiYliM66o1/5h+I3TmCS25ih\nbXrgbZvYGh20rPc6crUhc+tFzC3d9aHNM9gVb4EZ/wKBgQDbTSxbGqloUDqRS2nB\nWhmySmRXetZpGEnOn4klR6SQH4zFnkcbF8HExuvMns4/Hwo3/0OS/zsr8hTi79tB\nnxKHhkMuv2155bi82q3zZwyaEDgrqrv/O1HRCr0x/SSUxATvTcK/4FWM6A1B04NW\n92/o4WqQr1JO+XcUsbZTrAH2WwKBgQDV17ZJGpOY+p4SWGb8VoDzLa+b9l0Z7+Ch\ntuXWAhW4uKhBObKuhCF72HZV2g6BoiZ7vTOGP0IHS5MLaC4NPP04m0XU7FidHHYj\n3zd9EP4ZFoIUGQtCdSwsqTA2LoAcJ/+tDJDworVMjOlrXV0xjRLKvKaiwWNCDbZm\nvg1NWcN+5wKBgHMpCITi8Fkd4FOSJXvqg5nzpNOnZtaTcZa2gj94artgRf00i6R3\nikJ6LzMppabR9vzG6EZWD02Zd0xgpmPEU+elIrx2u9eKQcOyliw+TgjNQaH0q3px\nPRqoKAgLJd2VPf4oeH9oH6S56tRJbSwLDdJeJSbLWk6sg9LzK4quxe0HAoGAKlYl\nub1wQVZE217zLLw3lW2TGe6hqhPqxjl+sWsCP+sXLKqurIxuUKWfcAnW22Vt9wuT\nWt3FRcp5l0WN8IMFoyJipfAQ7zIGVb3Ir5Mgq3jgUfhPWV33W/Q3HlMAfBKTNQCK\n5YlhGYHAaMg4Piou8UJ+PzTIYPh0B01TNuAxqzsCgYA32bgqA/8YP9KUwqwvdM4q\na4h4g57jtGQAK5wqrkchvMlrlC45YOjk/SjKvJ01Z7fIjUaGrLouSGql1wFBBcwC\nwYWVwqLoh/jn4K6fiP2WCYLQeTevJbq3oykXu2xbwcOMVfNpbbRWweRLGAFRx4nQ\nx06WADXsIHnGIgQUTcPmCA==\n-----END PRIVATE KEY-----\n",
      projectId: 'shaun_home'
    }),
    databaseURL: 'https://shaun-home-default-rtdb.firebaseio.com'
  });
}

export default admin.database();