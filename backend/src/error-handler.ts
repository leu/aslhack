import { logger } from "../lib/logger"

process.on(
    'uncaughtException',
    function (err)
    {
        logger.error(err)
        //you can also notify to support via email or other APIs
    }
)