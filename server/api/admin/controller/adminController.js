const Admin = require("../model/Admin");

  exports.loginAdmin = async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;
      console.log(username);
      console.log(password);
      const admin = await Admin.findByCredentials(username, password);
      if (!admin) {
        return res.status(401).json({ error: "Login failed! Check authentication credentials" });
      }
      const token = await admin.generateAuthToken();
      res.status(201).json({ admin, token });
    } catch (err) {
      res.status(400).json({ err: err });
      console.log(err)
    }
  };
