const express = require("express");
const axios = require("axios");
const DAILY_API_KEY =
  "6e0e5e0a79a143a76b58824693e47003c23cc845fafd69537a2fe9486daf8f0c";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${DAILY_API_KEY}`,
  },
};

const app = express();
app.get("/creat-room", async (req, res) => {
  const data = {
    name: "prince",
    privacy: "public", //  public - private
    properties: {
      //nbf: this is a unix timestamp (seconds since the epoch.) , Les utilisateurs ne peuvent pas rejoindre une réunion dans cette salle avant cette heure.
      //exp: this is a unix timestamp (seconds since the epoch.) , Les utilisateurs ne peuvent pas rejoindre une réunion dans cette salle après cette heure.
      max_participants: 3, // nombre maximum de participant
      enable_people_ui: false, // affiche l'interface utilisateur des list de participant.
      // eject_at_room_exp: false, S'il y a une réunion en cours à expl'heure de la salle, terminez la réunion en expulsant tout le monde.
    },
  };
  try {
    await axios
      .post("https://api.daily.co/v1/rooms/", data, config)
      .then((response) => {
        res.json(response);
      });
  } catch (error) {
    res.res("error", error);
  }
});
module.exports = app;
