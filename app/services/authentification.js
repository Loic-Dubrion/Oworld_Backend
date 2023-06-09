const Error401 = require('../errors/Error401');
const Error403 = require('../errors/Error403');
const clientdb = require('./clientdb');

const auth = async (req, res, next) => {
  const userId = Number(req.params.userId);

  if (!req.session.user) {
    return next(new Error401('Access forbidden - please login'));
  }

  if (userId !== req.session.user.id) {
    return next(new Error403('Access forbidden'));
  }

  try {
    const result = await clientdb.query(
      `
      SELECT 
      role.name AS role_name, 
      array_agg(authorisation.name) AS permissions
    FROM 
      "user" AS u
    JOIN 
      user_has_role ON u.id = user_has_role.user_id
    JOIN 
      role ON user_has_role.role_id = role.id
    JOIN 
      role_has_authorisation ON role.id = role_has_authorisation.role_id
    JOIN 
      authorisation ON role_has_authorisation.authorisation_id = authorisation.id
    WHERE 
      u.id = $1
    GROUP BY 
      role.name`,
      [userId],
    );

    const userRolesAndPermissions = result.rows[0];

    req.roles = [userRolesAndPermissions.role_name]; 
    req.permissions = userRolesAndPermissions.permissions; 

    console.log(req.roles[0]);
    console.log(req.permissions);

    res.locals.user = req.session.user;

    next();
  } catch (error) {
    console.error(error);
    return next(new Error403('Access forbidden'));
  }
};

module.exports = auth;
