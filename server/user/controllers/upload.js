export const uploadImage = async (req, res) => {
    const { image } = req.body;
    res.status(200).json({ imageUrl: '' })
}