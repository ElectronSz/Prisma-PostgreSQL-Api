const jwt = require("jsonwebtoken");

function generateAccessToken(user: any) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "5m",
  });
}

function generateRefreshToken(user: any, jti: any) {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "8h",
    }
  );
}

function generateTokens(user: any, jti: any) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

export { generateAccessToken, generateRefreshToken, generateTokens };
