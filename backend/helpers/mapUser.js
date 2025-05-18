const mapUser = (user) => ({
  id: user.id,
  login: user.login,
  roleId: user.role,
  registredAt: user.createdAt,
});

module.exports = mapUser;
