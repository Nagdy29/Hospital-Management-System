export const generetToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookienNmae = user.role === "Admin" ? "adminToken" : "pationToken";
  res
    .status(statusCode)
    .cookie(cookienNmae, token, {
      expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      succes: true,
      message,
      token,
      user,
    });
};
