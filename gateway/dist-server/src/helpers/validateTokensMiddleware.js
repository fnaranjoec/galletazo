"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserService = _interopRequireDefault(require("../adapters/UserService"));

var _validateTokens = require("./validateTokens");

var _setTokens = _interopRequireDefault(require("./setTokens"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _nodeForge = _interopRequireDefault(require("node-forge"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateTokensMiddleware = async (req, res, next) => {
  // req.competitor=null;
  // ------------------------------ ACCESS --------------------------------
  const accessToken = req.headers["x-access-token"];
  const refreshToken = req.headers["x-refresh-token"];
  const forwarded = req.headers['x-forwarded-for']; // console.log("accessToken ===> ", accessToken);
  // console.log("refreshToken ===> ", refreshToken);

  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
  console.log(ip);

  var allowedHosts = _fs.default.readFileSync(_path.default.join(__dirname, 'allowedHosts.txt')).toString().split("\n");

  var validHost;

  for (let i in allowedHosts) {
    // console.log(allowedHosts[i]);
    // if (ip.substring(7,ip.length).trim() == allowedHosts[i].trim()) {
    //     validHost=allowedHosts[i];
    // }
    if (ip.trim() == allowedHosts[i].trim()) {
      validHost = allowedHosts[i];
    }
  } // // Verifico si el host esta autorizado
  // // console.log('validIP==>', validIP);
  // if (validHost===undefined || validHost=='undefined') {
  //     return res.status(500).json({
  //         success: false,
  //         message:"Host not allowed...",
  //         data: ""
  //     })
  // }


  if (!accessToken && !refreshToken) return next(); // let privateKey = fs.readFileSync(path.join(__dirname, 'key'), 'utf8');
  //
  // // convert PEM-formatted private key to a Forge private key
  // var forgePrivateKey = forge.pki.privateKeyFromPem(privateKey);
  //
  // // get a Forge public key from the Forge private key
  // var forgePublicKey = forge.pki.setRsaPublicKey(forgePrivateKey.n, forgePrivateKey.e);
  //
  // // convert the Forge public key to a PEM-formatted public key
  // var publicKey = forge.pki.publicKeyToPem(forgePublicKey);
  //
  // // convert the Forge public key to an OpenSSH-formatted public key for authorized_keys
  // var sshPublicKey = forge.ssh.publicKeyToOpenSSH(forgePublicKey);
  //
  // console.log(`
  // PEM-formatted public key:
  // ${publicKey}
  //
  // OpenSSH-formatted public key:
  // ${sshPublicKey}
  // `);
  //
  // // Decrypt
  // var bytes  = CryptoJS.AES.decrypt(accessToken, publicKey);
  // var decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
  // const decodedAccessToken = validateAccessToken(decryptedToken);

  const decodedAccessToken = (0, _validateTokens.validateAccessToken)(accessToken); // console.log('decodedAccessToken ==> ', decodedAccessToken);
  // console.log('decodedAccessToken.competitor ==> ', decodedAccessToken.competitor);
  // if (decodedAccessToken!==null || decodedAccessToken!==undefined) {
  //     return res.status(500).json({
  //         success: false,
  //         message:"ACCESS TOKEN is invalid.",
  //         data: ""
  //     })
  //
  // }

  if (decodedAccessToken !== null) {
    if (decodedAccessToken && decodedAccessToken.user) {
      // Verifico si la session actual aun sigue activa o si cambio el token
      const session = await _UserService.default.fetchUserSessionById({
        session_id: decodedAccessToken.user.session_id
      });

      if ((0, _isEmpty.default)(session)) {
        res.set({
          "Access-Control-Expose-Headers": "x-access-token,x-refresh-token",
          "x-access-token": undefined,
          "x-refresh-token": undefined
        });
        return next();
      }

      ;
      req.user = decodedAccessToken.user;
      return next();
    }
  } // ------------------------------ REFRESH --------------------------------


  const decodedRefreshToken = (0, _validateTokens.validateRefreshToken)(refreshToken); // console.log('decodedRefreshToken==>', decodedRefreshToken);
  // console.log("decodedRefreshToken===>", decodedRefreshToken);

  if (decodedRefreshToken === null || decodedRefreshToken === undefined) {
    return res.status(500).json({
      success: false,
      message: "REFRESH TOKEN is invalid.",
      data: ""
    });
  }

  if (decodedRefreshToken !== null) {
    if (decodedRefreshToken && decodedRefreshToken.user) {
      // ***************************************************************************************************
      // ********* ESTE BLOQUE ES SI QUIERO QUE HAGA LOGIN CADA VEZ QUE ESPIRA EL TOKEN DE ACCESO **********
      // ***************************************************************************************************
      // // Aqui el Token de Acceso expiro asi que tengo que eliminar la session activa
      // const deleteSession = await UserService.deleteUserSession({session_id: decodedRefreshToken.competitor.session_id});
      // // Verifico si la session actual aun sigue activa
      // const session = await UserService.fetchUserSessionById({ session_id: decodedRefreshToken.competitor.session_id });
      // if (isEmpty(session)) return next();
      // ***************************************************************************************************
      // ********  ESTE BLOQUE VERIFICA SESSION ACTIVA Y RENUEVA EL TOKEN DE ACCESO Y DE REFRESH  **********
      // ***************************************************************************************************
      // const session = await UserService.fetchUserSessionById({ session_id: decodedRefreshToken.competitor.session_id });
      // console.log('session==>', session);
      // if (isEmpty(session)) return next();
      // Verifico si la session actual aun sigue activa o si cambio el token
      const session = await _UserService.default.fetchUserSessionById({
        session_id: decodedRefreshToken.user.session_id
      }); // console.log("session==>", session);
      // Si los tokens enviados no coinciden con los guardos envio los guardados y no regenero tokens

      if (session.session_access_token !== accessToken && session.session_refresh_token !== refreshToken) {
        // res.set({
        //     "Access-Control-Expose-Headers": "x-access-token,x-refresh-token",
        //     "x-access-token": session.session_access_token,
        //     "x-refresh-token": session.session_refresh_token
        // });
        res.header("x-access-token", session.session_access_token);
        res.header("x-refresh-token", refreshToken);
        return next();
      }

      req.user = decodedRefreshToken.user;
      const userTokens = await (0, _setTokens.default)({
        userSession: decodedRefreshToken.user
      }); // Actualizo el nuevo token

      const sessionUpdated = await _UserService.default.updateUserSession({
        session_id: decodedRefreshToken.user.session_id,
        session_access_token: userTokens.accessToken,
        session_refresh_token: refreshToken
      });
      res.set({
        "Access-Control-Expose-Headers": "x-access-token,x-refresh-token",
        "x-access-token": userTokens.accessToken,
        "x-refresh-token": refreshToken
      });
      return next();
    }
  }

  return res.status(500).json({
    success: false,
    message: "ACCESS TOKEN is expired. Get new access token.",
    data: ""
  }); // next();
};

var _default = validateTokensMiddleware;
exports.default = _default;