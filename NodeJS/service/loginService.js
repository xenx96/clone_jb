import * as CQ from "../query/companyQuery.js";
import * as hash from "../middleware/bcryptHash.js";
import * as auth from "../middleware/auth.js";

export const loginJWT = async (req, res, next) => {
  const id = req.body.ID;
  const companyInfo = await CQ.findByID(id);

  if (hash.hashedMatch(req.body.PW, companyInfo.PW)) {
    const form = { id: companyInfo.id, CID: companyInfo.CID };
    const JWT = auth.makeJWT(form);
    auth.putInCookie(JWT);
  } else {
    res.json(false);
  }
};
