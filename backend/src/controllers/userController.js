const getProfile = async (req, res) => {
  res.status(200).json({
    message: "Profil récupéré avec succès.",
    user: req.user,
  });
};

module.exports = {
  getProfile,
};
