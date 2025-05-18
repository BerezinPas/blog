const express = require("express");
const {
  getUsers,
  getRoles,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { hasRole } = require("../middlewares/hasRole");
const { authenticated } = require("../middlewares/authenticated");
const mapUser = require("../helpers/mapUser");
const ROLES = require("../constants/role");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();
  res.send({ res: users.map(mapUser), error: null });
});

router.get(
  "/roles",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const roles = getRoles();
    res.send({ res: roles, error: null });
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteUser(req.params.id);
    res.send({ res: true, error: null });
  }
);

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const newUser = await updateUser(req.params.id, { role: req.body.roleId });
    res.send({ res: mapUser(newUser), error: null });
  }
);

module.exports = router;
