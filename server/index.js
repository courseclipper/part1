const express = require("express");
require('dotenv').config();
const cors = require("cors");
const ConnectwithDB = require("./Db/db.js");
const bcrypt = require('bcryptjs');
const User = require("./Model/User");
const TokenCreator = require("./Util/Token.js");
const Review = require("./Model/Review.js");
const Category = require("./Model/Category");
const Platform = require("./Model/Platform");
const urlMetadata = require('url-metadata');
const path = require('path');
//Connection with Database
ConnectwithDB();


//Using Express
const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


//Listening to Server : 3001
app.listen(3001, console.log("Server running at port 3001"));

app.get("/reviews", async (req, res) => {
    try {
        // const result = await Review.find({}).sort({ Rating: -1 });
        const result = await Review.aggregate([{
            $lookup:
            {
                from: "platforms",
                let: { review_platform: { $toLower: "$platformName" } },
                pipeline: [
                    { $addFields: { lower_name: { $toLower: "$name" } } },
                    {
                        $match:
                        {
                            $expr:
                                { $eq: ["$$review_platform", "$lower_name"] }
                        }
                    }
                ],
                as: "platm"
            }
        }]);
        // console.log(result);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/review-name", async (req, res) => {
    try {
        // console.log(req.query.categoryName);
        // if (req.query.categoryName && req.query.categoryName.trim() !== "") {
        //     query.categoryName = new RegExp(req.query.categoryName, 'i');
        // }
        // console.log(query);
        let query = {};
        if (req.query.catagoryName != '') {
            query = { catagoryName: req.query.catagoryName };
        }
        console.log(query);
        const result = await Review.find(query).sort({ Rating: -1 });
        // console.log(result);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/reviews", async (req, res) => {
    console.log(req.body);
    const currentTime = new Date();
    req.body.TimeofUpload = currentTime;
    var a = req.body.courseURL;
    const d = a.replace('https://', '').replace('http://', '');
    var d1 = d.split(".");
    req.body.platformName = d1[1];
    req.body.Logo = 'https://play-lh.googleusercontent.com/dsCkmJE2Fa8IjyXERAcwc5YeQ8_NvbZ4_OI8LgqyjILpXUfS5YhEcnAMajKPrZI-og';
    console.log(req.body);
    const review = new Review(req.body);
    review.save();
    try {
        const result = await Review.find({});
        res.send(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/adminDelete", async function (req, res) {
    console.log(req.body.Id);
    try {
        const result = await Review.deleteOne({ _id: req.body.Id });
        console.log(result);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while deleting the document." });
    }
});

app.post("/updateLink", async function (req, res) {
    const { id, affiliateLink } = req.body;
    // Ensure both id and affiliateLink are provided in the request
    if (!id || !affiliateLink) {
        return res.status(400).json({ error: "Missing required data" });
    } try {
        const updatedReview = await Review.findByIdAndUpdate(id, { AffiliatedLink: affiliateLink }, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ error: "Review not found" });
        }
        console.log("Review updated successfully:", updatedReview);
        res.status(200).json(updatedReview);
    } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//User Signin + Authentication
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                Message: "Please enter Email && Password"
            })
        } else {
            const userAlreadyExists = await User.findOne({ email }).select("+password");
            if (!userAlreadyExists) {
                res.status(400).json({
                    Message: "User Not Found"
                })
            } else {
                // const token = userAlreadyExists.getjwtToken();
                const isValidatedPass = await bcrypt.compare(password, userAlreadyExists.password);
                if (!isValidatedPass) {
                    res.status(400).json({
                        message: "Invalid Credentials"
                    })
                } else {
                    const token = TokenCreator(userAlreadyExists._id);
                    res.status(200).json({
                        success: true,
                        user: userAlreadyExists,
                    })
                }
            }
        }
    }
    catch (err) {
        console.log(err);
    }

});

