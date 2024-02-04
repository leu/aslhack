import express, { Application } from "express";
import sql from "../lib/db";
const { v4: uuidv4 } = require('uuid');

module.exports = function(app: Application) {
    app.post("/quiz", express.json(), async (req, res) => {
        if (!req.body || !req.body.words) {
            return res.send({
                error: "Please include at least 1 word to test!"
            })
        }

        const code = uuidv4().substring(0, 5);

        await sql`
            INSERT INTO quizzes VALUES (${code}, ${req.body.words})
        `
        
        res.send({
            code: code
        })
    })
}