import express, { Application } from "express";
import sql from "../lib/db";

module.exports = function(app: Application) {
    app.post("/quiz", express.json(), async (req, res) => {
        const users = await sql`
            SELECT profiles.*, image_url
            FROM
                (SELECT profiles.*
                FROM
                    (SELECT user_id
                    FROM users)
                    AS users
                INNER JOIN
                    (SELECT DISTINCT ON (user_id) *
                    FROM profile_history
                    ORDER BY user_id, created_date DESC)
                    AS profiles
                ON users.user_id = profiles.user_id)
                AS profiles
            LEFT OUTER JOIN
                (SELECT DISTINCT ON (user_id) *
                FROM profile_images
                ORDER BY user_id, created_date ASC)
                AS images
            ON profiles.user_id = images.user_id
        `
        
        res.send({
            users
        })
    })
}