app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        //User Validation
        if (!email || !password) {
            res.status(200).json({
                Message: "Please Enter All Credentials"
            })
        } else {
            //creation of New User for our App
            const newUser = {
                name: firstName + lastName,
                email,
                password
            }
            //Mongo Db Method
            const UserCreated = await User.create(newUser);
            const token = TokenCreator(UserCreated._id);
            if (UserCreated) {
                res.status(200).json({
                    success: true,
                    user: token
                })
            }
        }
    }
    catch (err) {
        console.log(err);
    }
});

app.post("/category", async (req, res) => {
    try {
        const { category } = req.body;
        const alreadyExistsCategory = await Category.findOne({ name: category });
        if (alreadyExistsCategory) {
            res.status(400).json({
                Message: "category already exists"
            })
        } else {
            const response = await Category.create({
                name: category
            });
            res.status(200).json({
                Category: response
            })
        }
    }
    catch (err) {
        console.log(err);

    }
});

app.get("/category", async (req, res) => {
    try {
        const response = await Category.find({});
        res.status(200).json({
            Categories: response
        });
    }
    catch (err) {
        console.log(err);
    }
});

app.delete("/category/delete/:cat", async (req, res) => {
    try {
        const category = req.params.cat;
        const document = await Category.find({ name: category });
        if (!document) {
            res.status(400).json({
                Message: "Document Not Found"
            })
        } else {
            const deletedDocument = await Category.deleteOne({ name: category });
            if (deletedDocument) {
                console.log(deletedDocument);
                res.status(200).json({
                    success: true,
                    DocumentDeleted: deletedDocument
                })
            } else {
                res.staus(400).json({
                    Message: "couldnt Delete the Document"
                })
            }
        }
    }
    catch (err) {
        console.log(err);
    }
});
app.post("/google/signin", async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.googleId;
    const googleId = req.body.googleId;

    console.log({
        email,
        password,
        googleId
    });

    try {
        if (!email || !password) {
            console.log("PLEASE PROVIDE EMAIL AND PASSWORD ADDRESS");
        }
        else {
            const user_already = await User.findOne({ email: email, method: 'google' });
            if (user_already) {
                res.status(200).json({
                    success: true,
                    user: user_already
                })
            }
            else {
                const name = req.body.name;
                const toCreateUser = {
                    name: name,
                    email: email,
                    password,
                    googleId,
                    method: 'google'
                }
                console.log(toCreateUser);
                const createdUser = await User.create(toCreateUser);
                res.status(200).json({
                    success: true,
                    user: createdUser
                })
            }
        }
    } catch (error) {
        console.log(error);
    }

});

app.get('/platform', async (req, res) => {
    try {
        const response = await Platform.find({});
        console.log(response);
        res.status(200).json({
            Platforms: response
        });
    }
    catch (err) {
        console.log(err);
    }
})

app.post("/platform", async (req, res) => {
    try {
        const Alreadyplatform = await Platform.findOne({ name: req.body.name });
        if (Alreadyplatform) {
            res.status(400).json({
                message: "Platform already exists"
            })
        }
        else {
            const newPlatform = {
                name: req.body.name,
                url: req.body.url
            }
            const response = await Platform.create(newPlatform);
            if (response) {
                res.status(200).json({
                    success: true,
                    Platform: response
                })
            }
            else {
                res.status(400).json({
                    Message: "Error in Platform Addition"
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
});

app.delete("/platform/:name", async (req, res) => {
    const name = req.params.name;
    try {
        const Alreadyplatform = await Platform.findOne({ name: name });
        if (!Alreadyplatform) {
            res.status(400).json({
                message: "Platform dont exist"
            })
        }
        else {
            const response = await Platform.deleteOne({ name: name });
            if (response) {
                res.status(200).json({
                    success: true,
                    Platform: response
                })
            }
            else {
                res.status(400).json({
                    Message: "Error in Platform Deletion"
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
});

app.post('/contact', (req, res) => {
    console.log(req.body);
    if (req.body.condition == true) {
        res.send({ message: "Successfull" });
    }
})