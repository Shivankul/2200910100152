import shortUrl from "../models/short_url.model.js";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
dotenv.config();

export const createShortUrl = async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }


    let finalCode = shortcode;
    if (shortcode) {
      const exists = await shortUrl.findOne({ shortCode: shortcode });
      if (exists) {
        finalCode = nanoid(6);
      }
    } else {
      finalCode = nanoid(6);
    }

    const expiryDate = new Date(Date.now() + validity * 60 * 1000);

    const newUrl = await shortUrl.create({
      longUrl: url,
      shortCode: finalCode,
      expiry: expiryDate
    });

    const shortLink = `${process.env.BASE_URL}/${finalCode}`;
;

    return res.status(201).json({
      shortLink,
      expiry: expiryDate
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await shortUrl.findOne({ shortCode: id });

    if (!url) return res.status(404).json({ error: "Short link not found" });

    if (url.expiry < new Date()) {
      return res.status(410).json({ error: "Link expired" }); 
    }

    url.clicks++;
    await url.save();

    return res.redirect(url.longUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};