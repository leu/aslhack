import express, { Application } from "express";
import sql from "../lib/db";

import multer from "multer";
import { logger } from "../lib/logger";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

    app.post("/next_question", express.json(), async (req, res) => {
        if (!req.body || !req.body.quiz_id || !req.body.name) {
            return res.send({
                error: "Please include a quiz id and a student name!"
            })
        }

        const scores = (await sql`
            SELECT * FROM scores WHERE quiz_id = ${req.body.quiz_id} AND student = ${req.body.name}
        `)[0].scores

        const not_done_words = Object.keys(scores).filter(word => (scores[word] === null))
        
        res.send({
            nextWord: not_done_words[0]
        })
    })

    app.post("/oracle", upload.any(), async (req, res) => {
        const files = req.files as Express.Multer.File[];
        if (!req.body || !req.body.quiz_id || !req.body.name || !req.body.word
            || (files).length < 1) {
            return res.send({
                error: "Please include all fields in your request!"
            })
        }

        const val = Math.random()

        // check word and file against model
        const correct = Math.random() < 0.5

        let scores = (await sql`
            SELECT * FROM scores WHERE quiz_id = ${req.body.quiz_id} AND student = ${req.body.name}
        `)[0].scores

        scores[req.body.word] = correct

        await sql`
            UPDATE scores SET scores = ${scores} WHERE quiz_id = ${req.body.quiz_id} AND student = ${req.body.name}
        `
        
        res.send({
            correct: correct
        })
    })
}