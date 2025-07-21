import {Request, Response} from 'express';

export const handleResponse = <T>(res: Response, promise: Promise<T>) => {
    promise
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json(`${err.message}`);
        });
}