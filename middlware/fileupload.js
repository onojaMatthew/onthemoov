const multer = require( "multer" );
const path = require( "path" );

/**
 * Multer configuration for file upload
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb( null, path.resolve( __dirname, "../upload" ) );
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },

  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.jpg' || ext !== '.png' || ext !== ".jpeg") {
      return cb(res.status(400).end('only jpg, png are allowed'), false);
    }
    cb(null, true)
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
});

exports.upload = upload;
