const crypto = require("crypto");

function hashToken(token: any) {
  return crypto.createHash("sha512").update(token).digest("hex");
}

export { hashToken };