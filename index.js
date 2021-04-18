const { response } = require('express');
const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const courses = [
    {id:1,name:"First Course"},
    {id:2,name:"Second Course"},
    {id:3,name:"Third Course"},
]

app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.get("/api/courses",(req,res)=>{
  res.send(courses);
});

app.get("/api/courses/:id",(req,res)=>{
   const course = courses.find(c=>c.id==parseInt(req.params.id))
   if(!course) return res.status(404).send("The course not found");
   
   res.status(200).send(course);
   
});

app.post("/api/courses",(req,res)=>{
    const result = validateCourse(req.body);
    if(result.error) return res.status(400).send(result.error);

    const course = {
        id:courses.length+1,
        name:req.body.name
    }
    courses.push(course);
    res.send(course);
 });

 app.put("/api/courses/:id",(req,res)=>{
    const course = courses.find(c=>c.id==parseInt(req.params.id))
    if(!course) return res.status(404).send("The course not found");
    
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error);

    course.name = req.body.name;
    courses.push(course);
    res.send(course);
 });

 app.delete("/api/courses/:id",(req,res)=>{
    const course = courses.find(c=>c.id==parseInt(req.params.id))
    if(!course) return res.status(404).send("The course not found");
    let index = courses.indexOf(course);
    courses.slice(index,1);
    res.send(course);
 });

app.get("/api/post/:year/:month",(req,res)=>{
    //res.send(req.params);
    res.send(req.query);
});

function validateCourse(course){
    const schema = {
        name:Joi.string().min(3).required()
    }
    return Joi.validate(req.body,schema);
}

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});