const Note = require("../models/noteModel")

exports.getAllNote = async(req,res)=>{
    try {
        const note = await Note.find({user:req.user._id});
        res.json(note)
    } catch (error) {
        
    }
}

exports.createNote = async(req,res) =>{
    const {title, content, category} = req.body;
    if(!title || !content || !category){
        res.status(402).json({message:"Fields must not be empty"})
    }
    try {
        const note = new Note({user:req.user._id, title, content, category});
        const createdNote = await note.save();
        res.json(createdNote);
    } catch (error) {
        res.status(404).json({message:"Failed"})
    }
}

exports.getOneNote = async(req,res)=>{
	try{
		const note = await Note.findById(req.params.id);
		if(!note){
			res.status(404).json({message:"Note cannot be found"})
		}
		else{
			res.json(note)
		}
	}
     catch (error) {
            res.status(404).json({message:"Failed"})
    }
}
exports.update = async(req,res) =>{
    const {title, content, category} = req.body;
    if(!title || !content || !category){
        res.status(402).json({message:"fields can not be empty"})
    }
    try {
        const note = await Note.findById(req.params.id);
        if(note.user.toString() !== req.user._id.toString()){
            res.status(404).json({message:"You're not authorised to update"})
        }
        if(note){
            note.title = title;
            note.content = content;
            note.category = category;

            const updatedNote = await note.save();
            res.json(updatedNote);
        }
    } catch (error) {
        res.status(402).json({message:"Failed"})
    }
}
exports.deleteNote = async(req,res) =>{
    try {
        const note = await Note.findById(req.params.id);
        if(!note){
            res.status(401).json({message:"note not found"})
        }
        else{
            await note.remove();
            res.status(201).json({message:"note removed successfull"})
        }
    } catch (error) {
        res.status(201).json({message:"failed"})

    }
}