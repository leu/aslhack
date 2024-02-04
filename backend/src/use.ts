import express, { Application } from "express";
import sql from "../lib/db";

module.exports = function(app: Application) {
    app.post("/score", express.json(), async (req, res) => {
        if (!req.body || !req.body.quiz_id || !req.body.name) {
            return res.send({
                error: "Please include a quiz id and a student name!"
            })
        }

        const words = (await sql`
            SELECT words FROM quizzes WHERE quiz_id = ${req.body.quiz_id}
        `)[0].words

        const score = words.reduce((a: Object, v: string) => ({ ...a, [v]: null}), {}) 

        await sql`
            INSERT INTO scores VALUES (${req.body.quiz_id}, ${req.body.name}, ${score})
        `
        
        res.send({success: "Successful"})
    })
}