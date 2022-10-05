exports.inviteUser = function (req, res) {
  var invitationBody = req.body;
  var shopId = req.params.shopId;
  var authUrl = "https://url.to.auth.system.com/invitation";

  const UserAlreadyInvited = (res: Response) => {
    res.status(400).json({
      error: true,
      message: "User already invited to this shop"
    });
  };

  const findShopById = (err, createdUser, invitationResponse) => {
    Shop.findById(shopId).exec(function (err, shop) {
      if (err || !shop) {
        return res.status(500).send(err || { message: "No shop found" });
      }
      if (shop.invitations.indexOf(invitationResponse.body.invitationId)) {
        shop.invitations.push(invitationResponse.body.invitationId);
      }
      if (shop.users.indexOf(createdUser._id) === -1) {
        shop.users.push(createdUser);
      }
      shop.save();
    });
  };

  const findUserAndUpdate = (invitationResponse) => {
    User.findOneAndUpdate(
      {
        authId: invitationResponse.body.authId
      },
      {
        authId: invitationResponse.body.authId,
        email: invitationBody.email
      },
      {
        upsert: true,
        new: true
      },
      function (err, createdUser) {
        findShopById(err, createdUser, invitationResponse);
      }
    );
  };

  superagent
    .post(authUrl)
    .send(invitationBody)
    .end(function (err, invitationResponse) {
      if (invitationResponse.status === 201) {
        findUserAndUpdate(invitationResponse);
      } else if (invitationResponse.status === 200) {
        UserAlreadyInvited(res);
        return;
      }
      res.json(invitationResponse);
    });
};
