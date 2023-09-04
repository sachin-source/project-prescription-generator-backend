'use strict';

/**
 * Expose
 */

const port = process.env.PORT || 3005;
const username = 'ayushman'
const password = "ayushman1234"
const link = "cluster0.8psycub.mongodb.net"
module.exports = {
  port,
  db: process.env.MONGODB_URL || `mongodb+srv://${username}:${password}@${link}/?retryWrites=true&w=majority`,
  jwtSecretKey: process.env.MONGODB_URL || 'HiMyZilPil@$mylove$me',
  twitter: {
    clientID: process.env.TWITTER_CLIENTID,
    clientSecret: process.env.TWITTER_SECRET,
    callbackURL: `http://localhost:${port}/auth/twitter/callback/`
  },
  github: {
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: `http://localhost:${port}/auth/github/callback`
  },
  linkedin: {
    clientID: process.env.LINKEDIN_CLIENTID,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: `http://localhost:${port}/auth/linkedin/callback`
  },
  google: {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `http://localhost:${port}/auth/google/callback`
  }
};