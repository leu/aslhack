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

    app.get("/scores", express.json(), async (req, res) => {
        if (!req.body || !req.body.quiz_id) {
            return res.send({
                error: "Please include a quiz_id!"
            })
        }

        const scores = await sql`
            SELECT student, scores FROM scores WHERE quiz_id = ${req.body.quiz_id}
        `

        let studentAverages: any = {}
        let questionAverages: any = {}

        for (const [key, value] of Object.entries(scores[0].scores)) {
            questionAverages[key] = 0;
        }

        // for (var studentScore in scores) {
        for (let i = 0; i < scores.length; i++) {
            let sum = 0;
            for (const [key, value] of Object.entries(scores[i].scores)) {
                if (value) {
                    sum++;
                    questionAverages[key] += questionAverages[key] / scores.length
                }
            }
            studentAverages[scores[i].student] = sum / scores[i].scores.length * 100
        }

        const stats = {
            studentAverages,
            questionAverages
        }
        
        res.send({
            stats
        })
    })
}