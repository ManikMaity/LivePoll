import {
  addToBookMarkService,
  createPollService,
  createVoteService,
  deletePollService,
  getAllCreatedPollsService,
  getAllPollsService,
  getBookmarkPollService,
  getPollDataService,
} from "../services/poll.service.js";

export async function createPollController(req, res) {
  try {
    const { title, description, options } = req.body;
    const user = req.user;
    const poll = await createPollService(title, description, options, user._id);
    res.status(201).json({
      success: true,
      message: "Poll created successfully",
      data: poll,
    });
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

export async function getPollDataController(req, res) {
  try {
    const pollId = req.params.pollId;
    const poll = await getPollDataService(pollId);
    res.status(200).json({
      success: true,
      message: "Poll data fetched successfully",
      data: poll,
    });
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

export async function getAllCreatedPollsController(req, res) {
  try {
    const user = req.user;
    const polls = await getAllCreatedPollsService(user._id);
    res.status(200).json({
      success: true,
      message: "Polls fetched successfully",
      data: polls,
    });
  } catch (err) {
    console.log(err);
    if (err.statusCode) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

export async function deletePollController(req, res) {
  try {
    const reqPollId = req.params.pollId;
    const reqUser = req.user;
    const deletedPoll = await deletePollService(reqPollId, reqUser);
    res.json({
      success: true,
      message: "Poll deleted successfully.",
      data: deletedPoll,
    });
  } catch (err) {
    console.log(err);
    if (err.statusCode) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

export const createVoteController = async (req, res) => {
  try {
    const reqPollId = req.body.pollId;
    const reqOptionId = req.body.optionId;
    const reqUserId = req.user._id;

    const vote = await createVoteService(reqPollId, reqUserId, reqOptionId);

    res.json({
      success: true,
      message: "Vote created successfully.",
      data: vote,
    });
  } catch (err) {
    console.log(err);
    if (err.statusCode) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
};

export const addToBookmarkController = async (req, res) => {
  try {
    const reqPollId = req.params.pollId;
    const reqUser = req.user;
    const { updatedData, message } = await addToBookMarkService(
      reqPollId,
      reqUser,
    );
    res.json({
      success: true,
      message: message,
      data: updatedData,
    });
  } catch (err) {
    console.log(err);
    if (err.statusCode) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
};

export const getBookmarkPollController = async (req, res) => {
  try {
    const reqUser = req.user;
    const data = await getBookmarkPollService(reqUser._id);
    res.json({
      success: true,
      message: "Bookmarked Polls fetched successfully",
      data: data,
    });
  } catch (err) {
    console.log(err);
    if (err.statusCode) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
};

export const getAllPolls = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const data = await getAllPollsService(page, limit);
    res.json({
      success: true,
      message: "All Polls fetched successfully",
      data: data,
    });
  } catch (err) {
    console.log(err);
    if (err.statusCode) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
};
