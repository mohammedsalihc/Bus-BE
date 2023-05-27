import { Response } from "express";
import { errorMessage } from "../constants/variables/constants";

export class ControllerHandler {
    public jsonResponse<T>(response: Response, result?: T | null) {
        if (result) {
            response.type('application/json');
            return response.status(200).json(result);
        } else {
            return response.status(200).json({ "status": "success" });
        }
    }

    public error(response: Response, code: number, message?: string, error?: any) {
        const msg = message ? message : errorMessage[code]
        const error_response = {
            "status": code,
            "message": msg,
            "error": [error]
        }
        response.status(code).json(error_response)
    }
}