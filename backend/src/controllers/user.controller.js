import { signinService, signupService } from "../services/user.service.js";

export async function signupController(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = await signupService(username, email, password);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
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

export async function signinController(req, res) {
  try {
    const { email, password } = req.body;
    const { token, userData } = await signinService(email, password);
    res
      .cookie("livepoll-access-token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 365), // 1 year
        path: "/",
      })
      .status(200)
      .json({
        success: true,
        message: "User signedin successfully.",
        user: userData,
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

export const checkUser = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Found",
      data: req.user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export async function logOutController(req, res) {
  try {
    res.clearCookie("livepoll-access-token").status(200).json({
      success: true,
      message: "User logged out successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
