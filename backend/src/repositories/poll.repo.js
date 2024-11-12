import PollModel from "../models/poll.model.js";
import mongoose from "mongoose";
const {ObjectId} = mongoose.Types;

export async function createPollByData(data) {
    try {
        const poll = await PollModel.create(data);
        return poll;
    }
    catch(err){
        throw err;
    }
}

export async function findPollById(id) {
    try {
        const poll = await PollModel.findById(id).populate("creatorId");
        return poll;
    }
    catch(err){
        throw err;
    }
}

export async function findPollsByCreatorId(id) {
    try {
        const polls = await PollModel.find({creatorId : id});
        return polls;
    }
    catch(err){
        throw err;
    }
}

export async function deletePollById(id) {
    try {
        const poll = await PollModel.findByIdAndDelete(id);
        return poll;
    }
    catch(err){
        throw err;
    }
}

export async function updatePollVoteCount(pollId, optionId) {
    try {
        const pollIdObejct = new ObjectId(pollId);
        const optionIdObject  = new ObjectId(optionId);
        console.log(pollId, optionId, pollIdObejct, optionIdObject);
        const result = await PollModel.updateOne(
            { _id: pollIdObejct, "options._id": optionIdObject },
            { $inc: { "options.$.voteCount": 1 } }
          );

        return result;
    }
    catch(err){
        throw err;
    }
}