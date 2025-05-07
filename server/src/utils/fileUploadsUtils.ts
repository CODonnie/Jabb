import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: function (req, file, cb){
		cb(null, "uploads/resumes")
	},
	filename: function (req, file, cb){
		const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, suffix + path.extname(file.originalname));
	},
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
	const allowedTypes = [
		"application/pdf",
		"application/msword",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	];

	if(allowedTypes.includes(file.mimetype)){
		cb(null, true);
	} else {
		cb(new Error("only PDF, DOC, DOCX files allowed"), false);
	}
};

export const upload = multer({ storage, fileFilter });
