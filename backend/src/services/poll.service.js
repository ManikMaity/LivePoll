import mongoose from "mongoose";
import { createPollByData, findPollById } from "../repositories/poll.repo.js";

export async function createPollService(title, description, options, userId) {
    try {
        const optionsData = options.map(option => ({
            name: option,
            _id : new mongoose.Types.ObjectId()
        }));

        const data = {
            title,
            description,
            options : optionsData,
            creatorId: userId
        }
        const poll = await createPollByData(data);
        return poll;
    }
    catch(err){
        throw err;
    }
}

export async function getPollDataService(pollId) {
    try {
        const poll = await findPollById(pollId);
        if (!poll) {
            throw {
                statusCode: 404,
                message: "Poll not found"
            }
        }
        const {creatorId, ...pollData} = poll._doc;
        const {username, _id, ...creatorData} = creatorId._doc;
        return {pollData, creatorData : {username, _id}};
    }
    catch(err){
        throw err;
    }
}