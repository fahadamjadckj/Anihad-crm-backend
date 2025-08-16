import { logger } from "./logger";

function validateEnv(...vars: string[]) {

    const errors: string[] = []
    vars.forEach(varName => {
        if (process.env[varName] === undefined) {
            // Variable is not set
            errors.push(`Error: Environment variable ${varName} is not set.`);
        }
    });

    if (errors.length > 1) {
        errors.forEach(err => {
            const error = new Error(err)
            logger.error(error, err)
        })

        process.exit(1)
    }


}

export default validateEnv