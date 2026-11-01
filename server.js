
import './server/config/env.js';          
import mongoose from 'mongoose';
import app from './server/express.js';
import assetsRouter from './server/assets-router.js';
import contactRouter from './server/routes/contact.js';
import userRouter from './server/routes/user.js';
import educationRouter from './server/routes/educations.js';
import projectRouter from './server/routes/project.js';

app.use('/src', assetsRouter);
app.use('/api/users', userRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/educations', educationRouter);
app.use('/api/projects', projectRouter);
app.use('/', function (req, res) {
  res.send({ message: "Welcome to my Portfolio application" });
});
app.listen(3000);
console.log("Server running at http://localhost:3000/");

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://axelkple_db_user:JByhmcWbgD4kzVyK@cluster0.niy0dc7.mongodb.net/portfolio?retryWrites=true&w=majority";
console.log('JWT_SECRET loaded:', !!process.env.JWT_SECRET);
console.log('MONGO_URI loaded:', !!process.env.MONGO_URI);
mongoose.connect(MONGO_URI)
  .then(() => {
    
    console.log("MongoDB Portfolio Database Connected Successfully!");
   
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed Error:", error.message);
  });
export default app;


