router.get('/users/logout', authorize, (req, res) => {
  const userId = req.user.id;

  const query = 'UPDATE users SET token = NULL WHERE id = $1';
  db.query(query, [userId], (error) => {
    if (error) {
      return res.status(500).json({ error: 'Error occurred while logging out' });
    }
    res.json({ msg: 'Logout successful' });
  });
});

const authorize = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Error occurred while authenticating' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    next();
  })(req, res, next);
};
