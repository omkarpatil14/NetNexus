import  express   from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer, { diskStorage } from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import  {register} from "./controllers/auth.js"
import {createPost}  from "./controllers/posts.js"
import { verifyToken } from "./middleware/auth.js";

// configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname=  path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname,"public/assets"))  );


//file storage
const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,"public/assets");
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
});

const upload = multer({storage});


//routes with files
app.post("/auth/register",upload.single("picture"),register);
app.post("/posts", verifyToken,upload.single("picture"),createPost);

//routes 
app.use("/auth",authRoutes );
app.use("/users", userRoutes);
app.use("/posts",postRoutes);

//mongoose connection

const PORT= process.env.PORT||6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("MONGO DB IS CONNECTED SUCCESSFULLY");
    
}).catch((err)=>{
    console.log("error at mongo connection",err);
})

app.listen(PORT,()=>{console.log(`server is live at http://localhost:${PORT}`)})