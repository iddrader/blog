import PostModel from '../models/Post.js';

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageURL: req.body.imageURL,
            tags: req.body.tags,
            user: req.userId,
            comments: req.body.comments
        }) 
        console.log(req.body)

        const post = await doc.save();
        console.log(post)

        res.json(post)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Couldn't create post"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)
    } catch (err) {
        console.log(err);
        return res.json({
            message: "Couldn't get posts"
        })
    }
}

export const getMyPosts = async (req, res) => {
    try {
        const posts = await PostModel.find({user: req.userId});
        res.json(posts)
    } catch (err) {
        console.log(err);
        return res.json({
            message: "Couldn't get posts"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await PostModel.findOneAndUpdate({
                _id: postId,
            }, 
            {
                $inc: { viewsCount: 1 },
            }, 
            {
                returnDocument: 'after',
            }
        ).populate('user').exec();

        res.json(post)
    } catch (error) {
        console.log(error);
        return res.json({
            message: "Couldn't get post"
        })
    }
}

export const createComment = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await PostModel.findOneAndUpdate({
                _id: postId,
            }, 
            {
                $push: { comments: req.body.comment },
            }, 
            {
                returnDocument: 'after',
            }
        ).populate('user').exec();

        res.json(post)
    } catch (error) {
        console.log(error);
        return res.json({
            message: "Couldn't create comment"
        })
    }
}
 
export const remove = async (req, res) => {
    try {
        await PostModel.findOneAndDelete({_id: req.params.id, user: req.userId})
        res.json({
            message: "Post deleted"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Couldn't delete post"
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await PostModel.updateOne(
            {
                _id: postId,
                user: req.userId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageURL: req.body.imageURL,
                user: req.userId,
                tags: req.body.tags,
            });
        
        res.json({
            success: true,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Couldn't update post"
        })
    }
}